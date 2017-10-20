// Casey Aitken
// constructor-hangman

var Word = require('./word.js');
var inquirer = require('inquirer');

// Initial text
console.log("\n\n\n***************************");
console.log("~~~~ Welcome to Hangman~~~~!");
console.log("***************************\n");
console.log("I'm thinking of an animal...");
console.log("===========================\n");

game = {
	// word bank array
 	wordBank: ['penguin', 'giraffe', 'tiger', 
 	'bear', 'zebra', 'hippo', 'lion', 'ostrich', 
 	'armadillo', 'eagle', 'whale', 'otter', 'cheetah', 
 	'orangatang', 'chimpanzee', 'dolphin'],
 	// reset the word counter to 0
 	wordsWon: 0,
 	// give the user 10 guesses
 	guessesRemaining: 10,
 	// set the current word to nothing
 	currentWrd: null,

 	guessedLettersArray: [],
 	
 	// function to start game
 	startGame: function (wrd) {
 		// reset the guesses
 		this.resetGuesses();
 		// set the game's current word to a random word from the word bank
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		// pushes letters from the word into an array
 		this.currentWrd.getLetter();
 		// Prompt the user to guess a letter
 		this.promptUser();
 	},

 	// displayWordHolder: function () {
 	// 	var wordHolder = '_'.repeat(this.currentWrd.length);
 	// },

 	// function to reset guesses
 	resetGuesses: function(){
 		this.guessesRemaining = 10;
		this.guessedLettersArray = [];
 	},

 	// function to prompt user
 	promptUser: function(){
 		// maintains a reference to the original 'this'
 		var self = this;
	
 		console.log("\nGuess a Letter!")
		// Display guesses remaining
		console.log("(Guesses remaining: " + self.guessesRemaining + ")");

 		if (self.guessedLettersArray.length !== 0) {
 			console.log("(Wrong letters: " + self.guessedLettersArray + ")")
 		}
 		var wordDisplay = self.currentWrd.wordRender();
 		// wordDisplay.split('').join(' ');
	  	console.log(wordDisplay.split('').join(' '));
	  	// for (i = 0; i < self.currentWrd.wordRender().length; i++) {
	  	// 	wordDisplay.push(self.currentWrd.wordRender()[i] + " ");
	  	// }
	  	// console.log(join.wordDisplay)

 		inquirer.prompt([
		  {
		    name: "guessLetter",
		    message: "Choice:"
		  }
		]).then(function(answers) {
			console.log("\nYou guessed: " + answers.guessLetter)

			var manyGuessed = self.currentWrd.checkLetter(answers.guessLetter);
			// console.log(manyGuessed);
	 			// if no letters were guessed correctly..
	 			if(manyGuessed === 0) {
	 				console.log("WRONG!");
	 				self.guessesRemaining--;
	 				self.guessedLettersArray.push(answers.guessLetter);
	 				// console.log("Zzzzzzzuessed letters: " + self.guessedLettersArray)
	 			} 
	 			// else, the letter was correct
	 			else {
	 				console.log("CORRECT!");
 					// if the word was found, user wins
 					if(self.currentWrd.findWord()){
 						console.log("****YOU WON!!!****");
 						console.log("The animal was: " + self.currentWrd.target + "!");
 						game.restart();
 						return
 					}
	 			}
	 			console.log("===================");
	 			// if user has guesses remaining and the word has not been found, prompt user again
	 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
	 				self.promptUser();
	 			}
	 			// else, if user has no guesses remaining, the game is OVER
	 			else if(self.guessesRemaining === 0){
	 				console.log("GAME OVER The correct word was " + self.currentWrd.target +"!");
					game.restart();
	 			} 
	 		});
 	},
 	restart: function(){
 		console.log("++++++++++++++++++++");
 		inquirer.prompt([
		  {
		    name: "playAgain",
		    message: "Play again?(y/n)"
		  }
		]).then(function(answers) {
			var choice = answers.playAgain;
			if (choice === 'y') {
				console.log("++++++++++++++++++++");
				game.startGame();
			}
			else {
				return
			}
		});
	}
};

game.startGame();

// Casey Aitken
// constructor-hangman

var Word = require('./word.js');
var inquirer = require('inquirer');

// Initial text
console.log("Welcome to Hangman!");
console.log("I'm thinking of an animal...");
console.log("Good Luck!");
console.log("==========================");

game = {
	// word bank array
 	wordBank: ['penguin', 'giraffe', 'tiger', 'bear', 'zebra', 'hippo', 'lion'],
 	// reset the word counter to 0
 	wordsWon: 0,
 	// give the user 10 guesses
 	guessesRemaining: 10,
 	// set the current word to nothing
 	currentWrd: null,
 	
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
 	},

 	// function to prompt user
 	promptUser: function(){
 		// maintains a reference to the original 'this'
 		var self = this;

 		//display word letters as a series of '_'
 		// console.log("The word is: " + wordHolder)

 		inquirer.prompt([
		  {
		    name: "guessLetter",
		    message: "Guess a letter:"
		  }
		]).then(function(answers) {
			console.log("You guessed: " + answers.guessLetter)

			var manyGuessed = self.currentWrd.checkLetter(answers.guessLetter);
			console.log(manyGuessed);
	 			// if no letters were guessed correctly..
	 			if(manyGuessed ==0) {
	 				console.log("WRONG");
	 				self.guessesRemaining--;
	 			} 
	 			// else, the letter was correct
	 			else {
	 				console.log("CORRECT");

	 			// 	for(var i = 0; i < self.currentWrd.target.length; i++) {
			  //           if (self.currentWrd.target[i] == answers.guessLetter) {
			  //           	// console.log(wordHolder)
			  //             var word = wordHolder.split('');
			  //             word[i] = answers.guessLetter;
			  //             wordHolder = word.join('');
			  //           }
			  //         }

					// console.log(wordHolder);

 					// if the word was found, user wins
 					if(self.currentWrd.findWord()){
 						console.log("You won!");
 						console.log("The animal was: " + self.currentWrd.target + "!");
 						console.log("-------------------");
 						return;
 					}
	 			}

	 			console.log("Guesses remaining: " + self.guessesRemaining);
	 			console.log("-------------------");
	 			// if user has guesses remaining and the word has not been found..
	 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
	 				self.promptUser();
	 			}
	 			// else, if user has no guesses remaining..
	 			else if(self.guessesRemaining ==0){
	 				console.log("Game over! The correct word was " + self.currentWrd.target +"!");
	 			} 
	 			// else
	 			else {
	 				console.log(self.currentWrd.wordRender());
	 			}
	 		});
 	}
};

game.startGame();

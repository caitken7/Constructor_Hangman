var letter = require('./letter.js');

function Word(target) {
	this.target = target;
	this.lettersArray = [];
	this.found = false;

	// function that pushes the letters from the target word into lettersArray
	this.getLetter = function() {
		for (var i=0; i < this.target.length; i++) {
			this.lettersArray.push( new letter(this.target[i]));
		}
	};

	// function that 
	this.findWord = function() {
		this.found = this.lettersArray.every(function(currLett) {
			return currLett.appear;
		});
		return this.found;
	};

	// function that takes the letter guess and 
	this.checkLetter = function(guessLetter) {
		var toReturn = 0;

		for (var i = 0; i < this.lettersArray.length; i++) {
			if (this.lettersArray[i].charac == guessLetter){
				this.lettersArray[i].appear = true;
				toReturn++;
			}
		}
		return toReturn;
	};

	this.wordRender = function() {
		var string = '';
		for (var i=0; i < this.lettersArray.length; i++){
			string += this.lettersArray[i].letterRender();
		}
		return string;
	};
}

module.exports = Word;
var endState = {
	create: function() {

		var nameText = game.add.text(80,80, "THE END");
		if (wrongKey) {
			var instructionsText = game.add.text(80,160, "You swaped into an occupied space!");
		}else{
			var instructionsText = game.add.text(80,160, "You did not swap fast enough!");
		}
		var instructionsText = game.add.text(80,240, "Hit <space> to play again");

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.startGame, this);
	},
	
	startGame: function() {
		game.state.start('play');
	}
};
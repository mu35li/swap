var menuState = {

	preload: function() {
        game.stage.backgroundColor = '#b6dce7';
	},

	create: function() {
		var nameText = game.add.text(80,80, "SWAP");
		var instructionsText = game.add.text(80,160, "Hit <space> to start");

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.startGame, this);
	},

	startGame: function() {
		game.state.start('play');
	}
};
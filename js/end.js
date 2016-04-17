var endState = {
	create: function() {
		//save highscore in google spreadsheet
		
		$.ajax({
			url: "https://docs.google.com/forms/d/1YU3szWFC5qiHNuaI2heQpay0zjSxew12hHYs9dnnGS8/formResponse",
			method: "POST",
			data: { 
				"entry.1602660480": "julian",
				"entry.747868275":score,
			},
			dataType: "JSON"
		});


		var nameText = game.add.text(80,80, "THE END");
		var scoreText = game.add.text(80,160, "Your score: "+score);
		if (wrongKey) {
			game.add.text(80,240, "You swapped into an occupied space!");
		}else{
			game.add.text(80,240, "You did not swap fast enough!");
		}
		var instructionsText = game.add.text(80,320, "Hit <space> to play again");

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.addOnce(this.startGame, this);
	},
	
	startGame: function() {
		game.state.start('play');
	}
};
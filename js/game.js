var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'gameDiv');

game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);

game.state.start('menu');


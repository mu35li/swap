var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);

var secondsTillNewStackElement = 1;
var heightOfStackElement = 70;
var stackHeight = 0;
var maxStackElements = 6;
var topStackElement;
var stackElements = [];
var sKey;
var wKey;
var aKey;
var pKey;

game.state.start('menu');


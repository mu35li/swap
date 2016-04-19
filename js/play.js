var stack = {
    secondsTillNewStackElement: 1,
    heightOfStackElement: 70,
    stackHeight: 0,
    maxStackElements: 6,
    stackElements: [],
    spawnedElements: 0,
    stackTimer: null,
    topStackElement: null,
    maxSpeed: 200,
    difficulty: 0.01
};
var swapWindows = [];
var swapTimer;
var sKey;
var wKey;
var aKey;
var pKey;
var wrongKey = false;
var score = 0;
var scoreName = 0;
var playState = {

    preload: function () {
        game.load.image('stackElement', 'img/stackElement.png');
        game.load.image('swapWindow', 'img/swapWindow.png');
    },

    create: function create() {


        // stack spawn timer
        stack.stackTimer = game.time.events.loop(stack.secondsTillNewStackElement*1000, playState.spawnStackElement, this);
        var delay = this.calculateDelay();
        swapTimer = game.time.events.loop(delay, this.freeSwap, this);

        // add keys and listeners
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

        sKey.onDown.add(this.removeStackElement, this, 0, 0);
        wKey.onDown.add(this.removeStackElement, this, 0, 1);
        aKey.onDown.add(this.removeStackElement, this, 0, 2);
        pKey.onDown.add(this.removeStackElement, this, 0, 3);

        //create swap windows
        var windows = "swap";
        for (var i in windows){
            swapWindows[i] = {};
            swapWindows[i].image = game.add.image(20+i*200, 10, 'swapWindow');
            swapWindows[i].empty = true;
            game.add.text(92+i*200, 130, windows[i]);
        }
    },

    update: function () {
        // check if stack exceeded max height and show end scene
        if (stack.stackHeight>stack.maxStackElements*stack.heightOfStackElement) {
            this.endGame();
        }

    },

    render: function () {
    },

    spawnStackElement: function () {
        stack.stackElements.push(game.add.image(250, 600-stack.stackHeight, 'stackElement'));
        stack.stackHeight += stack.heightOfStackElement;
        stack.spawnedElements++;
        //increase speed of spawning elements
        stack.stackTimer.delay += stack.maxSpeed+(stack.stackTimer.delay-stack.maxSpeed)*Math.pow(Math.E,(-stack.difficulty))-stack.stackTimer.delay;
        swapTimer.delay = this.calculateDelay();
    },

    removeStackElement: function(key, number) {
        // check if there are elements left on the stack and remove the one on top
        if (stack.stackElements.length > 0) {
            if (swapWindows[number].empty ) { // check if swap place is empty
                stack.topStackElement = stack.stackElements.pop();
                stack.topStackElement.destroy();
                stack.stackHeight -= stack.heightOfStackElement;
                //increase score
                score+= 10;
                // move top stack element to swap
                this.fillSwap(number);
            }else{ // end game on wrong key press
                wrongKey = true;
                this.endGame();
            }
        }
    },

    tearDown: function() {
        stack.stackElements = [];
        stack.stackHeight = 0;
        stack.spawnedElements = 0;
    },

    endGame: function() {
        this.tearDown();
        game.state.start('end');
    },

    calculateDelay: function() {
        console.log(parseInt((stack.stackTimer.delay*stack.maxStackElements)/8));
        return parseInt((stack.stackTimer.delay*stack.maxStackElements)/8);
    },

    fillSwap: function(number) {
        swapWindows[number].empty = false;
        var x = swapWindows[number].image.position.x;
        var y = swapWindows[number].image.position.y;
        swapWindows[number].stackImage = game.add.image(x+32, y+62, 'stackElement');
        swapWindows[number].stackImage.scale.setTo(0.3, 0.3);
    },

    freeSwap: function() {
        var element = parseInt(Math.random()*4);
        if (!swapWindows[element].empty) {
            swapWindows[element].stackImage.destroy();
            swapWindows[element].empty = true;
        }
    }
};
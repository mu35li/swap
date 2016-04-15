var playState = {


    preload: function () {
        game.load.image('stackElement', 'img/stackElement.png');
    },

    create: function create() {

        game.world.setBounds(0, 0, 800, 600);

        // stack spawn timer
        game.time.events.loop(secondsTillNewStackElement*1000, playState.spawnStackElement, this);

        // add keys and listeners
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

        sKey.onDown.add(this.removeStackElement, this);
        wKey.onDown.add(this.removeStackElement, this);
        aKey.onDown.add(this.removeStackElement, this);
        pKey.onDown.add(this.removeStackElement, this);
    },

    update: function () {
        // check if stack exceeded max height and show and scene
        if (stackHeight>maxStackElements*heightOfStackElement) {
            console.log("rip");   
            this.tearDown();
            game.state.start('end');
        }

    },

    render: function () {
    },

    spawnStackElement: function () {
        stackElements.push(game.add.image(200, 400-stackHeight, 'stackElement'));
        stackHeight += heightOfStackElement;
    },

    removeStackElement: function() {
        // check if there are elements left on the stack and remove the one on top
        if (stackElements.length > 0) {
            topStackElement = stackElements.pop();
            topStackElement.destroy();
            stackHeight -= heightOfStackElement;
        }
    },

    tearDown: function() {
        stackElements = [];
        stackHeight = 0;
    }
};
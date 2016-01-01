// TODO:
// Change README to instructions for game play
// enemy.update
    // handles collision with player
// ------ Extra features -------
    // Randomize enemy locations
    // Allow user to select level (easy, hard, impossible)
    // You win message
    // Score counter

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    instantiateEnemies();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(userInput) {
    var leftBoundary = -25,
        rightBoundary = 450,
        bottomBoundary = 425,
        topBoundary = -50,
        winBoundary = 0,
        move = 50;

    if (userInput === 'left' && this.x - move > leftBoundary) {

        this.x -= move;

    } else if (userInput === 'up' && this.y - move > topBoundary) {

        this.y -= move;

        if (this.y <= winBoundary) {
            console.log('you win');
            this.x = 200;
            this.y = 400;
        }

    } else if (userInput === 'right' && this.x + move < rightBoundary) {

        this.x += move;

    } else if (userInput === 'down' && this.y + move < bottomBoundary) {

        this.y += move;

    }
};

var pickRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Now instantiate your objects.
var player = new Player(),
    allEnemies = [],
    instantiateEnemies = function(n) {
        var i,
            x = -75, //start off canvas
            y = [60, 140, 225];
        for(i = 0; i < n; i++) {
            var enemy = new Enemy(x, pickRandom(y));
            allEnemies.push(enemy);
        }
    // allEnemies = [new Enemy(25, 60), new Enemy(100, 140), new Enemy(200, 225)];
};

instantiateEnemies(3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

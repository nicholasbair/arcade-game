// TODO:
// Change README to instructions for game play
// Enemy function
    // set enemy initial speed
// enemy.update
    // updates enemy location
    // handles collision with player
// handleInput
    // player cannot move off the screen (check for this and handle)
    // reset game when player reaches water
        // move player back to original location
// ------ Extra features -------
    // Randomize enemy locations
    // Allow user to select level (easy, hard, impossible)

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = dt * 800;
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
        winBoundary = 0;


    if (userInput === 'left' && this.x - 50 > leftBoundary) {

        this.x -=50;

    } else if (userInput === 'up' && this.y - 50 > topBoundary) {

        this.y -=50;

        if (this.y <= winBoundary) {
            alert('You win!');
        }

    } else if (userInput === 'right' && this.x + 50 < rightBoundary) {

        this.x += 50;

    } else if (userInput === 'down' && this.y + 50 < bottomBoundary) {

        this.y += 50;

    }

    // y = 50 boundary for water

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(25, 60), new Enemy(100, 140), new Enemy(200, 225)];


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

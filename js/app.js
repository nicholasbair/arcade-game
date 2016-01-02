// TODO:
// Change README to instructions for game play

// ------ Extra features -------
    // Allow user to select level (easy, hard, impossible)
    // You win message
    // Score counter

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 500) {
        var x = [-25, -100, -175],
            y = [60, 140, 225];

        this.x = pickRandom(x);
        this.y = pickRandom(y);
    }
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
    this.boundary = {
        left: -25,
        right: 450,
        bottom: 425,
        top: -50,
        win: 0
    };
    this.move = 50;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.y <= this.boundary.win) {
        console.log('you win');
        this.x = 200;
        this.y = 400;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(userInput) {
    if (userInput === 'left' && this.x - this.move > this.boundary.left) {
        this.x -= this.move;
    } else if (userInput === 'up' && this.y - this.move > this.boundary.top) {
        this.y -= this.move;
    } else if (userInput === 'right' && this.x + this.move < this.boundary.right) {
        this.x += this.move;
    } else if (userInput === 'down' && this.y + this.move < this.boundary.bottom) {
        this.y += this.move;
    }
};

// Check collision
var checkCollisions = function() {

    var i,
        len = allEnemies.length,
        width = 50,
        checkX =  function() {
            if (player.x < allEnemies[i].x + width && player.x + width > allEnemies[i].x) {
                console.log('you lose');
                player.x = 200;
                player.y = 400;
            }
        };

    for(i = 0; i < len; i++) {
        if (player.y <= 250 && player.y >= 200 && allEnemies[i].y === 225) {
            checkX();

        } else if (player.y <= 150 && player.y >= 100 && allEnemies[i].y === 140) {
            checkX();

        } else if (player.y <= 100 && player.y >= 1 && allEnemies[i].y === 60) {
            checkX();
        }
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
            x = [-25, -100, -175],
            y = [60, 140, 225];

        for(i = 0; i < n; i++) {
            var enemy = new Enemy(pickRandom(x), pickRandom(y));
            allEnemies.push(enemy);
        }
    };

instantiateEnemies(4);

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

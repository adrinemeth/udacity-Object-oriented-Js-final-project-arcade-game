// Gems our player should collect
var points = 0;
var xCoord = [0, 100, 200, 300, 400];
var yCoord = [200, 100, 0];
var Gem = function (url, locX, locY) {
  // The image/sprite for our gems, this uses
  // a helper we've provided to easily load images
  this.sprite = url;
  this.x = locX;
  this.y = locY;
  this.argument1 = locX;
  this.argument2 = locY;
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Gem.prototype.resetGem = function () {
  gem = new Gem('images/gem-blue.png', xCoord[Math.floor(Math.random() * xCoord.length)], yCoord[Math.floor(Math.random() * yCoord.length)]);
};
//Enemies the player must avoid
var Enemy = function (url, locX, locY) {
  Gem.call(this, url, locX, locY);
}
Enemy.prototype = Object.create(Gem.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.speed = 100;
  this.x = this.x + (this.speed * dt);
  //reset enemy's position
  if (this.x >= 500) {
    this.resetEnemy();
  }
  //handling collision with the player
  if (player.x >= this.x - 40 && player.x <= this.x + 40) {
    if (player.y >= this.y - 40 && player.y <= this.y + 40) {
      player.x = 200;
      player.y = 400;
      if (points > 500) {
        points -= 500;
        document.getElementById("score").textContent = points;

      }
      else {
        points = 0;
        document.getElementById("score").textContent = points;

      }
    }
  }
  //handling collision with gems
  if (gem.x >= this.x - 40 && gem.x <= this.x + 40) {
    if (gem.y >= this.y - 40 && gem.y <= this.y + 40) {
      this.resetGem();
    }
  }
};
Enemy.prototype.resetEnemy = function () {
  this.x = this.argument1;
  this.y = this.argument2;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (url, locX, locY) {
  Gem.call(this, url, locX, locY);
};
Player.prototype = Object.create(Gem.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () { };
Player.prototype.handleInput = function (keys) {
  if (keys === 'left' && this.x > 0)
    this.x = this.x - 100;
  else if (keys === 'right' && this.x < 400)
    this.x = this.x + 100;
  else if (keys === 'up' && this.y > -100)
    this.y = this.y - 100;
  else if (keys === 'down' && this.y < 400)
    this.y = this.y + 100;
  if (player.x === gem.x && player.y === gem.y) {
    points += 100;
    document.getElementById("score").textContent = points;
    console.log("points " + points);
    this.resetGem();
  };
  if (player.y === -100) {
    alert("You win!");
    player.x = 200;
    player.y = 400;
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function getRandomCoord(min, max) {
  return Math.random() * (max - min) + min;
}

var gem = new Gem('images/gem-blue.png', xCoord[Math.floor(Math.random() * xCoord.length)], yCoord[Math.floor(Math.random() * yCoord.length)]);

var allEnemies = new Array();
for (var i = 0; i < 11; i++) {
  allEnemies[i] = new Enemy('images/enemy-bug.png', getRandomCoord(-1300, -100), yCoord[Math.floor(Math.random() * yCoord.length)]);
}

var player = new Player('images/char-boy.png', 200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
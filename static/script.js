let amountBet = 0;


// <----------------- BEAT-THE-DEALER --------------------->
let dealerSumBeatTheDealer = 0;
let yourSumBeatTheDealer = 0;

let dealerAceCountBeatTheDealer = 0;
let yourAceCountBeatTheDealer = 0; 

let hiddenBeatTheDealer;
let deckBeatTheDealer;
let canHitBeatTheDealer = true;



function buildDeckBeatTheDealer() {
    let valuesBeatTheDealer = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let typesBeatTheDealer = ["C", "D", "H", "S"];
    deckBeatTheDealer = [];

    for (let i = 0; i < typesBeatTheDealer.length; i++) {
        for (let j = 0; j < valuesBeatTheDealer.length; j++) {
            deckBeatTheDealer.push(valuesBeatTheDealer[j] + "-" + typesBeatTheDealer[i]); 
        }
    }
    console.log(deckBeatTheDealer);
}

function shuffleDeckBeatTheDealer() {
    for (let i = 0; i < deckBeatTheDealer.length; i++) {
        let j = Math.floor(Math.random() * deckBeatTheDealer.length); 
        let tempBeatTheDealer = deckBeatTheDealer[i];
        deckBeatTheDealer[i] = deckBeatTheDealer[j];
        deckBeatTheDealer[j] = tempBeatTheDealer;
    }
    console.log(deckBeatTheDealer);
}

function startGameBeatTheDealer() {
    hiddenBeatTheDealer = deckBeatTheDealer.pop();
    dealerSumBeatTheDealer += getValueBeatTheDealer(hiddenBeatTheDealer);
    document.getElementById("hidden").src = "static/images/" + hiddenBeatTheDealer + ".png";
    dealerAceCountBeatTheDealer += checkAceBeatTheDealer(hiddenBeatTheDealer);
    while (dealerSumBeatTheDealer < 1) { 
        let cardImgBeatTheDealer = document.createElement("img");
        let cardBeatTheDealer = deckBeatTheDealer.pop();
        cardImgBeatTheDealer.src = "static/images/" + cardBeatTheDealer + ".png";
        dealerSumBeatTheDealer += getValueBeatTheDealer(cardBeatTheDealer);
        dealerAceCountBeatTheDealer += checkAceBeatTheDealer(cardBeatTheDealer);
        document.getElementById("dealer-cards").append(cardImgBeatTheDealer);
    }
    console.log(dealerSumBeatTheDealer);

    console.log(yourSumBeatTheDealer);
    document.getElementById("higher").addEventListener("click", higherBeatTheDealer);
    document.getElementById("lower").addEventListener("click", lowerBeatTheDealer);

}
function lowerBeatTheDealer() {
    
    dealerSumBeatTheDealer = reduceAceBeatTheDealer(dealerSumBeatTheDealer, dealerAceCountBeatTheDealer);
    yourSumBeatTheDealer = reduceAceBeatTheDealer(yourSumBeatTheDealer, yourAceCountBeatTheDealer);

    canHitBeatTheDealer = false;
    for (let i = 0; i < 1; i++) {
        let cardImgBeatTheDealer = document.createElement("img");
        let cardBeatTheDealer = deckBeatTheDealer.pop();
        cardImgBeatTheDealer.src = "static/images/" + cardBeatTheDealer + ".png";
        yourSumBeatTheDealer += getValueBeatTheDealer(cardBeatTheDealer);
        yourAceCountBeatTheDealer += checkAceBeatTheDealer(cardBeatTheDealer);
        document.getElementById("your-card-hidden").src = "static/images/" + cardBeatTheDealer + ".png";
    }
    

    let messageBeatTheDealer = "";
    if (yourSumBeatTheDealer > dealerSumBeatTheDealer) {
        messageBeatTheDealer = "You Lose!";
        deductBetFromBalance(amountBet);
    }
    else if (dealerSumBeatTheDealer > yourSumBeatTheDealer) {
        messageBeatTheDealer = "You win!";
        addBetToBalance(amountBet);
    }
    
    else if (yourSumBeatTheDealer == dealerSumBeatTheDealer) {
        messageBeatTheDealer = "Tie!";
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    

    document.getElementById("dealer-sum").innerText = dealerSumBeatTheDealer;
    document.getElementById("your-sum").innerText = yourSumBeatTheDealer;
    document.getElementById("results").innerText = messageBeatTheDealer;
}

function higherBeatTheDealer() {
    dealerSumBeatTheDealer = reduceAceBeatTheDealer(dealerSumBeatTheDealer, dealerAceCountBeatTheDealer);
    yourSumBeatTheDealer = reduceAceBeatTheDealer(yourSumBeatTheDealer, yourAceCountBeatTheDealer);

    canHitBeatTheDealer = false;
    for (let i = 0; i < 1; i++) {
        let cardImgBeatTheDealer = document.createElement("img");
        let cardBeatTheDealer = deckBeatTheDealer.pop();
        cardImgBeatTheDealer.src = "static/images/" + cardBeatTheDealer + ".png";
        yourSumBeatTheDealer += getValueBeatTheDealer(cardBeatTheDealer);
        yourAceCountBeatTheDealer += checkAceBeatTheDealer(cardBeatTheDealer);
        document.getElementById("your-card-hidden").src = "static/images/" + cardBeatTheDealer + ".png";
    }
    

    let messageBeatTheDealer = "";
    if (yourSumBeatTheDealer > dealerSumBeatTheDealer) {
        messageBeatTheDealer = "You win!";
        addBetToBalance(amountBet);
    }
    else if (dealerSumBeatTheDealer > yourSumBeatTheDealer) {
        messageBeatTheDealer = "You lose!";
        deductBetFromBalance(amountBet);
    }
    
    else if (yourSumBeatTheDealer == dealerSumBeatTheDealer) {
        messageBeatTheDealer = "Tie!";
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    

    document.getElementById("dealer-sum").innerText = dealerSumBeatTheDealer;
    document.getElementById("your-sum").innerText = yourSumBeatTheDealer;
    document.getElementById("results").innerText = messageBeatTheDealer;
}

function getValueBeatTheDealer(cardBeatTheDealer) {
    let dataBeatTheDealer = cardBeatTheDealer.split("-");
    let valueBeatTheDealer = dataBeatTheDealer[0];

    if (isNaN(valueBeatTheDealer)) { 
        if (valueBeatTheDealer == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(valueBeatTheDealer);
}

function checkAceBeatTheDealer(cardBeatTheDealer) {
    if (cardBeatTheDealer[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAceBeatTheDealer(playerSumBeatTheDealer, playerAceCountBeatTheDealer) {
    while (playerSumBeatTheDealer > 21 && playerAceCountBeatTheDealer > 0) {
        playerSumBeatTheDealer -= 10;
        playerAceCountBeatTheDealer -= 1;
    }
    return playerSumBeatTheDealer;
}

// <---------------------------- BINGO ------------------------------>



// <-------------------- DICE ---------------------------->
let images = [
    "static/images/dice-01.svg",
    "static/images/dice-02.svg",
    "static/images/dice-03.svg",
    "static/images/dice-04.svg",
    "static/images/dice-05.svg",
    "static/images/dice-06.svg"
];

let imagesColor = [
    "static/images/color-game-blue.png",
    "static/images/color-game-green.png",
    "static/images/color-game-pink.png",
    "static/images/color-game-red.png",
    "static/images/color-game-white.png",
    "static/images/color-game-yellow.png"
];

const colorBets = [];
let colorGet = "";
// let betsGet = 0;

let guessAddNumberRollEmDice = 0;

// <----------------------- Roll-'em-Dice ----------------------->
function animateDiceRoll() {
    let dieOneValue = Math.floor(Math.random() * 6);
    let dieTwoValue = Math.floor(Math.random() * 6);
    
    let elDiceOne = document.getElementById('dice1');
    let elDiceTwo = document.getElementById('dice2');
    
    
    elDiceOne.style.animation = 'rollAnimation 1s forwards';
    elDiceTwo.style.animation = 'rollAnimation 1s forwards';
    
    setTimeout(function() {
        elDiceOne.style.animation = 'none';
        elDiceTwo.style.animation = 'none';
        
        document.querySelector("#dice-one-side-one img").setAttribute("src", images[dieOneValue]);
        document.querySelector("#dice-two-side-one img").setAttribute("src", images[dieTwoValue]);
        
        let total = dieOneValue + 1 + dieTwoValue + 1; 
        let result = "";
        if (total == guessAddNumberRollEmDice) {
            result = "You Win!";
            addBetToBalance(amountBet);
        }
        else {
            result = "You Lose!";
            deductBetFromBalance(amountBet);
        }
        document.querySelector(".dice-1-dice-2-addnumber").textContent = result;
        }, 1000); 
        
}

function guessNumberRollEmDice(number) {
    guessAddNumberRollEmDice = number;
    document.querySelector(".guess-container-roll").textContent = `Your guess is: ${guessAddNumberRollEmDice}`;
    console.log(number)
}

// <-------------------------- COLOR-GAME ---------------------------->

function animateDiceRollColor() {
    let dieOneValue = Math.floor(Math.random() * 6);
    let dieTwoValue = Math.floor(Math.random() * 6);
    let dieThreeValue = Math.floor(Math.random() * 6);
    
    let elDiceOne = document.getElementById('dice1');
    let elDiceTwo = document.getElementById('dice2');
    let elDiceThree = document.getElementById('dice3');
    
    
    elDiceOne.style.animation = 'rollAnimation 1s forwards';
    elDiceTwo.style.animation = 'rollAnimation 1s forwards';
    elDiceThree.style.animation = 'rollAnimation 1s forwards';
    
    setTimeout(function() {
        elDiceOne.style.animation = 'none';
        elDiceTwo.style.animation = 'none';
        elDiceThree.style.animation = 'none';
        
        document.querySelector("#dice-one-side-one img").setAttribute("src", imagesColor[dieOneValue]);
        document.querySelector("#dice-two-side-one img").setAttribute("src", imagesColor[dieTwoValue]);
        document.querySelector("#dice-three-side-one img").setAttribute("src", imagesColor[dieThreeValue]);
        let diceResults = [imagesColor[dieOneValue], imagesColor[dieTwoValue], imagesColor[dieThreeValue]];
        let betsToRemove = [];
        let i = 0;

        while (i < colorBets.length) {
            let matchCount = 0;
            for (let j = 0; j < diceResults.length; j++) {
                if (diceResults[j] === colorBets[i]) {
                    matchCount++;
                }
            }
            if (matchCount > 0) {
                addBetToBalance(colorBets[i + 1] * matchCount);
            } else {
                deductBetFromBalance(colorBets[i + 1]);
            }
            betsToRemove.push(i, i + 1);
            i += 2;
        }

        for (let i = betsToRemove.length - 1; i >= 0; i--) {
            const indexToRemove = betsToRemove[i];
            colorBets.splice(indexToRemove, 1);
        }

    }, 1000); 
}

// <-------------------------- SIC-BO-GAME -------------------------->

function animateDiceRollSicBo() {
    let dieOneValue = Math.floor(Math.random() * 6);
    let dieTwoValue = Math.floor(Math.random() * 6);
    let dieThreeValue = Math.floor(Math.random() * 6);
    
    let elDiceOne = document.getElementById('dice1');
    let elDiceTwo = document.getElementById('dice2');
    let elDiceThree = document.getElementById('dice3');
    
    
    elDiceOne.style.animation = 'rollAnimation 1s forwards';
    elDiceTwo.style.animation = 'rollAnimation 1s forwards';
    elDiceThree.style.animation = 'rollAnimation 1s forwards';
    
    setTimeout(function() {
        elDiceOne.style.animation = 'none';
        elDiceTwo.style.animation = 'none';
        elDiceThree.style.animation = 'none';
        
        document.querySelector("#dice-one-side-one img").setAttribute("src", images[dieOneValue]);
        document.querySelector("#dice-two-side-one img").setAttribute("src", images[dieTwoValue]);
        document.querySelector("#dice-three-side-one img").setAttribute("src", images[dieThreeValue]);
        let diceResults = [images[dieOneValue], images[dieTwoValue], images[dieThreeValue]];
        let betsToRemove = [];
        let i = 0;

        while (i < colorBets.length) {
            let matchCount = 0;
            for (let j = 0; j < diceResults.length; j++) {
                if (diceResults[j] === colorBets[i]) {
                    matchCount++;
                }
            }
            if (matchCount > 0) {
                addBetToBalance(colorBets[i + 1] * matchCount);
            } else {
                deductBetFromBalance(colorBets[i + 1]);
            }
            betsToRemove.push(i, i + 1);
            i += 2;
        }

        for (let i = betsToRemove.length - 1; i >= 0; i--) {
            const indexToRemove = betsToRemove[i];
            colorBets.splice(indexToRemove, 1);
        }
        }, 1000); 
        
}




// <--------------------------- BLACK-JACK ---------------------------->
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true; 


function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) { 
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "static/images/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "static/images/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "static/images/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { 
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "static/images/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        deductBetFromBalance(amountBet);
    }
    else if (dealerSum > 21) {
        message = "You win!";
        addBetToBalance(amountBet);
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        addBetToBalance(amountBet);
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        deductBetFromBalance(amountBet);
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


// <-------------------- MAZE ----------------------------->

// DEPTH FIRST SEARCH MAZE IMPLEMENTATION IN JAVASCRIPT BY CONOR BAILEY

// Initialize the canvas
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

let current;
let goal;

class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting grid
    current = this.grid[0][0];
    this.grid[this.rows - 1][this.columns - 1].goal = true;
  }

  // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
  draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "black";
    // Set the first cell as visited
    current.visited = true;
    // Loop through the 2d grid array and call the show method for each cell instance
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }
    // This function will assign the variable 'next' to random cell out of the current cells available neighbouting cells
    let next = current.checkNeighbours();
    // If there is a non visited neighbour cell
    if (next) {
      next.visited = true;
      // Add the current cell to the stack for backtracking
      this.stack.push(current);
      // this function will highlight the current cell on the grid. The parameter columns is passed
      // in order to set the size of the cell
      current.highlight(this.columns);
      // This function compares the current cell to the next cell and removes the relevant walls for each cell
      current.removeWalls(current, next);
      // Set the nect cell to the current cell
      current = next;

      // Else if there are no available neighbours start backtracking using the stack
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }
    // If no more items in the stack then all cells have been visted and the function can be exited
    if (this.stack.length === 0) {
      generationComplete = true;
      return;
    }

    // Recursively call the draw function. This will be called up until the stack is empty
    window.requestAnimationFrame(() => {
      this.draw();
    });
    //     setTimeout(() => {rd
    //       this.draw();
    //     }, 10);
  }
}

class Cell {
  // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.goal = false;
    // parentGrid is passed in to enable the checkneighbours method.
    // parentSize is passed in to set the size of each cell on the grid
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    // Choose a random neighbour from the neighbours array
    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  // Highlights the current cell on the grid. Columns is once again passed in to set the size of the grid.
  highlight(columns) {
    // Additions and subtractions added so the highlighted cell does cover the walls
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;
    ctx.fillStyle = "purple";
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  removeWalls(cell1, cell2) {
    // compares to two cells on x axis
    let x = cell1.colNum - cell2.colNum;
    // Removes the relevant walls if there is a different on x axis
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    // compares to two cells on x axis
    let y = cell1.rowNum - cell2.rowNum;
    // Removes the relevant walls if there is a different on x axis
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  // Draws each of the cells on the maze canvas
  show(size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    // console.log(`x =${x}`);
    // console.log(`y =${y}`);
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;
    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
    if (this.goal) {
      ctx.fillStyle = "rgb(83, 247, 43)";
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

// let newMaze = new Maze(600, 50, 50);
// newMaze.setup();
// newMaze.draw();


let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#number");
let complete = document.querySelector(".complete");
let replay = document.querySelector(".replay");
let close = document.querySelector(".close");

let newMaze;

form.addEventListener("submit", generateMaze);
document.addEventListener("keydown", move);
replay.addEventListener("click", () => {
  location.reload();
});

close.addEventListener("click", () => {
  complete.style.display = "none";
});

function generateMaze(e) {
  e.preventDefault();

  if (rowsCols.value == "" || size.value == "") {
    return alert("Please enter all fields");
  }

  let mazeSize = size.value;
  let number = rowsCols.value;
  if (mazeSize > 600 || number > 50) {
    alert("Maze too large!");
    return;
  }

  form.style.display = "none";

  newMaze = new Maze(mazeSize, number, number);
  newMaze.setup();
  newMaze.draw();
}

function move(e) {
  if (!generationComplete) return;
  let key = e.key;
  let row = current.rowNum;
  let col = current.colNum;

  switch (key) {
    case "ArrowUp":
      if (!current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {
            complete.style.display = "block";
            addBetToBalance(10);
          }
      }
      break;

    case "ArrowRight":
      if (!current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
            complete.style.display = "block";
            addBetToBalance(10);
          }
      }
      break;

    case "ArrowDown":
      if (!current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
            complete.style.display = "block";
            addBetToBalance(10);
          }
      }
      break;

    case "ArrowLeft":
      if (!current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {
            complete.style.display = "block";
            addBetToBalance(10);
          }
      }
      break;
  }
}


// <----------- BALANCE -------------->

// const balanceElement = document.getElementById("balance");
// let selectedDice = null;
// let newBalance = parseInt(balanceElement.textContent, 10)

const balanceElement = document.getElementById("balance");
let newBalanceCoins = parseInt(balanceElement.textContent.trim(), 10);
let amount = null;

// <-------------- PAYPAL POP-UP CLOSE-UP ------------->


paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: amount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            let currentBalance = newBalanceCoins + parseInt(amount, 10);
            saveBalanceToServer(balanceElement.textContent = currentBalance);
            closePopup();
        });
    },
}).render("#paypal");

function saveBalanceToServer(balance) {
    console.log(balance);
    // fetch('/update_balance', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ new_balance: balance })
    // })
    // .then(response => {
    //     if (response.ok) {
    //         console.log('Balance saved successfully!');
    //         // return response.json();
    //     } else {
    //         console.error('Failed to save balance');
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    fetch('/update_balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_balance: balance })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Balance saved successfully!');
            document.getElementById('balance').textContent = data.new_balance;
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
        } else {
            console.error('Failed to save balance:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addBetToBalance(newBalance) {
    console.log(newBalance);
    fetch('/add_balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ added_points: newBalance })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Balance saved successfully!', newBalance);
            document.getElementById('balance').textContent = data.new_balance;
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
        } else {
            console.error('Failed to save balance:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deductBetFromBalance(newBalance) {
    console.log(newBalance);
    fetch('/deduct_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deducted_points: newBalance })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Balance saved successfully!', newBalance);
            document.getElementById('balance').textContent = data.new_balance;
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
        } else {
            console.error('Failed to save balance:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function openPopup(amountValue, img) {
    amount = amountValue;
    document.getElementById("pop-up-img").src = "static/images/" + img + ".png";
    document.getElementById("popup").style.display = "block";
    document.getElementById("amount").innerText ="Amount: $" + amountValue + ".00"
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// <---- pop-up-game ----->

function openPopUpGame() {
    document.getElementById("popUp").style.display = "block";
    document.getElementById("instruction").style.display = "block";
    document.getElementById("mechanics").style.display = "block";
}

function closePopUpGame() {
    document.getElementById("popUp").style.display = "none";
}

// <---- pop-up-bet ----->

function openPopUpBet(game) {
    if (game == 'beat') {
        buildDeckBeatTheDealer();
        shuffleDeckBeatTheDealer();
        startGameBeatTheDealer();
    } else if (game == 'blackjack') {
        buildDeck();
        shuffleDeck();
        startGame();
    } else if (game == 'brick') {
        board = document.getElementById("board");
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d"); //used for drawing on the board

        //draw initial player
        context.fillStyle="skyblue";
        context.fillRect(player.x, player.y, player.width, player.height);

        requestAnimationFrame(update);
        document.addEventListener("keydown", movePlayer);

        //create blocks
        createBlocks();
    }
    document.getElementById("popUp-bet").style.display = "block";
    document.getElementById("mechanics").style.display = "block";
    document.getElementById("popUp").style.display = "none";
    document.querySelector(".bet-user").style.display = "none";
}

function closePopUpBet() {
    document.getElementById("popUp-bet").style.display = "none";
}

function onClickBet(amount, imgsrc) {
    let balance = parseInt(balanceElement.textContent, 10);
    if (balance >= amount) {
        amountBet = amount;
        document.querySelector(".bet-user").style.display = "block";
        document.getElementById("user-bet").textContent = `$ ${amount}`;
        document.getElementById("bet-img").src = imgsrc
        closePopUpBet();
    }else if (amount == 'all-in') {
        amountBet = balance;
        document.querySelector(".bet-user").style.display = "block";
        document.getElementById("user-bet").textContent = `$ ${balance}`;
        document.getElementById("bet-img").src = imgsrc
        closePopUpBet();
    }
    else {
        alert("You don't have enough money!");
        return;
    }
    console.log(amount, balance);
}

// <-------- pop-up-dice ------->

function openPopUpDice(allIn) {
    if (allIn == 'no-all-in') {
        popUpColorWithOutAllIn();
    } else {
        document.getElementById("popUp-dice").style.display = "block";
        document.getElementById("mechanics").style.display = "block";
        document.getElementById("popUp").style.display = "none";
    }
    
}

function closePopUpDice() {
    document.getElementById("popUp-dice").style.display = "none";
}


function onclickDice(dice) {
    console.log(dice);
    document.getElementById("popUp-dice").style.display = "none";
    document.getElementById("popUp-bet").style.display = "block";
    selectedDice = dice;
}

function onClickBetDice(amount) {
    console.log(amount);
    let balance = parseInt(balanceElement.textContent, 10);
    document.getElementById("popUp-bet").style.display = "none";
    finalBetDice(selectedDice,amount);
}

function finalBetDice(dice, amount) {
    console.log(dice, amount);
}

function onClickExit() {
    window.location.href='/games'
}

function checkBalanceIfNotNull(url) {
    if (amountBet != 0) {
        let result = confirm("Your bet will be deducted to your balance. Are you sure you want to leave this page?");
        if (result) {
            let newBalance = parseInt(document.getElementById('balance').textContent, 10) - amountBet;
            document.getElementById('balance').textContent = newBalance
            saveBalanceToServerThenExit(newBalance, url);
        }
    }
    else {
        window.location.href= url;
    }
}

function goTo(url){
    checkBalanceIfNotNull(url);
}

function saveBalanceToServerThenExit(balance, url) {
    console.log(balance);
    fetch('/update_balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_balance: balance })
    })
    .then(response => {
        if (response.ok) {
            console.log('Balance saved successfully!');
            window.location.href=url;
        } else {
            console.error('Failed to save balance');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function betAmountSet() {
    amountBet = 0;
}


function getColor(color) {
    colorGet = color;
    closePopUpDice();
    openPopUpBet();
}
function getColorWithOutAllIn(color) {
    colorGet = color;
    // closePopUpDice();
    closePopUpColorWithOutAllIn()
    popUpBetWithOutAllIn();
}
function getBets(bets) {
    closePopUpBet();
    if (bets == 'all-in') {
        return getBetAndColor(colorGet, "All In");
    } 
    else {
        getBetAndColor(colorGet, parseInt(bets));
        // closePopUpBetWithOutAllIn();
        openPopUpBetAgain();
    }
}

function getbetsWithoutAllIn(bets) {
    closePopUpBetWithOutAllIn();
    openPopUpBetAgain();

    return getBetAndColor(colorGet, parseInt(bets));
}

function getBetAndColor(color,bets) {
    colorBets.push(color, bets);
    colorGet = "";
    console.log(colorBets) 
    const displayContainer = document.querySelector('.bet-and-color-display');
    displayContainer.innerHTML = '';

    for (let i = 0; i < colorBets.length; i += 2) {
        const color = colorBets[i];
        const bet = colorBets[i + 1];

        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const span = document.createElement('span');

        div.setAttribute('class', 'bet-user-dice');
        img.setAttribute('id', 'bet-img');
        h2.setAttribute('id', 'change-bet');
        span.setAttribute('id', 'user-bet');

        h1.textContent = 'Your Bet: ';
        span.textContent = bet;
        img.setAttribute('src', color);
        img.setAttribute('alt', `Image representing ${color}`);
        img.setAttribute('width', '150'); 
        img.setAttribute('height', '150'); 
        h2.textContent = "Good Luck!";
        h1.appendChild(span);

        div.appendChild(h1);
        div.appendChild(img);
        div.appendChild(h2);

        div.style.display = 'block';
        div.style.position = 'relative';
        div.style.marginBottom = '10px';
        div.style.textAlign = 'center';
        div.style.border = '1px solid black';
        div.style.borderRadius = '12px';
        div.style.width = '200px';
        div.style.padding = '10px';
        displayContainer.appendChild(div);
    }
}  

function openPopUpBetAgain() {
    document.getElementById("popUp-bet-again").style.display = "block";
}

function closePopUpBetAgain() {
    document.getElementById("popUp-bet-again").style.display = "none";
}

function popUpBetWithOutAllIn (){
    document.getElementById("popUp-bet-without-allin").style.display = "block";
}

function closePopUpBetWithOutAllIn (){
    document.getElementById("popUp-bet-without-allin").style.display = "none";
}


function popUpColorWithOutAllIn (){
    document.getElementById("popUp-dice-without-all-in").style.display = "block";
}

function closePopUpColorWithOutAllIn (){
    document.getElementById("popUp-dice-without-all-in").style.display = "none";
}
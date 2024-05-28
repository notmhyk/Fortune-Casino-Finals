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
    } else if (game == 'bingo') {
        startTimer();
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
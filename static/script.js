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
    }
    else if (dealerSumBeatTheDealer > yourSumBeatTheDealer) {
        messageBeatTheDealer = "You win!";
    }
    
    else if (yourSumBeatTheDealer == dealerSumBeatTheDealer) {
        messageBeatTheDealer = "Tie!";
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
    }
    else if (dealerSumBeatTheDealer > yourSumBeatTheDealer) {
        messageBeatTheDealer = "You lose!";
    }
    
    else if (yourSumBeatTheDealer == dealerSumBeatTheDealer) {
        messageBeatTheDealer = "Tie!";
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
        document.querySelector(".dice-1-dice-2-addnumber").textContent = total;
        }, 1000); 
        
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
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
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

// <-------------------- FLIP-COIN -------------------->

// <------------------------ ROCK-PAPER-SCISSORS ---------------------->

// <------------------------- HANG-THE-DEALER -------------------------->

// <------------------------ MINE-SWEEPER ------------------------->

// <------------------------- SPIN-THE-WHEEL ---------------------->



// <-------------- PAYPAL POP-UP CLOSE-UP ------------->
let amount = null

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
        });
    },
}).render("#paypal");

function openPopup(amountValue, img) {
    amount = amountValue;
    document.getElementById("pop-up-img").src = "static/images/" + img + ".png";
    document.getElementById("popup").style.display = "block";
    document.getElementById("amount").innerText ="Amount: $" + amountValue + ".00"
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

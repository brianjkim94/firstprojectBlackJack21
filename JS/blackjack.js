// Global Variables
let playerMoney = 10000;
let playerBet = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

// Deck of Cards setup
function setupDeck() {
    const suits = ['♥', '♦', '♠', '♣']; // Array of Card Suits
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; // Array of Card Values

    for (let i = 0; i < suits.length; i++) { // For loop through suits
        for (let j = 0; j < values.length; j++) { // For loop through values

            deck.push({ value: values[j], suit: suits[i] }); // New object representing each combination of value and suit are created and added to the deck array using the push method.
        }
    }
}

// Shuffle the deck of cards
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) { // For loop through deck array in reverse order to ensure more random shuffle
        const j = Math.floor(Math.random() * (i + 1)); // generate a random index
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards at indices i and j (equal probability of ending up at any position of the shuffled deck)
    }
}

// Place a bet
function placeBet() {
    let betAmount = +document.getElementById('bet-amount').value;
    if (betAmount > 0 && betAmount <= playerMoney) { // Check betAmount is valid
        playerBet = betAmount;
        playerMoney -= playerBet;
        document.getElementById('player-money').innerText = playerMoney; // Update displayed money value
        document.getElementById('bet-amount').value = ''; // Clear bet amount
        dealCards(); // Begin dealing cards
    } else {
        alert('Invalid bet amount or insufficient funds.'); // Error message
    }
}

// Deal cards to the player and dealer
function dealCards() {
    playerHand = [drawCard(), drawCard()]; // Two cards that are drawn for the player
    dealerHand = [drawCard(), drawCard()]; // Two cards that are drawn for the dealer

    displayPlayerHand();
    displayDealerHand();

    updateMessage('Your turn. Hit or Stay.'); // Message updated 
}

// Draw a card from the deck
function drawCard() {
    return deck.pop(); // To remove and return the last card from the deck
}

// Update the displayed player hand value
function updatePlayerHandValue() {
    let totalValue = 0; // Total value of the player's hand
    let hasAce = false; // To track if an Ace is present in the hand

    for (let i = 0; i < playerHand.length; i++) { // For loop through each card in player's hand to calculate the total value
        if (playerHand[i].value === 'A') {
            hasAce = true;
            totalValue += 11; // Add 11 to totalValue (Aces initially count as 11)
        } else if (['J', 'Q', 'K'].includes(playerHand[i].value)) {
            totalValue += 10;  // Add 10 for face cards (Jack, Queen, King)
        } else {
            totalValue += +playerHand[i].value; // Add the value for other cards
        }
    }

    if (hasAce && totalValue > 21) { // Check if an Ace is present and if its value as 11 would cause the player to bust
        totalValue -= 10; // If so, adjust totalValue by subtracting 10 (Aces will count as 1 instead of 11)
    }

    // Update the displayed value of the player's hand in HTML
    document.getElementById('player-hand-value').innerText = totalValue;
}


// Display the player's hand
function displayPlayerHand() {
    const playerHandElement = document.getElementById('player-hand');
    playerHandElement.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < playerHand.length; i++) { // For loop through player's hand
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Add classes based on suit
        if (playerHand[i].suit === '♥') {
            cardDiv.classList.add('card-heart');
        } else if (playerHand[i].suit === '♦') {
            cardDiv.classList.add('card-diamond');
        } else if (playerHand[i].suit === '♠') {
            cardDiv.classList.add('card-spade');
        } else if (playerHand[i].suit === '♣') {
            cardDiv.classList.add('card-club');
        }

        cardDiv.innerText = playerHand[i].value + playerHand[i].suit; // Combine both value and suit in one card 
        playerHandElement.appendChild(cardDiv); // Append card to player's hand
    }

    updatePlayerHandValue(); // Calls a function to update the displayed value of the player's hand
} // Ends the displayPlayerHand function


//In traditional blackjack, only one of the dealer's cards is initially visible to the player, 
//with the other card being hidden until later in the game. 
//Therefore, there's no need to display the total value of the dealer's hand until the appropriate moment in the game 
//whiich is when the player chooses to 'stay'

// Display the dealer's hand
function displayDealerHand() {
    const dealerHandElement = document.getElementById('dealer-hand');
    dealerHandElement.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < dealerHand.length; i++) { // For loop through dealer's hand
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Display all cards in the dealer's hand except the first one - index 0
        if (i !== 0) {
            if (dealerHand[i].suit === '♥') {
                cardDiv.classList.add('card-heart');
            } else if (dealerHand[i].suit === '♦') {
                cardDiv.classList.add('card-diamond');
            } else if (dealerHand[i].suit === '♠') {
                cardDiv.classList.add('card-spade');
            } else if (dealerHand[i].suit === '♣') {
                cardDiv.classList.add('card-club');
            }

            cardDiv.innerText = dealerHand[i].value + dealerHand[i].suit;
        } else {
            cardDiv.classList.add('card', 'hidden');
            cardDiv.innerText = '?'; // Set Dealer's hidden card text or faced down
        }

        dealerHandElement.appendChild(cardDiv); //each card div is appended to the dealerHandElement, which is the HTML element representing the dealer's hand
    }
}

// Hit action
function hit() {
    playerHand.push(drawCard()); // Add a card to the player's hand
    displayPlayerHand();

    let totalValue = +document.getElementById('player-hand-value').innerText; // Get the total value of the player's hand
    if (totalValue > 21) { // If player's hand value exceeds 21
        updateMessage('Busted! You lose $' + playerBet); // Display you lose message with lost bet amount
        playerBet = 0; // Reset the player's bet to zero
    }
}

// Stay action
function stay() {
    document.querySelector('.card.hidden').innerText = dealerHand[1].value + dealerHand[1].suit; // Show the dealer's hidden card
    let dealerTotalValue = getHandValue(dealerHand);

    // Add cards to dealer's hand until their total value is 17 or more
    while (dealerTotalValue < 17) {
        dealerHand.push(drawCard());
        dealerTotalValue = getHandValue(dealerHand);

        // Display the newly drawn card
        displayDealerHand();
    }

    // Update the message with the round outcome and reset the player's bet
    updateMessage(getRoundOutcome(dealerTotalValue));
    playerBet = 0;
}


// Get the value of a hand
function getHandValue(hand) {
    let totalValue = 0;
    let numAces = 0;

    // Calculate the total value of the hand
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value === 'A') {
            numAces++;
            totalValue += 11;
        } else if (['J', 'Q', 'K'].includes(hand[i].value)) {
            totalValue += 10;
        } else {
            totalValue += +hand[i].value;
        }
    }

    while (totalValue > 21 && numAces > 0) {
        totalValue -= 10;
        numAces--;
    }

    return totalValue;
}

// Outcome of the round
function getRoundOutcome(dealerTotalValue) { // Defines a function named getRoundOutcome that takes dealerTotalValue as an argument
    let playerTotalValue = +document.getElementById('player-hand-value').innerText; // Retrieves the total value of the player's hand from the HTML

    let roundOutcome = ''; // Initializes a variable to store the outcome message of the round
    // Determine the outcome of the round based on player and dealer hand values
    if (playerTotalValue > 21) {
        return 'Busted! You lose $' + playerBet;
    } else if (dealerTotalValue > 21 || playerTotalValue > dealerTotalValue) {
        playerMoney += playerBet * 2;
        return 'You win $' + playerBet;
    } else if (playerTotalValue === dealerTotalValue) {
        playerMoney += playerBet;
        return 'Push! Bet returned.';
    } else {
        return 'You lose $' + playerBet;
    }
}

// Update message displayed on the screen
function updateMessage(message) {
    document.getElementById('message').innerText = message;
}

// Start game
function startGame() {
    setupDeck(); // Initialize the deck
    shuffleDeck(); // Shuffle the deck
    document.getElementById('player-money').innerText = playerMoney; // Player's money update
}

// Start game
startGame();

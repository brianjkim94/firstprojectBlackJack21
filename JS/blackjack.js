// Global Variables
let playerMoney = 10000;
let playerBet = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

// Initialize the deck with cards
function initializeDeck() {
    const suits = ['♥', '♦', '♠', '♣']; // Array of Card Suits
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; // Array of Card Values

    for (let i = 0; i < suits.length; i++) { // For loop through suits
        for (let j = 0; j < values.length; j++) { // For loop through values
            let symbol;
            if (suits[i] === '♥' || suits[i] === '♦') {
                symbol = 'red'; // Assign color red for cards with heart and diamond symbols
            } else {
                symbol = 'black'; // Assign color black for cards with spade and club symbols
            }
            deck.push({ value: values[j], suit: suits[i] });
        }
    }
}

// Shuffle the deck of cards
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) { // For loop through deck array in reverse order to ensure more random shuffle
        const j = Math.floor(Math.random() * (i + 1)); // generate a random index
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards at indices i and j
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

// Display the player's hand
function displayPlayerHand() {
    const playerHandElement = document.getElementById('player-hand');
    playerHandElement.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < playerHand.length; i++) { // For loop through player's hand
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card'); 

                // Add class based on suit
                if (playerHand[i].suit === '♥') {
                    cardDiv.classList.add('card-heart');
                } else if (playerHand[i].suit === '♦') {
                    cardDiv.classList.add('card-diamond');
                } else if (playerHand[i].suit === '♠') {
                    cardDiv.classList.add('card-spade');
                } else if (playerHand[i].suit === '♣') {
                    cardDiv.classList.add('card-club');
                }
        
        cardDiv.innerText = playerHand[i].value + playerHand[i].suit; 
        playerHandElement.appendChild(cardDiv); // Append card to player's hand
    }

    updatePlayerHandValue(); // Update player's hand value
}

// Display the dealer's hand
function displayDealerHand() {
    const dealerHandElement = document.getElementById('dealer-hand');
    dealerHandElement.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < dealerHand.length; i++) { // For loop through dealer's hand
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Add class based on suit
        if (i !== 0 || dealerHand.length === 1) {
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

        dealerHandElement.appendChild(cardDiv);
    }
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



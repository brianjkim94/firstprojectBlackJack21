let playerMoney = 10000;
let playerBet = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

// Initialize the deck with cards
function initializeDeck() {
    const suits = ['♥', '♦', '♠', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
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

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Place a bet
function placeBet() {
    let betAmount = +document.getElementById('bet-amount').value;
    if (betAmount > 0 && betAmount <= playerMoney) {
        playerBet = betAmount;
        playerMoney -= playerBet;
        document.getElementById('player-money').innerText = playerMoney;
        document.getElementById('bet-amount').value = '';
        dealCards();
    } else {
        alert('Invalid bet amount or insufficient funds.');
    }
}

// Deal cards to the player and dealer
function dealCards() {
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    displayPlayerHand();
    displayDealerHand();

    updateMessage('Your turn. Hit or Stay.');
}

// Draw a card from the deck
function drawCard() {
    return deck.pop();
}

// Display the player's hand
function displayPlayerHand() {
    const playerHandElement = document.getElementById('player-hand');
    playerHandElement.innerHTML = '';

    for (let i = 0; i < playerHand.length; i++) {
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
        playerHandElement.appendChild(cardDiv);
    }

    updatePlayerHandValue();
}

// Display the dealer's hand
function displayDealerHand() {
    const dealerHandElement = document.getElementById('dealer-hand');
    dealerHandElement.innerHTML = '';

    for (let i = 0; i < dealerHand.length; i++) {
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
            cardDiv.innerText = '?';
        }

        dealerHandElement.appendChild(cardDiv);
    }
}


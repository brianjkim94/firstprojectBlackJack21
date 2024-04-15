# firstprojectBlackJack21

## <span style="font-size:larger;">**BLACKJACK GAME OF 21**</span>

SEI Project 1: Blackjack the game of 21

Casino at your fingertips. An online game of Blackjack!

To start playing visit 


## <span style="font-size:larger;">**Description of the game:**</span>

The game will be an interactive game of Blackjack where the player starts with $10,000 and play against the computer or dealer in this case. The player will be able to bet in any increment as he or she wishes and the game will continue until the player eventually runs out of money. The game will follow standard Blackjack rules.


## <span style="font-size:larger;">**HOW TO PLAY**</span>

You will be given $10,000 to play.

Step 1: Enter your bet amount, it can be any amount as long as the amount is less than or equal with the current "Money" you have. 

Step 2: Click on `Place Bet` to initiate the game with the dealer or computer.

Step 3: Your hand will be revealed and the game will calculate your hand for you. You will also be able to see the Dealer's hand, one faced up and one faced down. 

Step 4: Click on `Hit` to get closer to 21 or click on `Stay` if you think your hand is closest to 21 without going over or bust. 

Step 5: The dealer will reveal its faced down card and hit if the sum of its hand is less than or equal to 16 and stay if 17 or greater. 

Step 6: You will win your bet amount if your hand beats dealer's hand or lose your bet amount if your hand lost. 

Step 7: You can continue to play as long as you do not run out of money. Good luck!


## <span style="font-size:larger;">**To Install the game**</span>

Step 1: Fork and Clone the repository to your local machine.

Step 2: Open code . and open index.html in your browser.


## <span style="font-size:larger;">**HOW IT WORKS**</span>

"BLACKJACK GAME OF 21" runs on for-loops that set up functions to shuffle deck and draw cards for both dealer and player side. Also main functions for the player to place a bet, hit and stay.

1. Deck will be shuffled and ensured randomness of the cards, by declaring arrays of suits and values. 
Assign respective color to certain suits. The deck will be shuffled using reverse order to ensure randomenss.

```javascript
// Deck of Cards setup
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
            deck.push({ value: values[j], suit: suits[i] }); // New object representing each combination of value and suit are created and added to the deck array using the push method.
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
```

2. Once the player bets his or her bet amount to play, the cards will be revealed. To display player's hand, iterate through each card in the player's hand. After iteration through player's hand is finished the game will display the card with set content of the card to its suit and value. Classes based on suits were added for styling in CSS. The same logic will apply for Dealer's hand. 

```javascript
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
        
        cardDiv.innerText = playerHand[i].value + playerHand[i].suit; // Combine value and suit as one card
        playerHandElement.appendChild(cardDiv); // Append card to player's hand
    }

    updatePlayerHandValue(); // Update player's hand value
}
```

3. After the player bets amount and hand is revealed, the player has two options, `hit` or `stay`. The game will follow standard Blackjack rules. The player will strive to reach as close to 21 by drawing an additional card or even reach exactly to 21. If the summation of the hand value is over 21, the player will go bust or automatically lose bet amount to the dealer. Function `hit` will push or add a card to the player's hand. The player will be able to continue to hit and if player's hand exceeds 21, "Busted! You lose $ `playerBet`" message. Function `stay` will change turns from player to dealer. The dealer's hand will draw additional card until total value is 17 or more. The new additional card or cards will be revealed. When dealer's hand is revealed the `getRoundOutcome` function or the message will be updated by the outcome of the game. 

```javascript
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
```

4. The outcome of the game will be shown in the message. Function `getRoundOutcome` purpose is to send out the appropriate message of the game result accordingly. The function is links dealerTotalValue as an argument and sends out the total value of the player's hand. The main logic is if the player's hand value is greater than 21 then the function will return "Busted! You lose $ `playerBet`" message, if  the dealer's hand value is greater than 21 or if the player's hand value is greater than dealer's hand value the function will return "You win $ `playerBet`" message, along with updating the player's money as well. If player's hand value equals or ties with dealer's hand value the function will return "Push! Bet returned" and lastly all other outcomes the function will send out "You lose $ `playerBet`" message. 

```javascript
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
```

INITIAL WIREFRAMES:
![Screenshot 2024-04-10 at 11 45 58 PM](https://github.com/brianjkim94/firstprojectBlackJack21/assets/159219608/b09c83b9-054e-4e65-88c7-cb9040693ab8)

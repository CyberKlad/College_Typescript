"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
class Game {
    constructor() {
        this.numAces = 0;
        this.houseAces = 0;
        //this section adds up the starting Aces
        playerOne.hand[0] = newDeck.drawCard();
        if (playerOne.hand[0][0] == 11) {
            this.numAces += 1;
        }
        playerHouse.hand[0] = newDeck.drawCard();
        if (playerHouse.hand[1][0] == 11) {
            this.numAces += 1;
        }
        playerOne.hand[1] = newDeck.drawCard();
        if (playerOne.hand[1][0] == 11) {
            this.numAces += 1;
        }
        playerHouse.hand[1] = newDeck.drawCard();
        if (playerHouse.hand[1][0] == 11) {
            this.numAces += 1;
        }
        //this section does the intial drawing of the two cards in the correct order and hides the second card given to the house
        this.houseHidden = "House's Hand: " + playerHouse.hand[0][1] + "," + playerHouse.hand[0][2] + " | hidden,hidden";
        //this saves an unhidden version for later printing
        this.houseShown = "House's Hand: " + playerHouse.hand[0][1] + "," + playerHouse.hand[0][2]
            + " | " + playerHouse.hand[1][1] + "," + playerHouse.hand[1][2];
        this.playerShown = "PlayerOne's Hand: " + playerOne.hand[0][1] + "," + playerOne.hand[0][2]
            + " | " + playerOne.hand[1][1] + "," + playerOne.hand[1][2];
        console.log(this.houseHidden);
        console.log(this.playerShown);
        this.totalPlayer = playerOne.hand[0][0] + playerOne.hand[1][0];
        this.totalHouse = playerHouse.hand[0][0] + playerHouse.hand[1][0];
        console.log("PlayerOne's Total: " + this.totalPlayer);
    }
    //this method is called once all of the starting setup is done and the game is actually happening
    startGame() {
        let move = "t";
        let handSpot = 2;
        //this makes sure the program doesnt move on without a valid input
        while (move != "s" && move != "h") {
            move = readline_sync_1.default.question("choose your move: (h)it, (s)tay. ");
        }
        //while the player chooses to hit a card will added totaled and printed to console
        while (move == "h") {
            console.log("PlayerOne Hit");
            let cardOne = newDeck.drawCard();
            if (cardOne[0] == 11) {
                this.numAces += 1;
            }
            playerOne.hand[handSpot] = cardOne;
            console.log(this.playerShown += " | " + cardOne[1] + "," + cardOne[2]);
            this.totalPlayer += cardOne[0];
            handSpot += 1;
            //this checks how many aces the hand has and changes them to 1's as needed
            if (this.totalPlayer > 21) {
                if (this.numAces > 0) {
                    this.totalPlayer -= 10;
                    this.numAces -= 1;
                }
            }
            //this checks to see if the player has busted
            console.log("PlayerOne's Total: " + this.totalPlayer);
            if (this.totalPlayer > 21) {
                console.log("PlayerOne has busted, you lose.");
                return;
            }
            move = "t";
            if (this.totalPlayer == 21) {
                move = "s";
            }
            while (move != "s" && move != "h") {
                move = readline_sync_1.default.question("choose your move: (h)it, (s)tay. ");
            }
        }
        console.log("PlayerOne Stay");
        console.log("House hand reveal");
        console.log(this.houseShown);
        let test = 0;
        //this section does the same as the player hit section without asking for a hit till house is at, at least 17
        while (this.totalHouse < 17) {
            test += 1;
            console.log("PlayerHouse Hit");
            let cardOne = newDeck.drawCard();
            if (cardOne[0] == 11) {
                this.houseAces += 1;
            }
            playerHouse.hand[handSpot] = cardOne;
            console.log(this.houseShown += " | " + cardOne[1] + "," + cardOne[2]);
            this.totalHouse += cardOne[0];
            handSpot += 1;
            if (this.totalHouse > 21) {
                if (this.houseAces > 0) {
                    this.totalHouse -= 10;
                    this.houseAces -= 1;
                }
            }
            console.log("PlayerHouse's Total: " + this.totalHouse);
            if (this.totalHouse > 21) {
                console.log("PlayerHouse has busted, you win!");
                return;
            }
        }
        //this section does the wrap up if both house and player have stayed
        if (test == 0)
            console.log("PlayerHouse's Total: " + this.totalHouse);
        console.log("House Stay");
        let whoWon = playerHouse.compareHandValue(this.totalPlayer, this.totalHouse);
        if (whoWon == 0) {
            console.log("PlayerOne you have won!");
        }
        if (whoWon == 1) {
            console.log("There has been a push, no winners.");
        }
        if (whoWon == 2) {
            console.log("The House has won!");
        }
    }
}
class Deck {
    constructor() {
        //initialize the deck with exactly whats in it since this is unlikely to ever change
        this.cursor = 51;
        this.drawdeck = [[2, "2", "Hearts"], [3, "3", "Hearts"], [4, "4", "Hearts"], [5, "5", "Hearts"],
            [6, "6", "Hearts"], [7, "7", "Hearts"], [8, "8", "Hearts"], [9, "9", "Hearts"], [10, "10", "Hearts"],
            [Values.Jack, "Jack", "Hearts"], [Values.Queen, "Queen", "Hearts"], [Values.King, "King", "Hearts"],
            [Values.Ace, "Ace", "Hearts"], [2, "2", "Diamonds"], [3, "3", "Diamonds"], [4, "4", "Diamonds"], [5, "5", "Diamonds"],
            [6, "6", "Diamonds"], [7, "7", "Diamonds"], [8, "8", "Diamonds"], [9, "9", "Diamonds"], [10, "10", "Diamonds"],
            [Values.Jack, "Jack", "Diamonds"], [Values.Queen, "Queen", "Diamonds"], [Values.King, "King", "Diamonds"], [Values.Ace, "Ace", "Diamonds"],
            [2, "2", "Clubs"], [3, "3", "Clubs"], [4, "4", "Clubs"], [5, "5", "Clubs"],
            [6, "6", "Clubs"], [7, "7", "Clubs"], [8, "8", "Clubs"], [9, "9", "Clubs"], [10, "10", "Clubs"],
            [Values.Jack, "Jack", "Clubs"], [Values.Queen, "Queen", "Clubs"], [Values.King, "King", "Clubs"], [Values.Ace, "Ace", "Clubs"],
            [2, "2", "Spades"], [3, "3", "Spades"], [4, "4", "Spades"], [5, "5", "Spades"],
            [6, "6", "Spades"], [7, "7", "Spades"], [8, "8", "Spades"], [9, "9", "Spades"], [10, "10", "Spades"],
            [Values.Jack, "Jack", "Spades"], [Values.Queen, "Queen", "Spades"], [Values.King, "King", "Spades"], [Values.Ace, "Ace", "Spades"]];
    }
    shuffleDeck(unshuffled) {
        //choose a random postion to trade places with and do this for each spot
        for (let i = 0; i < 52; i++) {
            let rndNum = Math.floor(Math.random() * 51);
            let rndOne = unshuffled[i];
            let rndTwo = unshuffled[rndNum];
            unshuffled[rndNum] = rndOne;
            unshuffled[i] = rndTwo;
            this.drawdeck = unshuffled;
        }
    }
    //method for taking a card off the "top" of the deck
    drawCard() {
        return this.drawdeck[this.cursor--];
    }
}
class Cards {
    constructor() {
        this.hand = [[0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""], [0, "", ""]];
    }
    //Cards method holding the ability to compare the hand total
    compareHandValue(Play1, HouseNum) {
        if (Play1 > HouseNum) {
            return 0;
        }
        if (Play1 == HouseNum) {
            return 1;
        }
        else
            return 2;
    }
}
//using enum so that I can set the value of names
var Values;
(function (Values) {
    Values[Values["Ace"] = 11] = "Ace";
    Values[Values["Jack"] = 10] = "Jack";
    Values[Values["Queen"] = 10] = "Queen";
    Values[Values["King"] = 10] = "King";
})(Values || (Values = {}));
//start the game off with a new deck shuffle and start
let newDeck = new Deck();
newDeck.shuffleDeck(newDeck.drawdeck);
let playerHouse = new Cards();
let playerOne = new Cards();
let newGame = new Game();
newGame.startGame();

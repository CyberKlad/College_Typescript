//import readline from 'readline-sync';
var Game = /** @class */ (function () {
    function Game() {
        var deck = new Deck();
        deck.shuffleDeck(deck.drawdeck);
        console.log(deck.drawdeck);
        //this.playerHand
    }
    Game.prototype.startGame = function () {
        //const move = readline.question("choose your move: (h)it, (s)tay.");
        //console.log(move);
    };
    return Game;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        this.drawdeck = new Array;
        var cardNum = 2;
        for (var i = 0; i <= 52; i++) {
            if (i < 36) {
                this.drawdeck[i] = cardNum++;
                if (cardNum == 10) {
                    cardNum = 2;
                }
            }
            else {
                this.drawdeck[i++] = "Ace";
                this.drawdeck[i++] = "Jack";
                this.drawdeck[i++] = "Queen";
                this.drawdeck[i] = "King";
            }
        }
        console.log(this.drawdeck);
    }
    Deck.prototype.shuffleDeck = function (unshuffled) {
        for (var i = 0; i <= 52; i++) {
            var rndNum = Math.floor(Math.random() * 51);
            var rndOne = unshuffled[i];
            var rndTwo = unshuffled[rndNum];
            unshuffled[rndNum] = rndOne;
            unshuffled[i] = rndTwo;
        }
    };
    Deck.prototype.drawCard = function () {
        //this.
        return 0;
    };
    return Deck;
}());
var Cards = /** @class */ (function () {
    function Cards(playername) {
        this.playername = playername;
        this.hand = [0, 0];
    }
    return Cards;
}());
var Suits;
(function (Suits) {
    Suits[Suits["Hearts"] = 0] = "Hearts";
    Suits[Suits["Diamonds"] = 1] = "Diamonds";
    Suits[Suits["Clubs"] = 2] = "Clubs";
    Suits[Suits["Spades"] = 3] = "Spades";
})(Suits || (Suits = {}));
var Values;
(function (Values) {
    Values[Values["Ace"] = 11] = "Ace";
    Values[Values["Jack"] = 10] = "Jack";
    Values[Values["Queen"] = 10] = "Queen";
    Values[Values["King"] = 10] = "King";
})(Values || (Values = {}));
var newGame = new Game();

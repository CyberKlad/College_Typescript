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
        this.drawdeck = [[2, Suits.Hearts], [3, Suits.Hearts], [4, Suits.Hearts], [5, Suits.Hearts],
            [6, Suits.Hearts], [7, Suits.Hearts], [8, Suits.Hearts], [9, Suits.Hearts], [10, Suits.Hearts],
            [Values.Jack, Suits.Hearts], [Values.Queen, Suits.Hearts], [Values.King, Suits.Hearts], [Values.Ace, Suits.Hearts],
            [2, Suits.Diamonds], [3, Suits.Diamonds], [4, Suits.Diamonds], [5, Suits.Diamonds],
            [6, Suits.Diamonds], [7, Suits.Diamonds], [8, Suits.Diamonds], [9, Suits.Diamonds], [10, Suits.Diamonds],
            [Values.Jack, Suits.Diamonds], [Values.Queen, Suits.Diamonds], [Values.King, Suits.Diamonds], [Values.Ace, Suits.Diamonds],
            [2, Suits.Clubs], [3, Suits.Clubs], [4, Suits.Clubs], [5, Suits.Clubs],
            [6, Suits.Clubs], [7, Suits.Clubs], [8, Suits.Clubs], [9, Suits.Clubs], [10, Suits.Clubs],
            [Values.Jack, Suits.Clubs], [Values.Queen, Suits.Clubs], [Values.King, Suits.Clubs], [Values.Ace, Suits.Clubs],
            [2, Suits.Spades], [3, Suits.Spades], [4, Suits.Spades], [5, Suits.Spades],
            [6, Suits.Spades], [7, Suits.Spades], [8, Suits.Spades], [9, Suits.Spades], [10, Suits.Spades],
            [Values.Jack, Suits.Spades], [Values.Queen, Suits.Spades], [Values.King, Suits.Spades], [Values.Ace, Suits.Spades]];
        console.log(this.drawdeck);
    }
    Deck.prototype.shuffleDeck = function (unshuffled) {
        for (var i = 0; i < 52; i++) {
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

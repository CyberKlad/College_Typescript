"use strict";
// this is an abstract class, meaning, we cannot write "new Game(...)".
// this is because the class is missing the "simluateGame" method. 
// that method is declared "abstract", meaning "our child classes will have to 
// fill in what it does". 
/** Represents a casino game. */
class Game {
    get name() { return this._name; }
    // to construct a game, you have to give it a name
    /** Construct a casino game with the given name, belonging to the
     * given casino.
     */
    constructor(name, casino) {
        this._name = name;
        this._book = new Map();
        this._casino = casino;
    }
    // the child class will figure out which gamblers won and return them.
    // this method is abstract: it has no definition. It's up to the child
    // classes to decide what it does. 
    /**
     * This method tells us how much money a particular person will win.
     * By default, we just return 2x the bet. However, in some games,
     * how much we return depends on how the gambler bet. Note that none
     * of the games actually double the player's money, so you might want
     * to pick a different value here.
     * @returns How much to multiply the winnings by
     */
    profitMultiplier(_gambler) { return 2; }
    // this method is *not* abstract, but it calls an abstract method.
    // yes: non-abstract methods can call abstract methods in the same class.
    /** Play the game and give the winners their moeney.
     * Prints all the winners. Removes all elements of this.book.
     * Updates the casino's profits and losses.
     */
    playGame() {
        console.log("playing", this.name, "with book:");
        for (let [player, bet] of this._book) {
            console.log("  ", player.name, ": $", bet);
        }
        const winners = this.simulateGame();
        console.log("game finished!");
        // For each winner, calculate how much money they won and give it to
        // them. Deduct that much money from the casino.
        for (let winner of winners) {
            const bet = this._book.get(winner);
            const winnings = bet * this.profitMultiplier(winner);
            winner.addMoney(winnings);
            this._casino.addProfit(-winnings);
            console.log(" ", winner.name, "is a winner! they won: ", winnings);
            // remove winners from the book so that only losers will remain.
            this._book.delete(winner);
        }
        // For each loser, take their money and give it to the casino.
        for (let [loser, bet] of this._book) {
            console.log(" ", loser.name, "has lost!");
            loser.addMoney(-bet); // subtract money from losers;
            casino.addProfit(bet); // give it to the casino
            // also remove losers. the book will be empty after calling 
            // playGame
            // Note: it might be nice to make a functional version of 
            // this where the book is an argument to the method
            // IRL I think this design would be
            // nicer, but it will be more obvious why when you take 
            // programming language design and learn about functional 
            // programming.
            this._book.delete(loser);
        }
    }
    // this function is *not* abstract. We are filling in it's code right now.
    // the child classes will not override this method. It will do the same
    // thing on each child class, so they do not provide their own version of.
    /**
     * Add a player to the game.
     * @param g The gambler to add to the game.
     * @param bet The amount they are betting.
     */
    addPlayer(g, bet) {
        this._book.set(g, bet);
        // you might wonder why we need a method for this? aren't we just
        // doing one line of code? yes, and many programmers will choose to 
        // avoid this function. one reason to have the function, however, is  
        // that it makes it easier to do more stuff when we add a player 
        // (i.e., logging it to a file somewhere). However, this flexibility
        // comes at the cost of a little bit of complexity. 
    }
    /** Returns a list of people playing the game. */
    getPlayers() {
        // this.book.keys() returns an iterator, which is an object that 
        // allows us to scan over a collection using a for loop. We use
        // Array.from(...) to scan over the iterator and add its elements
        // into an array.
        return Array.from(this._book.keys());
    }
}
/** This is a game where the players all place their bets at the same
 * time. The dealer will flip a coin. If the coin is heads, the players
 * win and their money is multiplied by 1.9. Otherwise, the players lose their bets. */
class TailsIWin extends Game {
    constructor(casino) {
        super("Tails I Win", casino);
        this._winnersT = [];
    }
    simulateGame() {
        this._winnersT = [];
        let playArray = this.getPlayers();
        let result = randomInt(2);
        if (result == 0) {
            return this.getPlayers();
        }
        else {
            return [];
        }
    }
    profitMultiplier(_gambler) { return 1.9; }
}
/**
 * Helper function to generate uniform random numbers between [0, upper).
 * So randomInt( 5 ) generates a number between 0 and 4.
 * @param upper The exclusive upper bound (i.e., the number generated will be
 * at most one less than this number)
 * @returns A randum number in the range [0, upper)
 */
function randomInt(upper) {
    // Math.random() goes between 0 and 1, but never hits exactly 1
    return Math.floor(Math.random() * upper);
}
/**
 * This is a game where each player randomly picks a number from 0 to 4
 * (inclusive). The dealer also picks a number from 0 to 4. If a player
 * picks the same number as the dealer, they get back 4.5x their bet.
 * (total profit of 3.5x). Otherwise, they lose their money.
 */
class GuessTheNumber extends Game {
    constructor(casino) {
        super("Guess The Number", casino);
        this._winnersG = [];
    }
    simulateGame() {
        this._winnersG = [];
        let playArray = this.getPlayers();
        let house = randomInt(5);
        for (let player of playArray) {
            if (randomInt(5) == house) {
                this._winnersG.push(player);
            }
        }
        return this._winnersG;
    }
    profitMultiplier(_gambler) { return 4.5; }
}
/**
 * Simulated guinea-pig racing. Players choose a pig from 0 to 3.
 * Pig #0 has a 50% chance of winning, and pays out 1.9 if they win.
 * Pig #1 has a 25% chance of winning, and pays out 3.8 if they win.
 * Pig #2 has a 12.5% chance of winning, and pays out 7.6 if they win.
 * Pig #3 has a 12.5% chance of winning, and pays out 7.6 if they win.
 *
 * There are no complicated horse-racing-style bets (e.g., place, show, etc.),
 * each player just picks a pig.
 */
class OffTrackGuineaPigRacing extends Game {
    constructor(casino) {
        super("Off Track Guinea Pig Racing", casino);
        this.multPig = 1.9;
        this._winnersP = [];
    }
    simulateGame() {
        this._winnersP = [];
        let playArray = this.getPlayers();
        let finish = randomInt(101);
        if (finish <= 50)
            finish = 0;
        if (finish <= 75 && finish > 50) {
            finish = 1;
            this.multPig = 3.8;
        }
        if (finish <= 87.5 && finish > 75) {
            finish = 2;
            this.multPig = 7.6;
        }
        if (finish <= 100 && finish > 87.5) {
            finish = 3;
            this.multPig = 7.6;
        }
        for (let player of playArray) {
            if (randomInt(4) == finish) {
                this._winnersP.push(player);
            }
        }
        return this._winnersP;
    }
    profitMultiplier(_gambler) { return this.multPig; }
}
class Gambler {
    constructor(name, startingFunds, targetFunds) {
        this._name = name;
        this._money = startingFunds;
        this._target = targetFunds;
    }
    // These are properties. 
    // When we create a gambler: const gambler = new Gambler(...);
    // we can write this: console.log( gambler.name )
    // get name(): ... makes it so that when we access gambler.name, 
    // the function { return this._name } gets called. This allows us
    // to read the name inside the gambler. 
    // Getters are public by default, so this is a way of reading a public 
    // variable.
    // However, get can only get a value. It's not able to set values. So
    // name is a read-only property, which is what we want. 
    get name() { return this._name; }
    get money() { return this._money; }
    get target() { return this._target; }
    /**
     * Add or deduct a given amount of money to the gambler's bankroll.
     * @param amount The amount of money to add. Negative means to remove.
     */
    addMoney(amount) {
        this._money += amount;
        if (this instanceof StreakGambler) {
            this.changeBet();
        }
    }
    /**
     * @returns Whether the gambler has hit their target.
     */
    hitTarget() {
        return (this.target <= this.money);
    }
    /**
     * @returns Whether the gambler has run out of money.
     */
    bankrupt() {
        return (this.money <= 0);
    }
    /**
     * @returns Whether the gambler is finished (i.e., if they've run out
     * of money or have reached their target.)
     */
    isFinished() {
        return (this.bankrupt() || this.hitTarget());
    }
}
/**
 * The stable gambler always bets the same amount as long as they have enough
 * money. If they don't, they bet what they have. Their goal is to double
 * their starting funds.
 */
class StableGambler extends Gambler {
    constructor(name, startingFunds, stableBet) {
        super(name, startingFunds, startingFunds * 2);
        this._bet = stableBet;
    }
    getBetSize() {
        if (this._bet >= this.money)
            return this.money;
        return this._bet;
    }
}
/**
 * The high risk gambler always bets half of their current money. If they have
 * less than yoloAmount, they bet the remainder of their money. Their goal is
 * to make 5 times their starting amount of money.
 */
class HighRiskGambler extends Gambler {
    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they
     * bet everything they have remaining.
     */
    constructor(name, startingFunds, yoloAmnt) {
        super(name, startingFunds, startingFunds * 5);
        this._yoloAmount = yoloAmnt;
    }
    getBetSize() {
        if (this.money <= this._yoloAmount)
            return this.money;
        return ((this.money) / 2);
    }
}
/**
 * The streak better always increases their bet whenever they win by a
 * given multiple, and reduces their bet by a given multiple when they lose.
 * For example, if the win multiple is 2.0 and lose multiple is 0.5, the
 * streak better will double their money when they win and halve it when they
 * lose. You can also do the reverse, making them more conservative when
 * they win. They start at a given initial bet.
 *
 * How do we detect whether we won or lost? Override the addMoney method.
 */
class StreakGambler extends Gambler {
    constructor(name, startingFunds, sBet, minBet, winMult, lossMult, sTarget) {
        super(name, startingFunds, sTarget);
        this.sBet = sBet;
        this.minBet = minBet;
        this.winMult = winMult;
        this.lossMult = lossMult;
    }
    getBetSize() {
        let tempBet = this.sBet;
        this.sBet = (this.sBet * this.lossMult);
        if (this.money <= this.minBet || tempBet >= this.money)
            return this.money;
        return tempBet;
    }
    changeBet() {
        this.sBet = (this.sBet * (this.winMult / this.lossMult));
    }
}
class Casino {
    constructor(maxRounds) {
        this._games = [
            new TailsIWin(this),
            new GuessTheNumber(this),
            new OffTrackGuineaPigRacing(this),
        ];
        this._profits = 0;
        this._gamblers = new Set([
            // Argument 2 is the amount they start with, 
            // Arg 3 is how much they bet
            new StableGambler("Alice", 100, 15),
            // Argument 2 is the amount they start with
            // Arg 3 is the yoloammount
            // the target is to make 5 times their starting balance, but 
            // you don't see that here because it's calculated inside the 
            // constructor instead of being passed as an argument.
            new HighRiskGambler("Bob", 50, 10),
            // Arg 4 is the minimum amount they will bet 
            // Arg 5 is how much they multiply their bet by when they win
            // Arg 6 is how much they multiply their bet by when they lose
            // Arg 7 is their target. How much they want to make. 
            new StreakGambler("Camille", 200, 10, 10, 2, 0.5, 500),
        ]);
        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }
    /**
     * Add profit to the casino for the day.
     * @param amount The amount of profit to add. If negative, it counts as a
     * loss.
     */
    addProfit(amount) {
        this._profits += amount;
    }
    /** For each game: have each gambler who is still present play.
     * Starts by printing how much money each gambler has.
     * If a gambler runs out of money or hits their target, they leave.
     * Then, plays the game with all players.
     */
    simulateOneRound() {
        const startingProfit = this._profits;
        console.log("-----------------------");
        console.log("beginning round", this._currentRound);
        for (let game of this._games) {
            this.determineWhoIsStillPlaying();
            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for (let player of this._gamblers) {
                game.addPlayer(player, player.getBetSize());
            }
            const gameStartingProfit = this._profits;
            game.playGame();
            console.log("casino made", casino._profits - gameStartingProfit, "on this game.");
            console.log();
        }
        console.log("round complete. casino made: ", this._profits - startingProfit);
        console.log("total profit:", this._profits);
        console.log("-----------------------");
    }
    /**
     * Run the simulation until either the maximum number of games is reached,
     * or no one is left in the casino.
     */
    simulate() {
        while (this._currentRound < this._maxRounds && this._gamblers.size > 0) {
            this.simulateOneRound();
            console.log();
            this._currentRound++;
        }
        console.log("simulation complete");
    }
    /**
     * Update and list the people who are still playing.
     */
    determineWhoIsStillPlaying() {
        const gamblersWhoLeft = [];
        // update and list of who is still playing
        for (let gambler of this._gamblers.keys()) {
            console.log(gambler.name, ": ", gambler.money);
            if (gambler.isFinished()) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push(gambler);
            }
            // now, print why the person left if they did so
            if (gambler.hitTarget()) {
                console.log(gambler.name, "has hit their target! They leave the casino...");
            }
            else if (gambler.bankrupt()) {
                console.log(gambler.name, "has gone bankrupt! They leave the casino...");
            }
        }
        // remove the gamblers who left from the set
        for (let leaver of gamblersWhoLeft) {
            this._gamblers.delete(leaver);
        }
    }
}
const MAX_N_ROUNDS = 5;
// main:
const casino = new Casino(MAX_N_ROUNDS);
casino.simulate();

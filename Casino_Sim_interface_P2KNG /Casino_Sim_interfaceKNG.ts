//Korbin Gillette edit to provided skeleton code then refactored with no inheritance

// actions previously held in extendable classes pulled out as helper functions

/**
 * Helper function to generate uniform random numbers between [0, upper).
 * So randomInt( 5 ) generates a number between 0 and 4.
 * @param upper The exclusive upper bound (i.e., the number generated will be
 * at most one less than this number)
 * @returns A randum number in the range [0, upper)
 */
function randomInt( upper: number ) {
    // Math.random() goes between 0 and 1, but never hits exactly 1
    return Math.floor( Math.random() * upper );
}

/**
 * Add a player to the game.
 * @param g The gambler to add to the game.
 * @param bet The amount they are betting.
 */
function addPlayer( game: Game, g: Gambler, bet: number ): void {
    game._book.set( g, bet );
}

/** Returns a list of people playing the game. */
function getPlayers(game: Game): Gambler[] {
    return Array.from(game._book.keys());
}

/** Play the game and give the winners their moeney.
 * Prints all the winners. Removes all elements of this.book. 
 * Updates the casino's profits and losses.
 */
function playGame(game: Game): void {
    console.log( "playing", game.name, "with book:" );
    for( let [player, bet] of game._book ) {
        console.log( "  ", player.name, ": $", bet );
    }

    const winners = game.simulateGame();

    console.log( "game finished!" );

    // For each winner, calculate how much money they won and give it to
    // them. Deduct that much money from the casino.
    for( let winner of winners ) {
        const bet = game._book.get( winner )!;
        const winnings = bet * game.profitMultiplier( winner );
        addMoney(winner, winnings );
        game._casino.addProfit( -winnings );
        console.log( 
            " ", winner.name, "is a winner! they won: ", winnings );

        // remove winners from the book so that only losers will remain.
        game._book.delete( winner );
    }

    // For each loser, take their money and give it to the casino.
    for( let [loser, bet] of game._book ) {
        console.log( " ", loser.name, "has lost!" );
        addMoney(loser, -bet ); // subtract money from losers;
        casino.addProfit( bet ); // give it to the casino

        // also remove losers. the book will be empty after calling 
        // playGame
        // Note: it might be nice to make a functional version of 
        // this where the book is an argument to the method
        // IRL I think this design would be
        // nicer, but it will be more obvious why when you take 
        // programming language design and learn about functional 
        // programming.
        game._book.delete( loser );
    }
}
interface Game {
    _name: string;
    _book: Map< Gambler, number >; 
    _casino: Casino;
    get name(): string;
    simulateGame(): Gambler[];
    profitMultiplier( _gambler: Gambler ): number;
}


/** This is a game where the players all place their bets at the same 
 * time. The dealer will flip a coin. If the coin is heads, the players 
 * win and their money is multiplied by 1.9. Otherwise, the players lose their bets. */ 
class TailsIWin implements Game {
    _name: string = "Tails I Win";
    _book: Map< Gambler, number > = new Map(); 
    _casino: Casino;
    private _winnersT: Gambler[] = [];
    constructor(casino: Casino){
        this._casino = casino;
    }
    simulateGame(): Gambler[] {
        this._winnersT = [];
        let playArray = getPlayers(this);
        let result = randomInt(2);
        if (result == 0){
            return getPlayers(this);
        }
        else { return []}
    }
    profitMultiplier( _gambler: Gambler ): number { return 1.9; }
    
    public get name(): string { return this._name } 
}

/** which of the 3 cups has the marbel */
class WhichCupHasTheMarble implements Game {
    _name: string = "Which Cup Has The Marble";
    _book: Map< Gambler, number > = new Map(); 
    _casino: Casino;
    private _winnersW: Gambler[] = [];
    constructor(casino: Casino){
        this._casino = casino;
    }
    simulateGame(): Gambler[] {
        this._winnersW = [];
        let playArray = getPlayers(this);
        let result = randomInt(3);
        for( let player of playArray ){
            if (randomInt(3) == result){
                this._winnersW.push(player);
            }
        }
        return this._winnersW;
    }
    profitMultiplier( _gambler: Gambler ): number { return 3; }
    
    public get name(): string { return this._name }
}
 
/**
 * This is a game where each player randomly picks a number from 0 to 4
 * (inclusive). The dealer also picks a number from 0 to 4. If a player
 * picks the same number as the dealer, they get back 4.5x their bet.
 * (total profit of 3.5x). Otherwise, they lose their money.
 */
class GuessTheNumber implements Game {
    _name: string = "Guess The Number";
    _book: Map< Gambler, number > = new Map(); 
    _casino: Casino;
    private _winnersG: Gambler[] = [];
    constructor(casino: Casino){
        this._casino = casino;
    }
    simulateGame(): Gambler[] {
        this._winnersG = [];
        let playArray = getPlayers(this);
        let house = randomInt(5);
        for( let player of playArray ){
            if (randomInt(5) == house){
                this._winnersG.push(player);
            }
        }
        return this._winnersG;
    }
    profitMultiplier( _gambler: Gambler ): number { return 4.5; }

    public get name(): string { return this._name }
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
class OffTrackGuineaPigRacing implements Game {
    _name: string = "Off Track Guinea Pig Racing";
    _book: Map< Gambler, number > = new Map(); 
    _casino: Casino;
    private multPig: number = 1.9;
    private _winnersP: Gambler[] = [];
    constructor(casino: Casino){
        this._casino = casino;
    }
    simulateGame(): Gambler[] {
        this._winnersP = [];
        let playArray = getPlayers(this);
        let finish = randomInt(101);
        if (finish <= 50) finish = 0;
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
        for( let player of playArray ){
            if (randomInt(4) == finish){
                this._winnersP.push(player);
            }
        }
        return this._winnersP;
    }
    profitMultiplier( _gambler: Gambler ): number { return this.multPig; }

    public get name(): string { return this._name }
}
    
interface Gambler {
    _name: string;
    _money: number;
    _target: number; 
    getBetSize(): number;
    changeBet(): void; 
    get name(): string;
    get money(): number;
    get target(): number;
}

//functions previously in gambler as extendable methods

/**
 * Add or deduct a given amount of money to the gambler's bankroll. 
 * @param amount The amount of money to add. Negative means to remove.
 */
function addMoney(gambler: Gambler, amount: number ): void {
        gambler._money += amount;
        if (amount > 0) {
            gambler.changeBet();
        }
}

/**
 * @returns Whether the gambler has hit their target.
 */
function hitTarget(gambler: Gambler): boolean { 
        return (gambler.target <= gambler.money);
}


/**
 * @returns Whether the gambler has run out of money.
 */
function bankrupt(gambler: Gambler): boolean {
        return (gambler.money <= 0);
}
    
/**
 * @returns Whether the gambler is finished (i.e., if they've run out
 * of money or have reached their target.)
 */
function isFinished(gambler: Gambler): boolean { 
        return (bankrupt(gambler) || hitTarget(gambler));
}


/**
 * The stable gambler always bets the same amount as long as they have enough
 * money. If they don't, they bet what they have. Their goal is to double 
 * their starting funds.
 */
class StableGambler implements Gambler {
    _name: string;
    _money: number;
    _target: number; 
    private _bet: number; 

    public constructor( 
        name: string, 
        startingFunds: number, 
        stableBet: number
    ) {
        this._name = name;
        this._money = startingFunds;
        this._target = startingFunds*2;
        this._bet = stableBet;
    }

    public getBetSize(): number {
        if (this._bet >= this.money) return this.money;
        return this._bet;
    }
    changeBet(): void {
        //doesnt change bet
        return;
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }
}

/**
 * The high risk gambler always bets half of their current money. If they have
 * less than yoloAmount, they bet the remainder of their money. Their goal is
 * to make 5 times their starting amount of money. 
 */
class HighRiskGambler implements Gambler {
    _name: string;
    _money: number;
    _target: number; 
    /** if the gambler has <= this amount of money, they bet it all. */
    private _yoloAmount: number;

    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they
     * bet everything they have remaining.
     */
    public constructor(
        name: string,
        startingFunds: number, 
        yoloAmnt: number 
    ) {
        this._name = name;
        this._money = startingFunds;
        this._target = startingFunds*5;
        this._yoloAmount = yoloAmnt;
    }
    public getBetSize(): number {
        if (this.money <= this._yoloAmount) return this.money;
        return ((this.money)/2);
    }
    changeBet(): void {
        //this isnt suppose to do anything
        return;
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }
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

class StreakGambler implements Gambler{
    _name: string;
    _money: number;
    _target: number; 
    private sBet: number;
    private minBet: number;
    private winMult: number;
    private lossMult: number; 
    public constructor(
        name: string,
        startingFunds: number, 
        sBet: number,
        minBet: number,
        winMult: number,
        lossMult: number,
        sTarget: number 
    ) {
        this._name = name;
        this._money = startingFunds;
        this._target = sTarget;
        this.sBet = sBet;
        this.minBet = minBet;
        this.winMult = winMult;
        this.lossMult = lossMult;
    }
    public getBetSize(): number {
        let tempBet = this.sBet;
        this.sBet = (this.sBet * this.lossMult);
        if (this.money <= this.minBet || tempBet >= this.money) return this.money;
        if (tempBet <= this.minBet) {
            this.sBet = this.minBet;
            return this.minBet;
        }
        return tempBet;
    }
    public changeBet(): void {
        if (this.sBet == this.minBet) {
            this.sBet = (this.sBet * this.winMult);
            return;
        }
        this.sBet = (this.sBet * (this.winMult/this.lossMult));
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }
}

//MartingaleGambler
class MartingaleGambler implements Gambler{
    _name: string;
    _money: number;
    _target: number; 
    private mBet: number;
    public constructor(
        name: string,
        startingFunds: number, 
        mBet: number,
        mTarget: number 
    ) {
        this._name = name;
        this._money = startingFunds;
        this._target = mTarget;
        this.mBet = mBet;
    }
    public getBetSize(): number {
        let tempBet = this.mBet;
        this.mBet = (this.mBet * 2);
        if (tempBet >= this.money) return this.money;
        return tempBet;
    }
    public changeBet(): void {
        this.mBet = (this.mBet / 2);
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }
}

class Casino {
    /** a list of games offered in the casino */
    private _games: Game[];      

    /** a set of guests to the casino */
    private _gamblers: Set<Gambler>;

    /** how much money the casino made today */
    private _profits: number; 

    /** the maximum number of rounds to play */
    private _maxRounds: number;
    private _currentRound: number;

    public constructor( maxRounds: number ) {
        this._games = [
            new TailsIWin( this ),
            new GuessTheNumber( this ),
            new OffTrackGuineaPigRacing( this ),
            //added game
            new WhichCupHasTheMarble( this ),
        ];

        this._profits = 0;

        this._gamblers = new Set([
            // Argument 2 is the amount they start with, 
            // Arg 3 is how much they bet
            new StableGambler( "Alice", 100, 15 ),

            // Argument 2 is the amount they start with
            // Arg 3 is the yoloammount
            // the target is to make 5 times their starting balance, but 
            // you don't see that here because it's calculated inside the 
            // constructor instead of being passed as an argument.
            new HighRiskGambler( "Bob", 50, 10 ),

            // Arg 4 is the minimum amount they will bet 
            // Arg 5 is how much they multiply their bet by when they win
            // Arg 6 is how much they multiply their bet by when they lose
            // Arg 7 is their target. How much they want to make. 
            new StreakGambler( "Camille", 200, 10, 10, 2, 0.5, 500 ),

            // Arg 1 name
            // Arg 2 starting amount
            // Arg 3 starting bet
            // Arg 4 target
            //added extra gambler type
            new MartingaleGambler( "Martin", 300, 1, 500),
        ]);

        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }

    

    /**
     * Add profit to the casino for the day.
     * @param amount The amount of profit to add. If negative, it counts as a
     * loss.
     */
    public addProfit( amount: number ): void {
        this._profits += amount;
    }

    /** For each game: have each gambler who is still present play.
     * Starts by printing how much money each gambler has. 
     * If a gambler runs out of money or hits their target, they leave.
     * Then, plays the game with all players.
     */
    public simulateOneRound(): void {
        const startingProfit = this._profits;

        console.log( "-----------------------" );
        console.log( "beginning round", this._currentRound );
        for( let game of this._games ) {
            this.determineWhoIsStillPlaying();

            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for( let player of this._gamblers ) {
                addPlayer(game, player, player.getBetSize() );
            }

            const gameStartingProfit = this._profits;
            playGame(game);
            console.log( 
                "casino made", 
                casino._profits - gameStartingProfit, "on this game.")
            console.log();
        }
        console.log( 
            "round complete. casino made: ", this._profits - startingProfit );
        console.log( "total profit:", this._profits );
        console.log( "-----------------------" );
    }

    /**
     * Run the simulation until either the maximum number of games is reached,
     * or no one is left in the casino.
     */
    public simulate(): void {
        while( this._currentRound < this._maxRounds && this._gamblers.size > 0 ) {
            this.simulateOneRound();
            console.log();
            this._currentRound++;
        }

        console.log( "simulation complete" );
    }

    /**
     * Update and list the people who are still playing.
     */
    private determineWhoIsStillPlaying() {
        const gamblersWhoLeft: Gambler[] = [];
        
        // update and list of who is still playing
        for( let gambler of this._gamblers.keys() ) {
            console.log( gambler.name, ": ", gambler.money );
            
            if( isFinished(gambler) ) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push( gambler );
            }

            // now, print why the person left if they did so
            if( hitTarget(gambler) ) {
                console.log( 
                    gambler.name, 
                    "has hit their target! They leave the casino..."
                );
            }
            else if( bankrupt(gambler) ) {
                console.log( 
                    gambler.name,
                    "has gone bankrupt! They leave the casino..."
                );
            }
        }

        // remove the gamblers who left from the set
        for( let leaver of gamblersWhoLeft ) {
            this._gamblers.delete( leaver );
        }
    }
}

const MAX_N_ROUNDS = 5;

// main:
const casino = new Casino( MAX_N_ROUNDS );

casino.simulate();

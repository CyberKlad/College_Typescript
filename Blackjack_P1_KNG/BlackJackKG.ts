import readline from 'readline-sync';

class Game {
	totalPlayer: number;
	numAces: number;
	constructor(){
		this.numAces = 0;
		playerOne.hand[0] = newDeck.drawCard();
		if (playerOne.hand[0][0] == 11){
			this.numAces +=1;
		}
		playerHouse.hand[0] = newDeck.drawCard();
		playerOne.hand[1] = newDeck.drawCard();
		if (playerOne.hand[1][0] == 11){
			this.numAces +=1;
		}
		playerHouse.hand[1] = newDeck.drawCard();
		console.log("House's Hand: " + playerHouse.hand[0] + " | hidden,hidden");
		console.log("PlayerOne's Hand: " + playerOne.hand[0] + " | " + playerOne.hand[1]);
		this.totalPlayer = playerOne.hand[0][0]+playerOne.hand[1][0];
		console.log("PlayerOne's Total: " + this.totalPlayer);
	}
	startGame(): void {
		let handSpot = 2;
		let move = readline.question("choose your move: (h)it, (s)tay. ");
		while(move == "h"){
			let cardOne = newDeck.drawCard();
			if (cardOne[0] == 11){
				this.numAces +=1;
			}
			playerOne.hand[handSpot] = cardOne;
			console.log(cardOne);
			this.totalPlayer += cardOne[0];
			handSpot += 1;
			if (this.totalPlayer > 21){
				if (this.numAces > 0){
					this.totalPlayer -= 10;
					this.numAces -= 1;
				}
			}
			console.log("PlayerOne's Total: " + this.totalPlayer);
			if (this.totalPlayer > 21){
				console.log("PlayerOne has busted, you lose.");
				break;
			}
			move = readline.question("choose your move: (h)it, (s)tay. ");
		}
		if (move == "s"){

		}
	}
}
class Deck {
	drawdeck: number[][];
	cursor: number;
	constructor(){
		this.cursor = 51;
		this.drawdeck = [[2,Suits.Hearts],[3,Suits.Hearts],[4,Suits.Hearts],[5,Suits.Hearts]
						,[6,Suits.Hearts],[7,Suits.Hearts],[8,Suits.Hearts],[9,Suits.Hearts],[10,Suits.Hearts]
						,[Values.Jack,Suits.Hearts],[Values.Queen,Suits.Hearts],[Values.King,Suits.Hearts]
						,[Values.Ace,Suits.Hearts],[2,Suits.Diamonds],[3,Suits.Diamonds],[4,Suits.Diamonds],[5,Suits.Diamonds]
						,[6,Suits.Diamonds],[7,Suits.Diamonds],[8,Suits.Diamonds],[9,Suits.Diamonds],[10,Suits.Diamonds]
						,[Values.Jack,Suits.Diamonds],[Values.Queen,Suits.Diamonds],[Values.King,Suits.Diamonds],[Values.Ace,Suits.Diamonds]
						,[2,Suits.Clubs],[3,Suits.Clubs],[4,Suits.Clubs],[5,Suits.Clubs]
						,[6,Suits.Clubs],[7,Suits.Clubs],[8,Suits.Clubs],[9,Suits.Clubs],[10,Suits.Clubs]
						,[Values.Jack,Suits.Clubs],[Values.Queen,Suits.Clubs],[Values.King,Suits.Clubs],[Values.Ace,Suits.Clubs]
						,[2,Suits.Spades],[3,Suits.Spades],[4,Suits.Spades],[5,Suits.Spades]
						,[6,Suits.Spades],[7,Suits.Spades],[8,Suits.Spades],[9,Suits.Spades],[10,Suits.Spades]
						,[Values.Jack,Suits.Spades],[Values.Queen,Suits.Spades],[Values.King,Suits.Spades],[Values.Ace,Suits.Spades]];
	}
	shuffleDeck(unshuffled: number[][]): void{
		for (let i = 0; i < 52; i++){
			let rndNum = Math.floor(Math.random() * 51)
			let rndOne = unshuffled[i];
			let rndTwo = unshuffled[rndNum];
			unshuffled[rndNum] = rndOne;
			unshuffled[i] = rndTwo;
			this.drawdeck = unshuffled;
		} 
	}
	drawCard(): number[] {
		return this.drawdeck[this.cursor--];
	}
}
class Cards {
	hand: number[][];
	constructor(){
		this.hand = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	}
}
enum Suits {
	Hearts,
	Diamonds,
	Clubs,
	Spades,
}
enum Values {
	Ace = 11,
	Jack = 10,
	Queen = 10,
	King = 10,
}
let newDeck = new Deck();
newDeck.shuffleDeck(newDeck.drawdeck);
let playerHouse = new Cards();
let playerOne = new Cards();
let newGame = new Game();
//console.log(newDeck.drawdeck)
newGame.startGame();

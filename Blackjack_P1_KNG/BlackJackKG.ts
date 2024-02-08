import readline from 'readline-sync';

class Game {
	constructor(){
		let newDeck = new Deck();
		newDeck.shuffleDeck(newDeck.drawdeck);
		console.log(newDeck.drawdeck)
		let playerHouse = new Cards();
		let playerOne = new Cards();
		playerOne.hand[0] = newDeck.drawCard(newDeck.drawdeck);
		playerHouse.hand[0] = newDeck.drawCard(newDeck.drawdeck);
		playerOne.hand[1] = newDeck.drawCard(newDeck.drawdeck);
		playerHouse.hand[1] = newDeck.drawCard(newDeck.drawdeck);
		console.log(playerHouse.hand[0] + " | hidden,hidden");
		console.log(playerOne.hand[0]);
	}
	startGame(): void {
		let cardOne = deck.drawCard(shuffledDeck);
		console.log(cardOne);
		let playerOne = new Cards
		const move = readline.question("choose your move: (h)it, (s)tay. ");
		console.log(move);
	}
}
class Deck {
	drawdeck: number|string[][];
	cursor: number;
	constructor(){
		this.cursor = 51;
		this.drawdeck = [[2,"Hearts"],[3,"Hearts"],[4,"Hearts"],[5,"Hearts"]
						,[6,"Hearts"],[7,"Hearts"],[8,"Hearts"],[9,"Hearts"],[10,"Hearts"]
						,[Values.Jack,"Hearts"],[Values.Queen,"Hearts"],[Values.King,"Hearts"]
						,[Values.Ace,"Hearts"],[2,Suits.Diamonds],[3,Suits.Diamonds],[4,Suits.Diamonds],[5,Suits.Diamonds]
						,[6,Suits.Diamonds],[7,Suits.Diamonds],[8,Suits.Diamonds],[9,Suits.Diamonds],[10,Suits.Diamonds]
						,[Values.Jack,Suits.Diamonds],[Values.Queen,Suits.Diamonds],[Values.King,Suits.Diamonds],[Values.Ace,Suits.Diamonds]
						,[2,Suits.Clubs],[3,Suits.Clubs],[4,Suits.Clubs],[5,Suits.Clubs]
						,[6,Suits.Clubs],[7,Suits.Clubs],[8,Suits.Clubs],[9,Suits.Clubs],[10,Suits.Clubs]
						,[Values.Jack,Suits.Clubs],[Values.Queen,Suits.Clubs],[Values.King,Suits.Clubs],[Values.Ace,Suits.Clubs]
						,[2,Suits.Spades],[3,Suits.Spades],[4,Suits.Spades],[5,Suits.Spades]
						,[6,Suits.Spades],[7,Suits.Spades],[8,Suits.Spades],[9,Suits.Spades],[10,Suits.Spades]
						,[Values.Jack,Suits.Spades],[Values.Queen,Suits.Spades],[Values.King,Suits.Spades],[Values.Ace,Suits.Spades]];
	}
	shuffleDeck(unshuffled: number|string[][]): void{
		for (let i = 0; i < 52; i++){
			let rndNum = Math.floor(Math.random() * 51)
			let rndOne = unshuffled[i];
			let rndTwo = unshuffled[rndNum];
			unshuffled[rndNum] = rndOne;
			unshuffled[i] = rndTwo;
			this.drawdeck = unshuffled;
		} 
	}
	drawCard(shuffled: number|string[][]): number[] {
		return shuffled[this.cursor--];
	}
}
class Cards {
	hand: number|string[][];
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
let newGame = new Game();


//import readline from 'readline-sync';

class Game {
	cardHand: [number, number];
	constructor(){
		let deck = new Deck();
		deck.shuffleDeck(deck.drawdeck)
		console.log(deck.drawdeck);

		//this.playerHand
	}
	startGame(): void {
		//const move = readline.question("choose your move: (h)it, (s)tay.");
		//console.log(move);
	}
}
class Deck {
	drawdeck: Array<number|string>;
	constructor(){
		this.drawdeck = new Array<number|string>;
		let cardNum = 2;
		for (let i = 0; i <= 52; i++){
			if (i < 36){
				this.drawdeck[i] = cardNum++;
				if (cardNum == 10){
					cardNum = 2
				}
			} 
			else {
				this.drawdeck[i++] = "Ace";
				this.drawdeck[i++] = "Jack";
				this.drawdeck[i++] = "Queen";
				this.drawdeck[i] = "King";
			}
		}
		console.log(this.drawdeck)
	}
	shuffleDeck(unshuffled: Array<number|string>): void {
		for (let i = 0; i <= 52; i++){
			let rndNum = Math.floor(Math.random() * 51)
			let rndOne = unshuffled[i];
			let rndTwo = unshuffled[rndNum];
			unshuffled[rndNum] = rndOne;
			unshuffled[i] = rndTwo;
		} 
	}
	drawCard(): number {
		//this.
		return 0;
	}
}
class Cards {
	playername: string;
	hand: [number, number];
	constructor( playername: string){
		this.playername = playername;
		this.hand = [0,0];
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
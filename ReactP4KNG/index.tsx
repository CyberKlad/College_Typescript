import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface BlackJackProp {
}

class BlackJackState {
    whoWon: String = "Click New Game to Start";
}

class BlackJackDeck extends Component<BlackJackProp, BlackJackState>{
    playerHand: number[][] = [];
    houseHand: number[][] = [];
    bjDeck: number[][] = [];
    totalPlayer: number | String = 0;
    totalHouse: number | String = 0;
    numberAces: number = 0;
    numberAcesHouse: number = 0;
    curs: number = 51;
    drawCurs: number = 0;
    houseHidden: number[][] = [];
    stayYN: number = 0;
    constructor(prop: BlackJackProp) {
        super(prop);
        this.state = new BlackJackState();
        this.addCard = this.addCard.bind(this);
        this.addCardHouse = this.addCardHouse.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.stayButton = this.stayButton.bind(this);
    }

    override render(): ReactNode {
        var result = ""; 
        result += "Player Hand: "
        for (let i = 0; i < this.playerHand.length; i++){
            result += String.fromCodePoint(this.playerHand[i][1]);
        }
        result += " Player Total: "+this.totalPlayer;

        var resultHouse = "";
        resultHouse += "House Hand: "
        for (let i = 0; i < this.houseHand.length; i++){
            resultHouse += String.fromCodePoint(this.houseHand[i][1]);
        }
        resultHouse += " House Total: "+this.totalHouse;

        return <div>
        <p>{result}</p>
        <p>{resultHouse}</p>
        <button onClick={this.addCard}>Hit!</button>
        <button onClick={this.stayButton}>Stay!</button>
        <button onClick={this.resetGame}>New Game / Reset Game</button>
        <p>{this.state.whoWon}</p>
        </div>
    }

    addCard(): void {
        let newState = new BlackJackState();
        if (this.stayYN == 1){
            newState.whoWon = newState.whoWon+"You Have Stayed and Can Not Draw More Cards";
            return;
        }
        if (this.bjDeck[0] == null) {
            newState.whoWon = "Thats the Hit! Button, Press New Game to Start"
            this.setState( newState );
            return;
        }
        if (this.bjDeck[this.curs][0] == 11){
                this.numberAces +=1;
            }
        this.playerHand.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.totalPlayer = 0;
        for (let i = 0; i < this.playerHand.length; i++){
            this.totalPlayer += this.playerHand[i][0];
        } 
        if (this.totalPlayer >= 21 && this.numberAces > 0){
            this.totalPlayer -= 10;
            this.numberAces -= 1;
        }
        if (this.totalPlayer > 21){
            this.totalPlayer = "BUSTED";
        }
        newState.whoWon = ""
        this.setState( newState );
    }

    addCardHouse(): void {
        if (this.bjDeck[this.curs][0] == 11){
                this.numberAcesHouse +=1;
            }
        this.houseHand.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.totalHouse = 0;
        for (let i = 0; i < this.houseHand.length; i++){
            this.totalHouse += this.houseHand[i][0];
        } 
        if (this.totalHouse >= 21 && this.numberAcesHouse > 0){
            this.totalHouse -= 10;
            this.numberAcesHouse -= 1;
        }
        if (this.totalHouse > 21){
            this.totalHouse = "BUSTED";
        }
    }

    resetGame(): void {
        let newState = new BlackJackState();
        this.stayYN = 0;
        this.bjDeck =  [[11,0x1F0A1],[2,0x1F0A2],[3,0x1F0A3],[4,0x1F0A4],[5,0x1F0A5],[6,0x1F0A6],[7,0x1F0A7],[8,0x1F0A8],[9,0x1F0A9],[10,0x1F0AA],[10,0x1F0AB],[10,0x1F0AD],[10,0x1F0AE]
                        ,[11,0x1F0B1],[2,0x1F0B2],[3,0x1F0B3],[4,0x1F0B4],[5,0x1F0B5],[6,0x1F0B6],[7,0x1F0B7],[8,0x1F0B8],[9,0x1F0B9],[10,0x1F0BA],[10,0x1F0BB],[10,0x1F0BD],[10,0x1F0BE]
                        ,[11,0x1F0C1],[2,0x1F0C2],[3,0x1F0C3],[4,0x1F0C4],[5,0x1F0C5],[6,0x1F0C6],[7,0x1F0C7],[8,0x1F0C8],[9,0x1F0C9],[10,0x1F0CA],[10,0x1F0CB],[10,0x1F0CD],[10,0x1F0CE]
                        ,[11,0x1F0D1],[2,0x1F0D2],[3,0x1F0D3],[4,0x1F0D4],[5,0x1F0D5],[6,0x1F0D6],[7,0x1F0D7],[8,0x1F0D8],[9,0x1F0D9],[10,0x1F0DA],[10,0x1F0DB],[10,0x1F0DD],[10,0x1F0DE]];
        for (let i = 0; i < 52; i++){
            let rndNum = Math.floor(Math.random() * 51)
            let rndOne = this.bjDeck[i];
            let rndTwo = this.bjDeck[rndNum];
            this.bjDeck[rndNum] = rndOne;
            this.bjDeck[i] = rndTwo;
        }
        this.playerHand = [];
        this.houseHand = [];
        this.addCard();
        this.addCardHouse();
        this.addCard();
        this.houseHidden.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.houseHand.push([0,0x1F0A0])
        newState.whoWon = "";
        this.setState( newState );
    }

    stayButton(): void {
        let newState = new BlackJackState();
        this.stayYN = 1;
        this.houseHand[1] = this.houseHidden[0];
        newState.whoWon = "";
        this.setState( newState );
    }
}

class App extends Component {
    override render(): ReactNode {
        return <div>
            <p>welcome to Black Jack!</p>
            <BlackJackDeck>
            </BlackJackDeck>
        </div>
    }
}

//below is code placing TypeScript into the HTML file in the spot of an ID labeled root
//This was provided by the professor
const rootElem = document.getElementById('root');

if( rootElem == null ) {
    alert('you forgot to put a root element in your HTML file.');
}

const root = createRoot( rootElem as HTMLElement );

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
class BlackJackState {
    constructor() {
        this.whoWon = "Click New Game to Start";
    }
}
class BlackJackDeck extends react_1.Component {
    constructor(prop) {
        super(prop);
        this.playerHand = [];
        this.houseHand = [];
        this.bjDeck = [];
        this.totalPlayer = 0;
        this.totalHouse = 0;
        this.numberAces = 0;
        this.numberAcesHouse = 0;
        this.curs = 51;
        this.drawCurs = 0;
        this.houseHidden = [];
        this.stayYN = 0;
        this.gameEnd = 0;
        this.bustedPlayer = 0;
        this.bustedHouse = 0;
        this.state = new BlackJackState();
        this.addCard = this.addCard.bind(this);
        this.addCardHouse = this.addCardHouse.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.stayButton = this.stayButton.bind(this);
    }
    render() {
        this.bustedPlayer = this.totalPlayer;
        if (this.totalPlayer == 999)
            this.bustedPlayer = "BUSTED";
        this.bustedHouse = this.totalHouse;
        if (this.totalHouse == 999)
            this.bustedHouse = "BUSTED";
        var result = "";
        result += "Player Hand: ";
        for (let i = 0; i < this.playerHand.length; i++) {
            result += String.fromCodePoint(this.playerHand[i][1]);
        }
        result += " Player Total: " + this.bustedPlayer;
        var resultHouse = "";
        resultHouse += "House Hand: ";
        for (let i = 0; i < this.houseHand.length; i++) {
            resultHouse += String.fromCodePoint(this.houseHand[i][1]);
        }
        resultHouse += " House Total: " + this.bustedHouse;
        return <div>
        <p style={{ fontSize: 70, color: 'green' }}>{result}</p>
        <p style={{ fontSize: 70, color: 'green' }}>{resultHouse}</p>
        <button style={{ fontSize: 80 }} onClick={this.addCard}>Hit!</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button style={{ fontSize: 80 }} onClick={this.stayButton}>Stay!</button>
        <br />
        <br />
        <button style={{ fontSize: 50 }} onClick={this.resetGame}>New Game / Reset Game</button>
        <p style={{ fontSize: 70, color: 'blue' }}>{this.state.whoWon}</p>
        </div>;
    }
    addCard() {
        if (this.gameEnd)
            return;
        let newState = new BlackJackState();
        if (this.stayYN == 1) {
            newState.whoWon = newState.whoWon + "You Have Stayed and Can Not Draw More Cards";
            return;
        }
        if (this.bjDeck[0] == null) {
            newState.whoWon = "Thats the Hit! Button, Press New Game to Start";
            this.setState(newState);
            return;
        }
        if (this.bjDeck[this.curs][0] == 11) {
            this.numberAces += 1;
        }
        this.playerHand.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.totalPlayer = 0;
        for (let i = 0; i < this.playerHand.length; i++) {
            this.totalPlayer += this.playerHand[i][0];
        }
        if (this.totalPlayer > 21 && this.numberAces > 0) {
            this.totalPlayer -= 10;
            this.numberAces -= 1;
        }
        if (this.totalPlayer > 21) {
            this.gameEnd += 1;
            newState.whoWon = "You Busted, House Won.";
            this.totalPlayer = 999;
            this.setState(newState);
            return;
        }
        newState.whoWon = "";
        this.setState(newState);
    }
    addCardHouse() {
        let newState = new BlackJackState();
        if (this.bjDeck[this.curs][0] == 11) {
            this.numberAcesHouse += 1;
        }
        this.houseHand.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.totalHouse = 0;
        for (let i = 0; i < this.houseHand.length; i++) {
            this.totalHouse += this.houseHand[i][0];
        }
        if (this.totalHouse > 21 && this.numberAcesHouse > 0) {
            this.totalHouse -= 10;
            this.numberAcesHouse -= 1;
        }
        if (this.totalHouse > 21) {
            this.gameEnd += 1;
            this.totalHouse = 999;
            this.setState(newState);
            return;
        }
        newState.whoWon = "";
        this.setState(newState);
    }
    resetGame() {
        let newState = new BlackJackState();
        this.gameEnd = 0;
        this.stayYN = 0;
        this.bjDeck = [[11, 0x1F0A1], [2, 0x1F0A2], [3, 0x1F0A3], [4, 0x1F0A4], [5, 0x1F0A5], [6, 0x1F0A6], [7, 0x1F0A7], [8, 0x1F0A8], [9, 0x1F0A9], [10, 0x1F0AA], [10, 0x1F0AB], [10, 0x1F0AD], [10, 0x1F0AE],
            [11, 0x1F0B1], [2, 0x1F0B2], [3, 0x1F0B3], [4, 0x1F0B4], [5, 0x1F0B5], [6, 0x1F0B6], [7, 0x1F0B7], [8, 0x1F0B8], [9, 0x1F0B9], [10, 0x1F0BA], [10, 0x1F0BB], [10, 0x1F0BD], [10, 0x1F0BE],
            [11, 0x1F0C1], [2, 0x1F0C2], [3, 0x1F0C3], [4, 0x1F0C4], [5, 0x1F0C5], [6, 0x1F0C6], [7, 0x1F0C7], [8, 0x1F0C8], [9, 0x1F0C9], [10, 0x1F0CA], [10, 0x1F0CB], [10, 0x1F0CD], [10, 0x1F0CE],
            [11, 0x1F0D1], [2, 0x1F0D2], [3, 0x1F0D3], [4, 0x1F0D4], [5, 0x1F0D5], [6, 0x1F0D6], [7, 0x1F0D7], [8, 0x1F0D8], [9, 0x1F0D9], [10, 0x1F0DA], [10, 0x1F0DB], [10, 0x1F0DD], [10, 0x1F0DE]];
        for (let i = 0; i < 52; i++) {
            let rndNum = Math.floor(Math.random() * 51);
            let rndOne = this.bjDeck[i];
            let rndTwo = this.bjDeck[rndNum];
            this.bjDeck[rndNum] = rndOne;
            this.bjDeck[i] = rndTwo;
        }
        this.curs = 51;
        this.totalHouse = 0;
        this.totalPlayer = 0;
        this.playerHand = [];
        this.houseHand = [];
        this.numberAces = 0;
        this.numberAcesHouse = 0;
        this.addCard();
        this.addCardHouse();
        this.addCard();
        this.houseHidden.push(this.bjDeck[this.curs]);
        this.curs -= 1;
        this.houseHand.push([0, 0x1F0A0]);
        newState.whoWon = "";
        this.setState(newState);
    }
    stayButton() {
        if (this.gameEnd)
            return;
        let newState = new BlackJackState();
        if (this.bjDeck[0] == null) {
            newState.whoWon = "Thats the Stay! Button, Press New Game to Start";
            this.setState(newState);
            return;
        }
        this.stayYN = 1;
        this.houseHand[1] = this.houseHidden[0];
        this.totalHouse += this.houseHidden[0][0];
        while (this.totalHouse < 17)
            this.addCardHouse();
        if (!this.gameEnd)
            newState.whoWon = "Push no Winners";
        newState.whoWon = "House Busted, You Won.";
        if (this.totalPlayer > this.totalHouse && !this.gameEnd)
            newState.whoWon = "Player has Won";
        if (this.totalPlayer < this.totalHouse && !this.gameEnd)
            newState.whoWon = "House has Won";
        this.gameEnd = 1;
        this.setState(newState);
    }
}
class App extends react_1.Component {
    render() {
        return <div style={{ fontSize: 50, textAlign: 'center' }}>
            <p style={{ fontSize: 20 }}>Welcome to Black Jack!</p>
            <p style={{ fontSize: 20 }}>By Korbin Gillette from CS 224 created 16 April 2024</p>
            <BlackJackDeck>
            </BlackJackDeck>
        </div>;
    }
}
//below is code placing TypeScript into the HTML file in the spot of an ID labeled root
//This was provided by the professor
const rootElem = document.getElementById('root');
if (rootElem == null) {
    alert('you forgot to put a root element in your HTML file.');
}
const root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.StrictMode>
        <App />
    </react_1.StrictMode>);

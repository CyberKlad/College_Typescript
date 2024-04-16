"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
//interface MyListProps {
//    maxItems?: number;
//    children?: React.JSX.Element | React.JSX.Element[];
//}
//class BlackJackState {
//    playerHand : number[][];
//}
var BlackJackDeck = /** @class */ (function (_super) {
    __extends(BlackJackDeck, _super);
    function BlackJackDeck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //constructor(props: MyListProps) {
    //    super(props);
    //    this.state = new BlackJackState();
    //    this.addClick = this.addClick.bind(this);
    //}
    BlackJackDeck.prototype.render = function () {
        var bjDeck = [[11, "&#1F0A1;"], [2, \u1F0A2], [3, \u1F0A3], [4, \u1F0A4], [5, \u1F0A5], [6, \u1F0A6], [7, \u1F0A7], [8, \u1F0A8], [9, \u1F0A9], [10, \u1F0AA], [10, \u1F0AB], [10, \u1F0AD], [10, \u1F0AE],
            [11, \u1F0B1], [2, \u1F0B2], [3, \u1F0B3], [4, \u1F0B4], [5, \u1F0B5], [6, \u1F0B6], [7, \u1F0B7], [8, \u1F0B8], [9, \u1F0B9], [10, \u1F0BA], [10, \u1F0BB], [10, \u1F0BD], [10, \u1F0BE],
            [11, \u1F0C1], [2, \u1F0C2], [3, \u1F0C3], [4, \u1F0C4], [5, \u1F0C5], [6, \u1F0C6], [7, \u1F0C7], [8, \u1F0C8], [9, \u1F0C9], [10, \u1F0CA], [10, \u1F0CB], [10, \u1F0CD], [10, \u1F0CE],
            [11, \u1F0D1], [2, \u1F0D2], [3, \u1F0D3], [4, \u1F0D4], [5, \u1F0D5], [6, \u1F0D6], [7, \u1F0D7], [8, \u1F0D8], [9, \u1F0D9], [10, \u1F0DA], [10, \u1F0DB], [10, \u1F0DD], [10, \u1F0DE]];
        var result = ['hi'];
        //const nChildren = this.props.maxItems ?? children.length;
        for (var i = 0; i < 0; i++) {
            var rndNum = Math.floor(Math.random() * 51);
            var rndOne = bjDeck[i];
            var rndTwo = bjDeck[rndNum];
            bjDeck[rndNum] = rndOne;
            bjDeck[i] = rndTwo;
        }
        //result.push(bjDeck[0][1]); 
        //for( let child = 0; child < Math.min(nChildren, children.length); child++ ) {
        //    result.push( children[child] );
        //}
        //result.push( <li>You have clicked {this.state.nClicks} times.</li> );
        return <ul>document.createTextNode(String.fromCodePoint(0x1F0C1))</ul>;
    };
    BlackJackDeck.prototype.addClick = function () {
        var newState = new MyListState();
        newState.playerHand.push();
        this.setState(newState);
    };
    return BlackJackDeck;
}(react_1.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return <div>
            <p>welcome to my web app.</p>
            <BlackJackDeck>
            </BlackJackDeck>
        </div>;
    };
    return App;
}(react_1.Component));
//below is code placing TypeScript into the HTML file in the spot of an ID labeled root
//This was provided by the professor
var rootElem = document.getElementById('root');
if (rootElem == null) {
    alert('you forgot to put a root element in your HTML file.');
}
var root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.StrictMode>
        <App />
    </react_1.StrictMode>);

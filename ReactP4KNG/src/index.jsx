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
class MyListState {
    constructor() {
        this.nClicks = 0;
    }
}
class MyList extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = new MyListState();
        this.addClick = this.addClick.bind(this);
    }
    render() {
        var _a;
        const children = react_1.default.Children.toArray(this.props.children);
        const result = [];
        const nChildren = (_a = this.props.maxItems) !== null && _a !== void 0 ? _a : children.length;
        for (let child = 0; child < Math.min(nChildren, children.length); child++) {
            result.push(children[child]);
        }
        result.push(<li>You have clicked {this.state.nClicks} times.</li>);
        return <ul onClick={this.addClick}>{result}</ul>;
    }
    addClick() {
        let newState = new MyListState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState(newState);
    }
}
class App extends react_1.Component {
    render() {
        return <div>
            <p>welcome to my web app.</p>
            <MyList maxItems={2}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </MyList>
        </div>;
    }
}
const rootElem = document.getElementById('root');
if (rootElem == null) {
    alert('you forgot to put a root element in your HTML file.');
}
const root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.StrictMode>
        <App />
    </react_1.StrictMode>);

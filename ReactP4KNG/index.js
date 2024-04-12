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
var MyListState = /** @class */ (function () {
    function MyListState() {
        this.nClicks = 0;
    }
    return MyListState;
}());
var MyList = /** @class */ (function (_super) {
    __extends(MyList, _super);
    function MyList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = new MyListState();
        _this.addClick = _this.addClick.bind(_this);
        return _this;
    }
    MyList.prototype.render = function () {
        var _a;
        var children = react_1.default.Children.toArray(this.props.children);
        var result = [];
        var nChildren = (_a = this.props.maxItems) !== null && _a !== void 0 ? _a : children.length;
        for (var child = 0; child < Math.min(nChildren, children.length); child++) {
            result.push(children[child]);
        }
        result.push(<li>You have clicked {this.state.nClicks} times.</li>);
        return <ul onClick={this.addClick}>{result}</ul>;
    };
    MyList.prototype.addClick = function () {
        var newState = new MyListState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState(newState);
    };
    return MyList;
}(react_1.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return <div>
            <p>welcome to my web app.</p>
            <MyList maxItems={2}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </MyList>
        </div>;
    };
    return App;
}(react_1.Component));
var rootElem = document.getElementById('root');
if (rootElem == null) {
    alert('you forgot to put a root element in your HTML file.');
}
var root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.StrictMode>
        <App />
    </react_1.StrictMode>);

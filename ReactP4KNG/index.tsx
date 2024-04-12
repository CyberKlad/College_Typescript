import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface MyListProps {
    maxItems?: number;
    children?: React.JSX.Element | React.JSX.Element[];
}

class MyListState {
    nClicks : number = 0;
}

class MyList extends Component<MyListProps, MyListState> {
    constructor(props: MyListProps) {
        super(props);
        this.state = new MyListState();
        this.addClick = this.addClick.bind(this);
    }

    override render(): ReactNode {
        const children = React.Children.toArray(this.props.children);
        const result = []
        const nChildren = this.props.maxItems ?? children.length;
    
        for( let child = 0; child < Math.min(nChildren, children.length); child++ ) {
            result.push( children[child] );
        }

        result.push( <li>You have clicked {this.state.nClicks} times.</li> );

        return <ul onClick={this.addClick}>{result}</ul>
    }

    addClick(): void {
        let newState = new MyListState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState( newState );
    }
}

class App extends Component {
    override render(): ReactNode {
        return <div>
            <p>welcome to my web app.</p>
            <MyList maxItems={2}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </MyList>
        </div>
    }
}

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

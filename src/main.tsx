import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

const rootEl = document.getElementById("root");

const palette = {
    background: '#1b203d',
    background2: '#2a2b4a',
    foreground: '#fff',
    foreground2: '#ececef',
    primary: '#e72a5e', 
    secondary: '#ececef'
}

ReactDOM.render(<App/>, rootEl);
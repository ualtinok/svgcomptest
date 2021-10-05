import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider, rootStore} from "./models/Root";

function random(min: number, max: number, float = false) {
    const val = Math.random() * (max - min) + min;

    if (float) {
        return val;
    }

    return Math.floor(val);
}
for(let i = 0; i < 1024; i++){
    rootStore.svgstore.addItem(random(3,12),random(0.55, 1, true));
}


ReactDOM.render(
    <React.StrictMode>
        <Provider value={rootStore}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

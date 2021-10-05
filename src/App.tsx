import React from 'react';
import './App.css';
import {useMst} from "./models/Root";
import SvgComp from "./components/SvgComp";


function App() {

    const {svgstore} = useMst();

    return (
        <div className="App">
            <div className="svgCompsCont">
                {svgstore.items.map((item: any, index) => {
                    return (
                        <SvgComp key={index} item={item} width={250} height={250}/>
                    )
                })}
            </div>
        </div>
    );
}

export default App;

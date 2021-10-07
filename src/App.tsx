import React from 'react';
import './App.css';
import {useMst} from "./models/Root";
import SvgComp from "./components/SvgComp";
import {ISVGData, SVGData} from "./models/SVGStore";
import {observer} from "mobx-react";


function App() {

    const {svgstore} = useMst();

    const handleClick = (item: ISVGData) => {
        item.randomize();
    }

    return (
        <div className="App">
            <div className="svgCompsCont">
                {svgstore.items.map((item: any, index) => {
                    return (
                        <SvgComp onDoubleClick={() => handleClick(item)} key={index} size={item.size}
                                 numberOfDots={item.numberOfDots} pull={item.pull} width={250} height={250}/>
                    )
                })}
            </div>
        </div>
    );
}

export default observer(App);

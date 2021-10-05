import {spline} from '@georgedoescode/spline';
import {SVG} from '@svgdotjs/svg.js';
import {ISVGData} from "../models/SVGStore";
import { observer } from 'mobx-react';
import './SvgComp.css';



function random(min: number, max: number, float = false) {
    const val = Math.random() * (max - min) + min;

    if (float) {
        return val;
    }

    return Math.floor(val);
}

interface SvgCompProps {
    item: ISVGData,
    width: number,
    height: number
}


const SvgComp: React.FC<SvgCompProps> = observer((props: SvgCompProps) => {

    const {item, width, height} = props;


    const makeSVG = (dom: HTMLDivElement|null) => {
        if(dom) {
            const svg = SVG().addTo(dom).viewbox(0,0,width, height);
            const size = random(50, 80);
            const angleStep = (Math.PI * 2) / item.numberOfDots;
            const x = width / 2;
            const y = height / 2;
            const points = [];

            for (let i = 1; i <= item.numberOfDots; i++) {
                // x & y coordinates of the current point
                const x1 = x + Math.cos(i * angleStep) * (size * item.pull);
                const y1 = y + Math.sin(i * angleStep) * (size * item.pull);

                // push the point to the points array
                points.push({ x: x1, y: y1 });
            }
            const pathData = spline(points, 1, true);
            svg
                .path(pathData)
                .stroke({
                    width: 2,
                    color: '#000'
                })
                .fill('transparent');
        }

    }

    return (
        <div className="svgContainer" ref={ref => makeSVG(ref)}/>
    );
});

export default SvgComp;

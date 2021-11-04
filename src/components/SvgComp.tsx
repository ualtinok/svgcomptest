import {spline} from '@georgedoescode/spline';
import './SvgComp.css';
import {forwardRef} from "react";

interface BaseProps extends React.HtmlHTMLAttributes<HTMLElement>{
    numberOfDots: number,
    pull: number,
    width: number,
    height: number,
    size: number,
    label: string
}

export type SvgCompProps =
    | BaseProps

export const SvgComp = forwardRef<SVGSVGElement, SvgCompProps>(function SvgComp(
    props,
    ref
) {
    const {numberOfDots, pull, width, height, size, label, ...rootDOMAttributes} = props;


    const angleStep = (Math.PI * 2) / numberOfDots;
    const x = width / 2;
    const y = height / 2;
    const points = [];

    for (let i = 1; i <= numberOfDots; i++) {
        // x & y coordinates of the current point
        const x1 = x + Math.cos(i * angleStep) * (size * pull);
        const y1 = y + Math.sin(i * angleStep) * (size * pull);

        // push the point to the points array
        points.push({ x: x1, y: y1 });
    }
    const pathData = spline(points, 1, true);

    return (
        <div {...rootDOMAttributes}>
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox={`0 0 ${width} ${height}`}>
                <circle cx={width/2} cy={width/2} r={width/2} fill="red"/>
                <path d={pathData} strokeWidth="0" stroke="#00000"
                      fill="#381922"/>
                <text x={width/2} y={width/2}>{label}</text>
            </svg>
        </div>
    );
});

export default SvgComp;

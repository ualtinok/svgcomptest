// @ts-ignore
import React from "react";
// @ts-ignore
import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import SvgComp from "./components/SvgComp";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import {rootStore, SIDE_LENGTH, MARGIN_CIRCLES} from "./models/Root";


const svgData = [
  {
    id: 1,
    size: 10,
    dots: 4,
    pull: 4
  },
  {
    id: 2,
    size: 80,
    dots: 3,
    pull: 0.8
  },
  {
    id: 3,
    size: 15,
    dots: 6,
    pull: 3
  },
  {
    id: 4,
    size: 25,
    dots: 3,
    pull: 2
  }
];
class _Array<T> extends Array<T> {
  static range(from: number, to: number, step: number): number[] {
    return Array.from(Array(Math.floor((to - from) / step) + 1)).map(
      (v, k) => from + k * step
    );
  }
}

const RenderCircles = React.memo((props: any) => {
  const startPos = props.startPos;
  const dimensionDividedBy = props.dimensionDividedBy;
  const numberOfEls = props.numberOfEls;
  return (
    <React.Fragment>
    {_Array.range(0, dimensionDividedBy - 1, 1).map(l =>
      rootStore.svgstore.items.slice(startPos + l*SIDE_LENGTH, startPos + l*SIDE_LENGTH + dimensionDividedBy).map((svg, K) => (
        <SvgComp
          size={svg.size/dimensionDividedBy}
          numberOfDots={svg.numberOfDots}
          pull={1}
          label={svg.id.toString()}
          width={(256-(MARGIN_CIRCLES*2))/dimensionDividedBy}
          height={(256-(MARGIN_CIRCLES*2))/dimensionDividedBy}
          style={{
          padding: MARGIN_CIRCLES/dimensionDividedBy,
          height: (256-(MARGIN_CIRCLES*2))/dimensionDividedBy,
          width: (256-(MARGIN_CIRCLES*2))/dimensionDividedBy}}
        />
      ))
    )}
    </React.Fragment>
    );
});

// @see https://stackoverflow.com/a/65713838/4295853
// @ts-ignore
L.GridLayer.Circles = L.GridLayer.extend({
    createTile: function(coords: L.Coords) {
        var tile = document.createElement('div');
        console.log(coords);
        const z = coords.z;
        let x = coords.x;
        let y = coords.y;
        console.log(z);
        let pow = Math.log2(SIDE_LENGTH);
        const numberOfEls = 2**(6-(2*z));
        // console.log(numberOfEls);
        const dimensionDividedBy = 2**(3-z);
        while (x < 0) {
          x += SIDE_LENGTH
        }
        while (y < 0) {
          y += SIDE_LENGTH
        }
        const startPos = ((x*dimensionDividedBy)%SIDE_LENGTH) + SIDE_LENGTH*((y*dimensionDividedBy)%SIDE_LENGTH);
        console.log(x, y, startPos)
        tile.innerHTML = ReactDOMServer.renderToString(<RenderCircles
          startPos={startPos} numberOfEls={numberOfEls} dimensionDividedBy={dimensionDividedBy} />);
        // tile.style.outline = '1px solid red';
        tile.style.display = 'flex';
        tile.style['flexWrap'] = 'wrap';
        tile.style['flexDirection'] = 'row';
        return tile;
    },
});

// @ts-ignore
L.GridLayer.circles = function() {
    // @ts-ignore
    return new L.GridLayer.Circles();
}

// @ts-ignore
const createCirclesLayer = (props, context) => {
    // @ts-ignore
    const instance = L.GridLayer.circles(props);
    return {instance, context};
}

// @ts-ignore
const updateCirclesLayer = (instance, props, prevProps) => {

}

const CirclesLayer = createLayerComponent(createCirclesLayer, updateCirclesLayer);
export default CirclesLayer;

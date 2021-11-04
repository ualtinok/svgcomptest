// @ts-ignore
import React from "react";
// @ts-ignore
import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import SvgComp from "./components/SvgComp";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import {rootStore} from "./models/Root";


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


const RenderCircles = (props: any) => {
    const z = props.coords.z;
    let x = props.coords.x;
    let y = props.coords.y;
    // console.log(z);
    const numberOfEls = 2**(6-(2*z));
    // console.log(numberOfEls);
    const dimensionDividedBy = 2**(3-z);
    while (x < 0) {
      x += 16
    }
    while (y < 0) {
      y += 16
    }
    const startPos = ((x*dimensionDividedBy)%16) + 16*((y*dimensionDividedBy)%16);
    console.log(x, y, startPos)
  return (
    <React.Fragment>
    {_Array.range(0, dimensionDividedBy - 1, 1).map(l =>
      rootStore.svgstore.items.slice(startPos + l*16, startPos + l*16 + dimensionDividedBy).map((svg, K) => (
        <SvgComp
          size={svg.size/dimensionDividedBy}
          numberOfDots={svg.numberOfDots}
          pull={1}
          label={svg.id.toString()}
          width={256/dimensionDividedBy}
          height={256/dimensionDividedBy}
          style={{flex: '1 0 ' + (100/dimensionDividedBy) + '%', height: 256/dimensionDividedBy}}
        />
      ))
    )}
    </React.Fragment>
    );
};

// @see https://stackoverflow.com/a/65713838/4295853
// @ts-ignore
L.GridLayer.Circles = L.GridLayer.extend({
    createTile: function(coords: L.Coords) {
        var tile = document.createElement('div');
        console.log(coords);
        tile.innerHTML = ReactDOMServer.renderToString(<RenderCircles coords={coords} />);
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

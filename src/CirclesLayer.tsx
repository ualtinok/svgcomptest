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

const RenderCircles = (props: any) => {
    const z = props.coords.z;
    // console.log(z);
    const numberOfEls = 2**(10-(2*z));
    console.log(numberOfEls);
    const dimensionDividedBy = 2**(5-z);
  return (
    <React.Fragment>
    {rootStore.svgstore.items.slice(0, numberOfEls).map((svg, K) => (
    <SvgComp
      size={svg.size/dimensionDividedBy}
      numberOfDots={svg.numberOfDots}
      pull={1}
      label={svg.id.toString()}
      width={200/dimensionDividedBy}
      height={200/dimensionDividedBy}
      style={{flex: '1 0 ' + (100/dimensionDividedBy) + '%'}}
    />
  ))}
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

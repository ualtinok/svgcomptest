import React from 'react';
// import './App.css';
import {useMst} from "./models/Root";
// import SvgComp from "./components/SvgComp";
import {ISVGData, SVGData} from "./models/SVGStore";
// import {observer} from "mobx-react";
import {
  // LayersControl,
  MapContainer,
  // LayerGroup,
  TileLayer,
  // SVGOverlay
} from "react-leaflet";
import Grid from "./CirclesLayer";
// import "leaflet/dist/leaflet.css";

function App() {

    return (
                <MapContainer
                  style={{ height: "700px" }}
                  scrollWheelZoom={false}
                  center={[0, 0]}
                  zoom={5}
                  maxZoom={5}
                >
                    <Grid />
                </MapContainer>
    );
}

export default App;

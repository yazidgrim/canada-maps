import mapStyles from './map-styles';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {ScatterplotLayer} from '@deck.gl/layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

const sourceData = './CanadianPostalCodes.json';

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Longitude, d.Latitude],
    getFillColor: [255, 140, 0, 100]
});

const heatmap = () => new HeatmapLayer({
    id: 'heat',
    opacity: 0.3,
    data: sourceData,
    getPosition: d => [d.Longitude, d.Latitude],
    //getWeight: d => d,
    radiusPixels: 40,
    weightsTextureSize: 512
});

window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 60.0, lng: -100.0},
        zoom: 4,
        styles: mapStyles
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot(),
            heatmap(),
            //hexagon()
        ]
    });

    overlay.setMap(map);
    
}
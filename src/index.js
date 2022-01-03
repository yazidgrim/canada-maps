import mapStyles from './map-styles'
window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 60.0, lng: -100.0},
        zoom: 4,
        styles: mapStyles
    });
    
}
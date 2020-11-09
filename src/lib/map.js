import L from 'leaflet';
import { formatDate } from './utils';
//<script src="node_modules/leaflet/dist/leaflet.js"></script>

//let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson, content) {
  // TODO
}

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {
  // TODO
  var map = L.map('map').setView([0,0], 2);
  fetch(URL)  
  .then((response) => response.json())
  .then(
    data => L.geoJson(data, {
    }).bindPopup(function (layer) {
      return (`<b>${layer.feature.properties.title}</b><br><br>
      ${formatDate(layer.feature.properties.time)}<br><br>
      <a href=${layer.feature.properties.url} target="_blank">Skoða nánar</a>`   //fá new line inn og bæta við tengli
        );
    }).addTo(map)
  )
  .catch((error) => {
    console.error('Villa', error);
  })


  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}

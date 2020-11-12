import L from 'leaflet';
import { formatDate } from './utils';

let map;

// Býr til markera og popups á korti.
export function createPopup(data) {
  return L.geoJson(data).bindPopup((layer) => {     /* eslint-disable-line */
    return (`<b>${layer.feature.properties.title}</b><br><br>
    ${formatDate(layer.feature.properties.time)}<br><br>
    <a href=${layer.feature.properties.url} target="_blank">Skoða nánar</a>`
    );
  }).addTo(map);
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init() {
  map = L.map('map').setView([0, 0], 2);

  // Bætum við "tiles" frá OSM sem eru open source.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
}

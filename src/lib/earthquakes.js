import { el, element, formatDate } from './utils';
import L from 'leaflet';
/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 * 
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 * 
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// const URL = './4.5_week.geojson';

const ul = document.querySelector('.earthquakes');

function showData (features) {
  
  for (let i = 0; i < features.length; i++) {

  const {
    title,
    time,
    mag,
    url,
  } = features[i].properties;

  const result = el(
    'li', el('div',
    el('h2', title),
    el('dl', 
    el('dt', 'Tími'),
    el('dd', formatDate(time)),
    el('dt', 'Styrkur'),
    el('dd', mag + " á Richter"),
    ),
    element('div', {'class': 'buttons'}, null,
    element('button', {'class': 'button'}, { click: () => { L.openPopup(map) } }, 'Sjá á korti'),
    element('a', {'href': url, 'target': "_blank"}, null, 'Skoða nánar'),
//{ click: () => { L.geoJSON().addTo(map) } }

  )));
  ul.appendChild(result);

  }

}

export async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila

  fetch(URL)  
    .then((response) => response.json())
    .then((data) => {

     showData(data.features);
 
    })
    .catch((error) => {
      console.error('Villa', error);
      //showMessage('Villa við að sækja gögn');
    })


}

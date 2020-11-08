import { el, element, formatDate } from './utils';

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
  console.log('Do I work Palli?');
  console.log(features[0].properties);

  const {
    title,
    time,
    mag,
    url,
  } = features[0].properties;

  console.log(mag + time);

  const result = el(
    'li', el('div',
    el('h2', title),
    el('dl', 
    el('dt', 'Tími'),
    el('dd', formatDate(time) + '.'),
    el('dt', 'Styrkur'),
    el('dd', mag + " á Richter"),
    ),
    element('div', {'class': 'buttons'}, null,
    element('button', {'class': 'button'}, null, 'Sjá á korti'),
    element('a', {'href': url}, null, 'Skoða nánar'),


  )));
  ul.appendChild(result);

  

}

export async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila

  fetch(URL)  
    .then((response) => response.json())
    .then((data) => {
      console.log('I also work');
      console.log(data.features[0].properties);

     showData(data.features);
      /* const earthquakes = data.features;  //þessar 4 línur frá Árna Sör
      return earthquakes.map((eq) => {
        const li = document.createElement('li');
        ul.appendChild(li);
      });*/
    })
    .catch((error) => {
      console.error('Villa', error);
      //showMessage('Villa við að sækja gögn');
    })


}

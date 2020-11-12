import { el, element, formatDate } from './utils';
import { createPopup } from './map';

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

const ul = document.querySelector('.earthquakes');

function showData(data) {
  for (let i = 0; i < data.features.length; i += 1) {
    const marker = createPopup(data.features[i]);

    const {
      title,
      time,
      mag,
      url,
      code,
    } = data.features[i].properties;

    const result = el(
      'li', el('div',
        el('h2', title),
        el('dl',
          el('dt', 'Tími'),
          el('dd', formatDate(time)),
          el('dt', 'Styrkur'),
          el('dd', `${mag} á Richter`),
          el('dt', 'Nánar'),
          el('dd', url)),
        element('div', { class: 'buttons' }, null,
          element('button', { class: code }, { click: () => { marker.openPopup(); } }, 'Sjá á korti'),
          element('a', { href: url, target: '_blank' }, null, 'Skoða nánar'))),
    );
    ul.appendChild(result);
  }
}

export async function fetchEarthquakes() {    /* eslint-disable-line */
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      createPopup(data);
      showData(data);
    })
    .catch((error) => {
      console.error('Villa', error);
    });
}

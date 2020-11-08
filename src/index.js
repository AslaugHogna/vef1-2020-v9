import { el, element, formatDate } from './lib/utils';
import { init } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
// importa öðru sem þarf...


document.addEventListener('DOMContentLoaded', async () => {
  console.log("I work");
  init();
  fetchEarthquakes();
  // Hér er allt „vírað“ saman
});

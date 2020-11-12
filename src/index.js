import { init } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';

document.addEventListener('DOMContentLoaded', async () => {
  init();
  fetchEarthquakes();

  window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    loading.remove('p');
  });
});

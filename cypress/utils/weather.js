const apiKey = '885e635bc9e95196695c313d3c0d19d8';
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall';

function getCoordinates(city) {
  return cy.request({
    url: geoUrl,
    qs: {
      q: city,
      appid: apiKey
    }
  }).then(response => {
    const data = response.body[0];
    return { city, lat: data.lat, lon: data.lon };
  });
}

function getWeatherData(lat, lon) {
  return cy.request({
    url: weatherUrl,
    qs: {
      lat,
      lon,
      exclude: 'minutely,hourly,daily,alerts',
      appid: apiKey
    }
  }).then(response => response.body.current);
}

function saveCityStats(stats, filename) {
  cy.writeFile(`cypress/fixtures/${filename}`, stats);
}

module.exports = {
  getCoordinates,
  getWeatherData,
  saveCityStats
};
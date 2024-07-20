// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getCoordinates, getWeatherData, saveCityStats } from '../utils/weather';
import { createChannel, joinChannel,renameChannel,listChannels, archiveChannel} from '../utils/slack';

Cypress.Commands.add('fetchWeatherData', (cities, filename) => {
  const stats = [];

  cities.forEach(city => {
    getCoordinates(city).then(({ city, lat, lon }) => {
      getWeatherData(lat, lon).then(weather => {
        stats.push({ city, temp: weather.temp, humidity: weather.humidity });
        if (stats.length === cities.length) {
          saveCityStats(stats, filename);
        }
      });
    });
  });
});

Cypress.Commands.add('findTopNCities', (stats, n, metric) => {
  return stats.sort((a, b) => {
    if (metric === 'temp') {
      return a.temp - b.temp;
    } else if (metric === 'humidity') {
      return b.humidity - a.humidity;
    }
  }).slice(0, n);
});
  
  Cypress.Commands.add('createChannel', (name) => {
    return createChannel(name);
  });
  
  Cypress.Commands.add('joinChannel', (channelId) => {
    return joinChannel(channelId);
  });
  
  Cypress.Commands.add('renameChannel', (channelId, newName) => {
    return renameChannel(channelId, newName);
  });
  
  Cypress.Commands.add('listChannels', () => {
    return listChannels();
  });
  
  Cypress.Commands.add('archiveChannel', (channelId) => {
    return archiveChannel(channelId);
  });
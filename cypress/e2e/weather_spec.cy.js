describe('Weather Automation', () => {
  before(() => {
    cy.fixture('city.csv').then((data) => {
      const cities = data.split('\n').slice(1).map(line => line.trim());
      cy.fetchWeatherData(cities, 'city_stats.csv');
    });
  });

  it('should find top N coldest and most humid cities', () => {
    cy.fixture('city_stats.csv').then((data) => {
      const stats = data.split('\n').slice(1).map(line => {
        const [city, temp, humidity] = line.split(',');
        return { city, temp: parseFloat(temp), humidity: parseFloat(humidity) };
      });

      const topN = 3;
      const coldestCities = cy.findTopNCities(stats, topN, 'temp');
      const mostHumidCities = cy.findTopNCities(stats, topN, 'humidity');

      cy.log('Top N Coldest Cities:', coldestCities);
      cy.log('Top N Most Humid Cities:', mostHumidCities);
    });
  });
});
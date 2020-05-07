export class ModelCities {
  constructor(serverDestinations) {
    this.cities = this._getCities(serverDestinations);
  }

  static parseCities(serverDestinations) {
    return new ModelCities(serverDestinations);
  }

  _getCities(destinations) {
    let cities = [];

    Array.from(destinations).forEach((destination) => {
      const name = destination[`name`];
      const description = destination[`description`];
      const photos = destination[`pictures`];

      const city = {
        name,
        description,
        photos,
      };

      cities.push(city);
    });

    return cities;
  }
}

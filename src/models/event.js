export class ModelEvent {
  constructor(serverEvent) {
    this.id = serverEvent[`id`];
    this.timeStart = new Date(serverEvent[`date_from`]);
    this.timeEnd = new Date(serverEvent[`date_to`]);
    this.isFavorite = Boolean(serverEvent[`is_favorite`]);
    this.price = Number(serverEvent[`base_price`]);
    this.options = this._getOptions(serverEvent[`offers`]);
    this.type = this._getType(serverEvent[`type`]);
    this.city = this._getCity(serverEvent[`destination`]);
  }

  static parseEvent(serverEvent) {
    return new ModelEvent(serverEvent);
  }

  static parseEvents(serverEvents) {
    return serverEvents.map(ModelEvent.parseEvent);
  }

  _getOptions(serverOffers) {
    let options = [];

    if (serverOffers) {
      serverOffers.forEach(({title, price, accepted}) => {
        const name = title.split(` `).map((word) => word.toLowerCase()).join(`-`);
        const description = title;
        const cost = price;
        const isChecked = accepted;

        const option = {
          name,
          description,
          cost,
          isChecked,
        };

        options.push(option);
      });
    }

    return options;
  }

  _getCity(destination) {
    const name = destination[`name`];
    const description = destination[`description`];
    const photos = destination[`pictures`];

    const city = {
      name,
      description,
      photos,
    };

    return city;
  }

  _getType(serverType) {
    const type = {
      name: serverType,
      isChecked: true,
    };

    return type;
  }
}

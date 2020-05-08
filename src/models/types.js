const transports = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

export class ModelTypes {
  constructor(serverTypes) {
    this.types = this._getTypes(serverTypes);
  }

  static parseTypes(serverTypes) {
    return new ModelTypes(serverTypes);
  }

  _getTypes(serverTypes) {
    let types = [];

    serverTypes.forEach((serverType) => {
      let options = [];
      const offers = serverType[`offers`];

      if (offers) {
        offers.forEach(({title, price}) => {
          const name = title.split(` `).map((word) => word.toLowerCase()).join(`-`);
          const description = title;
          const cost = price;

          const option = {
            name,
            description,
            cost,
          };

          options.push(option);
        });
      }


      const name = serverType[`type`];

      const isMoving = transports.some((transport) => transport === name);

      const type = {
        name,
        isMoving,
        options,
      };

      types.push(type);
    });

    return types;
  }
}

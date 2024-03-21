export class ValueNotFoundInCollection extends Error {
    constructor(
      public readonly value: string,
      public readonly collection: Record<string, any>
    ) {
      super();
      this.name = 'ValueNotFound'
      this.message = `${value} not found in provided collection ${JSON.stringify(collection)}`;
    }
  }
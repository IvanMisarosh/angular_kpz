export class CarModel {
  carModelID: number;
  modelName: string;
  dimensions?: string;
  driveTypeID?: number;
  carBrandID?: number;
  suspensionTypeID?: number;
  transmissionTypeID?: number;
  engineTypeID?: number;
  bodyTypeID?: number;

  constructor(
    carModelID: number,
    modelName: string,
    dimensions?: string,
    driveTypeID?: number,
    carBrandID?: number,
    suspensionTypeID?: number,
    transmissionTypeID?: number,
    engineTypeID?: number,
    bodyTypeID?: number
  ) {
    this.carModelID = carModelID;
    this.modelName = modelName;
    this.dimensions = dimensions;
    this.driveTypeID = driveTypeID;
    this.carBrandID = carBrandID;
    this.suspensionTypeID = suspensionTypeID;
    this.transmissionTypeID = transmissionTypeID;
    this.engineTypeID = engineTypeID;
    this.bodyTypeID = bodyTypeID;
  }
}



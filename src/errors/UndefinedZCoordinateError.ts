export default class UndefinedZCoordinateError extends Error {
  constructor() {
    super('Z coordinate is required but it is undefined.');
  }
}

// eslint-disable-next-line import/prefer-default-export
export function bindGetAnotherCoordParam(a: number): (param: number) => number {
  return (param) => -a - param;
}

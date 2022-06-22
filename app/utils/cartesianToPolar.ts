// conversion from a Cartesian coordinate system to a Polar one
export default (
  x: number,
  y: number,
  dialRadius: number,
  btnRadius: number,
): number => {

  const hC = dialRadius + btnRadius;

  if (x === 0) {

    return y > hC ? 0 : 180;

  } else if (y === 0) {

    return x > hC ? 90 : 270;

  } else {

    return (
      Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
      (x > hC ? 90 : 270)
    );
  }
};

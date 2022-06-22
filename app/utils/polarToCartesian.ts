// conversion from a Polar coordinate system to a Cartesian one
export default (
  angle: number,
  dialRadius: number,
  btnRadius: number,
): { x: number; y: number } => {

  const r = dialRadius;
  const hC = dialRadius + btnRadius;
  const a = ((angle - 90) * Math.PI) / 180;

  const x = hC + r * Math.cos(a);
  const y = hC + r * Math.sin(a);

  return { x, y };
};

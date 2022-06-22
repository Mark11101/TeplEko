export const convertHHmmToMins = (HHmm: string) : number => {
  const values = HHmm.split(':').map(value => +value);
  return values[0] * 60 + values[1];
};

export const convertMinsToHHmm = (mins: number) : string => {
  const h = Math.floor(mins / 60);
  const m = Math.floor(mins - h * 60);

  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
};

export const getHHmmDuration = (from: string, to: string) : string => {
  const start = convertHHmmToMins(from);
  const end = convertHHmmToMins(to);
  const duration = start > end ? start - end : end - start;

  return convertMinsToHHmm(duration);
};
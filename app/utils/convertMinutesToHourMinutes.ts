export default (minutes: number): string => {

  if (minutes < 0) return '00:00'

  const hours = +(minutes / 60).toFixed(2);
  const flooredHours = Math.floor(hours);
  const newMinutes = Math.round(+(hours - flooredHours).toFixed(2) * 60);

  const resultHours = `${
    flooredHours < 10 ? '0' + flooredHours : flooredHours
  }`;
  
  const resultMinutes = `${newMinutes < 10 ? '0' + newMinutes : newMinutes}`;

  return resultHours + ':' + resultMinutes;
};

import { HeatingInterval } from "../redux/types/room";
import { convertHHmmToMins } from "./timeUtils";
  
// function checks if dates intersect each other
export default (
  newStartMinutes: number,
  newEndMinutes: number,
  times: HeatingInterval[],
  id?: number,
): number => {
  
  for (let i = 0; i < times.length; i += 1) {

    const time = times[i];

    if ((!id || (id && time.id !== id)) && time.id) {

      const someStartMinutes = convertHHmmToMins(time.start);
      const someEndMinutes = convertHHmmToMins(time.end);

      if (
        // one of dots of the new slider lies between some another one
        (someStartMinutes - 15 <= newStartMinutes && newStartMinutes <= someEndMinutes) ||
        (someStartMinutes - 15 <= newEndMinutes && newEndMinutes <= someEndMinutes + 15) ||
        // two dots of some another slider lie inside new one
        (newStartMinutes <= someStartMinutes - 15 && newEndMinutes >= someEndMinutes + 15) ||
        // two dots of the new slider lie inside some another one
        (someStartMinutes <= newStartMinutes - 15 && someEndMinutes >= newEndMinutes + 15)
      ) {

        return time.id;
      }
    }
  }

  return 0;
};

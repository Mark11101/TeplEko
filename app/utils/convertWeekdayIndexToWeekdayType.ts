import { WeekdaysTypes } from "../redux/types/common"

export default (index: number): WeekdaysTypes => {

  switch (index) {

    case 1:
      return WeekdaysTypes.MONDAY
    case 2:
      return WeekdaysTypes.TUESDAY
    case 3:
      return WeekdaysTypes.WEDNESDAY
    case 4:
      return WeekdaysTypes.THURSDAY
    case 5:
      return WeekdaysTypes.FRIDAY
    case 6:
      return WeekdaysTypes.SATURDAY
    case 7:
      return WeekdaysTypes.SUNDAY
    default:
      return WeekdaysTypes.MONDAY
  }
}

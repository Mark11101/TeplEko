import { WeekdaysTypes } from "../redux/types/common"

export default (weekDayType: WeekdaysTypes): number => {

  switch (weekDayType) {

    case WeekdaysTypes.MONDAY:
      return 1
    case WeekdaysTypes.TUESDAY:
      return 2
    case WeekdaysTypes.WEDNESDAY:
      return 3
    case WeekdaysTypes.THURSDAY:
      return 4
    case WeekdaysTypes.FRIDAY:
      return 5
    case WeekdaysTypes.SATURDAY:
      return 6
    case WeekdaysTypes.SUNDAY:
      return 0
    default:
      return 1
  }
}

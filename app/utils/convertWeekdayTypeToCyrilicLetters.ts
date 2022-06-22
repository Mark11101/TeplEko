import { WeekdaysTypes } from "../redux/types/common"

export default (weekDayType: WeekdaysTypes): string => {

  switch (weekDayType) {

    case WeekdaysTypes.MONDAY:
      return 'Пн'
    case WeekdaysTypes.TUESDAY:
      return 'Вт'
    case WeekdaysTypes.WEDNESDAY:
      return 'Ср'
    case WeekdaysTypes.THURSDAY:
      return 'Чт'
    case WeekdaysTypes.FRIDAY:
      return 'Пт'
    case WeekdaysTypes.SATURDAY:
      return 'Сб'
    case WeekdaysTypes.SUNDAY:
      return 'Вс'
    default:
      return 'Пн'
  }
}

import { WeekdaysTypes } from "../redux/types/common"

export default (weekDayType: WeekdaysTypes): string => {

  switch (weekDayType) {

    case WeekdaysTypes.MONDAY:
      return 'Понедельник'
    case WeekdaysTypes.TUESDAY:
      return 'Вторник'
    case WeekdaysTypes.WEDNESDAY:
      return 'Среда'
    case WeekdaysTypes.THURSDAY:
      return 'Четверг'
    case WeekdaysTypes.FRIDAY:
      return 'Пятница'
    case WeekdaysTypes.SATURDAY:
      return 'Суббота'
    case WeekdaysTypes.SUNDAY:
      return 'Воскресенье'
    default:
      return 'Понедельник'
  }
}

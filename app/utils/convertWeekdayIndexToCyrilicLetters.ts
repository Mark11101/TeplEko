export default (index: number): string => {

  switch (index) {

    case 1:
      return 'Пн'
    case 2:
      return 'Вт'
    case 3:
      return 'Ср'
    case 4:
      return 'Чт'
    case 5:
      return 'Пт'
    case 6:
      return 'Сб'
    case 7:
      return 'Вс'
    default:
      return 'Пн'
  }
}

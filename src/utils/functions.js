export function getCurrent7DaysTime () {
    const currentDate = new Date()
  
    const seventhDayFromToday = new Date(currentDate)
    seventhDayFromToday.setDate(currentDate.getDate() + 7)
  
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
  
    const endOfDaySeventhDay = new Date(
      seventhDayFromToday.getFullYear(),
      seventhDayFromToday.getMonth(),
      seventhDayFromToday.getDate(),
      23,
      59,
      59,
      999
    )
  
    const startTime = startOfDay
    const endTime = endOfDaySeventhDay
  
    return { startTime: startTime, endTime: endTime }
  }
  
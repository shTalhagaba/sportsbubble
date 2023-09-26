import dayjs from "dayjs"

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
  
  export function UpdateEvents (events, currentTime, timeNow) {
    let updatedEvents = events
      ?.filter((event) => {
        const endEvent = new Date(event.endTime)
        return (
          endEvent.getTime() > new Date(currentTime).getTime() &&
          event?.id !== '9f25117c-78ed-4af1-a2fb-ed5cef8ed414' &&
          event?.rightsHoldersConnection?.edges?.length >= 1
        )
      })
      ?.map((currentEvent) => {
        const event = { ...currentEvent }
        const startEvent = new Date(event.startTime)
        const endEvent = new Date(event.endTime)
        if (
          new Date(timeNow).getTime() >= startEvent.getTime() &&
          new Date(timeNow).getTime() < endEvent.getTime()
        ) {
          event.live = true
        } else {
          event.live = false
        }
        const dateObject = new Date(currentTime)
        dateObject.setMinutes(0)
        dateObject.setSeconds(0)
        let durationMillis = 0
        if (new Date(dateObject) >= endEvent) {
          durationMillis = 0
        } else {
          const currentHour = new Date(new Date(dateObject).getTime())
          currentHour.setMinutes(0, 0, 0)
          durationMillis = endEvent.getTime() - currentHour.getTime()
        }
        const durationMinutes = durationMillis / (1000 * 60)
        const gradPerMinute = 29 / 60
        event.endGrad = Math.round(durationMinutes * gradPerMinute)
  
        let startMillis = 0
        if (dateObject <= startEvent) {
          startMillis = startEvent.getTime() - new Date(dateObject).getTime()
        } else {
          startMillis = 0
        }
        const startMinutes = startMillis / (1000 * 60)
        event.startGrad = Math.round(startMinutes * gradPerMinute)
        if (event.endGrad >= 33 && event.endGrad <= 34) {
          event.endGrad = 36
        }
        if (event.startGrad >= 33 && event.startGrad <= 34) {
          event.startGrad = 36
        }
        if (event.endGrad >= 66 && event.endGrad <= 68) {
          event.endGrad = 68
        }
        if (event.startGrad >= 66 && event.startGrad <= 68) {
          event.startGrad = 68
        }
        if (event.live) {
          event.startGrad = 0
        }
        return event
      })
      const currentTime2 = dayjs(currentTime).minute(0)
    updatedEvents = updatedEvents?.filter((event) => {
      const eventStart = dayjs(event.startTime)
      const eventEnd = dayjs(event.endTime)
      return (
        eventStart.diff(currentTime2, 'minute') <= 176 &&
        eventEnd > currentTime2
      )
    })
  
    return updatedEvents
  }
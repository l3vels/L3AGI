export const aCHouseHoldPowerPoint = (data: any, chargerSize: number) => {
  const hrs = (data.battery_capacity_rated / chargerSize).toFixed(1)

  const [hour, minute] = hrs.split('.')
  const minuteToHour = (6 * parseInt(minute)).toString()

  return `${hour.padStart(2, '0')}:${minuteToHour.padStart(2, '0')}`
}

export const dCPower = (data: any, chargerSize: number) => {
  const hrs = (data.battery_capacity_rated / chargerSize).toFixed(1)

  const [hour, minute] = hrs.split('.')
  const minuteToHour = (6 * parseInt(minute)).toString()

  return `${hour.padStart(2, '0')}:${minuteToHour.padStart(2, '0')}`
}

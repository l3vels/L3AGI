type rangeNEDCProps = {
  range_battery: number
  body_type: string
}

export const rangeNEDC = ({ range_battery, body_type }: rangeNEDCProps) => {
  const WLTP = range_battery

  if (body_type === 'convertible' || body_type === 'sedan') {
    return Math.floor(WLTP * 1.23)
  }

  if (body_type === 'hatchback' || body_type === 'coupe') {
    return Math.floor(WLTP * 1.2)
  }

  if (
    body_type === 'suv' ||
    body_type === 'wagon' ||
    body_type === 'utility' ||
    body_type === 'mpv'
  ) {
    return Math.floor(WLTP * 1.25)
  }

  if (
    body_type === 'van' ||
    body_type === 'pickup' ||
    body_type === 'bus' ||
    body_type === 'truck'
  ) {
    return Math.floor(WLTP * 1.16)
  }

  return ''
}

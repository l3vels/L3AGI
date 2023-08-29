export const getDeepKeys = (name: any, item: any) => {
  const values = name.split('.')

  if (values.length > 1) {
    const reducer = (accumulator: any, currentValue: any) => {
      if (!accumulator || !accumulator[currentValue]) return ''
      return (accumulator = accumulator[currentValue])
    }
    return values.reduce(reducer, item)
  }

  return item[name]
}

export const formatRowValue = (value: any, format = '') => (value ? `${value} ${format}` : 'NA')

export const formatPrice = (price: any) =>
  price.toLocaleString('en-AU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

export const setDeepKeys = (path: any, item: any, value: any) => {
  let schema = item // a moving reference to internal objects within obj
  const pList = path.split('.')
  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }

  schema[pList[len - 1]] = value
  return item
}

export const queryStringFromObject = (api: any, data: any) => {
  let queryString = Object.keys(data)
    .map(function (key) {
      return `${key}=${encodeURIComponent(data[key])}`
    })
    .join('&')

  queryString = api && queryString ? `?${queryString}` : queryString ? queryString : ''

  return api ? `${import.meta.env.REACT_APP_SERVICES_URL}/fleet${api}${queryString}` : queryString
}

export const parseDataForSelect = (array: any, labelKey: string, valueKey: string) =>
  array.map((item: any) => ({
    label: item[labelKey],
    value: item[valueKey],
  }))

export const strCutter = (str: string | number, len = 20, point?: boolean | string) =>
  typeof str === 'string' && str.length > len
    ? `${str.substr(0, len)}${point && `${typeof point === 'string' ? `... ${point}` : '...'}`}`
    : str

export const fileTypeRestriction = (file: File, arr: string[]) => {
  if (!arr.includes(file.type)) return false
  return true
}

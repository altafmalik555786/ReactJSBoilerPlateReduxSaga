export const removeOccurences = function (
  str: string,
  occurences: Array<string>
) {
  let string = str
  occurences.forEach((element) => {
    string = string.replace(element, '')
  })
  return string
}

export const truncate = function (
  str: string,
  length: number = 16,
  ending: string = '...'
) {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

export const kFormatter = function (num: number) {
  return num >= 1e3 ? +(num / 1e3).toFixed(1) + 'k' : num
}

export const trim = (text: string, size: number): string => {
  return text && text.length > size ? `${text.slice(0, size)}...` : text
}

export const toSnakeCase = (text: string) => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')
}

import { FieldErrorsImpl, get } from 'react-hook-form'
import { conditionSpecial, passwordSpecialCharsReg } from './constants'

export const checkError = (name: string, errors: FieldErrorsImpl) => {
  const searchErrorRes = get(errors, name)
  const { message } = searchErrorRes || {}
  return message
}

export const isValidUrl = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return pattern.test(str)
}

export const checkUrl = (v: string) => (isValidUrl(v) ? true : 'Must be valid link')

export const getFinallyValidateRules = (rules: object, validateRules: object | undefined) => {
  if (!validateRules) return rules
  if (!validateRules.hasOwnProperty('validate') || !rules.hasOwnProperty('validate')) return { ...rules, validateRules }
  //@ts-ignore:next-line
  const concatValidateRules = { validate: { ...rules.validate, ...validateRules.validate } }
  return { ...rules, ...validateRules, ...concatValidateRules }
}

export const isObjectNotEmpty = (objectName: object) => {
  return Object.keys(objectName).length > 0
}

export const createFormDataFromObject = (data: { [key: string]: any }): FormData => {
  const formDataContent = new FormData()

  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue
    formDataContent.set(key, data[key])
  }

  return formDataContent
}

export const splitArr = (arr: any[], chunks: number) => {
  const result = []

  for (let i = 0; i < arr.length; i += chunks) result.push(arr.slice(i, i + chunks))

  return result
}

export const checkIfContainsSpecial = (v: string) => (conditionSpecial.some((el) => v.includes(el)) ? 'Must not contain ‘ or ”' : true)

export const checkPassword = (v: string) => {
  // Обычно true это валидация прошла, а строка является ошибкой, но тут это кастомная проверка
  const capitalized = Array.from(v).some((char) => char === char.toUpperCase() && char !== char.toLowerCase()) ? false : 'capital letter'
  const number = Array.from(v).some((char) => !Number.isNaN(parseInt(char))) ? false : 'number'
  const special = passwordSpecialCharsReg.test(v) ? false : 'special sign'
  const neededLength = v.length >= 5 ? false : '5 characters'

  const errors: (string | false)[] = [capitalized, number, special, neededLength]

  let errorString = 'Password may contains: '

  errors.forEach((err, index) => {
    if (err === false) return
    const lastIndex = errors.findLastIndex((v) => v !== false)
    const last = lastIndex === index
    errorString += `${err}${last ? '' : ', '}`
  })

  return !capitalized && !number && !special && !neededLength ? true : errorString
}

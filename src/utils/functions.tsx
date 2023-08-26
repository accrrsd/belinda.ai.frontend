import { FieldErrorsImpl, get } from 'react-hook-form'

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
  const concatValidateRules = { ...rules.validate, ...validateRules.validate }
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

const conditionSpecial = [`'`, `"`, '`']

export const checkIfContainsSpecial = (v: string) => (conditionSpecial.some((el) => v.includes(el)) ? 'Must not contain ‘ or ”' : true)

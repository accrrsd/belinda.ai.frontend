import { FieldErrorsImpl } from 'react-hook-form'

export const checkError = (name: string, errors: FieldErrorsImpl) => (errors && errors[name] ? (errors[name]!.message as string) : false)

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

export const getFinallyRules = (rules: object, additionalRules: object | undefined) => {
  if (!additionalRules) return rules
  if (!additionalRules.hasOwnProperty('validate') || !rules.hasOwnProperty('validate')) return { ...rules, additionalRules }
  //@ts-ignore:next-line
  const validateRules = { ...rules.validate, ...additionalRules.validate }
  return { ...rules, ...additionalRules, ...validateRules }
}

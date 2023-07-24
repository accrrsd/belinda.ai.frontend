const currentUrl = 'http://185.137.234.125:8000'

const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

const checkResponseWithoutContent = (res: any) => !res.ok && Promise.reject(`Ошибка: ${res.status}`)

export const postUser = (content: FormData) => {
  const url = `${currentUrl}/create_user`
  return fetch(url, {
    method: 'POST',
    body: content,
  }).then(checkResponseWithoutContent)
}

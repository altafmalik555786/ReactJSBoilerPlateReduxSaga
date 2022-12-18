const AUTH_TOKEN = 'token'
export function getTokenFromCookies() {
  return localStorage.getItem(AUTH_TOKEN) || ''
}

export function setTokenIntoCookies(token: string) {
  localStorage.setItem(AUTH_TOKEN, token)
}
export function flushTokenFromCookies() {
  localStorage.removeItem(AUTH_TOKEN)
}
export function getAuthorizationHeader() {
  return `Bearer ${getTokenFromCookies()}`
}

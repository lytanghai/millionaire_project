// utils/token.js
export function getToken() {
  return localStorage.getItem('token') || ''
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function isTokenExpired(token) {
  if (!token) return true
  try {
    // JWT format: header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp
    if (!exp) return true
    const now = Math.floor(Date.now() / 1000)
    return now >= exp
  } catch (e) {
    return true
  }
}

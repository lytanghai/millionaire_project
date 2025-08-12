export function handleAuthError(error) {
    if (error.response?.status === 403) {
        alert('Session expired or unauthorized. Please login again.')
        localStorage.removeItem('jwt_token')
        window.location.href = '/'
    } else {
        alert('An error occurred while fetching data.')
    }
}
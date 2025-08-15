export function handleAuthError(error) {
    if (error.response?.status === 403) {
        alert('Session expired or unauthorized. Please login again.')
        localStorage.removeItem('jwt_token')
        window.location.href = '/'
    } else {
        alert('An error occurred while fetching data.')
    }
}

export function calculateIntradayVolatility(high, low) {
  if (low <= 0) return 0; // avoid division errors

  const k = 1 / Math.sqrt(4 * Math.log(2));
  return k * Math.log(high / low);
}

export const backend_url = import.meta.env.VITE_API_URL;
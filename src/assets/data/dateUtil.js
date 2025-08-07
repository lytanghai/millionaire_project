export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Convert ISO date string to GMT+7 formatted string
export function formatDateToGMT7(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  // convert to milliseconds then add 7 hours in ms
  const gmt7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000)
  return gmt7Date.toISOString().replace('T', ' ').replace('Z', '') // show YYYY-MM-DD HH:mm:ss (without Z)
}
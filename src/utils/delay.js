

function delay(delay = 2000) {
  console.log('Delaying for ', delay)
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function delayFromISOString(isoString) {
  const timestamp = new Date(isoString).getTime()
  const now = Date.now()
  const delayMs = timestamp - now

  return Math.max(0, delayMs)
}

export { delay, delayFromISOString }

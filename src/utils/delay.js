

function delay(delay = 2000) {
  console.log('Delaying for ', delay)
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export { delay }

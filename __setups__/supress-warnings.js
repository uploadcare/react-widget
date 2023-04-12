const originalConsoleWarn = console.warn

console.warn = (...args) => {
  if (
    args[0] === 'Camera is not allowed for HTTP. Please use HTTPS connection.'
  ) {
    return
  }
  originalConsoleWarn(...args)
}

export function password (value) {
  const regex = /^[\w]+$/
  return !regex.test(value)
}

export function email (value) {
  const regex = /^[\w-]+@[\w-]+(\.[\w-]+)+$/
  return !regex.test(value)
}

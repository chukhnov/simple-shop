export function createAction(type) {
  const action = payload => ({
    type: type,
    payload,
  })
  return action
}
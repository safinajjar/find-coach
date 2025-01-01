export default {
  registerCoach(state, payload) {
    state.coaches.push(payload)
    state.userIsCoach = true
  },
  setCoaches(state, payload) {
    state.coaches = payload
  },
  setError(state, payload) {
    state.error = payload
  },
}

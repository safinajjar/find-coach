export default {
  addRequest(state, payload) {
    state.requests.push(payload)
  },
  setRequests(state, payload) {
    state.requests = payload
  },
  setError(state, payload) {
    state.error = payload
  },
}

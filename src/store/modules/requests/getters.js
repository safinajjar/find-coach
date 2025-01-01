export default {
  requests(state, _, __, rootGetters) {
    return state.requests.filter((req) => req.coachId === rootGetters.userId)
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0
  },
}

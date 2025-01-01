export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(state) {
    return state.userIsCoach
  },
  error(state) {
    return state.error
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    if (!lastFetch) {
      return true
    } else {
      const currentTimeStamp = new Date().getTime()
      return (currentTimeStamp - lastFetch) / 1000 > 60
    }
  },
}

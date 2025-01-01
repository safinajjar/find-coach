export default {
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      ...data,
    }
    context.commit('registerCoach', coachData)
  },
}

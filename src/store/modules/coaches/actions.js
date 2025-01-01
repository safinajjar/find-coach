import axios from 'axios'

export default {
  registerCoach(context, data) {
    const coachId = context.rootGetters.userId
    const coachData = data

    axios({
      method: 'put',
      url: `https://vue-http-demo-8ad70-default-rtdb.firebaseio.com/coaches/${coachId}.json`,
      data: coachData,
    }).then(() => {
      context.commit('registerCoach', {
        ...coachData,
        id: coachId,
      })
    })
  },
  loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }

    axios({
      method: 'get',
      url: 'https://vue-http-demo-8ad70-default-rtdb.firebaseio.com/coaches.json',
    })
      .then((response) => {
        const coaches = []

        for (const key in response.data) {
          const coach = {
            id: key,
            firstName: response.data[key].firstName,
            lastName: response.data[key].lastName,
            areas: response.data[key].areas,
            hourlyRate: response.data[key].hourlyRate,
            description: response.data[key].description,
          }

          coaches.push(coach)
        }

        context.commit('setCoaches', coaches)
        context.commit('setFetchTimestamp')
      })
      .catch((error) => {
        const errorMessage = error.message || 'Failed to fetch!'
        context.dispatch('setError', errorMessage)
      })
  },
  setError(context, payload) {
    context.commit('setError', payload)
  },
}

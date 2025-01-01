import axios from 'axios'

export default {
  contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }
    axios({
      url: `https://vue-http-demo-1f3b4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      method: 'post',
      data: newRequest,
    })
      .then((res) => {
        newRequest.id = res.data.name
        newRequest.coachId = payload.coachId
      })
      .catch((error) => {
        throw new Error(error.message || 'Failed to send request.')
      })

    context.commit('addRequest', newRequest)
  },
  fetchRequests(context) {
    const coachId = context.rootGetters.userId
    axios
      .get(`https://vue-http-demo-8ad70-default-rtdb.firebaseio.com/requests/${coachId}.json`)
      .then((res) => {
        const requests = []
        const data = res.data
        for (const key in data) {
          const request = {
            id: key,
            coachId,
            userEmail: data[key].userEmail,
            message: data[key].message,
          }
          requests.push(request)
        }
        context.commit('setRequests', requests)
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

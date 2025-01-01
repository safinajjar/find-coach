import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      error: null,
      requests: [],
    }
  },
  mutations,
  actions,
  getters,
}

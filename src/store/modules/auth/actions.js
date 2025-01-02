import axios from 'axios'

export default {
  async login(context, payload) {
    try {
      const response = await axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfBNsF_hJWe7Ns-momqiuwsjJHz7qnIeM`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        },
      })
      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        tokenExpiration: response.data.expiresIn,
      })
    } catch (error) {
      console.log(error)
      throw new Error(error.message || 'Failed to authenticate. Check your login data.')
    }
  },
  async signup(context, payload) {
    try {
      const response = await axios({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfBNsF_hJWe7Ns-momqiuwsjJHz7qnIeM`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        },
      })
      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        tokenExpiration: response.data.expiresIn,
      })
    } catch (error) {
      console.log(error)
      throw new Error(error.message || 'Failed to authenticate. Check your login data.')
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    })
  },
}

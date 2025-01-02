import axios from 'axios'

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    })
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    })
  },
  async auth(context, payload) {
    const mode = payload.mode
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfBNsF_hJWe7Ns-momqiuwsjJHz7qnIeM'

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfBNsF_hJWe7Ns-momqiuwsjJHz7qnIeM'
    }
    try {
      const response = await axios({
        url,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        },
      })

      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('userId', response.data.localId)

      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        tokenExpiration: response.data.expiresIn,
      })
    } catch (error) {
      throw new Error(error.message || 'Failed to authenticate. Check your login data.')
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      })
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

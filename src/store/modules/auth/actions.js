import axios from 'axios'

let timer

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

      const tokenExpiration = new Date().getTime() + +response.data.expiresIn * 1000

      timer = setTimeout(() => {
        context.dispatch('autoLogout')
      }, tokenExpiration)

      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('userId', response.data.localId)
      localStorage.setItem('tokenExpiration', tokenExpiration)

      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
      })
    } catch (error) {
      throw new Error(error.message || 'Failed to authenticate. Check your login data.')
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    // Check if the token is still valid
    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
}

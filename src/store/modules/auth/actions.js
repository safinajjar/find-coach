import axios from 'axios'

export default {
  login() {},
  signup(context, payload) {
    axios({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfBNsF_hJWe7Ns-momqiuwsjJHz7qnIeM`,
      method: 'POST',
      data: {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      },
    })
      .then((response) => {
        console.log(response)
        context.commit('setUser', {
          token: response.data.idToken,
          userId: response.data.localId,
          tokenExpiration: response.data.expiresIn,
        })
      })
      .catch((error) => {
        console.log(error)
        throw new Error(error.message || 'Failed to authenticate. Check your login data.')
      })
  },
}

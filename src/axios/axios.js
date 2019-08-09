import axios from 'axios'

const API_URL = process.env.API_URL || 'https://127.0.0.1:8000/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch('AUTH_LOGOUT')
          // you can also redirect to /login if needed !
        }
        throw err
      })
    })
  }
})

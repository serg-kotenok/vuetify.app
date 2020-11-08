import JwtDecode from 'jwt-decode'

export default class User {
  constructor ({ login, settings }) {
    this.login = login
    this.settings = settings
  }

  static from (token) {
    try {
      let obj = JwtDecode(token)
      if (obj != null) {
        return new User(obj)
      }
    } catch (_) {
    }
    return null
  }

  get status () {
    return User.from()
  }
}

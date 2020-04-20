<script>
import * as auth from './auth'
export default {
  name: 'Logout',
  created () {
    this.$store.dispatch(auth.LOGOUT).then(() => {
      this.$router.push('/')
    })
  }
}
</script>

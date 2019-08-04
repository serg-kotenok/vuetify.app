<template>
    <div></div>
</template>

<script>
import { LOGOUT } from './auth'
export default {
  name: 'Logout',
  created () {
    //    delete localStorage.token
    console.log('logout')
    this.$store.dispatch(LOGOUT)
    this.$router.push('/')
  }
}
</script>

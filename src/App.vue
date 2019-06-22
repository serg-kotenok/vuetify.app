<template>
  <v-app dark>
    <navbar></navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <v-app app>
    <app-header/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  created () {
    this.$vuetify.theme.dark = false
  }
}
</script>

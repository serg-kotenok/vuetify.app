<template>
  <v-app dark>
    <app-header/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

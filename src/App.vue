<template>
  <v-app dark>
    <!--
    <v-navigation-drawer app temporary hideOverlay></v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Health Diary</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
-->
    <navbar></navbar>
<!--
    <v-content>
      <v-container fluid>
        <v-flex xs1>
          <router-view></router-view>
        </v-flex>
      </v-container>
    </v-content>
-->
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

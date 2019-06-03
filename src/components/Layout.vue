<template>
  <v-app dark>
    <v-navigation-drawer app></v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Health Diary</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-flex xs12>
<!--          <router-view></router-view> -->
        </v-flex>
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>

</style>

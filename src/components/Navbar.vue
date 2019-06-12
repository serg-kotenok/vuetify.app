<template>

<div>

  <v-navigation-drawer app v-model="showDrawer" clipped>

<!--      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">-->
    <v-img :aspect-ratio="2/1" src="/static/navigation-drawer-top-2.jpg">
      <v-layout pa-2 column fill-height class="lightbox white--text">
<!--        <v-spacer></v-spacer>-->
        <v-flex shrink>
          <div class="subheading" style="font-weight: bold">Author: Sergey Kotenok</div>
          <div class="body-1">mailto: serg.kotenok@gmail.com</div>
        </v-flex>
      </v-layout>
    </v-img>

    <v-list>

      <v-divider></v-divider>

      <v-list-tile v-if="link.text !== undefined"
                   v-for="(link, index) in links"
                   v-bind:key="index"
                   v-bind:to="link.href">

          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.text"></v-list-tile-title>
          </v-list-tile-content>

      </v-list-tile>
      <v-divider v-else></v-divider>

      <v-divider></v-divider>

    </v-list>
  </v-navigation-drawer>

  <v-toolbar app>
<!--    <v-toolbar-side-icon class="hidden-md-and-up" v-on:click="drawerHidden = !drawerHidden"></v-toolbar-side-icon>-->
    <v-toolbar-side-icon v-on:click="showDrawer = !showDrawer"></v-toolbar-side-icon>

    <v-toolbar-title>Yet Another Health Diary</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="(link, index) in links" v-bind:key="index" v-bind:to="link.href" v-if="link.text !== undefined">
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>

</div>

</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      showDrawer: true,
      links: [
        { text: 'Home', icon: 'home', href: '/' },
        { },
        { text: 'Register', icon: 'face', href: '/register' },
        { text: 'Login', icon: 'account_box', href: '/login' },
        { },
        { text: 'Add Event', icon: 'add', href: '/add' }
      ]
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <!-- Рут элемент -->
  <div>
    <!-- Навигационная вертикальное меню -->
    <v-navigation-drawer app clipped v-model="showDrawer">
      <!-- Заголовок с клипартом -->
      <v-img :aspect-ratio="2/1" src="/static/navigation-drawer-top.jpg">
<!--
        <v-layout pa-2 column fill-height class="lightbox">
        <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading blue--text font-weight-bold shades--text">Author: Sergey Kotenok</div>
            <div class="body-1 green--text font-weight-bold">mailto: serg.kotenok@gmail.com</div>
          </v-flex>
        </v-layout>
-->
      </v-img>
      <!-- Опции меню -->
      <v-list subheader>
        <!-- Разделитель начальный -->
        <v-divider></v-divider>
        <!-- Пункты меню -->
        <v-list-tile
          v-if="link.text !== undefined"
          v-for="(link, index) in links"
          v-bind:key="index"
          v-bind:to="link.href"
        >

          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.text"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
        <!-- Разделитель -->
        <v-divider v-else></v-divider>
        <!-- Разделитель оконечный -->
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <!-- Горизонтальное меню (тулбар) -->
    <v-toolbar app dense>
      <!-- Гамбургер -->
      <v-toolbar-side-icon v-on:click="showDrawer = !showDrawer"></v-toolbar-side-icon>
      <!-- Заголовок -->
      <v-toolbar-title>Yet Another Health Diary</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Кнопки -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               v-for="(link, index) in links"
               v-bind:key="index"
               v-bind:to="link.href"
               v-if="link.text !== undefined"
        >
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

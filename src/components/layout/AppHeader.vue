<template>
  <!-- Рут элемент -->
  <div>
    <!-- Навигационная вертикальное меню -->
    <v-navigation-drawer app clipped v-model="showDrawer">
      <!-- Заголовок с клипартом -->
      <v-img :aspect-ratio="2/1" src="/static/navigation-drawer-top.jpg"></v-img>
      <!-- Опции меню -->
      <v-list subheader>
        <!-- Разделитель начальный -->
        <v-divider></v-divider>
        <!-- Пункты меню -->
        <div v-for="(link, index) in links" v-bind:key="index">
          <!-- Разделитель -->
          <v-divider v-if="link.text === undefined"></v-divider>
          <!-- Пункт меню обычный -->
          <v-list-tile v-else-if="link.href !== undefined" v-bind:to="link.href">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="link.text"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- Меню с выпадением -->
          <v-list-group
            v-else-if="link.sub_links !== undefined"
            v-bind:prepend-icon="link.icon">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{ link.text }}</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(sub_link, index) in link.sub_links"
              v-bind:key="index"
              v-bind:to="sub_link.href"
              v-if="isAuthenticated == sub_link.isAuth">
              <v-list-tile-action>
                <v-icon right>{{ sub_link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="sub_link.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </div>
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
        <template
          v-for="(link, index) in links"
          v-if="link.text !== undefined && link.href !== undefined"
        >
          <v-btn
            v-show="!link.fab"
            flat
            :key="index"
            :to="link.href"
          >
              <v-icon left>{{ link.icon }}</v-icon>
              {{ link.text }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            flat
            v-for="(sub_link, index) in link.sub_links"
            :key="index"
            :to="sub_link.href"
            v-show="isAuthenticated == sub_link.isAuth">
            <v-icon left>{{ sub_link.icon }}</v-icon>
            {{ sub_link.text }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <v-btn
      v-for="(link, index) in links"
      v-if="isHomePage && link.fab"
      fab
      large
      fixed
      right
      bottom
      color="pink"
      style="margin-bottom: 40px"
      :key="index"
    >
      <v-icon>{{ link.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data: () => {
    return {
      showDrawer: true,
      links: [
        { text: 'Home', icon: 'home', href: '/' },
        { text: 'User',
          icon: 'account_circle',
          sub_links: [
            { text: 'Register', icon: 'face', href: '/register', isAuth: false },
            { text: 'Login', icon: 'account_box', href: '/login', isAuth: false },
            { text: 'Settings', icon: 'settings', href: '/settings', isAuth: true },
            { text: 'Exit', icon: 'exit_to_app', href: '/logoff', isAuth: true }
          ]
        },
        { text: 'Add Event', icon: 'add', href: '/add', fab: true }
      ]
    }
  },
  computed:
  {
    isHomePage () {
      return this.$route.path === '/'
    },
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>

<style scoped>

</style>

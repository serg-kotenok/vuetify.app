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
          <v-list-group v-else-if="link.sub_links !== undefined" v-bind:prepend-icon="link.icon">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{ link.text }}</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(sub_link, index) in link.sub_links" v-bind:key="index" v-bind:to="sub_link.href">
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
        <v-btn flat
               v-for="(link, index) in links"
               v-bind:key="index"
               v-bind:to="link.href"
               v-if="link.text !== undefined && link.href !== undefined">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
        <v-btn v-if="isAuthenticated">
          EXIT
          <v-icon right="">exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
            { text: 'Register', icon: 'face', href: '/register' },
            { text: 'Login', icon: 'account_box', href: '/login' },
            { text: 'Settings', icon: 'settings', href: '/settings' },
            { text: 'Exit', icon: 'exit_to_app', href: '/logoff' }
          ]
        },
        { text: 'Add Event', icon: 'add', href: '/add' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>

<style scoped>

</style>

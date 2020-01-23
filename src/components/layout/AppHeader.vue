<template>
  <!-- Рут элемент -->
  <div>
    <!-- Навигационная вертикальное меню -->
    <v-navigation-drawer app clipped v-model="showDrawer">
      <!-- Заголовок с клипартом -->
      <v-img :aspect-ratio="2/1" src="/static/navigation-drawer-top.jpg"></v-img>
      <!-- Разделитель начальный -->
      <v-divider></v-divider>
      <!-- Опции меню -->
      <v-list subheader>
        <!-- Пункты меню -->
        <div
          v-for="(link, index) in links"
          :key="index"
        >
          <!-- Разделитель -->
          <v-divider
            v-if="link.text === undefined"
          ></v-divider>
          <!-- Пункт меню обычный -->
          <v-list-item
            v-else-if="link.href !== undefined"
            :to="link.href"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text"/>
            </v-list-item-content>
          </v-list-item>
          <!-- Меню с выпадением -->
          <v-list-group
            v-else-if="link.sub_links !== undefined"
            :prepend-icon="link.icon"
            no-action
            class="shift-icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="link.text"/>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(sub_link, index) in link.sub_links"
              v-if="isAuthenticated == sub_link.isAuth"
              :key="index"
              :to="sub_link.href"
            >
              <v-icon left>{{ sub_link.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title v-text="sub_link.text"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <!-- Разделитель оконечный -->
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <!-- Горизонтальное меню (тулбар) -->
    <v-app-bar app dense>
      <!-- Гамбургер -->
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon>
      <!-- Заголовок -->
      <v-toolbar-title>Yet Another Health Diary</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Кнопки -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(link, index) in links"
          v-if="link.text !== undefined && link.href !== undefined"
          v-show="!link.fab"
          text
          :key="index"
          :to="link.href"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
        <template v-else>
          <v-btn
            v-for="(sub_link, sub_index) in link.sub_links"
            v-if="isAuthenticated == sub_link.isAuth"
            text
            :key="100 + sub_index"
            :to="sub_link.href"
          >
            <v-icon left>{{ sub_link.icon }}</v-icon>
            {{ sub_link.text }}
            </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Летающие кнопки -->
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
import { LOGOUT } from '@/components/user/auth'
export default {
  name: 'Navbar',
  data: () => {
    return {
      showDrawer: false,
      links: [
        { text: 'Home', icon: 'home', href: '/' },
        { text: 'User',
          icon: 'account_circle',
          sub_links: [
            { text: 'Register', icon: 'face', href: '/register', isAuth: false },
            { text: 'Login', icon: 'account_box', href: '/login', isAuth: false },
            { text: 'Settings', icon: 'settings', href: '/settings', isAuth: true },
            { text: 'Exit', icon: 'exit_to_app', href: '/logout', isAuth: true }
          ]
        },
        { text: 'Add Event', icon: 'add', href: '/add', fab: true }
      ]
    }
  },
  computed: {
    isHomePage () {
      return this.$route.path === '/'
    },
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$route.push('/')
      })
    }
  }
}
</script>

<style>
div.v-list-group__header__prepend-icon {
  margin-right: 8px !important;
}
.v-application--is-ltr .v-list-group--no-action>.v-list-group__items>div>.v-list-item {
  padding-left: 16px !important;
}
</style>

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <event-list :items="items"></event-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import eventList from './event/EventList'
export default {
  name: 'Home',
  data: () => {
    return {
      items: [
        {
          items_date: '10.07.2019',
          items: [
            {
              entry_date: '10.07.2019',
              entry_time: '16:05',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            },
            {
              entry_date: '10.07.2019',
              entry_time: '12:33',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            },
            {
              entry_date: '10.07.2019',
              entry_time: '10:55',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            }
          ]
        },
        {
          items_date: '09.07.2019',
          items: [
            {
              entry_date: '09.07.2019',
              entry_time: '16:05',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            },
            {
              entry_date: '09.07.2019',
              entry_time: '12:33',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            },
            {
              entry_date: '09.07.2019',
              entry_time: '10:55',
              entry_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              bread_units: 4,
              glucose: 5.80,
              insulin_l: 0,
              insulin_s: 8,
              photo: null
            }
          ]
        }
      ]
    }
  },
  components: {
    eventList
  }
}
</script>

<style scoped>

</style>

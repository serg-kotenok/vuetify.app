<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1>Home</h1>
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
          entry_time: '16:05'
        },
        {
          entry_time: '12:33'
        },
        {
          entry_time: '10:55'
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

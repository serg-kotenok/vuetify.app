<template>
  <div>
    <v-layout
      v-for="(item, index) in items"
      :key="index"
      row
    >
      <v-flex xs12>
        <event-item
          :event="item"
        >
        </event-item>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import EventItem from './EventItem'
export default {
  name: 'EventList',
  props: [
    'items'
  ],
  components: {
    EventItem
  }
}
</script>

<style scoped>

</style>

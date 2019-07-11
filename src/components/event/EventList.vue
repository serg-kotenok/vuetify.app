<template>
  <div>
    <v-container
      v-for="(date_block, index) in items"
      :key="index"
      pa-0
      my-3
    >
      <v-card :elevation="10">
        <v-card-title>
          <h3 class="headline text--primary">{{ date_block.items_date }}</h3>
        </v-card-title>
        <v-layout
          v-for="(item, index) in date_block.items"
          :key="index"
          row
        >
          <v-flex xs12>
            <event-item :event="item"/>
          </v-flex>
        </v-layout>
      </v-card>
      <v-spacer></v-spacer>
    </v-container>
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

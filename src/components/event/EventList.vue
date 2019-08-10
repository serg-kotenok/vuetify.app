<template>
  <div>
    <v-container
      v-for="(date_block, index) in items"
      :key="index"
    >
      <v-card
        :elevation="10"
      >

        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3 class="headline text--primary">
              {{ date_block.items_date }}
            </h3>
          </v-toolbar-title>
        </v-toolbar>

        <event-item
          v-for="(item, index) in date_block.items"
          :key="index"
          :event="item"
        />

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

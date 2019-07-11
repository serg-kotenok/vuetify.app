<template>
  <div>
    <v-container pa-0 my-3 flat
      v-for="(date_block, index) in items"
      :key="index"
    >
      <v-card
        :elevation="10"
      >
        <v-card-title primary-title>
          <h3 class="headline text--primary">{{ date_block.items_date }}</h3>
        </v-card-title>
<!--       <v-card-text>-->
          <event-item
            v-for="(item, index) in date_block.items"
            :key="index"
            :event="item"
          />
<!--        </v-card-text>-->
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

<template>
  <v-container fluid p5>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-card-title>
            <h3 class="headline">{{ event.entry_time }}</h3>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EventItem',
  props: [
    'event'
  ]
}
</script>

<style scoped>

</style>

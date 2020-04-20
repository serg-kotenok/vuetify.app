<template>
  <v-container fluid pa-0 my-1>
    <v-card flat
      :elevation="10"
    >
      <v-card-title primary-title>
        <v-layout row>
          <v-flex xs6>
            <h5 class="headline" style="display: inline">{{ event.glucose }}</h5> mmol/L
          </v-flex>
          <v-flex xs6>
            <v-layout justify-end>
              {{ event.entry_time }}
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-title>
        <v-layout row>
          <v-flex xs6>
            <v-icon>restaurant</v-icon>
            Carbonates:
            <v-spacer></v-spacer>
            {{ event.bread_units }} Bread Units
          </v-flex>
          <v-flex xs6>
            <v-icon>local_hospital</v-icon>
            Insulin:
            <v-spacer></v-spacer>
            L: {{ event.insulin_l }} / S: {{ event.insulin_s }} Units
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout row>
          <v-flex xs6 md3 lg2 pa-1>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              aspect-ratio="2.75"
            ></v-img>
          </v-flex>
          <v-flex xs6 md9 lg10 pa-1>
            {{ event.entry_text }}
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>bookmark</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>share</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn flat>Share</v-btn>
        <v-btn flat color="purple">Explore</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'EventItem',
  props: [
    'event'
  ],
  data: () => {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

</style>

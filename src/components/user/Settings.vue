<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-15">
          <v-toolbar dark color="primary">
            <v-toolbar-title>User Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn fab color="primary">
              <v-icon>left</v-icon>
            </v-btn>
          </v-toolbar>
          <v-progress-linear
            class="ma-0"
            indeterminate
            v-if="isLoading"
          />
          <v-card-text
            class="error"
            v-if="true">
            <v-icon>info</v-icon>
            <span class="shift">
              Wrong e-mail or password
            </span>
          </v-card-text>
          <v-tabs vertical>
            <v-tab>Common</v-tab>
            <v-tab>Insulin</v-tab>
            <v-tabs-items>
              <!-- Tab Common -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                      :rules="[ fileSize ]"
                    ></v-file-input>
                  </v-card-text>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        type="password"
                        v-model="password"
                        :rules="[ ]"
                        required
                      ></v-text-field>
                      <v-text-field
                        id="confirm-password"
                        prepend-icon="repeat"
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        v-model="confirmPassword"
                        :rules="[ ]"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="changePassword">Change</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
              <!-- Tab Insulin -->
              <v-tab-item>2</v-tab-item>
            </v-tabs-items>
          </v-tabs>
<!--
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onClose">Close</v-btn>
          </v-card-actions>
          -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as user from '@/components/user/user'
export default {
  name: 'Settings',
  data: () => {
    return {
      password: '',
      confirmPassword: '',
      isLoading: false,
      isValid: true,
      rules: {
        fileSize: value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      }
    }
  },
  methods: {
    onClose: () => {
    },
    changePassword () {
      const payload = {
        password: this.password
      }
      this.$store.dispatch(user.CHANGE_PASSWORD, payload).then(() => {

      })
    }
  }
}
</script>

<style scoped>
  .shift {
    vertical-align: 3px;
  }
</style>

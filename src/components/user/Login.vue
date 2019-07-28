<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-15">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear
            style="margin: 0"
            :indeterminate="true"
            v-if="authLoading"
          />
          <v-card-text
            class="error"
            v-if="authError"
          >
            <v-icon>info</v-icon>
            <span class="shift">
              Wrong e-mail or password
            </span>
          </v-card-text>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                required
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                required
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="onSubmit" :disabled="!valid">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AUTH_REQUEST } from './auth'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => ((v !== undefined) && (v.length >= 6)) || 'Name must be equal or more than 6 characters'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'authStatus',
      'authLoading',
      'authError'
    ])
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        /*
        const user = {
          email: this.email,
          password: this.password
        }
        */
        const { email, password } = this
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        //          this.$router.push('/')
        })
        // console.log(user)
      }
    }
  }
}
</script>

<style scoped>
.shift {
  vertical-align: 3px;
}
</style>

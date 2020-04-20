<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-15">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration Form</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear
            class="ma-0"
            :indeterminate="true"
            v-if="authLoading"
          />
          <v-card-text
            class="error"
            v-if="authError"
          >
            <v-icon>info</v-icon>
            <span class="shift">
              User with such email already exists or service down
            </span>
          </v-card-text>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
                :rules="[ rules.required, rules.email ]"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :rules="[ rules.required, rules.length ]"
                required
              ></v-text-field>
              <v-text-field
                id="confirm-password"
                prepend-icon="repeat"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                :rules="[ rules.required, passwordMatch ]"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :disabled="!valid">Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as auth from './auth'
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  data: () => {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid',
        length: v => ((v !== undefined) && (v.length >= 6)) || 'Name must be equal or more than 6 characters'
      }
    }
  },
  computed: {
    passwordMatch () {
      // console.log(this.password)
      return (this.password === this.confirmPassword) || 'Password must match'
    },
    ...mapGetters([
      'authStatus',
      'authLoading',
      'authError'
    ])
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch(auth.REG_REQUEST, user).then((response) => {
          const data = response.data
          if (data.status === 'ok') {
            this.$router.push('/')
          }
        }).catch((error) => {
          console.log(error)
          alert('Registration error! See details in browser console')
        })
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

<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-15">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                id="confirm-password"
                prepend-icon="repeat"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          {{ confirmPassword }} {{ password }}
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="onSubmit" :disabled="!valid">Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as auth from './auth'
export default {
  name: 'Register',
  data: () => {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => ((v !== undefined) && (v.length >= 6)) || 'Name must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required'
        // ,
        // v => (v !== this.password) || 'Password should match'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.$store.dispatch(auth.REG_REQUEST, user).then((response) => {
          if (response.status === 'auth') {
            this.$router.push('/')
          } else {
            // show error
          }
        }).catch(() => {
          alert('Registration error')
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

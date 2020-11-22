<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="login" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.username"
        label="Usuário *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o usuário']"
      />

      <q-input
        outlined
        type="password"
        v-model="form.password"
        label="Senha *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe a senha']"
      />

      <div>
        <q-btn class="full-width" label="Entrar" type="submit" color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const hash = window.btoa(`${this.form.username}:${this.form.password}`)

      const options = {
        method: 'POST',
        headers: { Authorization: `Basic ${hash}` }
      }

      this.$axios('http://192.168.0.9:8080/api/login', options)
        .then(({ data }) => {
          this.$q.localStorage.set('token', hash)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Login inválido'
          })
        })
    }
  }
}
</script>

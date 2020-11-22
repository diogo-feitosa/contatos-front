<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="people"
        />

        <q-toolbar-title>
          Contatos
        </q-toolbar-title>

        <q-btn v-if="$q.localStorage.has('token')" flat icon="exit_to_app" label="Sair" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$q.localStorage.remove('token')
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <q-page padding>
    <q-form @submit="salvarContato" class="q-gutter-md row items-start" >
      <q-input
        dense
        outlined
        v-model="form.nome"
        label="Nome"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o nome']"
      />

      <q-select
        dense
        outlined
        v-model="form.sexo"
        label="Sexo"
        :options="['Masculino', 'Feminino', 'Outro']"
      />

      <q-input
        dense
        outlined
        v-model="form.telefone"
        mask="(##) ##### ####"
        label="telefone"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Informe o telefone'
        ]"
      />

      <q-input
        dense
        outlined
        type="email"
        v-model="form.email"
        label="email"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Informe o email'
        ]"
      />

      <div>
        <q-btn label="Salvar" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      form: {
        nome: '',
        sexo: 'Masculino',
        telefone: '',
        email: ''
      }
    }
  },
  methods: {
    salvarContato () {
      this.$axios.post('/contato', this.form)
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

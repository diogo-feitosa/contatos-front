<template>
  <q-page padding>
    <q-form @submit="salvarContato" ref="formContato" class="q-gutter-md row items-start" >
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

    <br>

    <q-table
      :data="contatos"
      :columns="colunas"
      row-key="id"
      rows-per-page-label="Contatos por página"
      :pagination="{rowsPerPage: 10}"
    />
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
      },
      contatos: [],
      colunas: [
        { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
        { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
        { name: 'sexo', label: 'Sexo', field: 'sexo', sortable: true, align: 'left' },
        { name: 'telefone', label: 'Telefone', field: 'telefone', sortable: true, align: 'left' },
        { name: 'email', label: 'E-mail', field: 'email', sortable: true, align: 'left' }
      ]
    }
  },
  mounted () {
    this.listaContatos()
  },
  methods: {
    salvarContato () {
      this.$axios.post('/contato', this.form)
        .then(({ data }) => {
          this.contatos.push(data)
          this.limparForm()
          this.$refs.formContato.resetValidation()

          this.$q.notify({
            type: 'positive',
            message: 'Salvo com sucesso'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Ocorreu um erro ao salvar'
          })
        })
    },
    limparForm () {
      this.form = {
        nome: '',
        sexo: 'Masculino',
        telefone: '',
        email: ''
      }
    },
    listaContatos () {
      this.$axios.get('/contatos')
        .then(({ data }) => {
          this.contatos = data
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Ocorreu um erro ao listar os contatos'
          })
        })
    }
  }
}
</script>

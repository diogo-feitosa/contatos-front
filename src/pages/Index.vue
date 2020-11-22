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
    >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="actions" class="q-pa-md q-gutter-sm" style="width: 50px">
            <q-btn size="sm" color="green" icon="edit" />
            <q-btn size="sm" color="red" icon="delete" @click="alertaExclusao(props.row)" />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="nome" :props="props">
            {{ props.row.nome }}
          </q-td>
          <q-td key="sexo" :props="props">
            {{ props.row.sexo }}
          </q-td>
          <q-td key="telefone" :props="props">
            {{ props.row.telefone }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      selected: [],
      form: {
        nome: '',
        sexo: 'Masculino',
        telefone: '',
        email: ''
      },
      contatos: [],
      colunas: [
        { name: 'actions', label: 'Ações', align: 'left' },
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
      this.contatos = []
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
    },
    alertaExclusao (contato) {
      this.$q.dialog({
        title: 'Atenção',
        message: `Deseja mesmo excluir '${contato.nome}'?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.excluirContato(contato.id)
      })
    },
    excluirContato (id) {
      this.$axios.delete(`/contato/${id}`)
        .then(() => {
          this.contatos = this.contatos.filter((c) => c.id !== id)

          this.$q.notify({
            type: 'positive',
            message: 'Excluído com sucesso'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Ocorreu um erro ao excluir'
          })
        })
    }
  }
}
</script>

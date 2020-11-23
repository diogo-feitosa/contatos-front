<template>
  <q-page padding>
    <q-form @submit="salvarContato" @reset="limparForm" ref="formContato" class="q-gutter-md row items-start" >
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
        <q-btn :label="selecionado ? 'Atualizar' : 'Salvar'" type="submit" color="primary" />
        <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
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
            <q-btn size="sm" color="green" icon="edit" @click="selecionarContato(props.row)" />
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
      selecionado: null,
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
      const options = {
        url: this.selecionado ? `/contato/${this.selecionado}` : '/contato',
        method: this.selecionado ? 'PUT' : 'POST',
        data: this.form
      }

      this.$axios(options)
        .then(({ data }) => {
          if (this.selecionado) {
            this.contatos.splice(this.contatos.findIndex((contato) => contato.id === data.id), 1, data)
          } else {
            this.contatos.push(data)
          }

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
      this.selecionado = null
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
    },
    selecionarContato (contato) {
      this.selecionado = contato.id
      // this.form = {
      //   nome: contato.nome,
      //   sexo: contato.sexo,
      //   telefone: contato.telefone,
      //   email: contato.email
      // }
      // this.form = contato
      this.form = Object.assign(this.form, contato)
    }
  }
}
</script>

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://apirest-contatos-diogo.herokuapp.com/api'

Vue.prototype.$axios = axios

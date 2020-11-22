import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.9:8080/api'

Vue.prototype.$axios = axios

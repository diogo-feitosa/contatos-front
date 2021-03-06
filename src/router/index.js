import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from 'quasar'
import axios from 'axios'

import routes from './routes'

Vue.use(VueRouter)

let token = LocalStorage.has('token')

if (token) {
  token = LocalStorage.getItem('token')
  axios.defaults.headers.common.Authorization = `Basic ${token}`
}

// console.log(axios.defaults)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const rotasPublicas = [
      '/login'
    ]

    const auth = !rotasPublicas.includes(to.path)
    const token = LocalStorage.getItem('token')

    if (auth && !token) {
      return next({ path: '/login' })
    }

    if (token && to.path === '/login') {
      return next({ path: '/' })
    }

    next()
  })

  return Router
}

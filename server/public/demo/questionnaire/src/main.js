import Vue from 'vue'
import filters from './filters'
import VueRouter from 'vue-router'
import routeConfig from './route-config'
import app from './app.vue'
import './scss/main.scss'

Object.keys(filters).forEach( key => Vue.filter(key, filters[key]) )

Vue.use(VueRouter)
const router = new VueRouter()
router.map(routeConfig)
//重定向
router.redirect({
	'/':'/list'
})

router.start(Vue.extend(app), '#app')
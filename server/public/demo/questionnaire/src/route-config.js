import list from './views/list.vue'
import ans from './views/ans.vue'
import detail from './views/detail.vue'
import New from './views/new.vue'

export default {
	'/list': {
    name: 'list',
		component: list
	},
  '/ans/:id': {
    name: 'ans',
    component: ans
  },
  '/detail/:id': {
    name: 'detail',
    component: detail
  },
  '/new': {
    name: 'new',
    component: New    
  }
}
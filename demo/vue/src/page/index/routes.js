import A from './router/a.vue'
import B from './router/b.vue'

const ROUTES = [
  {
    path: '*', redirect: '/a'
  },
  {
    name: 'a',
    path: '/a',
    component: A
  },
  {
    name: 'b',
    path: '/b',
    component: B
  }
]

export default ROUTES

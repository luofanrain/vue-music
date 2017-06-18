import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header/header.vue'
import count from '@/components/count/count.vue'
import comment from '@/components/comment/comment.vue'
import person from '@/components/person/person.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: header
    },
    {
      path: '/count',
      name: 'count',
      component: count
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    },
    {
      path: '/person',
      name: 'person',
      component: person
    }
  ]
})

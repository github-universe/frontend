import Vue from 'vue'
import Router from 'vue-router'

import List from './pages/List'
import Detail from './pages/Detail'
import IpDetail from './pages/IpDetail'
import IpList from './pages/IpList'
import Collection from './pages/Collection'
import Ip from './pages/Ip'
import More from './pages/More'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/more',
      name: 'More',
      component: More,
    }, {
      path: '/collection',
      name: 'Collection',
      component: Collection,
    }, {
      path: '/list',
      name: 'List',
      component: List,
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    }, {
      path: '/detail/:newsId',
      name: 'Detail',
      component: Detail,
    }, {
      path: '/ip',
      name: 'Ip',
      component: Ip,
    }, {
      path: '/ip/:ipId',
      name: 'IpId',
      component: Ip,
    }, {
      path: '*',
      redirect: '/list'
    }
  ],
})

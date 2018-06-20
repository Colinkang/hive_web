import Vue from 'vue'
import Router from 'vue-router'
import Hive from '@/Containers/Hive'
import HiveMap from '@/Containers/Map'
import content from '../components/content/index.vue';
import BeeKeeperInfo from '@/Containers/BeeKeeper';
import UpdatePwd from '@/Containers/BeeKeeper/updatepwd.vue';
import FeedBack from '@/Containers/BeeKeeper/feedback.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'content',
      component: content,
      redirect: '/hive/map',
      children: [

        {
          path: 'hive/list',
          component: Hive
        },
        {
          path: 'hive/map',
          component: HiveMap
        },
        {
          path: '/beekeeper/info',
          component: BeeKeeperInfo
        },
        {
          path: '/beekeeper/changepwd',
          component: UpdatePwd
        },
        {
          path: '/beekeeper/feedback',
          component: FeedBack
        }
      ]
    }
  ]
})

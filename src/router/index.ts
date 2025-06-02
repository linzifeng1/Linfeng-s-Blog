import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView/index.vue'
import HomeView from '@/views/HomeView/index.vue'
import PhotosView from '@/views/PhotosView/index.vue'
import ArticleView from '@/views/ArticleView/index.vue'
import RecordView from '@/views/RecordView/index.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import MindView from '@/views/MindView.vue'
import LabelView from '@/views/LabelView/index.vue'
import MoreView from '@/views/MoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView
        },
        {
          path: 'photos',
          name: 'photos',
          component: PhotosView
        },
        {
          path: 'article',
          name: 'article',
          component: ArticleView
        },
        {
          path: 'record',
          name: 'record',
          component: RecordView
        },
        {
          path: 'label',
          name: 'label',
          component: LabelView
        },
        {
          path: 'mind',
          name: 'mind',
          component: MindView
        },
        {
          path: 'archive',
          name: 'archive',
          component: ArchiveView
        },
        {
          path: 'more',
          name: 'more',
          component: MoreView
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
    
    // 或者如果你想要更复杂的行为：
    // if (savedPosition) {
    //   // 如果是浏览器的前进/后退按钮导航，则使用保存的位置
    //   return savedPosition
    // } else {
    //   // 否则滚动到顶部
    //   return { top: 0 }
    // }
  }
})

export default router

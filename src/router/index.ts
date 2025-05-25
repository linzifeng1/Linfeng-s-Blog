import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView/index.vue'
import HomeView from '@/views/HomeView/index.vue'
import PhotosView from '@/views/PhotosView.vue'
import ArticleView from '@/views/ArticleView.vue'
import RecordView from '@/views/RecordView.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import MindView from '@/views/MindView.vue'
import LabelView from '@/views/LabelView.vue'
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
})

export default router

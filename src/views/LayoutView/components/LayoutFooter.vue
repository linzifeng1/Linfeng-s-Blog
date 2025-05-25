<script setup lang="ts">
import { ref } from 'vue';

// 获取当前年份用于版权信息
const currentYear = ref(new Date().getFullYear());

// 导航链接
const navLinks = ref([
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '分类', path: '/categories' },
  { name: '标签', path: '/tags' },
  { name: '项目', path: '/projects' },
  { name: '关于', path: '/about' },
]);

// 社交媒体链接
const socialLinks = ref([
  { name: 'GitHub', icon: 'i-carbon-logo-github', url: 'https://github.com/yourusername' },
  { name: '微博', icon: 'i-carbon-logo-weibo', url: 'https://weibo.com/yourusername' },
  { name: '知乎', icon: 'i-carbon-logo-zhihu', url: 'https://zhihu.com/people/yourusername' },
  { name: '掘金', icon: 'i-carbon-bookmark-filled', url: 'https://juejin.cn/user/yourusername' },
  { name: '邮箱', icon: 'i-carbon-email', url: 'mailto:your.email@example.com' },
]);

// 友情链接
const friendLinks = ref([
  { name: '林峰的技术博客', url: 'https://example.com' },
  { name: 'Vue官方文档', url: 'https://vuejs.org' },
  { name: 'MDN Web文档', url: 'https://developer.mozilla.org' },
  { name: '林峰-音乐搜索', url: 'https://developer.mozilla.org' },
  { name: '林峰软件库', url: 'https://developer.mozilla.org' },
  { name: '易分享乐园', url: 'https://developer.mozilla.org' },
]);
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 顶部区域：导航链接 -->
      <div class="footer-nav">
        <router-link 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.path"
          class="footer-nav-link"
        >
          {{ link.name }}
        </router-link>
      </div>
      
      <!-- 中间区域：友情链接 -->
      <div class="footer-friends">
        <h4 class="footer-section-title">友情链接</h4>
        <div class="footer-friends-links">
          <a 
            v-for="link in friendLinks" 
            :key="link.name" 
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-friend-link"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
      <!-- 底部区域：版权信息 -->
      <div class="footer-copyright">
        <p>© {{ currentYear }} 林峰博客 | 保留所有权利</p>
        <p class="footer-english-copyright">© {{ currentYear }} Lin Feng's Blog | All Rights Reserved</p>
        <p class="footer-slogan">用代码构建美好世界 · Building a Better World with Code</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 2.5rem 0 2rem;
  background-color: rgba(var(--color-pure-background), 0.8);
  border-top: 1px solid rgba(var(--color-text), 0.1);
  
  &-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  &-section-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: rgba(var(--color-text), 0.85);
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.35rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2rem;
      height: 2px;
      background-color: $lin-c-primary;
      border-radius: 2px;
    }
  }
  
  &-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    
    &-link {
      color: rgba(var(--color-text), 0.8);
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      position: relative;
      padding: 0.25rem 0;
      
      &:hover {
        color: $lin-c-primary;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: $lin-c-primary;
        transition: width 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
      }
    }
  }
  
  &-friends {
    width: 100%;
    max-width: 600px;
    
    &-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  }
  
  &-friend-link {
    color: rgba(var(--color-text), 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    background-color: rgba(var(--color-text), 0.05);
    
    &:hover {
      color: $lin-c-primary;
      background-color: rgba(var(--color-text), 0.08);
    }
  }

  &-copyright {
    text-align: center;
    color: rgba(var(--color-text), 0.6);
    font-size: 0.85rem;
    margin-top: 1rem;
    padding-top: 1.5rem;
    border-top: 1px dashed rgba(var(--color-text), 0.1);
    width: 100%;
    
    p {
      margin: 0.25rem 0;
    }
  }
  
  &-english-copyright {
    color: rgba(var(--color-text), 0.5);
    font-size: 0.8rem;
  }
  
  &-slogan {
    color: rgba(var(--color-text), 0.5);
    font-size: 0.8rem;
    font-style: italic;
    margin-top: 0.5rem !important;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1.5rem;
    
    &-container {
      padding: 0 1rem;
      gap: 1.5rem;
    }
    
    &-nav {
      gap: 1rem 1.25rem;
    }
    
    &-social {
      &-links {
        gap: 1rem;
      }
      
      &-link {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
    
    &-copyright {
      margin-top: 0.5rem;
      padding-top: 1rem;
    }
  }
}
</style>

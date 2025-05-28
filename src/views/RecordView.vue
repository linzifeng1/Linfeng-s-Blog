<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'

// 笔记数据类型定义
interface Note {
  id: number
  title: string
  content: string
  tags: string[]
  date: string
  mood: 'happy' | 'sad' | 'excited' | 'calm' | 'thoughtful'
  color: string
  isPinned: boolean
}

// Mock 数据
const notes = ref<Note[]>([
  {
    id: 1,
    title: '今日感悟',
    content: '生活就像一杯茶，不会苦一辈子，但总会苦一阵子。保持乐观的心态，相信明天会更好。',
    tags: ['生活', '感悟'],
    date: '2024-01-15',
    mood: 'thoughtful',
    color: 'from-blue-400 to-purple-500',
    isPinned: true
  },
  {
    id: 2,
    title: '技术学习',
    content: 'Vue 3 的 Composition API 真的很强大，让组件逻辑更加清晰。今天学会了 ref 和 reactive 的区别。',
    tags: ['技术', 'Vue'],
    date: '2024-01-14',
    mood: 'excited',
    color: 'from-green-400 to-blue-500',
    isPinned: false
  },
  {
    id: 3,
    title: '美食记录',
    content: '今天尝试做了红烧肉，虽然第一次做，但味道还不错。下次要记得少放糖。',
    tags: ['美食', '生活'],
    date: '2024-01-13',
    mood: 'happy',
    color: 'from-orange-400 to-red-500',
    isPinned: false
  },
  {
    id: 4,
    title: '读书笔记',
    content: '《人类简史》这本书让我重新思考了人类文明的发展历程。知识的力量真的很神奇。',
    tags: ['读书', '思考'],
    date: '2024-01-12',
    mood: 'thoughtful',
    color: 'from-purple-400 to-pink-500',
    isPinned: false
  },
  {
    id: 5,
    title: '运动日记',
    content: '今天跑了5公里，感觉身体状态越来越好了。坚持运动真的能让人心情愉悦。',
    tags: ['运动', '健康'],
    date: '2024-01-11',
    mood: 'excited',
    color: 'from-teal-400 to-green-500',
    isPinned: false
  },
  {
    id: 6,
    title: '工作思考',
    content: '项目进度有些紧张，但团队合作很愉快。学会了时间管理的重要性。',
    tags: ['工作', '思考'],
    date: '2024-01-10',
    mood: 'calm',
    color: 'from-indigo-400 to-blue-500',
    isPinned: false
  }
])

// 心情图标映射
const moodIcons = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  calm: '😌',
  thoughtful: '🤔'
}

// 添加新笔记
const showAddForm = ref(false)
const newNote = ref({
  title: '',
  content: '',
  tags: '',
  mood: 'happy' as Note['mood']
})

const addNote = () => {
  if (newNote.value.title && newNote.value.content) {
    const colors = [
      'from-blue-400 to-purple-500',
      'from-green-400 to-blue-500',
      'from-orange-400 to-red-500',
      'from-purple-400 to-pink-500',
      'from-teal-400 to-green-500',
      'from-indigo-400 to-blue-500'
    ]

    notes.value.unshift({
      id: Date.now(),
      title: newNote.value.title,
      content: newNote.value.content,
      tags: newNote.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString().split('T')[0],
      mood: newNote.value.mood,
      color: colors[Math.floor(Math.random() * colors.length)],
      isPinned: false
    })

    // 重置表单
    newNote.value = {
      title: '',
      content: '',
      tags: '',
      mood: 'happy'
    }
    showAddForm.value = false
  }
}

// 切换置顶状态
const togglePin = (note: Note) => {
  note.isPinned = !note.isPinned
  // 重新排序，置顶的在前面
  notes.value.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })
}

// 删除笔记
const deleteNote = (id: number) => {
  const index = notes.value.findIndex(note => note.id === id)
  if (index > -1) {
    notes.value.splice(index, 1)
  }
}

// 组件挂载时的动画
onMounted(() => {
  // 为每个笔记卡片添加延迟动画
  const cards = document.querySelectorAll('.note-card')
  cards.forEach((card, index) => {
    (card as HTMLElement).style.animationDelay = `${index * 0.1}s`
  })
})
</script>

<template>
  <div class="record-view">
    <!-- 使用背景组件 -->
    <LinBackground />

    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">随手笔记</h1>
      <span class="title-subtitle">记录生活的每一个美好瞬间</span>
    </header>

    <!-- 添加笔记表单 -->
    <transition name="slide-down">
      <div v-if="showAddForm" class="add-form-container">
        <form @submit.prevent="addNote" class="add-form">
          <div class="form-row">
            <input v-model="newNote.title" type="text" placeholder="笔记标题..." class="form-input title-input" required>
            <select v-model="newNote.mood" class="form-select">
              <option value="happy">😊 开心</option>
              <option value="excited">🤩 兴奋</option>
              <option value="calm">😌 平静</option>
              <option value="thoughtful">🤔 思考</option>
              <option value="sad">😢 难过</option>
            </select>
          </div>
          <textarea v-model="newNote.content" placeholder="写下你的想法..." class="form-textarea" rows="4"
            required></textarea>
          <div class="form-row">
            <input v-model="newNote.tags" type="text" placeholder="标签 (用逗号分隔)" class="form-input tags-input">
            <div class="form-actions">
              <button type="button" @click="showAddForm = false" class="btn-cancel">
                取消
              </button>
              <button type="submit" class="btn-submit">
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </transition>

    <!-- 笔记列表 -->
    <main class="notes-container">
      <div class="notes-grid">
        <div v-for="note in notes" :key="note.id" class="note-card" :class="{ pinned: note.isPinned }">
          <!-- 置顶标识 -->
          <div v-if="note.isPinned" class="pin-indicator">
            📌
          </div>

          <!-- 渐变背景 -->
          <div class="note-bg" :class="`bg-gradient-to-br ${note.color}`"></div>

          <!-- 笔记内容 -->
          <div class="note-content">
            <div class="note-header">
              <h3 class="note-title">{{ note.title }}</h3>
              <div class="note-actions">
                <button @click="togglePin(note)" class="action-btn pin-btn" :class="{ active: note.isPinned }"
                  title="置顶">
                  📌
                </button>
                <button @click="deleteNote(note.id)" class="action-btn delete-btn" title="删除">
                  🗑️
                </button>
              </div>
            </div>

            <p class="note-text">{{ note.content }}</p>

            <div class="note-footer">
              <div class="note-tags">
                <span v-for="tag in note.tags" :key="tag" class="tag">
                  #{{ tag }}
                </span>
              </div>
              <div class="note-meta">
                <span class="mood">{{ moodIcons[note.mood] }}</span>
                <span class="date">{{ note.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="notes.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3 class="empty-title">还没有笔记</h3>
        <p class="empty-text">点击上方按钮开始记录你的第一条笔记吧！</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.record-view {
  min-height: 100vh;
  background: rgb(var(--color-background));
  position: relative;
  overflow-x: hidden;
}

// 头部样式
.header {
  display: flex;
  z-index: 10;
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1200px;
  animation: fadeInDown 0.8s ease-out;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, $lin-c-primary, #9333ea);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-text 3s ease-in-out infinite;
  }

  .title-subtitle {
    display: block;
    font-size: 1.1rem;
    font-weight: 400;
    color: rgba(var(--color-text), 0.6);
    margin-top: 0.25rem;
    background: none;
    -webkit-text-fill-color: rgba(var(--color-text), 0.6);
  }
}




// 添加表单样式
.add-form-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.add-form {
  background: rgba(var(--color-background), 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--color-text), 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.form-input,
.form-textarea,
.form-select {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(var(--color-text), 0.1);
  border-radius: 12px;
  background: rgba(var(--color-background), 0.5);
  color: rgb(var(--color-text));
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: $lin-c-primary;
    box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.1);
  }

  &::placeholder {
    color: rgba(var(--color-text), 0.5);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(var(--color-text), 0.1);
  color: rgba(var(--color-text), 0.7);

  &:hover {
    background: rgba(var(--color-text), 0.2);
  }
}

.btn-submit {
  background: $lin-c-primary;
  color: white;

  &:hover {
    background: darken($lin-c-primary, 10%);
    transform: translateY(-1px);
  }
}

// 笔记容器
.notes-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 笔记卡片
.note-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &.pinned {
    order: -1;

    .note-bg {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255, 215, 0, 0.2), transparent);
      }
    }
  }
}

.note-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
}

.pin-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
  font-size: 1.2rem;
  animation: pulsate 2s ease-in-out infinite;
}

.note-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;

  [data-theme='dark'] & {
    background: rgba(0, 0, 0, 0.7);
  }
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.note-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--color-text));
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.note-actions {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  .note-card:hover & {
    opacity: 1;
  }
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: rgba(var(--color-text), 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--color-text), 0.2);
    transform: scale(1.1);
  }

  &.pin-btn.active {
    background: rgba(255, 215, 0, 0.3);
  }

  &.delete-btn:hover {
    background: rgba(239, 68, 68, 0.2);
  }
}

.note-text {
  color: rgba(var(--color-text), 0.8);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-top: auto;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: rgba(var(--color-text), 0.1);
  color: rgba(var(--color-text), 0.7);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
}

.mood {
  font-size: 1rem;
}

// 空状态
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  animation: fadeIn 1s ease-out;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulsate 2s ease-in-out infinite;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: rgba(var(--color-text), 0.6);
  margin: 0;
}

// 过渡动画
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 2rem;

    .title-subtitle {
      font-size: 0.8rem;
    }
  }

  .add-form {
    padding: 1.5rem;
  }

  .notes-grid {
    gap: 1rem;
  }

  .note-content {
    padding: 1.25rem;
  }
}
</style>
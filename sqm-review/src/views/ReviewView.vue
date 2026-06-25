<template>
  <div class="review-view">
    <header class="page-header container">
      <h1>复习背诵</h1>
      <p>系统梳理核心知识点，按章节高效备战考试</p>
    </header>

    <!-- 顶部模式切换 -->
    <div class="review-toolbar container">
      <div class="mode-switch">
        <button
          class="mode-switch-btn"
          :class="{ 'is-active': topMode === 'knowledge' }"
          @click="topMode = 'knowledge'"
        >
          <BookOpen :size="16" />
          知识点梳理
        </button>
        <button
          class="mode-switch-btn"
          :class="{ 'is-active': topMode === 'pastExam' }"
          @click="topMode = 'pastExam'"
        >
          <FileText :size="16" />
          往年原题专项
          <span class="badge">{{ pastExamData.questions.length }}</span>
        </button>
      </div>
    </div>

    <!-- 知识点梳理模式 -->
    <template v-if="topMode === 'knowledge'">
      <div class="review-layout container">
        <!-- 左侧章节导航 -->
        <aside class="review-sidebar">
          <div class="sidebar-header">
            <h3><LayoutList :size="16" /> 章节导航</h3>
            <span class="chapter-count">{{ chapterList.length }} 章</span>
          </div>

          <div class="chapter-groups">
            <div v-for="group in chapterGroups" :key="group.teacher" class="chapter-group">
              <div class="group-header">
                <span class="group-dot" :style="{ background: group.color }"></span>
                <span class="group-title">{{ group.teacher }}老师</span>
                <span class="group-count">{{ group.chapters.length }} 章</span>
              </div>
              <div class="chapter-list">
                <button
                  v-for="ch in group.chapters"
                  :key="ch.id"
                  class="chapter-btn"
                  :class="{ 'is-active': selectedChapter === ch.id }"
                  @click="selectedChapter = ch.id"
                >
                  <span class="chapter-number">{{ ch.order }}</span>
                  <span class="chapter-title">{{ ch.title }}</span>
                  <span v-if="ch.reviewCount" class="chapter-badge">{{ ch.reviewCount }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="sidebar-actions">
            <button class="sidebar-action-btn" @click="selectedChapter = 'all'">
              <Layers :size="14" />
              全部章节
            </button>
          </div>
        </aside>

        <!-- 右侧内容区 -->
        <main class="review-main">
          <!-- 章节信息头 -->
          <div v-if="currentChapterInfo" class="chapter-info-header">
            <div class="chapter-info-meta">
              <span class="chapter-info-teacher" :class="'teacher-' + currentChapterInfo.teacher">
                <User :size="14" />
                {{ currentChapterInfo.teacher }}老师
              </span>
              <span class="chapter-info-number">第 {{ currentChapterInfo.order }} 章</span>
            </div>
            <h2 class="chapter-info-title">{{ currentChapterInfo.title }}</h2>
            <p v-if="currentChapterInfo.subtitle" class="chapter-info-subtitle">{{ currentChapterInfo.subtitle }}</p>
          </div>

          <!-- 全部章节总览 -->
          <div v-if="selectedChapter === 'all'" class="all-chapters-overview">
            <div class="overview-grid">
              <div
                v-for="group in chapterGroups"
                :key="group.teacher"
                class="overview-group"
              >
                <h3 class="overview-group-title" :style="{ borderLeftColor: group.color }">
                  {{ group.teacher }}老师
                </h3>
                <div class="overview-chapters">
                  <div
                    v-for="ch in group.chapters"
                    :key="ch.id"
                    class="overview-chapter-card"
                    :class="{ 'has-content': ch.reviewCount > 0 }"
                    @click="selectedChapter = ch.id"
                  >
                    <span class="overview-number">{{ ch.order }}</span>
                    <span class="overview-title">{{ ch.title }}</span>
                    <span v-if="ch.reviewCount" class="overview-count">{{ ch.reviewCount }} 条</span>
                    <span v-else class="overview-empty">暂无</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 视图模式切换 -->
          <div v-else class="view-mode-bar">
            <div class="view-mode-toggle">
              <button
                class="view-mode-btn"
                :class="{ 'is-active': viewMode === 'list' }"
                @click="viewMode = 'list'"
              >
                <List :size="14" />
                列表模式
              </button>
              <button
                class="view-mode-btn"
                :class="{ 'is-active': viewMode === 'flashcard' }"
                @click="viewMode = 'flashcard'"
              >
                <Sparkles :size="14" />
                闪卡模式
              </button>
            </div>

            <div class="category-filter-inline">
              <span class="filter-label">分类：</span>
              <button
                v-for="cat in availableCategories"
                :key="cat"
                class="filter-chip"
                :class="{ 'is-active': selectedCategory === cat }"
                @click="selectedCategory = cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- 列表模式 -->
          <div v-if="selectedChapter !== 'all' && viewMode === 'list'" class="review-list">
            <div v-if="filteredChapterItems.length > 0" class="review-items">
              <MemorizationCard
                v-for="item in filteredChapterItems"
                :key="item.id"
                :item="item"
              />
            </div>
            <div v-else class="empty-state">
              <FileQuestion :size="64" />
              <h3>该章节暂无复习内容</h3>
              <p>该章节的内容正在整理中，请尝试查看其他章节</p>
            </div>
          </div>

          <!-- 闪卡模式 -->
          <div v-if="selectedChapter !== 'all' && viewMode === 'flashcard'" class="flashcard-mode">
            <div v-if="chapterFlashcards.length > 0" class="flashcard-container">
              <ReviewFlashcard
                :question="currentFlashcard.question"
                :answer="currentFlashcard.answer"
                :current-index="flashcardIndex"
                :total="chapterFlashcards.length"
                :category="currentFlashcard.category"
                @prev="prevFlashcard"
                @next="nextFlashcard"
                @rate="handleRate"
              />
            </div>
            <div v-else class="empty-state">
              <Sparkles :size="64" />
              <h3>暂无闪卡</h3>
              <p>该章节暂无复习内容，请尝试查看其他章节</p>
            </div>

            <div v-if="chapterFlashcards.length > 0" class="flashcard-progress">
              <div class="progress-header">
                <span>闪卡进度</span>
                <span class="progress-text">{{ flashcardIndex + 1 }} / {{ chapterFlashcards.length }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: flashcardProgress + '%' }"></div>
              </div>
            </div>

            <div v-if="Object.keys(ratings).length > 0" class="rating-stats">
              <div class="rating-item good">
                <CheckCircle :size="16" />
                <span>已掌握 {{ goodCount }} 张</span>
              </div>
              <div class="rating-item hard">
                <XCircle :size="16" />
                <span>需复习 {{ hardCount }} 张</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </template>

    <!-- 往年原题模式（保持不变） -->
    <template v-else>
      <div class="container">
        <div class="past-exam-intro">
          <div class="intro-card">
            <FileText :size="24" />
            <div>
              <h3>往年原题精选</h3>
              <p>基于复习背诵文件夹整理，涵盖选择题、简答题、论述题、案例分析题</p>
              <div class="source-tags">
                <span v-for="src in pastExamData.meta.sources" :key="src" class="source-tag">
                  {{ src }}
                </span>
              </div>
            </div>
          </div>

          <div class="exam-stats">
            <div class="exam-stat">
              <span class="stat-num">{{ choiceCount }}</span>
              <span class="stat-label">选择题</span>
            </div>
            <div class="exam-stat">
              <span class="stat-num">{{ shortCount }}</span>
              <span class="stat-label">简答题</span>
            </div>
            <div class="exam-stat">
              <span class="stat-num">{{ essayCount }}</span>
              <span class="stat-label">论述题</span>
            </div>
            <div class="exam-stat">
              <span class="stat-num">{{ pastExamData.questions.length }}</span>
              <span class="stat-label">总题数</span>
            </div>
          </div>
        </div>

        <!-- 题型 / 分类过滤 -->
        <div class="exam-filters">
          <div class="filter-group">
            <span class="filter-label">题型：</span>
            <button
              v-for="t in typeOptions"
              :key="t.value"
              class="filter-btn"
              :class="{ 'is-active': typeFilter === t.value }"
              @click="typeFilter = t.value"
            >
              {{ t.label }}
            </button>
          </div>
          <div class="filter-group">
            <span class="filter-label">分类：</span>
            <select v-model="categoryFilter" class="filter-select">
              <option value="all">全部分类</option>
              <option v-for="c in examCategories" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <!-- 题目列表 -->
        <div class="exam-list">
          <article
            v-for="q in filteredPastExams"
            :key="q.id"
            class="exam-item"
            :class="['type-' + q.type, { 'is-revealed': revealedIds.includes(q.id) }]"
          >
            <header class="exam-item-header">
              <div class="exam-item-meta">
                <span class="exam-type" :class="'type-' + q.type">
                  {{ typeLabel(q.type) }}
                </span>
                <span class="exam-year">{{ q.year }}</span>
                <span class="exam-category">{{ q.category }}</span>
              </div>
              <button
                class="reveal-btn"
                @click="toggleReveal(q.id)"
              >
                <component :is="revealedIds.includes(q.id) ? EyeOff : Eye" :size="14" />
                {{ revealedIds.includes(q.id) ? '隐藏答案' : '查看答案' }}
              </button>
            </header>

            <div class="exam-question">{{ q.question }}</div>

            <!-- 选择题选项 -->
            <div v-if="q.type === 'choice'" class="exam-options">
              <div
                v-for="(opt, key) in q.options"
                :key="key"
                class="option-item"
                :class="{
                  'is-correct': revealedIds.includes(q.id) && key === q.answer,
                  'is-wrong': revealedIds.includes(q.id) && key !== q.answer
                }"
              >
                <span class="option-key">{{ key }}.</span>
                <span class="option-text">{{ opt }}</span>
              </div>
            </div>

            <!-- 答案与解析 -->
            <div v-if="revealedIds.includes(q.id)" class="exam-answer">
              <div v-if="q.type === 'choice'" class="answer-line">
                <strong>正确答案：</strong>
                <span class="answer-value">{{ q.answer }}</span>
              </div>
              <div v-else class="answer-content">
                <strong>参考答案：</strong>
                <div class="answer-text">{{ q.answer }}</div>
              </div>
              <div class="exam-explanation">
                <Lightbulb :size="14" />
                <span>{{ q.explanation }}</span>
              </div>
            </div>
          </article>

          <div v-if="filteredPastExams.length === 0" class="empty-state">
            <FileQuestion :size="64" />
            <h3>暂无符合条件的题目</h3>
            <p>请尝试调整筛选条件</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { List, Sparkles, CheckCircle, XCircle, BookOpen, FileText, FileQuestion, Eye, EyeOff, Lightbulb, LayoutList, Layers, User } from 'lucide-vue-next'
import { reviewData } from '@/data/review'
import { pastExamData } from '@/data/pastExams'
import MemorizationCard from '@/components/review/MemorizationCard.vue'
import ReviewFlashcard from '@/components/review/ReviewFlashcard.vue'

// === 顶层模式 ===
const topMode = ref('knowledge')

// === 章节列表（从课程结构中提取）===
const chapterList = [
  { id: 'ch1', title: '软件工程概述', teacher: '荣国平', order: 1 },
  { id: 'ch2', title: '软件过程的历史演变', teacher: '荣国平', order: 2 },
  { id: 'ch3', title: '团队动力学与TSP', teacher: '荣国平', order: 3 },
  { id: 'ch4', title: '估算、计划与跟踪', teacher: '荣国平', order: 4 },
  { id: 'ch5', title: '质量管理', teacher: '荣国平', order: 5 },
  { id: 'ch6', title: '团队工程开发', teacher: '荣国平', order: 6 },
  { id: 'ch7', title: '项目支持活动', teacher: '荣国平', order: 7 },
  { id: 'ch8', title: '课程总结', teacher: '荣国平', order: 8 },
  { id: 'ch9', title: 'Scrum', teacher: '邵栋', order: 9 },
  { id: 'ch10', title: 'XP 变更曲线', teacher: '邵栋', order: 10 },
  { id: 'ch11', title: 'XP 实践', teacher: '邵栋', order: 11 },
  { id: 'ch12', title: 'TDD与演进式设计', teacher: '邵栋', order: 12 },
  { id: 'ch13', title: '持续集成与配置管理', teacher: '邵栋', order: 13 },
  { id: 'ch14', title: 'Kanban看板方法', teacher: '邵栋', order: 14 },
  { id: 'ch15', title: 'DevOps', teacher: '邵栋', order: 15 },
  { id: 'ch16', title: '敏捷概述', teacher: '邵栋', order: 16 },
  { id: 'ch17', title: '软件过程方法学', teacher: '邵栋', order: 17 },
  { id: 'ch18', title: '课程总结', teacher: '邵栋', order: 18 },
  { id: 'ch19', title: 'XP 全景', teacher: '邵栋', order: 19 }
]

// 计算每个章节的复习条目数量
const chapterListWithCount = computed(() => {
  return chapterList.map(ch => {
    const count = reviewData.filter(r => r.chapter === ch.id).length
    return { ...ch, reviewCount: count }
  })
})

// 按教师分组
const chapterGroups = computed(() => {
  const rong = chapterListWithCount.value.filter(ch => ch.teacher === '荣国平')
  const shao = chapterListWithCount.value.filter(ch => ch.teacher === '邵栋')
  const groups = []
  if (rong.length > 0) {
    groups.push({ teacher: '荣国平', chapters: rong, color: '#2c5282' })
  }
  if (shao.length > 0) {
    groups.push({ teacher: '邵栋', chapters: shao, color: '#d69e2e' })
  }
  return groups
})

// === 选中章节 ===
const selectedChapter = ref('ch1')
const selectedCategory = ref('全部')
const viewMode = ref('list')
const showDiagrams = ref(true)
const flashcardIndex = ref(0)
const ratings = ref({})

const currentChapterInfo = computed(() => {
  if (selectedChapter.value === 'all') return null
  return chapterList.find(ch => ch.id === selectedChapter.value) || null
})

// 当前章节的复习条目
const chapterItems = computed(() => {
  if (selectedChapter.value === 'all') return reviewData
  return reviewData.filter(item => item.chapter === selectedChapter.value)
})

// 可用的分类
const availableCategories = computed(() => {
  const cats = new Set(chapterItems.value.map(item => item.category))
  return ['全部', ...cats]
})

// 过滤后的条目
const filteredChapterItems = computed(() => {
  if (selectedCategory.value === '全部') {
    return chapterItems.value
  }
  return chapterItems.value.filter(item => item.category === selectedCategory.value)
})

// 闪卡
const chapterFlashcards = computed(() => {
  const cards = []
  filteredChapterItems.value.forEach(item => {
    if (item.keyPoints && item.keyPoints.length) {
      item.keyPoints.forEach((point, idx) => {
        cards.push({
          id: `${item.id}-${idx}`,
          question: getQuestionFromPoint(point),
          answer: point,
          category: item.category,
          title: item.title
        })
      })
    }
  })
  return cards
})

const currentFlashcard = computed(() => {
  return chapterFlashcards.value[flashcardIndex.value] || null
})

const flashcardProgress = computed(() => {
  if (chapterFlashcards.value.length === 0) return 0
  return ((flashcardIndex.value + 1) / chapterFlashcards.value.length) * 100
})

const goodCount = computed(() => {
  return Object.values(ratings.value).filter(r => r === 'good').length
})

const hardCount = computed(() => {
  return Object.values(ratings.value).filter(r => r === 'hard').length
})

function getQuestionFromPoint(point) {
  if (point.includes('：')) {
    const parts = point.split('：')
    return `请解释：${parts[0]}`
  }
  if (point.includes('（')) {
    const idx = point.indexOf('（')
    return `请解释：${point.substring(0, idx)}`
  }
  if (point.includes('=')) {
    const idx = point.indexOf('=')
    return `请解释：${point.substring(0, idx).trim()}`
  }
  if (point.length > 20) {
    return `请解释：${point.substring(0, 20)}...`
  }
  return `请解释：${point}`
}

function prevFlashcard() {
  if (flashcardIndex.value > 0) {
    flashcardIndex.value--
  }
}

function nextFlashcard() {
  if (flashcardIndex.value < chapterFlashcards.value.length - 1) {
    flashcardIndex.value++
  }
}

function handleRate(rating) {
  if (currentFlashcard.value) {
    ratings.value[currentFlashcard.value.id] = rating
  }
  if (flashcardIndex.value < chapterFlashcards.value.length - 1) {
    setTimeout(() => {
      flashcardIndex.value++
    }, 300)
  }
}

// === 往年原题模式 ===
const typeOptions = [
  { value: 'all', label: '全部' },
  { value: 'choice', label: '选择题' },
  { value: 'short', label: '简答题' },
  { value: 'essay', label: '论述题' }
]
const typeFilter = ref('all')
const categoryFilter = ref('all')
const revealedIds = ref([])

const choiceCount = computed(() => pastExamData.questions.filter(q => q.type === 'choice').length)
const shortCount = computed(() => pastExamData.questions.filter(q => q.type === 'short').length)
const essayCount = computed(() => pastExamData.questions.filter(q => q.type === 'essay').length)

const examCategories = computed(() => {
  return [...new Set(pastExamData.questions.map(q => q.category))]
})

const filteredPastExams = computed(() => {
  return pastExamData.questions.filter(q => {
    const matchType = typeFilter.value === 'all' || q.type === typeFilter.value
    const matchCategory = categoryFilter.value === 'all' || q.category === categoryFilter.value
    return matchType && matchCategory
  })
})

function typeLabel(type) {
  const map = { choice: '选择题', short: '简答题', essay: '论述题' }
  return map[type] || type
}

function toggleReveal(id) {
  const idx = revealedIds.value.indexOf(id)
  if (idx > -1) {
    revealedIds.value.splice(idx, 1)
  } else {
    revealedIds.value.push(id)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.review-view {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  margin-bottom: 24px;

  h1 {
    font-family: $font-serif;
    font-size: 36px;
    @include text-gradient;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: var(--text-secondary);
  }
}

// === 顶部工具栏 ===
.review-toolbar {
  margin-bottom: 24px;
}

.mode-switch {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: fit-content;
}

.mode-switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--text-primary);
  }

  &.is-active {
    background: var(--accent);
    color: var(--bg-primary);
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;

  .is-active & {
    background: rgba(15, 20, 25, 0.2);
    color: var(--bg-primary);
  }
}

// === 主布局：两栏 ===
.review-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}

// === 左侧边栏 ===
.review-sidebar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  position: sticky;
  top: 90px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 960px) {
    position: relative;
    top: 0;
    max-height: none;
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .chapter-count {
    font-size: 13px;
    color: var(--accent);
    font-weight: 500;
  }
}

.chapter-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.chapter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  margin-bottom: 2px;

  .group-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .group-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .group-count {
    font-size: 11px;
    color: var(--text-muted);
    margin-left: auto;
    background: var(--bg-secondary);
    padding: 2px 8px;
    border-radius: 10px;
  }
}

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chapter-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  width: 100%;

  &:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
  }

  &.is-active {
    background: rgba(214, 158, 46, 0.1);
    color: var(--accent);

    .chapter-number {
      background: var(--accent);
      color: var(--bg-primary);
    }
  }
}

.chapter-number {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--border-color);
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chapter-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chapter-badge {
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(214, 158, 46, 0.1);
  padding: 2px 6px;
  border-radius: 10px;
  flex-shrink: 0;
}

.sidebar-actions {
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.sidebar-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}

// === 右侧主内容区 ===
.review-main {
  min-width: 0;
}

.chapter-info-header {
  margin-bottom: 20px;
  padding: 20px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--accent);
}

.chapter-info-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.chapter-info-teacher {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;

  &.teacher-荣国平 {
    color: #63b3ed;
    background: rgba(49, 130, 206, 0.1);
    border: 1px solid rgba(49, 130, 206, 0.3);
  }

  &.teacher-邵栋 {
    color: #d69e2e;
    background: rgba(214, 158, 46, 0.1);
    border: 1px solid rgba(214, 158, 46, 0.3);
  }
}

.chapter-info-number {
  font-size: 12px;
  color: var(--text-muted);
  padding: 3px 10px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.chapter-info-title {
  font-family: $font-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.chapter-info-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

// === 全部章节总览 ===
.all-chapters-overview {
  .overview-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .overview-group {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px 24px;
  }

  .overview-group-title {
    font-family: $font-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 14px;
    padding-left: 12px;
    border-left: 4px solid;
  }

  .overview-chapters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
  }

  .overview-chapter-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    &.has-content {
      border-left: 3px solid var(--accent);
    }
  }

  .overview-number {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--border-color);
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .overview-title {
    flex: 1;
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 500;
  }

  .overview-count {
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    background: rgba(214, 158, 46, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .overview-empty {
    font-size: 11px;
    color: var(--text-muted);
    background: var(--bg-primary);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
  }
}

// === 视图模式切换 ===
.view-mode-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.view-mode-toggle {
  display: flex;
  gap: 8px;
}

.view-mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: rgba(214, 158, 46, 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }
}

.category-filter-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.filter-chip {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: var(--accent);
    color: var(--bg-primary);
    border-color: var(--accent);
  }
}

// === 复习列表 ===
.review-list {
  .review-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

// === 闪卡模式 ===
.flashcard-mode {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.flashcard-container {
  animation: fadeIn 0.4s ease;
}

.flashcard-progress {
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span:first-child {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .progress-text {
      font-size: 13px;
      font-weight: 600;
      color: var(--accent);
      font-family: $font-mono;
    }
  }

  .progress-bar {
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
}

.rating-stats {
  display: flex;
  gap: 12px;
  justify-content: center;

  .rating-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 500;

    &.good {
      background: rgba(56, 161, 105, 0.1);
      color: var(--success);
    }

    &.hard {
      background: rgba(229, 62, 62, 0.1);
      color: var(--error);
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  svg {
    color: var(--text-muted);
    opacity: 0.5;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--text-muted);
  }
}

// === 往年原题样式（保持原有）===
.past-exam-intro {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @include respond-to(md) {
    grid-template-columns: 2fr 1fr;
    align-items: stretch;
  }
}

.intro-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(214, 158, 46, 0.1) 0%, rgba(183, 121, 31, 0.05) 100%);
  border: 1px solid rgba(214, 158, 46, 0.25);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-lg);

  > svg {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }

  h3 {
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 12px;
  }
}

.source-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.source-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: $font-mono;
}

.exam-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.exam-stat {
  text-align: center;

  .stat-num {
    display: block;
    font-family: $font-mono;
    font-size: 24px;
    font-weight: 700;
    @include text-gradient;
    margin-bottom: 2px;
  }

  .stat-label {
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.exam-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: var(--accent);
    color: var(--bg-primary);
    border-color: var(--accent);
  }
}

.filter-select {
  padding: 6px 10px;
  font-size: 13px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: var(--accent);
  }
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exam-item {
  padding: 20px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-fast);

  &.type-choice {
    border-left: 4px solid #3182ce;
  }

  &.type-short {
    border-left: 4px solid #38a169;
  }

  &.type-essay {
    border-left: 4px solid #d69e2e;
  }

  &.is-revealed {
    background: var(--bg-secondary);
  }
}

.exam-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 12px;
  flex-wrap: wrap;
}

.exam-item-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.exam-type {
  display: inline-block;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--radius-sm);

  &.type-choice {
    color: #63b3ed;
    background: rgba(49, 130, 206, 0.15);
  }

  &.type-short {
    color: #68d391;
    background: rgba(56, 161, 105, 0.15);
  }

  &.type-essay {
    color: var(--accent);
    background: rgba(214, 158, 46, 0.15);
  }
}

.exam-year {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: $font-mono;
}

.exam-category {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 2px 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.reveal-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}

.exam-question {
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-primary);
  white-space: pre-wrap;
  margin-bottom: 16px;
}

.exam-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.option-item {
  display: flex;
  gap: 10px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &.is-correct {
    color: var(--success);
    background: rgba(56, 161, 105, 0.1);
    border-color: rgba(56, 161, 105, 0.4);
  }

  &.is-wrong {
    opacity: 0.5;
  }
}

.option-key {
  font-weight: 700;
  color: var(--accent);
  font-family: $font-mono;
  flex-shrink: 0;
}

.exam-answer {
  margin-top: 16px;
  padding: 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.answer-line {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 10px;

  .answer-value {
    display: inline-block;
    margin-left: 8px;
    padding: 2px 10px;
    font-weight: 700;
    color: var(--bg-primary);
    background: var(--success);
    border-radius: var(--radius-sm);
  }
}

.answer-content {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 10px;

  strong {
    color: var(--accent);
    display: block;
    margin-bottom: 8px;
  }
}

.answer-text {
  white-space: pre-wrap;
  line-height: 1.75;
  color: var(--text-secondary);
}

.exam-explanation {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-color);
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-muted);

  svg {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .page-header h1 {
    font-size: 28px;
  }

  .chapter-info-title {
    font-size: 18px;
  }

  .overview-chapters {
    grid-template-columns: 1fr !important;
  }

  .view-mode-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .category-filter-inline {
    justify-content: flex-start;
  }
}
</style>

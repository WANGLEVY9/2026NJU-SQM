<template>
  <div class="exams-view container">
    <header class="page-header">
      <h1>真题练习</h1>
      <p>历年真题分类整理，详细答案解析</p>
    </header>

    <FilterBar
      :years="allYears"
      @filter-change="handleFilterChange"
    />

    <div class="papers-grid">
      <router-link
        v-for="paper in filteredPapers"
        :key="paper.id"
        :to="`/exams/${paper.id}`"
        class="paper-card"
      >
        <div class="paper-header">
          <span class="paper-year">{{ typeof paper.year === 'number' ? paper.year + '年' : paper.year }}</span>
          <span class="paper-type" :class="paper.type">{{ getPaperTypeLabel(paper.type) }}</span>
        </div>
        <h3 class="paper-title">{{ paper.title }}</h3>
        <p class="paper-desc">{{ paper.description }}</p>
        <div class="paper-footer">
          <span class="question-count">
            <FileQuestion :size="14" />
            {{ paper.questions.length }} 题
          </span>
          <span class="paper-arrow">
            <ArrowRight :size="16" />
          </span>
        </div>
      </router-link>
    </div>

    <div v-if="filteredPapers.length === 0" class="empty-state">
      <SearchX :size="64" />
      <h3>未找到匹配的试卷</h3>
      <p>请尝试调整筛选条件</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FileQuestion, ArrowRight, SearchX } from 'lucide-vue-next'
import { useExamStore } from '@/store/useExamStore'
import FilterBar from '@/components/exam/FilterBar.vue'

const examStore = useExamStore()

const allYears = computed(() => examStore.allYears)
const filteredPapers = computed(() => examStore.filteredPapers)

const handleFilterChange = (filters) => {
  examStore.setFilter('year', filters.year)
  examStore.setFilter('type', filters.type)
}

const getPaperTypeLabel = (type) => {
  const typeMap = {
    final: '期末',
    mid: '期中',
    class: '课堂',
    early: '汇编'
  }
  return typeMap[type] || type
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.exams-view {
  padding: 40px 20px;
}

.page-header {
  margin-bottom: 32px;

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

.papers-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin-top: 32px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.paper-card {
  @include card-base;
  padding: 24px;
  text-decoration: none;
  @include hover-lift;
}

.paper-header {
  @include flex-between;
  margin-bottom: 12px;
}

.paper-year {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
}

.paper-type {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: var(--radius-sm);

  &.final {
    background: rgba(214, 158, 46, 0.15);
    color: var(--accent);
  }

  &.mid {
    background: rgba(88, 166, 255, 0.15);
    color: #58a6ff;
  }

  &.class {
    background: rgba(56, 161, 105, 0.15);
    color: var(--success);
  }

  &.early {
    background: rgba(91, 138, 201, 0.15);
    color: #5b8ac9;
  }
}

.paper-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.paper-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}

.paper-footer {
  @include flex-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.question-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
}

.paper-arrow {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.paper-card:hover .paper-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

.empty-state {
  @include flex-center;
  flex-direction: column;
  padding: 80px 20px;
  text-align: center;

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
</style>

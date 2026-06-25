<template>
  <div class="chapter-list">
    <router-link
      v-for="(chapter, index) in chapters"
      :key="chapter.id"
      :to="`/courses/${chapter.id}`"
      class="chapter-card"
    >
      <div class="chapter-number">{{ index + 1 }}</div>
      <div class="chapter-info">
        <h3 class="chapter-title">{{ chapter.title }}</h3>
        <p class="chapter-subtitle">{{ chapter.subtitle }}</p>
        <div class="chapter-meta">
          <span class="flashcard-count">
            <Layers :size="14" />
            {{ chapter.flashcards?.length || 0 }} 闪卡
          </span>
          <span v-if="chapter.diagrams?.length" class="diagram-count">
            <BarChart3 :size="14" />
            {{ chapter.diagrams.length }} 图表
          </span>
        </div>
      </div>
      <div class="chapter-arrow">
        <ArrowRight :size="20" />
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ArrowRight, Layers, BarChart3 } from 'lucide-vue-next'

defineProps({
  chapters: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chapter-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--accent);
    transform: translateX(4px);
    box-shadow: var(--shadow-md);

    .chapter-arrow {
      color: var(--accent);
      transform: translateX(4px);
    }

    .chapter-number {
      background: var(--accent);
      color: var(--bg-primary);
    }
  }
}

.chapter-number {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 20px;
  font-weight: 700;
  @include flex-center;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.chapter-info {
  flex: 1;
  min-width: 0;
}

.chapter-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.chapter-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.chapter-meta {
  display: flex;
  gap: 16px;
}

.flashcard-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.chapter-arrow {
  color: var(--text-muted);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
</style>

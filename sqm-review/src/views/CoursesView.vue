<template>
  <div class="courses-view container">
    <header class="page-header">
      <h1>课件学习</h1>
      <p>按章节系统学习软件质量管理课程内容</p>
    </header>

    <div class="course-stats">
      <div class="stat-item">
        <BookOpen :size="18" />
        <span>{{ chapters.length }} 章节</span>
      </div>
      <div class="stat-item">
        <Layers :size="18" />
        <span>{{ totalFlashcards }} 记忆闪卡</span>
      </div>
    </div>

    <ChapterList :chapters="chapters" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BookOpen, Layers } from 'lucide-vue-next'
import { useCourseStore } from '@/store/useCourseStore'
import ChapterList from '@/components/course/ChapterList.vue'

const courseStore = useCourseStore()

const chapters = computed(() => courseStore.chapters)

const totalFlashcards = computed(() => {
  return chapters.value.reduce((acc, ch) => acc + (ch.flashcards?.length || 0), 0)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.courses-view {
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

.course-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);

  svg {
    color: var(--accent);
  }
}
</style>

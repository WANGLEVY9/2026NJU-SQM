<template>
  <div class="chapter-view" v-if="chapter">
    <div class="chapter-container">
      <div class="chapter-main">
        <header class="chapter-header">
          <router-link to="/courses" class="back-link">
            <ArrowLeft :size="16" />
            返回课件列表
          </router-link>
          <div class="chapter-meta">
            <span class="chapter-order">第 {{ chapter.order + 1 }} 章</span>
            <span class="chapter-source">来源: {{ chapter.source }}</span>
          </div>
          <h1 class="chapter-title">{{ chapter.title }}</h1>
          <p class="chapter-subtitle">{{ chapter.subtitle }}</p>
        </header>

        <article class="chapter-content" v-html="formattedContent"></article>

        <section class="key-points-section" v-if="chapter.keyPoints?.length">
          <h2>
            <Lightbulb :size="20" />
            核心要点
          </h2>
          <ul>
            <li v-for="(point, index) in chapter.keyPoints" :key="index">{{ point }}</li>
          </ul>
        </section>

        <section class="flashcards-section" v-if="chapter.flashcards?.length">
          <h2>
            <Sparkles :size="20" />
            记忆检测
          </h2>
          <p class="section-desc">点击卡片查看答案，检验你对本章内容的掌握程度</p>
          <FlashCard
            v-for="(card, index) in chapter.flashcards"
            :key="index"
            :question="card.question"
            :answer="card.answer"
          />
        </section>
      </div>

      <aside class="chapter-sidebar">
        <ChapterNav
          :chapters="chapters"
          :currentId="chapterId"
          :currentIndex="currentIndex"
          :hasPrev="hasPrevChapter"
          :hasNext="hasNextChapter"
          @prev="goToPrevChapter"
          @next="goToNextChapter"
        />
      </aside>
    </div>
  </div>
  <div v-else class="not-found container">
    <div class="empty-state">
      <FileQuestion :size="80" />
      <h3>章节未找到</h3>
      <p>请检查章节ID是否正确</p>
      <router-link to="/courses" class="btn btn-primary">
        返回课件列表
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Lightbulb, Sparkles, FileQuestion } from 'lucide-vue-next'
import { useCourseStore } from '@/store/useCourseStore'
import ChapterNav from '@/components/course/ChapterNav.vue'
import FlashCard from '@/components/course/FlashCard.vue'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const chapterId = computed(() => route.params.id)
const chapter = computed(() => courseStore.getChapterById(chapterId.value))
const chapters = computed(() => courseStore.chapters)
const currentIndex = computed(() => courseStore.chapters.findIndex(ch => ch.id === chapterId.value))
const hasPrevChapter = computed(() => currentIndex.value > 0)
const hasNextChapter = computed(() => currentIndex.value < courseStore.chapters.length - 1)

const formattedContent = computed(() => {
  if (!chapter.value?.content) return ''
  return chapter.value.content
    .replace(/^## /gm, '<h2>')
    .replace(/^### /gm, '<h3>')
    .replace(/^#### /gm, '<h4>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p>${match}</p>`
    })
})

const goToPrevChapter = () => {
  if (hasPrevChapter.value) {
    const prevId = courseStore.chapters[currentIndex.value - 1].id
    router.push(`/courses/${prevId}`)
  }
}

const goToNextChapter = () => {
  if (hasNextChapter.value) {
    const nextId = courseStore.chapters[currentIndex.value + 1].id
    router.push(`/courses/${nextId}`)
  }
}

watch(chapterId, (id) => {
  courseStore.setCurrentChapter(id)
}, { immediate: true })
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.chapter-view {
  background: var(--bg-primary);
}

.chapter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @include respond-to(lg) {
    grid-template-columns: 1fr 320px;
  }
}

.chapter-main {
  min-width: 0;
}

.chapter-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--accent);
  }
}

.chapter-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.chapter-order {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chapter-source {
  font-size: 13px;
  color: var(--text-muted);
}

.chapter-title {
  font-family: $font-serif;
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.3;
}

.chapter-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.chapter-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);

  :deep(h2) {
    font-family: $font-serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 40px 0 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--accent);
  }

  :deep(h3) {
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 32px 0 12px;
  }

  :deep(h4) {
    font-size: 17px;
    font-weight: 600;
    color: var(--accent);
    margin: 24px 0 10px;
  }

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(ul), :deep(ol) {
    margin: 16px 0;
    padding-left: 24px;
  }

  :deep(li) {
    margin-bottom: 10px;
  }

  :deep(strong) {
    color: var(--accent);
    font-weight: 600;
  }
}

.key-points-section {
  margin-top: 48px;
  padding: 24px;
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-lg);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.6;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.flashcards-section {
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--border-color);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .section-desc {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 24px;
  }
}

.chapter-sidebar {
  @include respond-to(lg) {
    position: sticky;
    top: 100px;
    align-self: start;
  }
}

.not-found {
  padding: 80px 20px;
}

.empty-state {
  @include flex-center;
  flex-direction: column;
  text-align: center;

  svg {
    color: var(--text-muted);
    opacity: 0.5;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 20px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 24px;
  }
}
</style>

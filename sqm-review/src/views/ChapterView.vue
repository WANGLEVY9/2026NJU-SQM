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

        <!-- 老师讲解区 -->
        <section v-if="commentary" class="commentary-section">
          <h2>
            <MessageSquare :size="20" />
            {{ chapter.teacher }}老师讲解
          </h2>

          <div v-if="commentary.overview" class="commentary-block">
            <h3 class="commentary-title">本章导览</h3>
            <p class="commentary-text">{{ commentary.overview }}</p>
          </div>

          <div v-if="commentary.keyTakeaway" class="commentary-block">
            <h3 class="commentary-title">
              <Star :size="14" />
              核心要点
            </h3>
            <p class="commentary-text">{{ commentary.keyTakeaway }}</p>
          </div>

          <div v-if="commentary.examHints?.length" class="commentary-block">
            <h3 class="commentary-title">
              <GraduationCap :size="14" />
              常见考点（往年考题方向）
            </h3>
            <ul class="exam-hints">
              <li v-for="(hint, idx) in commentary.examHints" :key="idx">{{ hint }}</li>
            </ul>
          </div>
        </section>

        <section v-if="chapter.diagrams?.length" class="diagrams-section">
          <h2>
            <BarChart3 :size="20" />
            可视化辅助
          </h2>
          <div class="diagrams-grid">
            <ReviewDiagram
              v-for="(diagram, index) in chapter.diagrams"
              :key="index"
              :type="diagram.type"
              :title="diagram.title"
              :data="diagram.data"
            />
          </div>
        </section>

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
import { ArrowLeft, Lightbulb, Sparkles, FileQuestion, MessageSquare, Star, GraduationCap, BarChart3 } from 'lucide-vue-next'
import { useCourseStore } from '@/store/useCourseStore'
import { commentaryData } from '@/data/commentary'
import ChapterNav from '@/components/course/ChapterNav.vue'
import FlashCard from '@/components/course/FlashCard.vue'
import ReviewDiagram from '@/components/review/ReviewDiagram.vue'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const chapterId = computed(() => route.params.id)
const chapter = computed(() => courseStore.getChapterById(chapterId.value))
const commentary = computed(() => commentaryData[chapterId.value])
const chapters = computed(() => courseStore.chapters)
const currentIndex = computed(() => courseStore.chapters.findIndex(ch => ch.id === chapterId.value))
const hasPrevChapter = computed(() => currentIndex.value > 0)
const hasNextChapter = computed(() => currentIndex.value < courseStore.chapters.length - 1)

const formattedContent = computed(() => {
  if (!chapter.value?.content) return ''
  let html = chapter.value.content

  // Replace markdown headers
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>')

  // Replace bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Replace blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

  // Handle code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')

  // Replace numbered lists with styled items
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="numbered-item"><span class="number-badge">$1</span>$2</li>')
  html = html.replace(/(<li class="numbered-item">.*<\/li>\n?)+/g, '<ol class="styled-list">$&</ol>')

  // Replace bullet lists with styled items
  html = html.replace(/^- (.*$)/gim, '<li class="bullet-item">$1</li>')
  html = html.replace(/(<li class="bullet-item">.*<\/li>\n?)+/g, '<ul class="styled-list">$&</ul>')

  // Handle table rows (simplified)
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim())
    if (cells.length === 0) return match
    const isHeader = cells.every(c => c.trim().match(/^[-:]+$/))
    if (isHeader) return ''
    const tag = match.includes('---') ? 'th' : 'td'
    return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`
  })

  // Wrap consecutive lines in paragraphs
  const lines = html.split('\n')
  const result = []
  let inParagraph = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    if (trimmed.startsWith('<')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(trimmed)
    } else {
      if (!inParagraph) {
        result.push('<p>')
        inParagraph = true
      }
      result.push(trimmed)
    }
  }
  if (inParagraph) result.push('</p>')

  return result.join('\n')
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
@use '@/assets/styles/variables' as *;

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

  :deep(blockquote) {
    margin: 20px 0;
    padding: 16px 20px;
    background: rgba(214, 158, 46, 0.06);
    border-left: 4px solid var(--accent);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-style: italic;
    color: var(--text-secondary);
    line-height: 1.7;

    p {
      margin: 0;
    }
  }

  :deep(pre) {
    margin: 20px 0;
    padding: 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow-x: auto;

    code {
      font-family: $font-mono;
      font-size: 13px;
      color: var(--text-primary);
      line-height: 1.6;
    }
  }

  :deep(.styled-list) {
    margin: 16px 0;
    padding-left: 0;
    list-style: none;
  }

  :deep(.bullet-item) {
    position: relative;
    padding-left: 22px;
    margin-bottom: 10px;
    line-height: 1.7;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.7;
    }
  }

  :deep(.numbered-item) {
    position: relative;
    padding-left: 32px;
    margin-bottom: 10px;
    line-height: 1.7;

    .number-badge {
      position: absolute;
      left: 0;
      top: 2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      font-size: 11px;
      font-weight: 700;
      color: var(--bg-primary);
      background: var(--accent);
      border-radius: 50%;
      flex-shrink: 0;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;

    th, td {
      padding: 12px 16px;
      border: 1px solid var(--border-color);
      text-align: left;
    }

    th {
      background: var(--bg-secondary);
      font-weight: 600;
      color: var(--text-primary);
    }

    td {
      color: var(--text-secondary);
    }

    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }
  }
}

.commentary-section {
  margin-top: 48px;
  padding: 28px;
  background: linear-gradient(135deg, rgba(26, 54, 93, 0.12) 0%, rgba(44, 82, 130, 0.08) 100%);
  border: 1px solid rgba(44, 82, 130, 0.25);
  border-left: 4px solid #2c5282;
  border-radius: var(--radius-lg);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: #63b3ed;
    margin-bottom: 24px;
  }
}

.commentary-block {
  margin-bottom: 22px;

  &:last-child {
    margin-bottom: 0;
  }
}

.commentary-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--border-color);

  svg {
    color: var(--accent);
  }
}

.commentary-text {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  white-space: pre-wrap;
}

.exam-hints {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding: 10px 12px 10px 36px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);

    &::before {
      content: '?';
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      font-size: 12px;
      font-weight: 700;
      color: var(--bg-primary);
      background: var(--accent);
      border-radius: 50%;
      @include flex-center;
    }

    &:last-child {
      margin-bottom: 0;
    }
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

.diagrams-section {
  margin-top: 48px;
  padding: 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);

    svg {
      color: var(--accent);
    }
  }

  .diagrams-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @include respond-to(md) {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
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

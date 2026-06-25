<template>
  <div class="mock-view container">
    <header class="page-header">
      <h1>模拟考试</h1>
      <p>5套全真模拟试卷，计时评分助你备考</p>
    </header>

    <div class="mock-info">
      <div class="info-item">
        <Info :size="20" />
        <div>
          <h4>考试说明</h4>
          <p>每套试卷限时90分钟，包含单选题、多选题和判断题</p>
        </div>
      </div>
    </div>

    <div class="papers-grid">
      <div
        v-for="paper in papers"
        :key="paper.id"
        class="paper-card"
        @click="startExam(paper.id)"
      >
        <div class="paper-badge">模拟卷</div>
        <h3 class="paper-title">{{ paper.title }}</h3>
        <p class="paper-desc">{{ paper.description }}</p>
        <div class="paper-meta">
          <span class="meta-item">
            <Clock :size="14" />
            {{ paper.duration }}分钟
          </span>
          <span class="meta-item">
            <FileQuestion :size="14" />
            {{ paper.questions.length }}题
          </span>
          <span class="meta-item">
            <Award :size="14" />
            {{ paper.totalScore }}分
          </span>
        </div>
        <div class="paper-sections">
          <span v-for="section in paper.sections" :key="section.type" class="section-tag">
            {{ section.name }} {{ section.count }}题
          </span>
        </div>
        <button class="btn btn-primary start-btn">
          <Play :size="16" />
          开始考试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMockStore } from '@/store/useMockStore'
import { Info, Clock, FileQuestion, Award, Play } from 'lucide-vue-next'

const router = useRouter()
const mockStore = useMockStore()

const papers = mockStore.papers

const startExam = (paperId) => {
  mockStore.startExam(paperId)
  router.push(`/mock/${paperId}`)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.mock-view {
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

.mock-info {
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-lg);

  svg {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }
}

.papers-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.paper-card {
  @include card-base;
  padding: 28px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg), var(--shadow-glow);

    .start-btn {
      background: var(--accent);
      color: var(--bg-primary);
    }
  }
}

.paper-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  background: var(--accent);
  color: var(--bg-primary);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.paper-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  padding-right: 60px;
}

.paper-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.paper-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
}

.paper-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.section-tag {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
}

.start-btn {
  width: 100%;
  justify-content: center;
}
</style>

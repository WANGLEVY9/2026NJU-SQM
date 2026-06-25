<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content container">
        <h1 class="hero-title">
          <span class="title-line">软件质量管理</span>
          <span class="title-accent">复习平台</span>
        </h1>
        <p class="hero-desc">
          系统梳理课程知识，轻松备战考试
        </p>
        <div class="hero-actions">
          <router-link to="/courses" class="btn btn-primary btn-lg">
            <BookOpen :size="20" />
            开始学习
          </router-link>
          <router-link to="/mock" class="btn btn-secondary btn-lg">
            <ClipboardList :size="20" />
            模拟考试
          </router-link>
        </div>
      </div>
    </section>

    <section class="features container">
      <h2 class="section-title">学习模块</h2>
      <div class="features-grid">
        <router-link to="/courses" class="feature-card">
          <div class="feature-icon">
            <BookOpen :size="32" />
          </div>
          <h3>课件学习</h3>
          <p>按章节系统学习课程内容，重点概念详细讲解</p>
          <span class="feature-count">{{ courseCount }} 章节</span>
        </router-link>
        <router-link to="/review" class="feature-card">
          <div class="feature-icon">
            <Brain :size="32" />
          </div>
          <h3>复习背诵</h3>
          <p>归纳整理核心知识点，便捷高效记忆</p>
          <span class="feature-count">8 大模块</span>
        </router-link>
        <router-link to="/exams" class="feature-card">
          <div class="feature-icon">
            <FileText :size="32" />
          </div>
          <h3>真题练习</h3>
          <p>历年真题分类整理，答案解析详尽</p>
          <span class="feature-count">{{ examCount }} 套试卷</span>
        </router-link>
        <router-link to="/mock" class="feature-card">
          <div class="feature-icon">
            <ClipboardList :size="32" />
          </div>
          <h3>模拟考试</h3>
          <p>5套全真模拟卷，计时评分助你备考</p>
          <span class="feature-count">5 套试卷</span>
        </router-link>
      </div>
    </section>

    <section class="stats container">
      <div class="stats-card">
        <div class="stat-item">
          <span class="stat-number">{{ courseCount }}</span>
          <span class="stat-label">课件章节</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ flashcardCount }}</span>
          <span class="stat-label">记忆闪卡</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ examCount }}</span>
          <span class="stat-label">真题试卷</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">5</span>
          <span class="stat-label">模拟试卷</span>
        </div>
      </div>
    </section>

    <section class="highlights container">
      <h2 class="section-title">学习特色</h2>
      <div class="highlights-grid">
        <div class="highlight-item">
          <div class="highlight-icon">
            <Sparkles :size="24" />
          </div>
          <h4>交互式闪卡</h4>
          <p>点击翻转，隐藏式答案设计，检验学习效果</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">
            <Layers :size="24" />
          </div>
          <h4>层级化展示</h4>
          <p>折叠展开功能，条理清晰，重点一目了然</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">
            <Filter :size="24" />
          </div>
          <h4>多维筛选</h4>
          <p>按年份、题型多维度筛选，精准定位目标</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">
            <Timer :size="24" />
          </div>
          <h4>计时考试</h4>
          <p>真实考试环境，自动评分，即时反馈成绩</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BookOpen, Brain, FileText, ClipboardList, Sparkles, Layers, Filter, Timer } from 'lucide-vue-next'
import { useCourseStore } from '@/store/useCourseStore'
import { useExamStore } from '@/store/useExamStore'

const courseStore = useCourseStore()
const examStore = useExamStore()

const courseCount = computed(() => courseStore.chapters.length)
const examCount = computed(() => examStore.papers.length)
const flashcardCount = computed(() => {
  return courseStore.chapters.reduce((acc, ch) => acc + (ch.flashcards?.length || 0), 0)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home-view {
  overflow-x: hidden;
}

.hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  padding: 60px 0;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
  opacity: 0.95;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(214, 158, 46, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(214, 158, 46, 0.1) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-title {
  font-family: $font-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;

  @include respond-to(md) {
    font-size: 64px;
  }

  .title-line {
    display: block;
    color: var(--text-primary);
  }

  .title-accent {
    display: block;
    @include text-gradient;
  }
}

.hero-desc {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 32px;

  @include respond-to(md) {
    font-size: 20px;
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 14px 28px;
  font-size: 16px;
}

.section-title {
  font-family: $font-serif;
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
  @include text-gradient;
}

.features {
  padding: 80px 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  @include card-base;
  padding: 28px 24px;
  text-align: center;
  text-decoration: none;
  @include hover-lift;

  .feature-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    border-radius: var(--radius-lg);
    background: rgba(214, 158, 46, 0.1);
    color: var(--accent);
    @include flex-center;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .feature-count {
    font-size: 12px;
    font-weight: 500;
    color: var(--accent);
    padding: 4px 10px;
    background: rgba(214, 158, 46, 0.1);
    border-radius: var(--radius-sm);
  }
}

.stats {
  padding: 0 20px 80px;
}

.stats-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
}

.stat-item {
  text-align: center;
  padding: 0 24px;
}

.stat-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  @include text-gradient;
  font-family: $font-mono;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);

  @include respond-to(sm) {
    display: block;
  }
}

.highlights {
  padding: 0 20px 80px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.highlight-item {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-fast);

  &:hover {
    border-color: var(--accent);
  }

  .highlight-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: rgba(214, 158, 46, 0.1);
    color: var(--accent);
    @include flex-center;
    flex-shrink: 0;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
}
</style>

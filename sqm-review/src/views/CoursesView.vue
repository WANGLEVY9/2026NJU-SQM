<template>
  <div class="courses-view container">
    <header class="page-header">
      <h1>课件学习</h1>
      <p>课程分两大部分、共 19 个章节：荣国平老师（1-8 章 · 基础理论）+ 邵栋老师（9-19 章 · 敏捷与工程实践）</p>
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
      <div class="stat-item">
        <User :size="18" />
        <span>荣国平 1-8 章（{{ teacherStats.rong }} 节）</span>
      </div>
      <div class="stat-item">
        <User :size="18" />
        <span>邵栋 9-19 章（{{ teacherStats.shao }} 节）</span>
      </div>
    </div>

    <!-- 老师切换标签 -->
    <div class="teacher-tabs">
      <button
        class="teacher-tab"
        :class="{ 'is-active': activeTeacher === 'all' }"
        @click="activeTeacher = 'all'"
      >
        全部章节
      </button>
      <button
        class="teacher-tab rong"
        :class="{ 'is-active': activeTeacher === '荣国平' }"
        @click="activeTeacher = '荣国平'"
      >
        <User :size="16" />
        荣国平老师 · 基础理论（ch1-ch8）
      </button>
      <button
        class="teacher-tab shao"
        :class="{ 'is-active': activeTeacher === '邵栋' }"
        @click="activeTeacher = '邵栋'"
      >
        <User :size="16" />
        邵栋老师 · 敏捷与实践（ch9-ch19）
      </button>
    </div>

    <!-- 荣国平老师部分 -->
    <section v-if="activeTeacher !== '邵栋'" class="teacher-section" :class="{ 'rong-section': activeTeacher === '荣国平' }">
      <div class="teacher-header">
        <div class="teacher-avatar rong">荣</div>
        <div class="teacher-info">
          <h2>荣国平老师</h2>
          <p>软件工程基础理论 · 软件过程 · 团队动力学 · 估算计划 · 质量管理 · 工程实践</p>
          <div class="teacher-tagline">"软件质量与管理"的基础与体系化梳理</div>
        </div>
      </div>
      <ChapterList :chapters="rongChapters" />
    </section>

    <!-- 邵栋老师部分 -->
    <section v-if="activeTeacher !== '荣国平'" class="teacher-section" :class="{ 'shao-section': activeTeacher === '邵栋' }">
      <div class="teacher-header">
        <div class="teacher-avatar shao">邵</div>
        <div class="teacher-info">
          <h2>邵栋老师</h2>
          <p>Scrum · XP 极限编程 · Kanban · DevOps · 敏捷概述与新方法学</p>
          <div class="teacher-tagline">"敏捷方法与现代软件工程实践"的深度展开</div>
        </div>
      </div>
      <ChapterList :chapters="shaoChapters" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BookOpen, Layers, User } from 'lucide-vue-next'
import { useCourseStore } from '@/store/useCourseStore'
import ChapterList from '@/components/course/ChapterList.vue'

const courseStore = useCourseStore()

const activeTeacher = ref('all')

const chapters = computed(() => courseStore.chapters)

const rongChapters = computed(() =>
  chapters.value.filter(ch => ch.teacher === '荣国平')
)

const shaoChapters = computed(() =>
  chapters.value.filter(ch => ch.teacher === '邵栋')
)

const teacherStats = computed(() => ({
  rong: rongChapters.value.length,
  shao: shaoChapters.value.length
}))

const totalFlashcards = computed(() => {
  return chapters.value.reduce((acc, ch) => acc + (ch.flashcards?.length || 0), 0)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

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
  flex-wrap: wrap;
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

.teacher-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  padding: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.teacher-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  &.is-active {
    background: var(--accent);
    color: var(--bg-primary);
    border-color: var(--accent);

    &.rong {
      background: linear-gradient(135deg, #2c5282 0%, #1a365d 100%);
      color: #fff;
      border-color: #2c5282;
    }

    &.shao {
      background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%);
      color: #0f1419;
      border-color: #d69e2e;
    }
  }
}

.teacher-section {
  margin-bottom: 48px;
  padding: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--accent);
  }

  &.rong-section::before {
    background: linear-gradient(180deg, #2c5282 0%, #1a365d 100%);
  }

  &.shao-section::before {
    background: linear-gradient(180deg, #d69e2e 0%, #b7791f 100%);
  }
}

.teacher-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.teacher-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 700;
  font-family: $font-serif;
  flex-shrink: 0;
  @include flex-center;
  color: #fff;

  &.rong {
    background: linear-gradient(135deg, #2c5282 0%, #1a365d 100%);
    box-shadow: 0 4px 12px rgba(26, 54, 93, 0.3);
  }

  &.shao {
    background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%);
    color: #0f1419;
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
  }
}

.teacher-info {
  flex: 1;
  min-width: 0;

  h2 {
    font-family: $font-serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 8px;
  }
}

.teacher-tagline {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  background: rgba(214, 158, 46, 0.1);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-sm);
}

@include respond-to(md) {
  .teacher-header {
    gap: 24px;
  }
}
</style>

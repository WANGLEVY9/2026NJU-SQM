<template>
  <article class="memo-card" :class="['teacher-' + (item.teacher || 'all'), { 'is-revealed': isRevealed }]">
    <header class="memo-header">
      <div class="memo-meta">
        <span v-if="item.chapter" class="meta-chapter">
          <BookMarked :size="13" />
          {{ chapterLabel }}
        </span>
        <span v-if="item.teacher && item.teacher !== '全部'" class="meta-teacher" :class="'teacher-' + item.teacher">
          <User :size="13" />
          {{ item.teacher }}老师
        </span>
        <span v-if="item.category" class="meta-category">
          <Tag :size="13" />
          {{ item.category }}
        </span>
      </div>
      <h2 class="memo-title">{{ item.title }}</h2>
      <p v-if="item.overview" class="memo-overview">{{ item.overview }}</p>
    </header>

    <!-- 主体内容（Markdown 格式） -->
    <div v-if="item.content" class="memo-content" v-html="formattedContent"></div>

    <!-- 速记口诀（核心骨架，醒目） -->
    <section v-if="hasMnemonics" class="memo-section mnemonics">
      <h3><Zap :size="16" />速记口诀（背这些先）</h3>
      <ul class="mnemonic-list">
        <li v-for="(m, idx) in item.mnemonics" :key="idx" class="mnemonic-item">
          <span class="mnemonic-no">{{ idx + 1 }}</span>
          <span class="mnemonic-text">{{ m }}</span>
        </li>
      </ul>
    </section>

    <!-- 必背清单 -->
    <section v-if="hasMustMemorize" class="memo-section must-memorize">
      <h3><ListChecks :size="16" />必背清单（填空/简答）</h3>
      <ul class="check-list">
        <li v-for="(p, idx) in item.mustMemorize" :key="idx" class="check-item">
          <CheckCircle2 :size="14" />
          <span>{{ p }}</span>
        </li>
      </ul>
    </section>

    <!-- 易混淆对比 -->
    <section v-if="hasConfusion" class="memo-section confusion">
      <h3><AlertCircle :size="16" />易混淆对比（选择题陷阱）</h3>
      <div class="confusion-table">
        <div v-for="(c, idx) in item.confusion" :key="idx" class="confusion-row">
          <div class="confusion-wrong">
            <X :size="14" />
            <span>{{ c.wrong }}</span>
          </div>
          <div class="confusion-arrow">→</div>
          <div class="confusion-right">
            <Check :size="14" />
            <span>{{ c.right }}</span>
          </div>
          <div v-if="c.why" class="confusion-why">💡 {{ c.why }}</div>
        </div>
      </div>
    </section>

    <!-- 常见考点 -->
    <section v-if="hasExamPoints" class="memo-section exam-points">
      <h3><Target :size="16" />常见考点</h3>
      <ul class="exam-points-list">
        <li v-for="(p, idx) in item.examPoints" :key="idx" class="exam-point">
          <span class="exam-dot"></span>
          <span>{{ p }}</span>
        </li>
      </ul>
    </section>

    <!-- 历年真题 -->
    <section v-if="hasPastExams" class="memo-section past-exams">
      <h3><FileText :size="16" />历年真题精选</h3>
      <div class="past-exam-list">
        <div v-for="(p, idx) in item.pastExams" :key="idx" class="past-exam-item">
          <div class="past-exam-q">
            <span class="exam-year-tag">{{ p.year }}</span>
            <span class="past-exam-question">{{ p.question }}</span>
          </div>
          <div class="past-exam-a">
            <strong>参考答案：</strong>{{ p.answer }}
          </div>
        </div>
      </div>
    </section>

    <!-- 核心要点（兜底显示） -->
    <section v-if="item.keyPoints?.length" class="memo-section key-points">
      <h3><Lightbulb :size="16" />核心要点</h3>
      <ul class="key-points-list">
        <li v-for="(p, idx) in item.keyPoints" :key="idx">{{ p }}</li>
      </ul>
    </section>

    <!-- 闪卡模式：快速记忆检测 -->
    <div class="memo-flashcards" v-if="item.keyPoints?.length">
      <h3><Sparkles :size="14" />快速记忆检测</h3>
      <QuickFlashCard
        v-for="(point, idx) in item.keyPoints.slice(0, 3)"
        :key="idx"
        :question="`请解释：${point.split(/[：:=，]/)[0]}`"
        :answer="point"
      />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { BookMarked, User, Tag, Zap, ListChecks, CheckCircle2, AlertCircle, X, Check, Target, FileText, Lightbulb, Sparkles } from 'lucide-vue-next'
import QuickFlashCard from './QuickFlashCard.vue'

const props = defineProps({
  item: { type: Object, required: true },
  isRevealed: { type: Boolean, default: true }
})

const hasMnemonics = computed(() => Array.isArray(props.item.mnemonics) && props.item.mnemonics.length > 0)
const hasMustMemorize = computed(() => Array.isArray(props.item.mustMemorize) && props.item.mustMemorize.length > 0)
const hasConfusion = computed(() => Array.isArray(props.item.confusion) && props.item.confusion.length > 0)
const hasExamPoints = computed(() => Array.isArray(props.item.examPoints) && props.item.examPoints.length > 0)
const hasPastExams = computed(() => Array.isArray(props.item.pastExams) && props.item.pastExams.length > 0)

const chapterLabel = computed(() => {
  if (!props.item.chapter) return ''
  const map = {
    ch1: '第 1 讲 软件工程概述',
    ch2: '第 2 讲 软件过程的历史演变',
    ch3: '第 3 讲 团队动力学与TSP',
    ch4: '第 4 讲 估算、计划与跟踪',
    ch5: '第 5 讲 质量管理',
    ch6: '第 6 讲 团队工程开发',
    ch7: '第 7 讲 项目支持活动',
    ch8: '第 8 讲 课程总结',
    ch9: '第 9 讲 Scrum',
    ch10: '第 10 讲 XP 变更曲线',
    ch11: '第 11 讲 XP 实践',
    ch12: '第 12 讲 TDD与演进式设计',
    ch13: '第 13 讲 持续集成与配置管理',
    ch14: '第 14 讲 Kanban看板方法',
    ch15: '第 15 讲 DevOps',
    ch16: '第 16 讲 敏捷概述',
    ch17: '第 17 讲 软件过程方法学',
    ch18: '第 18 讲 课程总结'
  }
  return map[props.item.chapter] || props.item.chapter
})

// 简易 Markdown 渲染（与 ChapterView 一致）
const formattedContent = computed(() => {
  if (!props.item.content) return ''
  return props.item.content
    .replace(/^## /gm, '<h2>')
    .replace(/^### /gm, '<h3>')
    .replace(/^#### /gm, '<h4>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      if (match.startsWith('|')) return match
      return `<p>${match}</p>`
    })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.memo-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin-bottom: 24px;
  transition: border-color var(--transition-fast);
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

  &.teacher-荣国平::before {
    background: linear-gradient(180deg, #2c5282 0%, #1a365d 100%);
  }

  &.teacher-邵栋::before {
    background: linear-gradient(180deg, #d69e2e 0%, #b7791f 100%);
  }
}

.memo-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.memo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 12px;
}

.meta-chapter,
.meta-teacher,
.meta-category {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.meta-chapter {
  color: var(--accent);
  background: rgba(214, 158, 46, 0.1);
  border: 1px solid rgba(214, 158, 46, 0.25);
}

.meta-teacher {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);

  &.teacher-荣国平 {
    color: #63b3ed;
    background: rgba(49, 130, 206, 0.1);
    border-color: rgba(49, 130, 206, 0.3);
  }

  &.teacher-邵栋 {
    color: #d69e2e;
    background: rgba(214, 158, 46, 0.1);
    border-color: rgba(214, 158, 46, 0.3);
  }
}

.meta-category {
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.memo-title {
  font-family: $font-serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
}

.memo-overview {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
  font-style: italic;
  padding: 10px 14px;
  background: var(--bg-secondary);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  margin: 0;
}

.memo-content {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  margin-bottom: 24px;

  :deep(h2) {
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 28px 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--accent);
  }

  :deep(h3) {
    font-family: $font-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 20px 0 10px;
  }

  :deep(h4) {
    font-size: 15px;
    font-weight: 600;
    color: var(--accent);
    margin: 16px 0 8px;
  }

  :deep(p) {
    margin-bottom: 12px;
  }

  :deep(strong) {
    color: var(--accent);
    font-weight: 600;
  }

  :deep(code) {
    font-family: $font-mono;
    font-size: 13px;
    padding: 2px 6px;
    background: var(--bg-secondary);
    border-radius: 3px;
    color: #f7af3f;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;

    th,
    td {
      border: 1px solid var(--border-color);
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background: var(--bg-secondary);
      font-weight: 600;
      color: var(--text-primary);
    }
  }
}

.memo-section {
  margin-bottom: 20px;
  padding: 18px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent);

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 14px;
    font-family: $font-serif;

    svg {
      color: var(--accent);
    }
  }
}

.mnemonics {
  background: linear-gradient(135deg, rgba(214, 158, 46, 0.08) 0%, rgba(183, 121, 31, 0.04) 100%);
  border-left-color: var(--accent);
}

.mnemonic-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mnemonic-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 14px;
  background: var(--bg-primary);
  border: 1px solid rgba(214, 158, 46, 0.25);
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-primary);
}

.mnemonic-no {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  font-size: 12px;
  font-weight: 700;
  color: var(--bg-primary);
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}

.mnemonic-text {
  flex: 1;
  font-weight: 500;
}

.must-memorize {
  border-left-color: var(--success);
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);

  svg {
    color: var(--success);
    flex-shrink: 0;
    margin-top: 3px;
  }
}

.confusion {
  border-left-color: var(--error);
  background: linear-gradient(135deg, rgba(229, 62, 62, 0.06) 0%, rgba(197, 48, 48, 0.03) 100%);
}

.confusion-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.confusion-row {
  padding: 12px 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.confusion-wrong,
.confusion-right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.confusion-wrong {
  color: var(--error);
  background: rgba(229, 62, 62, 0.1);
  text-decoration: line-through;
  text-decoration-color: rgba(229, 62, 62, 0.5);
}

.confusion-right {
  color: var(--success);
  background: rgba(56, 161, 105, 0.1);
}

.confusion-arrow {
  display: inline-block;
  margin: 0 8px;
  font-size: 16px;
  color: var(--text-muted);
  font-weight: 700;
}

.confusion-why {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
  padding-top: 8px;
  border-top: 1px dashed var(--border-color);
}

.exam-points {
  border-left-color: #3182ce;
  background: linear-gradient(135deg, rgba(49, 130, 206, 0.06) 0%, rgba(49, 130, 206, 0.03) 100%);
}

.exam-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exam-point {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);
}

.exam-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-top: 9px;
  background: #3182ce;
  border-radius: 50%;
  flex-shrink: 0;
}

.past-exams {
  border-left-color: #b7791f;
  background: linear-gradient(135deg, rgba(183, 121, 31, 0.06) 0%, rgba(183, 121, 31, 0.03) 100%);
}

.past-exam-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.past-exam-item {
  padding: 12px 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.7;
}

.past-exam-q {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.exam-year-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #b7791f;
  background: rgba(183, 121, 31, 0.15);
  border: 1px solid rgba(183, 121, 31, 0.3);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.past-exam-question {
  flex: 1;
  font-weight: 500;
}

.past-exam-a {
  padding: 8px 10px;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 13px;

  strong {
    color: var(--accent);
    margin-right: 4px;
  }
}

.key-points {
  border-left-color: var(--accent);
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding: 6px 0 6px 20px;
    font-size: 14px;
    line-height: 1.65;
    color: var(--text-secondary);

    &::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 14px;
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
    }
  }
}

.memo-flashcards {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed var(--border-color);

  h3 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 12px;
  }
}
</style>

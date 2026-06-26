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

    <!-- 主体内容（增强版 Markdown 渲染） -->
    <div v-if="item.content" class="memo-content" v-html="renderedContent"></div>

    <!-- 速记口诀 -->
    <section v-if="hasMnemonics" class="memo-section mnemonics">
      <h3><Zap :size="16" />速记口诀</h3>
      <div class="mnemonic-grid">
        <div v-for="(m, idx) in item.mnemonics" :key="idx" class="mnemonic-item">
          <span class="mnemonic-no">{{ idx + 1 }}</span>
          <span class="mnemonic-text">{{ m }}</span>
        </div>
      </div>
    </section>

    <!-- 必背清单 -->
    <section v-if="hasMustMemorize" class="memo-section must-memorize">
      <h3><ListChecks :size="16" />必背清单</h3>
      <div class="check-grid">
        <div v-for="(p, idx) in item.mustMemorize" :key="idx" class="check-item">
          <CheckCircle2 :size="14" />
          <span>{{ p }}</span>
        </div>
      </div>
    </section>

    <!-- 易混淆对比 -->
    <section v-if="hasConfusion" class="memo-section confusion">
      <h3><AlertCircle :size="16" />易混淆对比</h3>
      <div class="confusion-list">
        <div v-for="(c, idx) in item.confusion" :key="idx" class="confusion-card">
          <div class="confusion-header">
            <span class="confusion-tag wrong">常见误区</span>
            <span class="confusion-wrong-text">{{ c.wrong }}</span>
          </div>
          <div class="confusion-divider">
            <span class="divider-line"></span>
            <ArrowRight :size="14" />
            <span class="divider-line"></span>
          </div>
          <div class="confusion-body">
            <span class="confusion-tag right">正确理解</span>
            <span class="confusion-right-text">{{ c.right }}</span>
          </div>
          <div v-if="c.reason" class="confusion-reason">
            <Lightbulb :size="12" />
            {{ c.reason }}
          </div>
        </div>
      </div>
    </section>

    <!-- 常见考点 -->
    <section v-if="hasExamPoints" class="memo-section exam-points">
      <h3><Target :size="16" />常见考点</h3>
      <div class="exam-points-grid">
        <div v-for="(p, idx) in item.examPoints" :key="idx" class="exam-point-card">
          <span class="exam-point-num">{{ idx + 1 }}</span>
          <span>{{ p }}</span>
        </div>
      </div>
    </section>

    <!-- 历年真题 -->
    <section v-if="hasPastExams" class="memo-section past-exams">
      <h3><FileText :size="16" />历年真题</h3>
      <div class="past-exam-list">
        <div
          v-for="(p, idx) in item.pastExams"
          :key="idx"
          class="past-exam-card"
          :class="{ 'is-revealed': revealedExams.has(idx) }"
          @click="!revealedExams.has(idx) && revealExam(idx)"
        >
          <div class="past-exam-header">
            <span class="exam-year-tag">{{ p.year }}</span>
            <span class="exam-type-tag">{{ p.type || '简答' }}</span>
          </div>

          <!-- 完整题目 -->
          <div class="past-exam-question">
            <span class="question-label">题目</span>
            <div class="question-text">{{ p.fullQuestion || p.question }}</div>
          </div>

          <!-- 选择题选项 -->
          <div v-if="p.options && p.options.length" class="past-exam-options">
            <div
              v-for="(opt, oidx) in p.options"
              :key="oidx"
              class="exam-option"
              :class="{
                'option-correct': revealedExams.has(idx) && opt.isCorrect,
                'option-wrong': revealedExams.has(idx) && !opt.isCorrect && opt.isSelected
              }"
            >
              <span class="option-label">{{ opt.label }}</span>
              <span class="option-text">{{ opt.text }}</span>
              <CheckCircle v-if="revealedExams.has(idx) && opt.isCorrect" :size="14" class="option-check" />
            </div>
          </div>

          <!-- 答案与解析（点击后展开） -->
          <div v-if="revealedExams.has(idx)" class="past-exam-answer-panel" @click.stop>
            <div class="answer-block">
              <span class="answer-label"><CheckCircle :size="14" />参考答案</span>
              <div class="answer-text">{{ p.answer }}</div>
            </div>
            <div v-if="p.analysis" class="analysis-block">
              <span class="analysis-label"><Lightbulb :size="14" />解析</span>
              <div class="analysis-text">{{ p.analysis }}</div>
            </div>
            <button class="exam-hide-btn" @click="hideExam(idx)">
              <EyeOff :size="14" />
              隐藏答案
            </button>
          </div>

          <!-- 点击提示（未展开时显示） -->
          <div v-if="!revealedExams.has(idx)" class="exam-click-hint">
            <Eye :size="14" />
            点击卡片查看答案与解析
          </div>
        </div>
      </div>
    </section>

    <!-- 核心要点 -->
    <section v-if="item.keyPoints?.length" class="memo-section key-points">
      <h3><Lightbulb :size="16" />核心要点</h3>
      <div class="key-points-grid">
        <div v-for="(p, idx) in item.keyPoints" :key="idx" class="key-point-card">
          <span class="key-point-num">{{ idx + 1 }}</span>
          <span>{{ p }}</span>
        </div>
      </div>
    </section>

    <!-- 快速记忆检测 -->
    <div class="memo-flashcards" v-if="item.keyPoints?.length">
      <h3><Sparkles :size="14" />快速记忆检测</h3>
      <div class="flashcard-grid">
        <QuickFlashCard
          v-for="(point, idx) in item.keyPoints.slice(0, 4)"
          :key="idx"
          :question="`请解释：${point.split(/[：:=，]/)[0]}`"
          :answer="point"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { BookMarked, User, Tag, Zap, ListChecks, CheckCircle2, AlertCircle, ArrowRight, Target, FileText, Lightbulb, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-vue-next'
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

// 历年真题答案揭示状态（每个真题独立控制）
const revealedExams = ref(new Set())

function revealExam(idx) {
  revealedExams.value.add(idx)
}

function hideExam(idx) {
  revealedExams.value.delete(idx)
}

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
    ch18: '第 18 讲 课程总结',
    ch19: '第 19 讲 XP 全景'
  }
  return map[props.item.chapter] || props.item.chapter
})

// ============================================
// 高质量 Markdown 渲染器
// ============================================
const renderedContent = computed(() => {
  if (!props.item.content) return ''
  let text = props.item.content

  // 1. 转义 HTML 特殊字符（防止 XSS）
  text = escapeHtml(text)

  // 2. 代码块（优先处理，避免内部被解析）
  const codeBlocks = []
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `CODE_${codeBlocks.length}`
    codeBlocks.push({ lang: lang || '', code: code.trim() })
    return id
  })

  // 3. 行内代码
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // 4. 表格（先处理，避免被列表解析干扰）
  const tables = []
  text = text.replace(/(\|[^\n]+\|)\n(\|[-:\| ]+\|)\n((?:\|[^\n]+\|\n?)+)/g, (match, headerLine, sepLine, bodyLines) => {
    const id = `TABLE_${tables.length}`
    const headers = headerLine.split('|').filter(c => c.trim() !== '').map(c => c.trim())
    const rows = bodyLines.trim().split('\n').map(row =>
      row.split('|').filter(c => c.trim() !== '').map(c => c.trim())
    )
    tables.push({ headers, rows })
    return id
  })

  // 5. 标题
  text = text.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
  text = text.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
  text = text.replace(/^#### (.*$)/gim, '<h4 class="md-h4">$1</h4>')

  // 6. 粗体和斜体
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="md-strong">$1</strong>')
  text = text.replace(/\*(.+?)\*/g, '<em class="md-em">$1</em>')

  // 7. 引用块
  text = text.replace(/^> (.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>')
  // 合并相邻引用块
  text = text.replace(/(<blockquote[^>]*>[\s\S]*?<\/blockquote>)(\s*<blockquote[^>]*>[\s\S]*?<\/blockquote>)+/g, (match) => {
    const inner = match.replace(/<\/?blockquote[^>]*>/g, '').replace(/\n+/g, '<br>')
    return `<blockquote class="md-blockquote">${inner}</blockquote>`
  })

  // 8. 有序列表
  const olGroups = []
  text = text.replace(/((?:^\d+\. .*\n?)+)/gm, (match) => {
    const id = `OL_${olGroups.length}`
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^\d+\.\s*/, '')
      return `<li class="ol-item">${parseInline(content)}</li>`
    }).join('')
    olGroups.push(`<ol class="md-ol">${items}</ol>`)
    return id
  })

  // 9. 无序列表
  const ulGroups = []
  text = text.replace(/((?:^- .*\n?)+)/gm, (match) => {
    const id = `UL_${ulGroups.length}`
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^-\s*/, '')
      return `<li class="ul-item">${parseInline(content)}</li>`
    }).join('')
    ulGroups.push(`<ul class="md-ul">${items}</ul>`)
    return id
  })

  // 10. 分割线
  text = text.replace(/^---\s*$/gim, '<hr class="md-hr" />')

  // 11. 段落处理
  const lines = text.split('\n')
  const result = []
  let inParagraph = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    if (line.startsWith('<') || /^CODE_\d+$/.test(line) || /^TABLE_\d+$/.test(line) || /^OL_\d+$/.test(line) || /^UL_\d+$/.test(line)) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(line)
    } else {
      if (!inParagraph) {
        result.push('<p class="md-p">')
        inParagraph = true
      }
      result.push(parseInline(line))
    }
  }
  if (inParagraph) result.push('</p>')

  text = result.join('\n')

  // 12. 还原代码块
  tables.forEach((table, i) => {
    text = text.replace(`TABLE_${i}`, renderTable(table))
  })
  codeBlocks.forEach((block, i) => {
    text = text.replace(`CODE_${i}`, renderCodeBlock(block))
  })
  olGroups.forEach((html, i) => {
    text = text.replace(`OL_${i}`, html)
  })
  ulGroups.forEach((html, i) => {
    text = text.replace(`UL_${i}`, html)
  })

  return text
})

function parseInline(text) {
  // 处理行内的粗体、斜体、代码（已经在外层处理过，但这里做保险）
  if (!text || typeof text !== 'string') return text
  // 粗体+斜体
  let result = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  // 粗体
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="md-strong">$1</strong>')
  // 斜体
  result = result.replace(/\*(.+?)\*/g, '<em class="md-em">$1</em>')
  return result
}

function renderTable(table) {
  const thead = `<thead><tr>${table.headers.map(h => `<th>${parseInline(h)}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${table.rows.map(row =>
    `<tr>${row.map((cell, ci) => {
      const tag = ci === 0 ? 'th' : 'td'
      return `<${tag}>${parseInline(cell)}</${tag}>`
    }).join('')}</tr>`
  ).join('')}</tbody>`
  return `<div class="md-table-wrapper"><table class="md-table">${thead}${tbody}</table></div>`
}

function renderCodeBlock(block) {
  const langLabel = block.lang ? `<span class="code-lang">${block.lang}</span>` : ''
  return `<div class="md-code-block"><div class="code-header">${langLabel}<span class="code-copy">代码</span></div><pre><code>${block.code}</code></pre></div>`
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
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

// ============================================
// Markdown 内容渲染样式
// ============================================
.memo-content {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  margin-bottom: 24px;

  :deep(.md-h2) {
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 28px 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--accent);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
    }
  }

  :deep(.md-h3) {
    font-family: $font-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--accent);
    margin: 20px 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 4px;
      height: 18px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  :deep(.md-h4) {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 16px 0 8px;
    padding-left: 12px;
    border-left: 3px solid var(--border-color);
  }

  :deep(.md-p) {
    margin-bottom: 12px;
  }

  :deep(.md-strong) {
    color: var(--accent);
    font-weight: 600;
  }

  :deep(.md-em) {
    color: #e2e8f0;
    font-style: italic;
  }

  // 行内代码
  :deep(.inline-code) {
    font-family: $font-mono;
    font-size: 13px;
    padding: 2px 6px;
    background: rgba(214, 158, 46, 0.1);
    border: 1px solid rgba(214, 158, 46, 0.2);
    border-radius: 4px;
    color: #f7af3f;
  }

  // 代码块
  :deep(.md-code-block) {
    margin: 16px 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      font-size: 12px;
      color: var(--text-muted);
    }

    .code-lang {
      font-weight: 600;
      color: var(--accent);
    }

    pre {
      padding: 14px 16px;
      margin: 0;
      overflow-x: auto;
      font-size: 13px;
      line-height: 1.6;
      color: var(--text-primary);
      font-family: $font-mono;
    }

    code {
      font-family: $font-mono;
      color: var(--text-primary);
    }
  }

  // 表格
  :deep(.md-table-wrapper) {
    margin: 16px 0;
    overflow-x: auto;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
  }

  :deep(.md-table) {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    th, td {
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      background: var(--bg-secondary);
      font-weight: 600;
      color: var(--text-primary);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    td {
      color: var(--text-secondary);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.02);
    }

    tr:hover td {
      background: rgba(214, 158, 46, 0.03);
    }
  }

  // 无序列表
  :deep(.md-ul) {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ul-item {
      position: relative;
      padding-left: 20px;
      color: var(--text-secondary);
      line-height: 1.7;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 6px;
        height: 6px;
        background: var(--accent);
        border-radius: 50%;
        opacity: 0.8;
      }
    }
  }

  // 有序列表
  :deep(.md-ol) {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    counter-reset: ol-counter;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ol-item {
      position: relative;
      padding-left: 28px;
      color: var(--text-secondary);
      line-height: 1.7;
      counter-increment: ol-counter;

      &::before {
        content: counter(ol-counter);
        position: absolute;
        left: 0;
        top: 2px;
        width: 20px;
        height: 20px;
        background: var(--accent);
        color: var(--bg-primary);
        border-radius: 50%;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  // 引用块
  :deep(.md-blockquote) {
    margin: 16px 0;
    padding: 14px 18px;
    background: linear-gradient(135deg, rgba(214, 158, 46, 0.06) 0%, rgba(183, 121, 31, 0.03) 100%);
    border-left: 4px solid var(--accent);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-style: italic;
    color: var(--text-secondary);
    line-height: 1.7;

    strong {
      color: var(--accent);
    }
  }

  // 分割线
  :deep(.md-hr) {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-color), transparent);
    margin: 24px 0;
  }
}

// ============================================
// 分区卡片样式
// ============================================
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

// 速记口诀
.mnemonics {
  background: linear-gradient(135deg, rgba(214, 158, 46, 0.08) 0%, rgba(183, 121, 31, 0.04) 100%);
  border-left-color: var(--accent);
}

.mnemonic-grid {
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

// 必背清单
.must-memorize {
  border-left-color: var(--success);
}

.check-grid {
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

// 易混淆对比
.confusion {
  border-left-color: var(--error);
  background: linear-gradient(135deg, rgba(229, 62, 62, 0.06) 0%, rgba(197, 48, 48, 0.03) 100%);
}

.confusion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.confusion-card {
  padding: 14px 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.confusion-header,
.confusion-body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.confusion-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  flex-shrink: 0;

  &.wrong {
    color: var(--error);
    background: rgba(229, 62, 62, 0.1);
  }

  &.right {
    color: var(--success);
    background: rgba(56, 161, 105, 0.1);
  }
}

.confusion-wrong-text {
  text-decoration: line-through;
  text-decoration-color: rgba(229, 62, 62, 0.5);
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.confusion-right-text {
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
}

.confusion-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  color: var(--text-muted);

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border-color);
  }
}

.confusion-reason {
  margin-top: 10px;
  padding: 8px 12px;
  background: rgba(214, 158, 46, 0.05);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 6px;

  svg {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
}

// 常见考点
.exam-points {
  border-left-color: #3182ce;
  background: linear-gradient(135deg, rgba(49, 130, 206, 0.06) 0%, rgba(49, 130, 206, 0.03) 100%);
}

.exam-points-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exam-point-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);

  .exam-point-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    font-size: 11px;
    font-weight: 700;
    color: #3182ce;
    background: rgba(49, 130, 206, 0.1);
    border-radius: 50%;
    flex-shrink: 0;
  }
}

// 历年真题
.past-exams {
  border-left-color: #d69e2e;
  background: linear-gradient(135deg, rgba(214, 158, 46, 0.10) 0%, rgba(183, 121, 31, 0.05) 100%);
}

.past-exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.past-exam-card {
  padding: 18px 20px;
  background: rgba(26, 32, 44, 0.85);
  border: 1px solid rgba(214, 158, 46, 0.25);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(214, 158, 46, 0.45);
    box-shadow: 0 0 20px rgba(214, 158, 46, 0.08);
    transform: translateY(-1px);
  }

  &.is-revealed {
    border-color: rgba(214, 158, 46, 0.5);
    box-shadow: 0 0 0 1px rgba(214, 158, 46, 0.15), 0 4px 16px rgba(0, 0, 0, 0.2);
    cursor: default;

    &:hover {
      transform: none;
    }
  }
}

.past-exam-header {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.exam-year-tag,
.exam-type-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.exam-year-tag {
  color: #f7af3f;
  background: rgba(214, 158, 46, 0.18);
  border: 1px solid rgba(214, 158, 46, 0.35);
}

.exam-type-tag {
  color: #a0aec0;
  background: rgba(160, 174, 192, 0.12);
  border: 1px solid rgba(160, 174, 192, 0.25);
}

.past-exam-question {
  margin-bottom: 14px;

  .question-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: #f7af3f;
    background: rgba(214, 158, 46, 0.15);
    border: 1px solid rgba(214, 158, 46, 0.25);
    padding: 3px 10px;
    border-radius: var(--radius-sm);
    margin-bottom: 10px;
  }

  .question-text {
    font-size: 15px;
    line-height: 1.8;
    color: #e2e8f0;
    font-weight: 500;
  }
}

// 选择题选项
.past-exam-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.exam-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(45, 55, 72, 0.8);
  border: 1px solid rgba(160, 174, 192, 0.2);
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5e0;
  transition: all 0.2s ease;

  .option-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    font-size: 13px;
    font-weight: 700;
    color: #a0aec0;
    background: rgba(160, 174, 192, 0.15);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .option-text {
    flex: 1;
  }

  .option-check {
    color: #48bb78;
    flex-shrink: 0;
  }

  &.option-correct {
    border-color: rgba(72, 187, 120, 0.5);
    background: rgba(72, 187, 120, 0.1);

    .option-label {
      color: #48bb78;
      background: rgba(72, 187, 120, 0.2);
    }

    .option-text {
      color: #e2e8f0;
      font-weight: 500;
    }
  }

  &.option-wrong {
    border-color: rgba(229, 62, 62, 0.4);
    background: rgba(229, 62, 62, 0.06);
  }
}

// 点击提示
.exam-click-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #d69e2e;
  background: rgba(214, 158, 46, 0.08);
  border: 1px dashed rgba(214, 158, 46, 0.25);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;

  svg {
    color: #d69e2e;
  }
}

.past-exam-card:hover .exam-click-hint {
  background: rgba(214, 158, 46, 0.15);
  border-color: rgba(214, 158, 46, 0.4);
}

// 答案面板
.past-exam-answer-panel {
  animation: fadeInDown 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.answer-block,
.analysis-block {
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.8;
}

.answer-block {
  background: rgba(72, 187, 120, 0.08);
  border: 1px solid rgba(72, 187, 120, 0.25);

  .answer-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #48bb78;
    margin-bottom: 8px;
    font-size: 13px;

    svg {
      color: #48bb78;
    }
  }

  .answer-text {
    color: #e2e8f0;
    font-weight: 500;
  }
}

.analysis-block {
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);

  .analysis-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #f7af3f;
    margin-bottom: 8px;
    font-size: 13px;

    svg {
      color: #f7af3f;
    }
  }

  .analysis-text {
    color: #cbd5e0;
  }
}

.exam-hide-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(160, 174, 192, 0.3);
  background: rgba(45, 55, 72, 0.8);
  color: #a0aec0;
  align-self: center;
  margin-top: 4px;

  &:hover {
    background: rgba(160, 174, 192, 0.15);
    color: #e2e8f0;
    border-color: rgba(160, 174, 192, 0.5);
  }
}

// 核心要点
.key-points {
  border-left-color: var(--accent);
}

.key-points-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.key-point-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);

  .key-point-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent);
    background: rgba(214, 158, 46, 0.1);
    border-radius: 50%;
    flex-shrink: 0;
  }
}

// 快速记忆检测
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

.flashcard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .memo-card {
    padding: 20px 16px;
  }

  .memo-title {
    font-size: 20px;
  }

  .memo-content {
    font-size: 14px;
  }
}
</style>

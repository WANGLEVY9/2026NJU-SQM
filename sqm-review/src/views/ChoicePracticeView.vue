<template>
  <div class="choice-practice-view container">
    <header class="page-header">
      <h1>选择题专项练习</h1>
      <p>按来源分区刷题，覆盖所有课堂练习和历年真题</p>
    </header>

    <!-- 统计面板 -->
    <div class="stats-panel">
      <div class="stat-card">
        <span class="stat-number">{{ choiceStore.totalCount }}</span>
        <span class="stat-label">总题数</span>
      </div>
      <div class="stat-card">
        <span class="stat-number correct">{{ choiceStore.correctCount }}</span>
        <span class="stat-label">答对</span>
      </div>
      <div class="stat-card">
        <span class="stat-number wrong">{{ choiceStore.wrongCount }}</span>
        <span class="stat-label">答错</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ choiceStore.answeredCount }}</span>
        <span class="stat-label">已答</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ choiceStore.totalCount - choiceStore.answeredCount }}</span>
        <span class="stat-label">未答</span>
      </div>
      <div class="stat-card">
        <span class="stat-number accuracy">{{ accuracy }}%</span>
        <span class="stat-label">正确率</span>
      </div>
    </div>

    <!-- 控制栏 -->
    <div class="control-bar">
      <div class="filter-section">
        <div class="source-filter">
          <span class="filter-label">题目来源</span>
          <div class="topic-tags">
            <button
              v-for="cat in choiceStore.sourceCategories"
              :key="cat"
              class="topic-tag source-tag"
              :class="{ 'is-active': choiceStore.selectedCategory === cat }"
              @click="choiceStore.setCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>
        <div class="topic-filter">
          <span class="filter-label">知识点</span>
          <div class="topic-tags">
            <button
              v-for="topic in choiceStore.topics"
              :key="topic"
              class="topic-tag"
              :class="{ 'is-active': choiceStore.selectedTopic === topic }"
              @click="choiceStore.setTopic(topic)"
            >
              {{ topic }}
            </button>
          </div>
        </div>
      </div>
      <div class="mode-controls">
        <button
          class="mode-btn"
          :class="{ 'is-active': choiceStore.isRandomMode }"
          @click="choiceStore.toggleRandomMode"
        >
          <Shuffle :size="16" />
          {{ choiceStore.isRandomMode ? '随机模式' : '顺序模式' }}
        </button>
        <button
          class="mode-btn"
          :class="{ 'is-active': choiceStore.isOptionShuffle }"
          @click="choiceStore.toggleOptionShuffle"
        >
          <ArrowLeftRight :size="16" />
          {{ choiceStore.isOptionShuffle ? '选项乱序开' : '选项乱序关' }}
        </button>
        <button class="mode-btn" @click="resetPractice">
          <RotateCcw :size="16" />
          重置进度
        </button>
      </div>
    </div>

    <!-- 题目区域 -->
    <div v-if="currentQuestion" class="question-area">
      <div class="question-progress">
        <span class="progress-text">{{ currentIndex + 1 }} / {{ choiceStore.totalCount }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="question-card-wrapper">
        <QuestionCard
          :question="formatQuestion(currentQuestion)"
          :selectedAnswer="choiceStore.answers[currentQuestion.id]"
          :showAnswer="!!(choiceStore.showAnswer[currentQuestion.id] || choiceStore.showAllAnswers)"
          :showResult="!!choiceStore.checked[currentQuestion.id]"
          @select="(ans) => choiceStore.setAnswer(currentQuestion.id, ans)"
          @check="choiceStore.checkAnswer(currentQuestion.id)"
          @view="choiceStore.viewAnswer(currentQuestion.id)"
          @toggle-answer="choiceStore.hideAnswer(currentQuestion.id)"
        />
      </div>

      <!-- 导航按钮 -->
      <div class="question-navigation">
        <button
          class="nav-btn"
          :disabled="currentIndex === 0"
          @click="choiceStore.prevQuestion"
        >
          <ChevronLeft :size="18" />
          上一题
        </button>

        <div class="jump-controls">
          <button
            class="action-btn"
            @click="choiceStore.showAllAnswers ? choiceStore.hideAll() : choiceStore.showAll()"
          >
            <Eye v-if="!choiceStore.showAllAnswers" :size="16" />
            <EyeOff v-else :size="16" />
            {{ choiceStore.showAllAnswers ? '隐藏答案' : '显示全部答案' }}
          </button>
        </div>

        <button
          class="nav-btn"
          :disabled="currentIndex === choiceStore.totalCount - 1"
          @click="choiceStore.nextQuestion"
        >
          下一题
          <ChevronRight :size="18" />
        </button>
      </div>

      <!-- 题目导航网格 -->
      <div class="question-nav-grid">
        <div class="nav-grid-header">
          <span>题目导航</span>
          <span class="legend">
            <span class="legend-item correct">已答对</span>
            <span class="legend-item wrong">已答错</span>
            <span class="legend-item current">当前</span>
            <span class="legend-item">未答</span>
          </span>
        </div>
        <div class="nav-grid">
          <button
            v-for="(q, idx) in choiceStore.filteredQuestions"
            :key="q.id"
            class="nav-dot"
            :class="{
              'is-current': idx === currentIndex,
              'is-correct': isAnsweredCorrect(q),
              'is-wrong': isAnsweredWrong(q)
            }"
            @click="choiceStore.goToQuestion(idx)"
          >
            {{ idx + 1 }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <FileQuestion :size="64" />
      <h3>暂无题目</h3>
      <p>请尝试切换其他知识点分类</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useChoiceStore } from '@/store/useChoiceStore'
import QuestionCard from '@/components/exam/QuestionCard.vue'
import {
  ChevronLeft, ChevronRight, Shuffle, RotateCcw,
  Eye, EyeOff, FileQuestion, ArrowLeftRight
} from 'lucide-vue-next'

const choiceStore = useChoiceStore()

const currentQuestion = computed(() => choiceStore.currentQuestion)
const currentIndex = computed(() => choiceStore.currentIndex)

const progressPercent = computed(() => {
  if (choiceStore.totalCount === 0) return 0
  return ((currentIndex.value + 1) / choiceStore.totalCount) * 100
})

const accuracy = computed(() => {
  const answered = choiceStore.answeredCount
  if (answered === 0) return 0
  return Math.round((choiceStore.correctCount / answered) * 100)
})

function isAnsweredCorrect(q) {
  if (!choiceStore.checked[q.id]) return false
  const ans = choiceStore.answers[q.id]
  if (ans === undefined) return false
  return isCorrect(q, ans)
}

function isAnsweredWrong(q) {
  if (!choiceStore.checked[q.id]) return false
  const ans = choiceStore.answers[q.id]
  if (ans === undefined) return false
  return !isCorrect(q, ans)
}

function isCorrect(question, userAnswer) {
  // 优先使用洗牌后的正确答案（选项乱序开启时）
  const effectiveQuestion = choiceStore.isOptionShuffle
    ? (choiceStore.getShuffledQuestionData(question) || question)
    : question
  const ca = effectiveQuestion.correctAnswer
  // Boolean (judge questions)
  if (typeof ca === 'boolean') return userAnswer === ca
  // String correctAnswer (letter-based, e.g., 'ABD' or 'C')
  if (typeof ca === 'string') {
    if (ca.length <= 1) {
      // Single choice: userAnswer is a number (index)
      const correctIndex = ca.charCodeAt(0) - 65
      return userAnswer === correctIndex
    } else {
      // Multiple choice: userAnswer is an array of indices
      if (!Array.isArray(userAnswer)) return false
      const correctIndices = ca.split('').map(l => l.charCodeAt(0) - 65).sort((a, b) => a - b)
      const sortedUser = [...userAnswer].sort((a, b) => a - b)
      return JSON.stringify(correctIndices) === JSON.stringify(sortedUser)
    }
  }
  if (Array.isArray(ca)) {
    if (!Array.isArray(userAnswer)) return false
    const sortedCorrect = [...ca].sort()
    const sortedUser = [...userAnswer].sort()
    return JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser)
  }
  return userAnswer === ca
}

function formatQuestion(q) {
  // 优先使用洗牌后的数据（如果开启了选项乱序）
  const shuffled = choiceStore.getShuffledQuestionData(q)
  const data = shuffled || q

  return {
    ...data,
    type: data.type === 'judge' ? 'judge' : (data.correctAnswer.length > 1 ? 'multiple' : 'choice'),
    answer: data.type === 'judge'
      ? data.correctAnswer
      : data.correctAnswer.split('').map(l => l.charCodeAt(0) - 65)
  }
}

function resetPractice() {
  if (confirm('确定要重置所有答题进度吗？')) {
    choiceStore.reset()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.choice-practice-view {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
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

.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @include respond-to(md) {
    grid-template-columns: repeat(6, 1fr);
  }
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-align: center;

  .stat-number {
    font-size: 24px;
    font-weight: 700;
    font-family: $font-mono;
    color: var(--text-primary);

    &.correct { color: var(--success); }
    &.wrong { color: var(--error); }
    &.accuracy { color: var(--accent); }
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 4px;
  }
}

.control-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  @include respond-to(md) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.source-filter,
.topic-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .filter-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.source-tag {
  font-weight: 600;
}

.topic-filter {
  .filter-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-tag {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
  }
}

.mode-controls {
  display: flex;
  gap: 10px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: rgba(214, 158, 46, 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }
}

.question-area {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.question-progress {
  display: flex;
  align-items: center;
  gap: 16px;

  .progress-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    font-family: $font-mono;
    white-space: nowrap;
  }

  .progress-bar {
    flex: 1;
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
}

.question-card-wrapper {
  animation: fadeIn 0.3s ease;
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}

.question-nav-grid {
  margin-top: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.nav-grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;

  span:first-child {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

.legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.legend-item {
  font-size: 12px;
  color: var(--text-muted);
  position: relative;
  padding-left: 14px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--bg-secondary);
  }

  &.correct::before { background: var(--success); }
  &.wrong::before { background: var(--error); }
  &.current::before { background: var(--accent); }
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;

  @include respond-to(sm) {
    grid-template-columns: repeat(12, 1fr);
  }

  @include respond-to(md) {
    grid-template-columns: repeat(16, 1fr);
  }
}

.nav-dot {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
  @include flex-center;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;

  &:hover {
    background: var(--bg-card-hover);
  }

  &.is-current {
    background: var(--accent);
    color: var(--bg-primary);
  }

  &.is-correct {
    background: rgba(56, 161, 105, 0.2);
    color: var(--success);
  }

  &.is-wrong {
    background: rgba(229, 62, 62, 0.2);
    color: var(--error);
  }
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<template>
  <div class="mock-exam-view" v-if="paper">
    <header class="exam-header">
      <div class="header-left">
        <button class="back-btn" @click="confirmExit">
          <ArrowLeft :size="20" />
        </button>
        <div class="exam-info">
          <h1>{{ paper.title }}</h1>
          <span class="exam-progress">{{ currentQuestionIndex + 1 }} / {{ paper.questions.length }}</span>
        </div>
      </div>
      <ExamTimer
        :timeRemaining="timeRemaining"
        :isPaused="isPaused"
        @toggle-pause="togglePause"
      />
    </header>

    <div class="exam-container">
      <div class="questions-panel">
        <div
          v-for="(question, index) in paper.questions"
          :key="question.id"
          v-show="currentQuestionIndex === index"
          class="question-wrapper"
        >
          <QuestionCard
            :question="question"
            :selectedAnswer="getAnswer(question.id)"
            :showAnswer="false"
            @select="(answer) => setAnswer(question.id, answer)"
          />
        </div>

        <div class="exam-navigation">
          <button
            class="nav-btn"
            :disabled="currentQuestionIndex === 0"
            @click="prevQuestion"
          >
            <ChevronLeft :size="18" />
            上一题
          </button>
          <button
            class="nav-btn"
            :disabled="currentQuestionIndex === paper.questions.length - 1"
            @click="nextQuestion"
          >
            下一题
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>

      <aside class="questions-sidebar">
        <h3>答题进度</h3>
        <div class="questions-grid">
          <button
            v-for="(question, index) in paper.questions"
            :key="question.id"
            class="question-dot"
            :class="{
              'is-current': currentQuestionIndex === index,
              'is-answered': isAnswered(question.id)
            }"
            @click="goToQuestion(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        <div class="sidebar-stats">
          <div class="stat-row">
            <span class="stat-label">已答</span>
            <span class="stat-value answered">{{ answeredCount }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">未答</span>
            <span class="stat-value unanswered">{{ unansweredCount }}</span>
          </div>
        </div>
        <button class="btn btn-primary submit-btn" @click="confirmSubmit">
          <Send :size="16" />
          提交试卷
        </button>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMockStore } from '@/store/useMockStore'
import { ArrowLeft, ChevronLeft, ChevronRight, Send } from 'lucide-vue-next'
import ExamTimer from '@/components/exam/ExamTimer.vue'
import QuestionCard from '@/components/exam/QuestionCard.vue'

const route = useRoute()
const router = useRouter()
const mockStore = useMockStore()

const paperId = computed(() => route.params.id)
const paper = computed(() => mockStore.getPaperById(paperId.value))
const timeRemaining = computed(() => mockStore.timeRemaining)
const isPaused = ref(false)
const currentQuestionIndex = ref(0)

onMounted(() => {
  if (!mockStore.isExamStarted || mockStore.currentPaperId !== paperId.value) {
    mockStore.startExam(paperId.value)
  }
})

const getAnswer = (questionId) => {
  return mockStore.answers[questionId]
}

const setAnswer = (questionId, answer) => {
  mockStore.setAnswer(questionId, answer)
}

const isAnswered = (questionId) => {
  return mockStore.answers[questionId] !== undefined
}

// essay题型不纳入答题统计（需人工自评）
const autoScoreableCount = computed(() => {
  if (!paper.value) return 0
  return paper.value.questions.filter(q => q.type !== 'essay').length
})

const answeredCount = computed(() => {
  return Object.keys(mockStore.answers).length
})

const unansweredCount = computed(() => {
  return autoScoreableCount.value - answeredCount.value
})

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < paper.value.questions.length - 1) {
    currentQuestionIndex.value++
  }
}

const goToQuestion = (index) => {
  currentQuestionIndex.value = index
}

const togglePause = () => {
  isPaused.value = !isPaused.value
}

const confirmSubmit = () => {
  if (confirm(`确定要提交试卷吗？\n已答 ${answeredCount.value} / ${autoScoreableCount.value} 题`)) {
    mockStore.finishExam()
    router.push(`/mock/${paperId.value}/result`)
  }
}

const confirmExit = () => {
  if (confirm('确定要退出考试吗？考试进度将会丢失。')) {
    mockStore.resetExam()
    router.push('/mock')
  }
}

watch(timeRemaining, (val) => {
  if (val === 0) {
    mockStore.finishExam()
    router.push(`/mock/${paperId.value}/result`)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.mock-exam-view {
  min-height: 100vh;
  background: var(--bg-primary);
}

.exam-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  color: var(--text-secondary);
  @include flex-center;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }
}

.exam-info {
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .exam-progress {
    font-size: 13px;
    color: var(--text-muted);
  }
}

.exam-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @include respond-to(lg) {
    grid-template-columns: 1fr 280px;
  }
}

.questions-panel {
  min-width: 0;
}

.question-wrapper {
  animation: fadeIn 0.3s ease;
}

.exam-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
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

  &:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.questions-sidebar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
  }
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}

.question-dot {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
  @include flex-center;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--bg-card-hover);
  }

  &.is-current {
    background: var(--accent);
    color: var(--bg-primary);
  }

  &.is-answered {
    background: rgba(56, 161, 105, 0.2);
    color: var(--success);
  }
}

.sidebar-stats {
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
}

.stat-value {
  font-size: 14px;
  font-weight: 600;

  &.answered {
    color: var(--success);
  }

  &.unanswered {
    color: var(--text-muted);
  }
}

.submit-btn {
  width: 100%;
  justify-content: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

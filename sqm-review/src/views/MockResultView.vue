<template>
  <div class="result-view container" v-if="paper">
    <div class="result-card">
      <div class="result-header">
        <h1>{{ paper.title }}</h1>
        <p>考试成绩</p>
      </div>

      <div class="score-section">
        <div class="score-circle" :class="scoreClass">
          <span class="score-value">{{ score }}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="score-label">{{ scoreLabel }}</div>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ totalQuestions }}</span>
          <span class="stat-label">总题数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value correct">{{ correctCount }}</span>
          <span class="stat-label">答对</span>
        </div>
        <div class="stat-item">
          <span class="stat-value wrong">{{ wrongCount }}</span>
          <span class="stat-label">答错</span>
        </div>
        <div class="stat-item" v-if="essayCount > 0">
          <span class="stat-value">{{ essayCount }}</span>
          <span class="stat-label">简答题(自评)</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ accuracy }}%</span>
          <span class="stat-label">正确率</span>
        </div>
      </div>

      <div class="time-info">
        <Clock :size="16" />
        <span>用时：{{ formattedTime }}</span>
      </div>

      <div v-if="essayCount > 0" class="essay-notice">
        <Info :size="16" />
        <span>简答/论述题不计入自动评分，请点击"查看答案"对照参考答案自评</span>
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click="reviewAnswers">
          <Eye :size="16" />
          查看答案
        </button>
        <button class="btn btn-primary" @click="retakeExam">
          <RotateCcw :size="16" />
          重新考试
        </button>
        <router-link to="/mock" class="btn btn-ghost">
          <ArrowLeft :size="16" />
          返回列表
        </router-link>
      </div>
    </div>

    <div class="questions-review" v-if="showReview">
      <h2>答案解析</h2>
      <div class="questions-list">
        <QuestionCard
          v-for="(question, index) in paper.questions"
          :key="question.id"
          :question="question"
          :selectedAnswer="getAnswer(question.id)"
          :showAnswer="true"
        />
      </div>
    </div>
  </div>
  <div v-else class="not-found container">
    <div class="empty-state">
      <AlertCircle :size="80" />
      <h3>成绩数据不存在</h3>
      <p>请先完成模拟考试</p>
      <router-link to="/mock" class="btn btn-primary">
        进入模拟考试
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMockStore } from '@/store/useMockStore'
import { Eye, RotateCcw, ArrowLeft, Clock, AlertCircle, Info } from 'lucide-vue-next'
import QuestionCard from '@/components/exam/QuestionCard.vue'

const route = useRoute()
const router = useRouter()
const mockStore = useMockStore()

const showReview = ref(false)

const paperId = computed(() => route.params.id)
const paper = computed(() => mockStore.getPaperById(paperId.value))
const score = computed(() => mockStore.score)
const totalQuestions = computed(() => paper.value?.questions.length || 0)

// 可自动评分的题目（排除essay简答/论述题）
const autoScoreableQuestions = computed(() => {
  if (!paper.value) return []
  return paper.value.questions.filter(q => q.type !== 'essay')
})

// essay题数量（需人工对照参考答案自评）
const essayCount = computed(() => totalQuestions.value - autoScoreableQuestions.value.length)

const correctCount = computed(() => {
  if (!paper.value) return 0
  let correct = 0
  autoScoreableQuestions.value.forEach(q => {
    const userAnswer = mockStore.answers[q.id]
    if (q.type === 'multiple') {
      if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
        const sortedUser = [...userAnswer].sort()
        const sortedCorrect = [...q.answer].sort()
        if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) {
          correct++
        }
      }
    } else {
      if (userAnswer === q.answer) {
        correct++
      }
    }
  })
  return correct
})

const wrongCount = computed(() => autoScoreableQuestions.value.length - correctCount.value)
const accuracy = computed(() => {
  if (autoScoreableQuestions.value.length === 0) return 0
  return Math.round((correctCount.value / autoScoreableQuestions.value.length) * 100)
})

const scoreClass = computed(() => {
  if (accuracy.value >= 80) return 'excellent'
  if (accuracy.value >= 60) return 'good'
  if (accuracy.value >= 40) return 'pass'
  return 'fail'
})

const scoreLabel = computed(() => {
  if (accuracy.value >= 80) return '优秀！'
  if (accuracy.value >= 60) return '良好'
  if (accuracy.value >= 40) return '及格'
  return '继续努力'
})

const formattedTime = computed(() => {
  if (!paper.value) return '0分钟'
  const duration = paper.value.duration * 60 - mockStore.timeRemaining
  const minutes = Math.floor(duration / 60)
  return `${minutes}分钟`
})

onMounted(() => {
  if (!mockStore.isExamFinished) {
    router.push(`/mock/${paperId.value}`)
  }
})

const getAnswer = (questionId) => {
  return mockStore.answers[questionId]
}

const reviewAnswers = () => {
  showReview.value = !showReview.value
}

const retakeExam = () => {
  mockStore.resetExam()
  mockStore.startExam(paperId.value)
  router.push(`/mock/${paperId.value}`)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.result-view {
  padding: 40px 20px;
  max-width: 900px;
}

.result-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 40px;
  text-align: center;
}

.result-header {
  margin-bottom: 32px;

  h1 {
    font-family: $font-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--text-muted);
  }
}

.score-section {
  margin-bottom: 32px;
}

.score-circle {
  width: 160px;
  height: 160px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 6px solid;

  &.excellent {
    border-color: var(--success);
    background: rgba(56, 161, 105, 0.1);
    .score-value { color: var(--success); }
  }

  &.good {
    border-color: var(--accent);
    background: rgba(214, 158, 46, 0.1);
    .score-value { color: var(--accent); }
  }

  &.pass {
    border-color: var(--warning);
    background: rgba(221, 107, 32, 0.1);
    .score-value { color: var(--warning); }
  }

  &.fail {
    border-color: var(--error);
    background: rgba(229, 62, 62, 0.1);
    .score-value { color: var(--error); }
  }
}

.score-value {
  font-size: 48px;
  font-weight: 700;
  font-family: $font-mono;
}

.score-unit {
  font-size: 16px;
  color: var(--text-muted);
}

.score-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  font-family: $font-mono;
  color: var(--text-primary);

  &.correct {
    color: var(--success);
  }

  &.wrong {
    color: var(--error);
  }
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;

  svg {
    color: var(--text-muted);
  }
}

.essay-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: var(--accent);
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-md);
  padding: 10px 16px;
  margin-bottom: 24px;

  svg {
    flex-shrink: 0;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.questions-review {
  margin-top: 48px;

  h2 {
    font-family: $font-serif;
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: 24px;
    text-align: center;
  }
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

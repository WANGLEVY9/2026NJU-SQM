<template>
  <div class="paper-view container" v-if="paper">
    <header class="paper-header">
      <router-link to="/exams" class="back-link">
        <ArrowLeft :size="16" />
        返回试卷列表
      </router-link>
      <div class="paper-meta">
        <span class="paper-year">{{ typeof paper.year === 'number' ? paper.year + '年' : paper.year }}</span>
        <span class="paper-type" :class="paper.type">{{ paperTypeLabel }}</span>
      </div>
      <h1 class="paper-title">{{ paper.title }}</h1>
      <p class="paper-desc">{{ paper.description }}</p>
      <div class="paper-stats">
        <span class="stat">
          <FileQuestion :size="16" />
          {{ paper.questions.length }} 题
        </span>
        <span class="stat">
          <Clock :size="16" />
          建议时长：45分钟
        </span>
      </div>
    </header>

    <div class="questions-list">
      <QuestionCard
        v-for="(question, index) in paper.questions"
        :key="question.id"
        :question="question"
        :selectedAnswer="getAnswer(question.id)"
        :showAnswer="isAnswerShown(question.id)"
        :showResult="isChecked(question.id)"
        @select="(answer) => setAnswer(question.id, answer)"
        @toggle-answer="hideAnswer(question.id)"
        @check="checkAnswer(question.id)"
        @view="viewAnswer(question.id)"
      />
    </div>

    <div class="paper-actions">
      <button class="btn btn-secondary" @click="hideAllAnswers">
        <EyeOff :size="16" />
        隐藏所有答案
      </button>
      <button class="btn btn-primary" @click="showAllAnswers">
        <Eye :size="16" />
        显示所有答案
      </button>
    </div>
  </div>
  <div v-else class="not-found container">
    <div class="empty-state">
      <FileQuestion :size="80" />
      <h3>试卷未找到</h3>
      <p>请检查试卷ID是否正确</p>
      <router-link to="/exams" class="btn btn-primary">
        返回试卷列表
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, FileQuestion, Clock, Eye, EyeOff } from 'lucide-vue-next'
import { useExamStore } from '@/store/useExamStore'
import QuestionCard from '@/components/exam/QuestionCard.vue'

const route = useRoute()
const examStore = useExamStore()

const paperId = computed(() => route.params.id)
const paper = computed(() => examStore.getPaperById(paperId.value))

const paperTypeLabel = computed(() => {
  if (!paper.value) return ''
  const typeMap = {
    final: '期末真题',
    class: '课堂测试',
    early: '往年汇编'
  }
  return typeMap[paper.value.type] || paper.value.type
})

onMounted(() => {
  examStore.resetPaper()
})

const getAnswer = (questionId) => {
  return examStore.getAnswer(questionId)
}

const setAnswer = (questionId, answer) => {
  examStore.setAnswer(questionId, answer)
}

const isAnswerShown = (questionId) => {
  return examStore.isAnswerShown(questionId)
}

const toggleAnswer = (questionId) => {
  examStore.toggleAnswer(questionId)
}

const isChecked = (questionId) => {
  return examStore.isChecked(questionId)
}

const checkAnswer = (questionId) => {
  examStore.checkAnswer(questionId)
}

const viewAnswer = (questionId) => {
  examStore.viewAnswer(questionId)
}

const hideAnswer = (questionId) => {
  examStore.hideAnswer(questionId)
}

const showAllAnswers = () => {
  paper.value?.questions.forEach(q => {
    if (!examStore.isAnswerShown(q.id)) {
      examStore.toggleAnswer(q.id)
    }
  })
}

const hideAllAnswers = () => {
  paper.value?.questions.forEach(q => {
    if (examStore.isAnswerShown(q.id)) {
      examStore.toggleAnswer(q.id)
    }
  })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.paper-view {
  padding: 40px 20px;
  max-width: 900px;
}

.paper-header {
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

.paper-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.paper-year {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
}

.paper-type {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-sm);

  &.final {
    background: rgba(214, 158, 46, 0.15);
    color: var(--accent);
  }

  &.class {
    background: rgba(56, 161, 105, 0.15);
    color: var(--success);
  }

  &.early {
    background: rgba(91, 138, 201, 0.15);
    color: #5b8ac9;
  }
}

.paper-title {
  font-family: $font-serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.paper-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.paper-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-muted);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.paper-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
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

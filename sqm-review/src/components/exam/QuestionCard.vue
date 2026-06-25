<template>
  <div class="question-card" :class="{ 'show-answer': showAnswer }">
    <div class="question-header">
      <div class="header-left">
        <span class="question-type">{{ typeLabel }}</span>
        <span v-if="question.topic" class="question-topic">{{ question.topic }}</span>
      </div>
      <span class="question-id">{{ question.id }}</span>
    </div>
    <div class="question-content">
      <p class="question-text">{{ question.question }}</p>

      <!-- 选择题（choice / single / multiple） -->
      <div v-if="isChoiceType" class="options-list">
        <div
          v-for="(option, index) in displayOptions"
          :key="index"
          class="option-item"
          :class="{
            'is-selected': isSelected(index),
            'is-correct': showAnswer && isCorrect(index),
            'is-wrong': showAnswer && isSelected(index) && !isCorrect(index)
          }"
          @click="handleOptionClick(index)"
        >
          <span class="option-marker">{{ option.charAt(0) }}</span>
          <span class="option-text">{{ option.substring(3) }}</span>
          <CheckCircle v-if="showAnswer && isCorrect(index)" :size="18" class="result-icon correct" />
          <XCircle v-if="showAnswer && isSelected(index) && !isCorrect(index)" :size="18" class="result-icon wrong" />
        </div>
      </div>

      <!-- 判断题（judgment） -->
      <div v-else-if="isJudgmentType" class="options-list">
        <div
          v-for="(option, index) in judgmentOptions"
          :key="index"
          class="option-item"
          :class="{
            'is-selected': isJudgmentSelected(option.value),
            'is-correct': showAnswer && isJudgmentCorrect(option.value),
            'is-wrong': showAnswer && isJudgmentSelected(option.value) && !isJudgmentCorrect(option.value)
          }"
          @click="handleJudgmentClick(option.value)"
        >
          <span class="option-marker">{{ option.label.charAt(0) }}</span>
          <span class="option-text">{{ option.label.substring(2) }}</span>
          <CheckCircle v-if="showAnswer && isJudgmentCorrect(option.value)" :size="18" class="result-icon correct" />
          <XCircle v-if="showAnswer && isJudgmentSelected(option.value) && !isJudgmentCorrect(option.value)" :size="18" class="result-icon wrong" />
        </div>
      </div>

      <!-- 简答/论述题（essay） -->
      <div v-else-if="isEssayType" class="essay-section">
        <div v-if="question.score" class="essay-score">
          <span class="score-label">分值</span>
          <span class="score-value">{{ question.score }} 分</span>
        </div>
        <textarea
          v-if="!showAnswer"
          class="essay-input"
          placeholder="在此写下你的答案，然后点击下方查看答案按钮对照参考答案..."
          rows="6"
          @input="$emit('select', $event.target.value)"
        ></textarea>
        <transition name="fade">
          <div v-if="showAnswer" class="essay-answer">
            <div class="answer-header">
              <BookOpen :size="16" />
              <span>参考答案</span>
            </div>
            <p class="answer-text">{{ question.answer }}</p>
          </div>
        </transition>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showAnswer && analysisText" class="analysis-section">
        <div class="analysis-header">
          <Lightbulb :size="16" />
          <span>题目解析</span>
        </div>
        <p class="analysis-text">{{ analysisText }}</p>
      </div>
    </transition>

    <div class="question-footer">
      <button
        v-if="!showAnswer"
        class="btn btn-secondary"
        @click="$emit('toggle-answer')"
      >
        <Eye :size="16" />
        查看答案
      </button>
      <button
        v-else
        class="btn btn-ghost"
        @click="$emit('toggle-answer')"
      >
        <EyeOff :size="16" />
        隐藏答案
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckCircle, XCircle, Eye, EyeOff, Lightbulb, BookOpen } from 'lucide-vue-next'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  selectedAnswer: {
    type: [Number, Array, Boolean, String],
    default: null
  },
  showAnswer: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'toggle-answer'])

// ========== 类型判断 ==========
const isChoiceType = computed(() => {
  return ['choice', 'single', 'multiple'].includes(props.question.type)
})

const isJudgmentType = computed(() => {
  return ['judgment', 'judge'].includes(props.question.type)
})

const isEssayType = computed(() => {
  return props.question.type === 'essay'
})

// ========== 类型标签 ==========
const typeLabel = computed(() => {
  const typeMap = {
    choice: isMultipleChoice.value ? '多选题' : '单选题',
    single: '单选题',
    multiple: '多选题',
    judgment: '判断题',
    judge: '判断题',
    essay: props.question.score >= 15 ? '论述题' : '简答题'
  }
  return typeMap[props.question.type] || '题目'
})

// ========== 解析文本（兼容 explanation 和 analysis） ==========
const analysisText = computed(() => {
  return props.question.explanation || props.question.analysis || ''
})

// ========== 选择题逻辑 ==========
// 判断是否为多选题
const isMultipleChoice = computed(() => {
  if (props.question.type === 'multiple') return true
  if (props.question.type === 'single') return false
  // choice 类型：根据 correctAnswer 长度判断
  if (props.question.type === 'choice') {
    const answer = props.question.correctAnswer
    return typeof answer === 'string' && answer.length > 1
  }
  return false
})

// 显示选项（兼容新格式 options 和旧格式）
const displayOptions = computed(() => {
  return props.question.options || []
})

// 将字母转换为索引（A->0, B->1, ...）
const letterToIndex = (letter) => {
  return letter.charCodeAt(0) - 65
}

// 将索引转换为字母
const indexToLetter = (index) => {
  return String.fromCharCode(65 + index)
}

// 获取正确答案的索引数组
const correctIndices = computed(() => {
  // 新格式：correctAnswer 为字母字符串
  if (props.question.correctAnswer !== undefined) {
    const answer = props.question.correctAnswer
    if (typeof answer === 'string') {
      return answer.split('').map(letterToIndex)
    }
    if (typeof answer === 'number') {
      return [answer]
    }
    if (Array.isArray(answer)) {
      return answer
    }
  }
  // 旧格式：answer 为索引
  if (props.question.answer !== undefined) {
    if (Array.isArray(props.question.answer)) {
      return props.question.answer
    }
    return [props.question.answer]
  }
  return []
})

const isSelected = (index) => {
  if (isMultipleChoice.value) {
    return Array.isArray(props.selectedAnswer) && props.selectedAnswer.includes(index)
  }
  return props.selectedAnswer === index
}

const isCorrect = (index) => {
  return correctIndices.value.includes(index)
}

const handleOptionClick = (index) => {
  if (props.showAnswer) return

  if (isMultipleChoice.value) {
    const current = Array.isArray(props.selectedAnswer) ? [...props.selectedAnswer] : []
    const idx = current.indexOf(index)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(index)
    }
    emit('select', current)
  } else {
    emit('select', index)
  }
}

// ========== 判断题逻辑 ==========
const judgmentOptions = [
  { label: 'A. 正确', value: true },
  { label: 'B. 错误', value: false }
]

// 获取判断题正确答案
const judgmentCorrectAnswer = computed(() => {
  // 新格式：correctAnswer 为 boolean
  if (props.question.correctAnswer !== undefined && typeof props.question.correctAnswer === 'boolean') {
    return props.question.correctAnswer
  }
  // mockPapers格式：answer 为 boolean (true/false)
  if (props.question.answer !== undefined && typeof props.question.answer === 'boolean') {
    return props.question.answer
  }
  // 旧格式：answer 为索引（0=正确, 1=错误）
  if (props.question.answer !== undefined && typeof props.question.answer === 'number') {
    return props.question.answer === 0
  }
  return null
})

const isJudgmentSelected = (value) => {
  return props.selectedAnswer === value
}

const isJudgmentCorrect = (value) => {
  return judgmentCorrectAnswer.value === value
}

const handleJudgmentClick = (value) => {
  if (props.showAnswer) return
  emit('select', value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.question-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);

  &.show-answer {
    border-color: var(--accent);
  }
}

.question-header {
  @include flex-between;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.question-type {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.question-topic {
  font-size: 11px;
  color: var(--text-muted);
  padding: 2px 8px;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.question-id {
  font-size: 12px;
  color: var(--text-muted);
  font-family: $font-mono;
}

.question-content {
  padding: 24px 20px;
}

.question-text {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover:not(.is-correct):not(.is-wrong) {
    border-color: var(--accent);
    background: rgba(214, 158, 46, 0.05);
  }

  &.is-selected {
    border-color: var(--accent);
    background: rgba(214, 158, 46, 0.1);
  }

  &.is-correct {
    border-color: var(--success);
    background: rgba(56, 161, 105, 0.1);
  }

  &.is-wrong {
    border-color: var(--error);
    background: rgba(229, 62, 62, 0.1);
  }
}

.option-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  @include flex-center;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.5;
}

.result-icon {
  flex-shrink: 0;

  &.correct {
    color: var(--success);
  }

  &.wrong {
    color: var(--error);
  }
}

// 简答题样式
.essay-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.essay-input {
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  resize: vertical;
  transition: border-color var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
}

.essay-score {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 6px 14px;
  background: rgba(214, 158, 46, 0.1);
  border: 1px solid rgba(214, 158, 46, 0.3);
  border-radius: var(--radius-sm);

  .score-label {
    font-size: 12px;
    color: var(--text-muted);
  }

  .score-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
  }
}

.essay-answer {
  padding: 20px;
  background: rgba(56, 161, 105, 0.05);
  border: 1px solid rgba(56, 161, 105, 0.2);
  border-radius: var(--radius-md);
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--success);
  margin-bottom: 12px;
}

.answer-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-primary);
  white-space: pre-wrap;
}

.analysis-section {
  padding: 20px;
  background: rgba(214, 158, 46, 0.05);
  border-top: 1px solid var(--border-color);
}

.analysis-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 10px;
}

.analysis-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
  white-space: pre-wrap;
}

.question-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  @include flex-center;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

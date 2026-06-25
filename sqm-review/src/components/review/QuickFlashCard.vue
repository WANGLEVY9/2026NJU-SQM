<template>
  <div class="quick-flashcard">
    <div class="flashcard-header">
      <span class="flashcard-label">
        <Sparkles :size="14" />
        快速检测
      </span>
    </div>
    <div class="flashcard-body" @click="toggle">
      <div class="question-side" v-show="!isRevealed">
        <p class="question-text">{{ question }}</p>
        <span class="tap-hint">点击显示答案</span>
      </div>
      <div class="answer-side" v-show="isRevealed">
        <p class="answer-text">{{ answer }}</p>
        <span class="tap-hint">点击隐藏答案</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles } from 'lucide-vue-next'

defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const isRevealed = ref(false)

const toggle = () => {
  isRevealed.value = !isRevealed.value
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.quick-flashcard {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent);
  }
}

.flashcard-header {
  padding: 10px 16px;
  background: rgba(214, 158, 46, 0.08);
  border-bottom: 1px solid var(--border-color);
}

.flashcard-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.flashcard-body {
  padding: 20px;
  cursor: pointer;
  min-height: 100px;
  @include flex-center;
}

.question-side,
.answer-side {
  text-align: center;
  width: 100%;
}

.question-text,
.answer-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.answer-text {
  color: var(--accent);
}

.tap-hint {
  font-size: 12px;
  color: var(--text-muted);
}
</style>

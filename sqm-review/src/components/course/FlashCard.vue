<template>
  <div class="flash-card" :class="{ 'is-flipped': isFlipped }">
    <div class="flash-card-inner" @click="toggle">
      <div class="flash-card-front">
        <div class="card-label">
          <Sparkles :size="14" />
          <span>记忆检测</span>
        </div>
        <div class="card-content">
          <p class="question-label">问题</p>
          <p class="question-text">{{ question }}</p>
        </div>
        <div class="card-action">
          <span>点击查看答案</span>
          <ChevronDown :size="16" class="flip-icon" />
        </div>
      </div>
      <div class="flash-card-back">
        <div class="card-label">
          <CheckCircle :size="14" />
          <span>答案</span>
        </div>
        <div class="card-content">
          <p class="answer-text">{{ answer }}</p>
        </div>
        <div class="card-action">
          <span>点击收起</span>
          <ChevronUp :size="16" class="flip-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles, ChevronDown, ChevronUp, CheckCircle } from 'lucide-vue-next'

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

const isFlipped = ref(false)

const toggle = () => {
  isFlipped.value = !isFlipped.value
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.flash-card {
  perspective: 1000px;
  cursor: pointer;
  margin: 24px 0;

  &.is-flipped .flash-card-inner {
    transform: rotateY(180deg);
  }
}

.flash-card-inner {
  position: relative;
  width: 100%;
  min-height: 180px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flash-card-front,
.flash-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.flash-card-front {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
  border: 1px solid var(--border-color);
}

.flash-card-back {
  background: linear-gradient(135deg, rgba(214, 158, 46, 0.1) 0%, var(--bg-card) 100%);
  border: 1px solid var(--accent);
  transform: rotateY(180deg);
}

.card-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 16px;

  span {
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .question-label {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .question-text,
  .answer-text {
    font-size: 16px;
    line-height: 1.7;
    color: var(--text-primary);
  }
}

.card-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  color: var(--text-muted);

  .flip-icon {
    transition: transform var(--transition-fast);
  }
}

.flash-card:hover .flip-icon {
  transform: translateY(2px);
}

.flash-card.is-flipped .flip-icon {
  transform: rotate(180deg);
}
</style>

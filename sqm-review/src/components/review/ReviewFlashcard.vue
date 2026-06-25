<template>
  <div class="review-flashcard">
    <div class="flashcard-header">
      <span class="badge">{{ currentIndex + 1 }} / {{ total }}</span>
      <span class="category">{{ category }}</span>
    </div>

    <div class="flashcard-body" @click="toggle">
      <transition name="flip" mode="out-in">
        <div v-if="!isRevealed" key="front" class="card-side front">
          <div class="side-label">
            <HelpCircle :size="14" />
            <span>问题</span>
          </div>
          <p class="card-text">{{ question }}</p>
          <span class="hint">点击查看答案</span>
        </div>
        <div v-else key="back" class="card-side back">
          <div class="side-label">
            <CheckCircle :size="14" />
            <span>答案</span>
          </div>
          <p class="card-text">{{ answer }}</p>
          <span class="hint">点击隐藏答案</span>
        </div>
      </transition>
    </div>

    <div class="flashcard-controls">
      <button
        class="ctrl-btn"
        :disabled="currentIndex === 0"
        @click.stop="$emit('prev')"
      >
        <ChevronLeft :size="18" />
        上一张
      </button>

      <div class="mastery-buttons">
        <button class="mastery-btn hard" @click.stop="$emit('rate', 'hard')">
          <XCircle :size="16" />
          不熟
        </button>
        <button class="mastery-btn good" @click.stop="$emit('rate', 'good')">
          <CheckCircle :size="16" />
          已掌握
        </button>
      </div>

      <button
        class="ctrl-btn"
        :disabled="currentIndex === total - 1"
        @click.stop="$emit('next')"
      >
        下一张
        <ChevronRight :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HelpCircle, CheckCircle, ChevronLeft, ChevronRight, XCircle } from 'lucide-vue-next'

defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  currentIndex: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
  category: { type: String, default: '' }
})

const emit = defineEmits(['prev', 'next', 'rate', 'toggle'])

const isRevealed = ref(false)

const toggle = () => {
  isRevealed.value = !isRevealed.value
  emit('toggle', isRevealed.value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.review-flashcard {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: border-color var(--transition-fast);

  &:hover {
    border-color: var(--accent);
  }
}

.flashcard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);

  .badge {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    font-family: $font-mono;
  }

  .category {
    font-size: 12px;
    color: var(--text-muted);
    padding: 4px 10px;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
  }
}

.flashcard-body {
  padding: 32px 24px;
  min-height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .side-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &.front .side-label {
    color: var(--accent);
  }

  &.back .side-label {
    color: var(--success);
  }

  .card-text {
    font-size: 18px;
    line-height: 1.7;
    color: var(--text-primary);
    max-width: 600px;
  }

  .hint {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 8px;
  }
}

.flashcard-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  gap: 12px;
}

.ctrl-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
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

.mastery-buttons {
  display: flex;
  gap: 10px;
}

.mastery-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;

  &.hard {
    background: rgba(229, 62, 62, 0.1);
    color: var(--error);

    &:hover {
      background: rgba(229, 62, 62, 0.2);
    }
  }

  &.good {
    background: rgba(56, 161, 105, 0.1);
    color: var(--success);

    &:hover {
      background: rgba(56, 161, 105, 0.2);
    }
  }
}

// Flip animation
.flip-enter-active,
.flip-leave-active {
  transition: all 0.3s ease;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}
</style>

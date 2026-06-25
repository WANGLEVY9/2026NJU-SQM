<template>
  <div class="exam-timer" :class="{ 'is-warning': isWarning, 'is-danger': isDanger }">
    <div class="timer-icon">
      <Clock :size="20" />
    </div>
    <div class="timer-display">
      <span class="timer-label">剩余时间</span>
      <span class="timer-value">{{ formattedTime }}</span>
    </div>
    <button class="timer-btn" @click="$emit('toggle-pause')">
      <Pause v-if="!isPaused" :size="16" />
      <Play v-else :size="16" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Clock, Pause, Play } from 'lucide-vue-next'

const props = defineProps({
  timeRemaining: {
    type: Number,
    required: true
  },
  isPaused: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-pause'])

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = props.timeRemaining % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const isWarning = computed(() => {
  return props.timeRemaining <= 300 && props.timeRemaining > 60
})

const isDanger = computed(() => {
  return props.timeRemaining <= 60
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.exam-timer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);

  &.is-warning {
    border-color: var(--warning);
    background: rgba(221, 107, 32, 0.1);

    .timer-value {
      color: var(--warning);
    }
  }

  &.is-danger {
    border-color: var(--error);
    background: rgba(229, 62, 62, 0.1);
    animation: pulse 1s infinite;

    .timer-value {
      color: var(--error);
    }
  }
}

.timer-icon {
  color: var(--accent);
}

.timer-display {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.timer-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timer-value {
  font-size: 24px;
  font-weight: 700;
  font-family: $font-mono;
  color: var(--text-primary);
}

.timer-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  @include flex-center;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

<template>
  <nav class="chapter-nav" v-if="chapters.length > 0">
    <div class="nav-header">
      <h3>章节导航</h3>
      <span class="chapter-indicator">{{ currentIndex + 1 }} / {{ chapters.length }}</span>
    </div>

    <div class="nav-groups">
      <div
        v-for="(group, groupIndex) in groupedChapters"
        :key="groupIndex"
        class="nav-group"
      >
        <div class="group-header">
          <span class="group-dot" :style="{ background: group.color }"></span>
          <span class="group-title">{{ group.teacher }}老师</span>
          <span class="group-count">{{ group.chapters.length }} 章</span>
        </div>
        <div class="nav-list">
          <router-link
            v-for="(chapter) in group.chapters"
            :key="chapter.id"
            :to="`/courses/${chapter.id}`"
            class="nav-item"
            :class="{
              'is-active': chapter.id === currentId,
              'is-completed': chapter.globalIndex < currentIndex
            }"
          >
            <span class="chapter-number">{{ chapter.globalIndex + 1 }}</span>
            <span class="chapter-title">{{ chapter.title }}</span>
            <CheckCircle v-if="chapter.globalIndex < currentIndex" :size="16" class="check-icon" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="nav-actions">
      <button
        class="nav-btn"
        :disabled="!hasPrev"
        @click="$emit('prev')"
      >
        <ChevronLeft :size="18" />
        <span>上一章</span>
      </button>
      <button
        class="nav-btn"
        :disabled="!hasNext"
        @click="$emit('next')"
      >
        <span>下一章</span>
        <ChevronRight :size="18" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  chapters: {
    type: Array,
    required: true
  },
  currentId: {
    type: String,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  hasPrev: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

defineEmits(['prev', 'next'])

const groupedChapters = computed(() => {
  const rong = []
  const shao = []

  props.chapters.forEach((ch, idx) => {
    const chapterWithIndex = { ...ch, globalIndex: idx }
    if (ch.teacher === '荣国平') {
      rong.push(chapterWithIndex)
    } else {
      shao.push(chapterWithIndex)
    }
  })

  const groups = []
  if (rong.length > 0) {
    groups.push({ teacher: '荣国平', chapters: rong, color: '#2c5282' })
  }
  if (shao.length > 0) {
    groups.push({ teacher: '邵栋', chapters: shao, color: '#d69e2e' })
  }
  return groups
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.chapter-nav {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  position: sticky;
  top: 90px;
}

.nav-header {
  @include flex-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .chapter-indicator {
    font-size: 13px;
    color: var(--accent);
    font-weight: 500;
  }
}

.nav-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 420px;
  overflow-y: auto;
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  margin-bottom: 2px;

  .group-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .group-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .group-count {
    font-size: 11px;
    color: var(--text-muted);
    margin-left: auto;
    background: var(--bg-secondary);
    padding: 2px 8px;
    border-radius: 10px;
  }
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
  }

  &.is-active {
    background: rgba(214, 158, 46, 0.1);
    color: var(--accent);

    .chapter-number {
      background: var(--accent);
      color: var(--bg-primary);
    }
  }

  &.is-completed {
    .chapter-number {
      background: var(--success);
      color: white;
    }
  }

  .chapter-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--border-color);
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    @include flex-center;
    flex-shrink: 0;
  }

  .chapter-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .check-icon {
    color: var(--success);
    flex-shrink: 0;
  }
}

.nav-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
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
</style>

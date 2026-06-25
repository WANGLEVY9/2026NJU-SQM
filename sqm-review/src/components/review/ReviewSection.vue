<template>
  <div class="review-section" :class="{ 'is-open': isOpen }">
    <button class="section-header" @click="toggle">
      <div class="header-left">
        <FolderOpen v-if="isOpen" :size="20" />
        <Folder v-else :size="20" />
        <div class="header-info">
          <h3 class="section-title">{{ title }}</h3>
          <span class="section-category">{{ category }}</span>
        </div>
      </div>
      <ChevronDown :size="20" class="toggle-icon" />
    </button>
    <transition name="collapse">
      <div v-if="isOpen" class="section-content">
        <div class="content-body" v-html="formattedContent"></div>
        <div class="key-points" v-if="keyPoints && keyPoints.length">
          <h4><Lightbulb :size="16" /> 重点速记</h4>
          <ul>
            <li v-for="(point, index) in keyPoints" :key="index">{{ point }}</li>
          </ul>
        </div>
        <div class="section-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Folder, FolderOpen, ChevronDown, Lightbulb } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  keyPoints: {
    type: Array,
    default: () => []
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const formattedContent = computed(() => {
  return props.content
    .replace(/^## /gm, '<h2>')
    .replace(/^### /gm, '<h3>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p>${match}</p>`
    })
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.review-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);

  &:hover {
    border-color: var(--border-light);
  }

  &.is-open {
    border-color: var(--accent);
  }
}

.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: transparent;
  color: var(--text-primary);
  text-align: left;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-card-hover);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;

  > svg {
    color: var(--accent);
    flex-shrink: 0;
  }
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
}

.section-category {
  font-size: 12px;
  color: var(--text-muted);
}

.toggle-icon {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.review-section.is-open .toggle-icon {
  transform: rotate(180deg);
}

.section-content {
  padding: 0 20px 20px;
  border-top: 1px solid var(--border-color);
}

.content-body {
  padding-top: 20px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);

  :deep(h2) {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 24px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color);
  }

  :deep(h3) {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 20px 0 10px;
  }

  :deep(p) {
    margin-bottom: 12px;
  }

  :deep(ul), :deep(ol) {
    margin: 12px 0;
    padding-left: 24px;
  }

  :deep(li) {
    margin-bottom: 8px;
  }

  :deep(strong) {
    color: var(--accent);
    font-weight: 600;
  }
}

.key-points {
  margin-top: 24px;
  padding: 16px;
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-md);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.section-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

// 折叠动画
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 2000px;
}
</style>

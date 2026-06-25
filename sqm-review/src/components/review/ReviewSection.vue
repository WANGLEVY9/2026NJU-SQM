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
      <div class="header-right">
        <span v-if="diagrams && diagrams.length" class="diagram-badge">
          <BarChart3 :size="12" />
          {{ diagrams.length }}个图表
        </span>
        <ChevronDown :size="20" class="toggle-icon" />
      </div>
    </button>
    <transition name="collapse">
      <div v-if="isOpen" class="section-content">
        <div class="content-body" v-html="formattedContent"></div>

        <!-- Diagrams Section -->
        <div v-if="diagrams && diagrams.length && showDiagrams" class="diagrams-section">
          <div class="diagrams-header">
            <h4><BarChart3 :size="16" /> 可视化辅助</h4>
          </div>
          <div class="diagrams-grid">
            <ReviewDiagram
              v-for="(diagram, index) in diagrams"
              :key="index"
              :type="diagram.type"
              :title="diagram.title"
              :data="diagram.data"
            />
          </div>
        </div>

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
import { Folder, FolderOpen, ChevronDown, Lightbulb, BarChart3 } from 'lucide-vue-next'
import ReviewDiagram from './ReviewDiagram.vue'

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
  diagrams: {
    type: Array,
    default: () => []
  },
  showDiagrams: {
    type: Boolean,
    default: true
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
  let html = props.content

  // Replace markdown headers
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')

  // Replace bold text with styled spans
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Replace numbered lists
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="numbered-item"><span class="number-badge">$1</span>$2</li>')
  html = html.replace(/(<li class="numbered-item">.*<\/li>\n?)+/g, '<ol class="styled-list">$&</ol>')

  // Replace bullet lists
  html = html.replace(/^- (.*$)/gim, '<li class="bullet-item">$1</li>')
  html = html.replace(/(<li class="bullet-item">.*<\/li>\n?)+/g, '<ul class="styled-list">$&</ul>')

  // Wrap consecutive lines in paragraphs
  const lines = html.split('\n')
  const result = []
  let inParagraph = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    if (trimmed.startsWith('<')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(trimmed)
    } else {
      if (!inParagraph) {
        result.push('<p>')
        inParagraph = true
      }
      result.push(trimmed)
    }
  }
  if (inParagraph) result.push('</p>')

  return result.join('\n')
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.review-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    border-color: var(--border-light);
  }

  &.is-open {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px rgba(214, 158, 46, 0.1);
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
  cursor: pointer;
  border: none;

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

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.diagram-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  background: rgba(214, 158, 46, 0.1);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: var(--radius-sm);

  svg {
    color: var(--accent);
  }
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
    margin: 28px 0 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border-color);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: var(--accent);
    }
  }

  :deep(h3) {
    font-size: 15px;
    font-weight: 600;
    color: var(--accent);
    margin: 22px 0 10px;
    padding-left: 10px;
    border-left: 3px solid var(--accent);
  }

  :deep(p) {
    margin-bottom: 14px;
  }

  :deep(.styled-list) {
    margin: 14px 0;
    padding-left: 0;
    list-style: none;
  }

  :deep(.bullet-item) {
    position: relative;
    padding-left: 22px;
    margin-bottom: 10px;
    line-height: 1.7;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.7;
    }
  }

  :deep(.numbered-item) {
    position: relative;
    padding-left: 32px;
    margin-bottom: 10px;
    line-height: 1.7;

    .number-badge {
      position: absolute;
      left: 0;
      top: 2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      font-size: 11px;
      font-weight: 700;
      color: var(--bg-primary);
      background: var(--accent);
      border-radius: 50%;
      flex-shrink: 0;
    }
  }

  :deep(ol.styled-list) {
    counter-reset: item;

    .numbered-item {
      counter-increment: item;
    }
  }

  :deep(strong) {
    color: var(--accent);
    font-weight: 600;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;

    th, td {
      padding: 10px 14px;
      border: 1px solid var(--border-color);
      text-align: left;
    }

    th {
      background: var(--bg-secondary);
      font-weight: 600;
      color: var(--text-primary);
    }

    td {
      color: var(--text-secondary);
    }

    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }
  }
}

// Diagrams Section
.diagrams-section {
  margin-top: 24px;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  .diagrams-header {
    margin-bottom: 12px;

    h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      color: var(--accent);

      svg {
        color: var(--accent);
      }
    }
  }

  .diagrams-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @include respond-to(md) {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
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

// Responsive
@media (max-width: 640px) {
  .section-header {
    padding: 16px;
  }

  .section-title {
    font-size: 15px;
  }

  .diagram-badge {
    display: none;
  }

  .content-body {
    font-size: 14px;

    :deep(h2) {
      font-size: 16px;
    }

    :deep(h3) {
      font-size: 14px;
    }
  }
}
</style>

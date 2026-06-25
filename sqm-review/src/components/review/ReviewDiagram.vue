<template>
  <div class="review-diagram" :class="[`type-${type}`, { 'is-dark': isDark }]">
    <h4 v-if="title" class="diagram-title">
      <component :is="iconForType" :size="18" />
      {{ title }}
    </h4>
    <div class="diagram-canvas" v-html="svgMarkup"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Network, GitBranch, Clock, Triangle, Columns, RefreshCw } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (v) => ['mindmap', 'flowchart', 'timeline', 'pyramid', 'comparison', 'cycle'].includes(v)
  },
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    required: true
  }
})

const iconForType = computed(() => {
  const map = {
    mindmap: Network,
    flowchart: GitBranch,
    timeline: Clock,
    pyramid: Triangle,
    comparison: Columns,
    cycle: RefreshCw
  }
  return map[props.type] || Network
})

const isDark = computed(() => true) // Dark theme by default for this app

const svgMarkup = computed(() => {
  switch (props.type) {
    case 'mindmap': return renderMindmap(props.data)
    case 'flowchart': return renderFlowchart(props.data)
    case 'timeline': return renderTimeline(props.data)
    case 'pyramid': return renderPyramid(props.data)
    case 'comparison': return renderComparison(props.data)
    case 'cycle': return renderCycle(props.data)
    default: return ''
  }
})

// Colors that work in dark theme
const COLORS = ['#d69e2e', '#63b3ed', '#68d391', '#fc8181', '#b794f4', '#f6ad55']
const TEXT_COLOR = 'var(--text-primary, #e2e8f0)'
const SECONDARY_TEXT = 'var(--text-secondary, #a0aec0)'
const BG_CARD = 'var(--bg-card, #1a202c)'
const BORDER_COLOR = 'var(--border-color, #2d3748)'
const ACCENT = 'var(--accent, #d69e2e)'

function renderMindmap(data) {
  const { center, branches = [] } = data
  const w = 680, h = 320
  const cx = w / 2, cy = h / 2
  const r = 100
  const count = branches.length || 1
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`
  
  // Draw branches
  branches.forEach((branch, i) => {
    const angle = (2 * Math.PI * i / count) - Math.PI / 2
    const nx = cx + Math.cos(angle) * r * 1.8
    const ny = cy + Math.sin(angle) * r * 1.2
    const color = COLORS[i % COLORS.length]
    
    // Curved line
    const mx = cx + Math.cos(angle) * r * 0.9
    const my = cy + Math.sin(angle) * r * 0.6
    svg += `<path d="M${cx},${cy} Q${mx},${my} ${nx},${ny}" stroke="${color}" stroke-width="2" fill="none" opacity="0.7"/>`
    
    // Node circle
    svg += `<circle cx="${nx}" cy="${ny}" r="8" fill="${color}" filter="url(#glow)"/>`
    
    // Label
    const labelX = nx + (nx > cx ? 14 : -14)
    const anchor = nx > cx ? 'start' : 'end'
    svg += `<text x="${labelX}" y="${ny - 6}" text-anchor="${anchor}" fill="${TEXT_COLOR}" font-size="13" font-weight="600">${escapeXml(branch.label)}</text>`
    if (branch.desc) {
      svg += `<text x="${labelX}" y="${ny + 12}" text-anchor="${anchor}" fill="${SECONDARY_TEXT}" font-size="10">${escapeXml(branch.desc)}</text>`
    }
  })
  
  // Center node
  svg += `<circle cx="${cx}" cy="${cy}" r="36" fill="${ACCENT}" opacity="0.2"/>
    <circle cx="${cx}" cy="${cy}" r="30" fill="${ACCENT}" opacity="0.15" stroke="${ACCENT}" stroke-width="2"/>
    <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="${ACCENT}" font-size="12" font-weight="700">${escapeXml(center)}</text>
  </svg>`
  
  return svg
}

function renderFlowchart(data) {
  const { steps = [] } = data
  const w = 680, h = 160
  const stepW = 120, stepH = 50
  const gap = 40
  const totalW = steps.length * stepW + (steps.length - 1) * gap
  const startX = (w - totalW) / 2 + stepW / 2
  const cy = h / 2
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">`
  
  steps.forEach((step, i) => {
    const x = startX + i * (stepW + gap)
    const color = COLORS[i % COLORS.length]
    
    // Arrow (except last)
    if (i < steps.length - 1) {
      svg += `<line x1="${x + stepW/2}" y1="${cy}" x2="${x + stepW/2 + gap}" y2="${cy}" stroke="${SECONDARY_TEXT}" stroke-width="2" stroke-dasharray="4 2"/>
      <polygon points="${x + stepW/2 + gap - 6},${cy - 4} ${x + stepW/2 + gap},${cy} ${x + stepW/2 + gap - 6},${cy + 4}" fill="${SECONDARY_TEXT}"/>`
    }
    
    // Rounded rect
    svg += `<rect x="${x - stepW/2}" y="${cy - stepH/2}" width="${stepW}" height="${stepH}" rx="8" fill="${BG_CARD}" stroke="${color}" stroke-width="2"/>`
    
    // Step number
    svg += `<circle cx="${x}" cy="${cy - stepH/2 - 8}" r="10" fill="${color}"/>`
    svg += `<text x="${x}" y="${cy - stepH/2 - 5}" text-anchor="middle" fill="${BG_CARD}" font-size="10" font-weight="700">${i + 1}</text>`
    
    // Label
    svg += `<text x="${x}" y="${cy - 2}" text-anchor="middle" fill="${TEXT_COLOR}" font-size="11" font-weight="600">${escapeXml(step.label)}</text>`
    if (step.sub) {
      svg += `<text x="${x}" y="${cy + 14}" text-anchor="middle" fill="${SECONDARY_TEXT}" font-size="9">${escapeXml(step.sub)}</text>`
    }
  })
  
  svg += `</svg>`
  return svg
}

function renderTimeline(data) {
  const { events = [] } = data
  const w = 680, h = 200
  const lineY = h / 2
  const padding = 60
  const availableW = w - padding * 2
  const count = events.length
  const gap = count > 1 ? availableW / (count - 1) : 0
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">`
  
  // Main line
  svg += `<line x1="${padding}" y1="${lineY}" x2="${w - padding}" y2="${lineY}" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>`
  
  events.forEach((event, i) => {
    const x = padding + i * gap
    const color = COLORS[i % COLORS.length]
    const isTop = i % 2 === 0
    const labelY = isTop ? lineY - 30 : lineY + 40
    
    // Node
    svg += `<circle cx="${x}" cy="${lineY}" r="10" fill="${BG_CARD}" stroke="${color}" stroke-width="3"/>
      <circle cx="${x}" cy="${lineY}" r="4" fill="${color}"/>`
    
    // Connector line
    const connY = isTop ? lineY - 14 : lineY + 14
    svg += `<line x1="${x}" y1="${lineY}" x2="${x}" y2="${connY}" stroke="${color}" stroke-width="2"/>`
    
    // Year/period label
    svg += `<text x="${x}" y="${isTop ? lineY - 18 : lineY + 28}" text-anchor="middle" fill="${color}" font-size="11" font-weight="700">${escapeXml(event.period)}</text>`
    
    // Description
    const lines = wrapText(event.desc, 14)
    lines.forEach((line, li) => {
      const ly = labelY + li * 14
      svg += `<text x="${x}" y="${ly}" text-anchor="middle" fill="${SECONDARY_TEXT}" font-size="10">${escapeXml(line)}</text>`
    })
  })
  
  svg += `</svg>`
  return svg
}

function renderPyramid(data) {
  const { levels = [] } = data
  const w = 400, h = 300
  const levelH = h / levels.length
  const maxW = w - 40
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">`
  
  const cx = w / 2
  
  levels.forEach((level, i) => {
    const topY = i * levelH
    const bottomY = (i + 1) * levelH - 4
    const topWidth = maxW * (levels.length - i) / levels.length
    const bottomWidth = maxW * (levels.length - i - 1) / levels.length
    const topLeft = cx - topWidth / 2
    const topRight = cx + topWidth / 2
    const bottomLeft = cx - bottomWidth / 2
    const bottomRight = cx + bottomWidth / 2
    const color = COLORS[i % COLORS.length]
    
    // Trapezoid
    svg += `<polygon points="${topLeft},${topY} ${topRight},${topY} ${bottomRight},${bottomY} ${bottomLeft},${bottomY}" 
      fill="${color}" opacity="0.15" stroke="${color}" stroke-width="2"/>`
    
    // Label
    svg += `<text x="${cx}" y="${topY + levelH / 2 + 4}" text-anchor="middle" fill="${TEXT_COLOR}" font-size="11" font-weight="600">${escapeXml(level.label)}</text>`
    if (level.sub) {
      svg += `<text x="${cx}" y="${topY + levelH / 2 + 18}" text-anchor="middle" fill="${SECONDARY_TEXT}" font-size="9">${escapeXml(level.sub)}</text>`
    }
  })
  
  svg += `</svg>`
  return svg
}

function renderComparison(data) {
  const { left, right, leftTitle, rightTitle } = data
  const w = 680, h = 220
  const colW = 280
  const leftX = (w - colW * 2 - 40) / 2 + colW / 2
  const rightX = leftX + colW + 40
  const startY = 50
  const rowH = 36
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">`
  
  // Headers
  svg += `<rect x="${leftX - colW/2}" y="10" width="${colW}" height="32" rx="6" fill="#3182ce" opacity="0.2"/>
    <text x="${leftX}" y="32" text-anchor="middle" fill="#63b3ed" font-size="13" font-weight="700">${escapeXml(leftTitle)}</text>`
  svg += `<rect x="${rightX - colW/2}" y="10" width="${colW}" height="32" rx="6" fill="#38a169" opacity="0.2"/>
    <text x="${rightX}" y="32" text-anchor="middle" fill="#68d391" font-size="13" font-weight="700">${escapeXml(rightTitle)}</text>`
  
  // VS badge
  svg += `<circle cx="${w/2}" cy="26" r="14" fill="${BG_CARD}" stroke="${ACCENT}" stroke-width="2"/>
    <text x="${w/2}" y="30" text-anchor="middle" fill="${ACCENT}" font-size="9" font-weight="700">VS</text>`
  
  // Rows
  const maxRows = Math.max(left.length, right.length)
  for (let i = 0; i < maxRows; i++) {
    const y = startY + i * rowH
    
    // Left item
    if (left[i]) {
      svg += `<rect x="${leftX - colW/2}" y="${y}" width="${colW}" height="28" rx="4" fill="${BG_CARD}" stroke="${BORDER_COLOR}" stroke-width="1"/>
        <text x="${leftX - colW/2 + 10}" y="${y + 19}" fill="${TEXT_COLOR}" font-size="11">${escapeXml(left[i])}</text>`
    }
    
    // Right item
    if (right[i]) {
      svg += `<rect x="${rightX - colW/2}" y="${y}" width="${colW}" height="28" rx="4" fill="${BG_CARD}" stroke="${BORDER_COLOR}" stroke-width="1"/>
        <text x="${rightX - colW/2 + 10}" y="${y + 19}" fill="${TEXT_COLOR}" font-size="11">${escapeXml(right[i])}</text>`
    }
  }
  
  svg += `</svg>`
  return svg
}

function renderCycle(data) {
  const { steps = [] } = data
  const w = 320, h = 320
  const cx = w / 2, cy = h / 2
  const r = 100
  const count = steps.length || 1
  
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg-el">`
  
  // Background circle
  svg += `<circle cx="${cx}" cy="${cy}" r="${r + 20}" fill="none" stroke="${BORDER_COLOR}" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>`
  
  // Cycle arrows
  steps.forEach((step, i) => {
    const startAngle = (2 * Math.PI * i / count) - Math.PI / 2
    const endAngle = (2 * Math.PI * (i + 0.85) / count) - Math.PI / 2
    const color = COLORS[i % COLORS.length]
    
    // Arc
    const x1 = cx + Math.cos(startAngle) * r
    const y1 = cy + Math.sin(startAngle) * r
    const x2 = cx + Math.cos(endAngle) * r
    const y2 = cy + Math.sin(endAngle) * r
    const largeArc = 0 // Always less than 180 for 85% of circle segment
    
    svg += `<path d="M${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2}" 
      fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`
    
    // Arrow head
    const arrowAngle = endAngle + 0.15
    const ax = cx + Math.cos(arrowAngle) * r
    const ay = cy + Math.sin(arrowAngle) * r
    const arrowSize = 6
    svg += `<polygon points="${ax},${ay} ${ax - arrowSize * Math.cos(arrowAngle - 0.5)},${ay - arrowSize * Math.sin(arrowAngle - 0.5)} ${ax - arrowSize * Math.cos(arrowAngle + 0.5)},${ay - arrowSize * Math.sin(arrowAngle + 0.5)}" fill="${color}"/>`
    
    // Node
    const nx = cx + Math.cos(startAngle) * r
    const ny = cy + Math.sin(startAngle) * r
    svg += `<circle cx="${nx}" cy="${ny}" r="18" fill="${BG_CARD}" stroke="${color}" stroke-width="2"/>`
    svg += `<text x="${nx}" y="${ny + 4}" text-anchor="middle" fill="${TEXT_COLOR}" font-size="10" font-weight="700">${escapeXml(step.label)}</text>`
    
    // Outer label
    const lx = cx + Math.cos(startAngle) * (r + 40)
    const ly = cy + Math.sin(startAngle) * (r + 40)
    if (step.desc) {
      svg += `<text x="${lx}" y="${ly}" text-anchor="middle" fill="${SECONDARY_TEXT}" font-size="9">${escapeXml(step.desc)}</text>`
    }
  })
  
  // Center text
  if (data.center) {
    svg += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="${ACCENT}" font-size="12" font-weight="700">${escapeXml(data.center)}</text>`
  }
  
  svg += `</svg>`
  return svg
}

function escapeXml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapText(text, maxChars) {
  if (!text) return []
  const words = String(text).split(/\s+/)
  const lines = []
  let current = ''
  
  words.forEach(word => {
    if ((current + word).length > maxChars && current) {
      lines.push(current.trim())
      current = word + ' '
    } else {
      current += word + ' '
    }
  })
  if (current.trim()) lines.push(current.trim())
  return lines.length ? lines : [text]
}
</script>

<style lang="scss" scoped>
.review-diagram {
  margin: 20px 0;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;

  .diagram-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);

    svg {
      color: var(--accent);
    }
  }

  .diagram-canvas {
    width: 100%;
    overflow-x: auto;

    :deep(.diagram-svg-el) {
      width: 100%;
      min-width: 320px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
  }

  // Type-specific styling
  &.type-mindmap .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 320px;
  }

  &.type-flowchart .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 180px;
  }

  &.type-timeline .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 220px;
  }

  &.type-pyramid .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 280px;
    max-width: 400px;
  }

  &.type-comparison .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 220px;
  }

  &.type-cycle .diagram-canvas :deep(.diagram-svg-el) {
    max-height: 320px;
    max-width: 320px;
  }
}

// Responsive
@media (max-width: 640px) {
  .review-diagram {
    padding: 12px;

    .diagram-title {
      font-size: 13px;
    }
  }
}
</style>

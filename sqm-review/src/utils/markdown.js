/**
 * 共享 Markdown 渲染器
 * 用于将 Markdown 格式文本转换为 HTML，供所有内容展示组件复用
 *
 * 支持的语法：
 *   - 标题：## / ### / ####
 *   - 行内格式：**粗体**、*斜体*、***粗斜体***
 *   - 行内代码：`code`
 *   - 代码块：```lang ```
 *   - 表格：|...|
 *   - 有序列表：1. 2.
 *   - 无序列表：- 
 *   - 引用块：>
 *   - 分割线：---
 *   - 段落：自动 <p> 包裹
 */

// HTML 实体转义，防止 XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// 行内格式解析：粗斜体、粗体、斜体
function parseInline(text) {
  if (!text || typeof text !== 'string') return text
  let result = text
  // ***粗斜体***
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  // **粗体**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="md-strong">$1</strong>')
  // *斜体*
  result = result.replace(/\*(.+?)\*/g, '<em class="md-em">$1</em>')
  return result
}

// 表格渲染
function renderTable(table) {
  const thead = `<thead><tr>${table.headers.map(h => `<th>${parseInline(h)}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${table.rows.map(row =>
    `<tr>${row.map((cell, ci) => {
      const tag = ci === 0 ? 'th' : 'td'
      return `<${tag}>${parseInline(cell)}</${tag}>`
    }).join('')}</tr>`
  ).join('')}</tbody>`
  return `<div class="md-table-wrapper"><table class="md-table">${thead}${tbody}</table></div>`
}

// 代码块渲染
function renderCodeBlock(block) {
  const langLabel = block.lang ? `<span class="code-lang">${block.lang}</span>` : ''
  return `<div class="md-code-block"><div class="code-header">${langLabel}<span class="code-copy">代码</span></div><pre><code>${block.code}</code></pre></div>`
}

/**
 * 将 Markdown 文本渲染为 HTML
 * @param {string} content - Markdown 原始文本
 * @returns {string} - 渲染后的 HTML
 */
export function renderMarkdown(content) {
  if (!content) return ''

  let text = content

  // 1. 转义 HTML 特殊字符（防止 XSS）
  text = escapeHtml(text)

  // 2. 代码块（优先处理，避免内部被解析）
  const codeBlocks = []
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `CODE_${codeBlocks.length}`
    codeBlocks.push({ lang: lang || '', code: code.trim() })
    return id
  })

  // 3. 行内代码
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // 4. 表格（先处理，避免被列表解析干扰）
  const tables = []
  text = text.replace(/(\|[^\n]+\|)\n(\|[-:\| ]+\|)\n((?:\|[^\n]+\|\n?)+)/g, (match, headerLine, sepLine, bodyLines) => {
    const id = `TABLE_${tables.length}`
    const headers = headerLine.split('|').filter(c => c.trim() !== '').map(c => c.trim())
    const rows = bodyLines.trim().split('\n').map(row =>
      row.split('|').filter(c => c.trim() !== '').map(c => c.trim())
    )
    tables.push({ headers, rows })
    return id
  })

  // 5. 标题
  text = text.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
  text = text.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
  text = text.replace(/^#### (.*$)/gim, '<h4 class="md-h4">$1</h4>')

  // 6. 粗体和斜体
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="md-strong">$1</strong>')
  text = text.replace(/\*(.+?)\*/g, '<em class="md-em">$1</em>')

  // 7. 引用块
  text = text.replace(/^> (.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>')
  // 合并相邻引用块
  text = text.replace(/(<blockquote[^>]*>[\s\S]*?<\/blockquote>)(\s*<blockquote[^>]*>[\s\S]*?<\/blockquote>)+/g, (match) => {
    const inner = match.replace(/<\/?blockquote[^>]*>/g, '').replace(/\n+/g, '<br>')
    return `<blockquote class="md-blockquote">${inner}</blockquote>`
  })

  // 8. 有序列表
  const olGroups = []
  text = text.replace(/((?:^\d+\. .*\n?)+)/gm, (match) => {
    const id = `OL_${olGroups.length}`
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^\d+\.\s*/, '')
      return `<li class="ol-item">${parseInline(content)}</li>`
    }).join('')
    olGroups.push(`<ol class="md-ol">${items}</ol>`)
    return id
  })

  // 9. 无序列表
  const ulGroups = []
  text = text.replace(/((?:^- .*\n?)+)/gm, (match) => {
    const id = `UL_${ulGroups.length}`
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^-\s*/, '')
      return `<li class="ul-item">${parseInline(content)}</li>`
    }).join('')
    ulGroups.push(`<ul class="md-ul">${items}</ul>`)
    return id
  })

  // 10. 分割线
  text = text.replace(/^---\s*$/gim, '<hr class="md-hr" />')

  // 11. 段落处理
  const lines = text.split('\n')
  const result = []
  let inParagraph = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    if (line.startsWith('<') || /^CODE_\d+$/.test(line) || /^TABLE_\d+$/.test(line) || /^OL_\d+$/.test(line) || /^UL_\d+$/.test(line)) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(line)
    } else {
      if (!inParagraph) {
        result.push('<p class="md-p">')
        inParagraph = true
      }
      result.push(parseInline(line))
    }
  }
  if (inParagraph) result.push('</p>')

  text = result.join('\n')

  // 12. 还原占位符
  tables.forEach((table, i) => {
    text = text.replace(`TABLE_${i}`, renderTable(table))
  })
  codeBlocks.forEach((block, i) => {
    text = text.replace(`CODE_${i}`, renderCodeBlock(block))
  })
  olGroups.forEach((html, i) => {
    text = text.replace(`OL_${i}`, html)
  })
  ulGroups.forEach((html, i) => {
    text = text.replace(`UL_${i}`, html)
  })

  return text
}

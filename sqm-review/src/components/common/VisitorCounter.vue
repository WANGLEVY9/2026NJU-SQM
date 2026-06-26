<template>
  <div class="visitor-counter" title="本站独立访客数（同一访客短时间内重复访问不重复计数）">
    <Eye :size="14" />
    <span class="vc-label">访客</span>
    <span class="vc-value" id="busuanzi_value_site_uv">-</span>
    <span class="vc-unit">人</span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Eye } from 'lucide-vue-next'

onMounted(() => {
  // SPA 下在组件 DOM 就绪后动态注入不蒜子脚本，确保能正确填充独立访客数(UV)
  // site_uv 基于 cookie 去重：同一访客短时间内反复刷新/进入不重复计数
  if (document.getElementById('busuanzi-script')) return
  const script = document.createElement('script')
  script.id = 'busuanzi-script'
  script.async = true
  script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  document.body.appendChild(script)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.visitor-counter {
  // 默认隐藏，仅在桌面端（与导航栏一致）显示，避免移动端顶部拥挤
  display: none;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: all var(--transition-fast);

  svg {
    color: var(--accent);
    flex-shrink: 0;
  }

  .vc-value {
    color: var(--accent);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    min-width: 8px;
    text-align: center;
  }

  .vc-unit {
    color: var(--text-muted);
  }

  @include respond-to(lg) {
    display: flex;
  }
}
</style>

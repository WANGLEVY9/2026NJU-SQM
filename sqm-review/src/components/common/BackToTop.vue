<template>
  <transition name="back-to-top">
    <button
      v-if="isVisible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="返回顶部"
    >
      <ArrowUp :size="20" />
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(214, 158, 46, 0.4);
  transition: all var(--transition-fast);
  z-index: 999;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(214, 158, 46, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

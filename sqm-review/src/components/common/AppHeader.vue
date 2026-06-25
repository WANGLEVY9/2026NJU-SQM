<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="url(#logo-gradient)"/>
            <text x="50%" y="55%" text-anchor="middle" fill="#d69e2e" font-size="14" font-weight="bold" font-family="serif">SQM</text>
            <defs>
              <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stop-color="#1a365d"/>
                <stop offset="100%" stop-color="#2c5282"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">软件质量管理</span>
      </router-link>

      <nav class="nav-menu" :class="{ 'is-open': isMobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">
          <Home :size="18" />
          <span>首页</span>
        </router-link>
        <router-link to="/courses" class="nav-link" @click="closeMobileMenu">
          <BookOpen :size="18" />
          <span>课件学习</span>
        </router-link>
        <router-link to="/review" class="nav-link" @click="closeMobileMenu">
          <Brain :size="18" />
          <span>复习背诵</span>
        </router-link>
        <router-link to="/exams" class="nav-link" @click="closeMobileMenu">
          <FileText :size="18" />
          <span>真题练习</span>
        </router-link>
        <router-link to="/choices" class="nav-link" @click="closeMobileMenu">
          <ListChecks :size="18" />
          <span>选择题专项</span>
        </router-link>
        <router-link to="/mock" class="nav-link" @click="closeMobileMenu">
          <ClipboardList :size="18" />
          <span>模拟考试</span>
        </router-link>
      </nav>

      <button class="mobile-menu-btn" @click="toggleMobileMenu" :aria-label="isMobileMenuOpen ? '关闭菜单' : '打开菜单'">
        <Menu v-if="!isMobileMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Home, BookOpen, Brain, FileText, ClipboardList, ListChecks, Menu, X } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  .logo-icon {
    width: 40px;
    height: 40px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .logo-text {
    font-family: $font-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    display: none;

    @include respond-to(md) {
      display: block;
    }
  }
}

.nav-menu {
  display: none;
  gap: 8px;

  @include respond-to(lg) {
    display: flex;
    gap: 4px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    color: var(--text-primary);
    background: var(--bg-card);
  }

  &.router-link-active {
    color: var(--accent);
    background: rgba(214, 158, 46, 0.1);
  }
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  background: transparent;
  transition: background var(--transition-fast);

  @include respond-to(lg) {
    display: none;
  }

  &:hover {
    background: var(--bg-card);
  }
}

// 移动端菜单
.nav-menu.is-open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  gap: 4px;

  .nav-link {
    padding: 12px 16px;
  }
}
</style>

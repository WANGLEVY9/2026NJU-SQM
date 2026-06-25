<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-info">
          <p class="footer-title">软件质量管理复习平台</p>
          <p class="footer-desc">为软件质量管理课程学生提供全面的复习资源</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>学习资源</h4>
            <router-link to="/courses">课件学习</router-link>
            <router-link to="/review">复习背诵</router-link>
            <router-link to="/exams">真题练习</router-link>
          </div>
          <div class="link-group">
            <h4>考试中心</h4>
            <router-link to="/mock">模拟考试</router-link>
            <router-link to="/mock/mock1">模拟卷一</router-link>
            <router-link to="/mock/mock2">模拟卷二</router-link>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 SQM Review. 仅供学习参考使用.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @include respond-to(md) {
    grid-template-columns: 2fr 1fr;
  }
}

.footer-info {
  .footer-title {
    font-family: $font-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .footer-desc {
    font-size: 14px;
    color: var(--text-muted);
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.link-group {
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 12px;
  }

  a {
    display: block;
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 8px;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--accent);
    }
  }
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  text-align: center;

  p {
    font-size: 13px;
    color: var(--text-muted);
  }
}
</style>

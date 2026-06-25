<template>
  <div class="about-view container">
    <header class="page-header">
      <h1>关于平台</h1>
      <p>软件质量管理复习平台使用说明</p>
    </header>

    <div class="about-content">
      <section class="about-section">
        <h2>
          <BookOpen :size="20" />
          平台简介
        </h2>
        <p>软件质量管理复习平台是一个专为软件质量管理课程学生设计的在线学习系统。平台整合了课程课件、复习资料、历年真题和模拟试卷，帮助学生系统复习、高效备考。</p>
      </section>

      <section class="about-section">
        <h2>
          <Layers :size="20" />
          功能模块
        </h2>
        <div class="features-list">
          <div class="feature-item">
            <h3>课件学习</h3>
            <p>按章节系统学习课程内容，每章节配有详细的讲解和重点标注。支持章节导航和闪卡记忆检测功能。</p>
          </div>
          <div class="feature-item">
            <h3>复习背诵</h3>
            <p>归纳整理核心知识点，支持折叠展开便于集中注意力。每个知识点配有快速记忆检测闪卡。</p>
          </div>
          <div class="feature-item">
            <h3>真题练习</h3>
            <p>收录历年真题和课堂测试题，支持按年份、题型筛选，提供详细答案解析。</p>
          </div>
          <div class="feature-item">
            <h3>模拟考试</h3>
            <p>5套全真模拟试卷，包含计时功能和自动评分系统，真实模拟考试环境。</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>
          <Info :size="20" />
          使用说明
        </h2>
        <div class="guide-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div class="step-content">
              <h3>开始学习</h3>
              <p>从首页选择学习模块，进入对应的学习页面开始复习</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div class="step-content">
              <h3>系统复习</h3>
              <p>按章节顺序学习课件，完成复习背诵模块，检验学习效果</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div class="step-content">
              <h3>真题练习</h3>
              <p>通过真题练习熟悉出题风格，查看答案解析巩固知识点</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div class="step-content">
              <h3>模拟考试</h3>
              <p>在真实考试环境中进行模拟测试，检验复习效果</p>
            </div>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>
          <Heart :size="20" />
          注意事项
        </h2>
        <ul class="notice-list">
          <li>闪卡采用点击翻转设计，可反复练习加深记忆</li>
          <li>真题练习支持答案显示/隐藏，方便自我检测</li>
          <li>模拟考试计时结束会自动提交，请注意时间</li>
          <li>建议使用Chrome、Firefox或Edge浏览器获得最佳体验</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { BookOpen, Layers, Info, Heart } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.about-view {
  padding: 40px 20px;
  max-width: 800px;
}

.page-header {
  margin-bottom: 48px;
  text-align: center;

  h1 {
    font-family: $font-serif;
    font-size: 36px;
    @include text-gradient;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: var(--text-secondary);
  }
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 32px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);

    svg {
      color: var(--accent);
    }
  }

  > p {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
  }
}

.features-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.feature-item {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
  }
}

.guide-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  gap: 16px;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg-primary);
  font-size: 16px;
  font-weight: 700;
  @include flex-center;
  flex-shrink: 0;
}

.step-content {
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

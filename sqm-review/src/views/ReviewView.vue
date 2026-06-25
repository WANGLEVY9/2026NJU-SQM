<template>
  <div class="review-view container">
    <header class="page-header">
      <h1>复习背诵</h1>
      <p>系统梳理核心知识点，高效备战考试</p>
    </header>

    <div class="review-categories">
      <button
        v-for="category in categories"
        :key="category"
        class="category-tag"
        :class="{ 'is-active': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="review-list">
      <ReviewSection
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :category="item.category"
        :content="item.content"
        :keyPoints="item.keyPoints"
        :defaultOpen="true"
      >
        <template #footer>
          <QuickFlashCard
            v-if="item.keyPoints?.length"
            :question="`巩固练习：${item.keyPoints[0]}`"
            :answer="item.keyPoints[0]"
          />
        </template>
      </ReviewSection>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { reviewData } from '@/data/review'
import ReviewSection from '@/components/review/ReviewSection.vue'
import QuickFlashCard from '@/components/review/QuickFlashCard.vue'

const selectedCategory = ref('全部')

const categories = computed(() => {
  const cats = new Set(reviewData.map(item => item.category))
  return ['全部', ...cats]
})

const filteredItems = computed(() => {
  if (selectedCategory.value === '全部') {
    return reviewData
  }
  return reviewData.filter(item => item.category === selectedCategory.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.review-view {
  padding: 40px 20px;
}

.page-header {
  margin-bottom: 32px;

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

.review-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.category-tag {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &.is-active {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
  }
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label class="filter-label">年份</label>
      <select v-model="selectedYear" class="filter-select" @change="handleYearChange">
        <option :value="null">全部年份</option>
        <option v-for="year in years" :key="year" :value="year">{{ typeof year === 'number' ? year + '年' : year }}</option>
      </select>
    </div>
    <div class="filter-group">
      <label class="filter-label">类型</label>
      <select v-model="selectedType" class="filter-select" @change="handleTypeChange">
        <option :value="null">全部类型</option>
        <option value="final">期末真题</option>
        <option value="mid">期中试卷</option>
        <option value="class">课堂测试</option>
        <option value="early">往年汇编</option>
      </select>
    </div>
    <button
      v-if="selectedYear || selectedType"
      class="filter-clear"
      @click="clearFilters"
    >
      <X :size="14" />
      清除筛选
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  years: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-change'])

const selectedYear = ref(null)
const selectedType = ref(null)

const handleYearChange = () => {
  emit('filter-change', { year: selectedYear.value, type: selectedType.value })
}

const handleTypeChange = () => {
  emit('filter-change', { year: selectedYear.value, type: selectedType.value })
}

const clearFilters = () => {
  selectedYear.value = null
  selectedType.value = null
  emit('filter-change', { year: null, type: null })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  min-width: 140px;
  transition: border-color var(--transition-fast);

  &:hover,
  &:focus {
    border-color: var(--accent);
    outline: none;
  }
}

.filter-clear {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  align-self: flex-end;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}
</style>

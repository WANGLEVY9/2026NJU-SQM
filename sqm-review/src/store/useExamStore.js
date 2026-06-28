import { defineStore } from 'pinia'
import { examPapers } from '@/data/exams'

// 年份排序：数字年份降序（最新优先），非数字年份排末尾并按固定顺序
const NON_NUMERIC_YEAR_ORDER = ['课堂', '早期', '未确定']

function compareYear(yearA, yearB) {
    const aNum = typeof yearA === 'number'
    const bNum = typeof yearB === 'number'
    if (aNum && bNum) return yearB - yearA
    if (aNum && !bNum) return -1
    if (!aNum && bNum) return 1
    // 两个都是非数字年份：按预设顺序排列
    return NON_NUMERIC_YEAR_ORDER.indexOf(yearA) - NON_NUMERIC_YEAR_ORDER.indexOf(yearB)
}

export const useExamStore = defineStore('exam', {
    state: () => ({
        papers: examPapers,
        currentPaperId: null,
        answers: {},
        showAnswer: {},
        checked: {},
        filters: {
            year: null,
            type: null
        }
    }),

    getters: {
        getPaperById: (state) => (id) => {
            return state.papers.find(p => p.id === id)
        },

        filteredPapers: (state) => {
            const filtered = state.papers.filter(paper => {
                if (state.filters.year && paper.year !== state.filters.year) return false
                if (state.filters.type && paper.type !== state.filters.type) return false
                return true
            })
            // 按年份排序：数字年份降序，非数字年份（课堂/早期/未确定）排末尾
            return filtered.sort((a, b) => compareYear(a.year, b.year))
        },

        allYears: (state) => {
            const years = [...new Set(state.papers.map(p => p.year))]
            return years.sort(compareYear)
        },

        getAnswer: (state) => (questionId) => {
            return state.answers[questionId]
        },

        isAnswerShown: (state) => (questionId) => {
            return state.showAnswer[questionId] || false
        },

        isChecked: (state) => (questionId) => {
            return state.checked[questionId] || false
        }
    },

    actions: {
        setCurrentPaper(id) {
            this.currentPaperId = id
        },

        setAnswer(questionId, answer) {
            this.answers[questionId] = answer
        },

        toggleAnswer(questionId) {
            this.showAnswer[questionId] = !this.showAnswer[questionId]
        },

        // 校对答案：显示答案 + 标记为已校对（显示正误）
        checkAnswer(questionId) {
            this.showAnswer[questionId] = true
            this.checked[questionId] = true
        },

        // 直接查看答案：仅显示答案，不标记正误
        viewAnswer(questionId) {
            this.showAnswer[questionId] = true
        },

        hideAnswer(questionId) {
            this.showAnswer[questionId] = false
            this.checked[questionId] = false
        },

        setFilter(key, value) {
            this.filters[key] = value
        },

        clearFilters() {
            this.filters = { year: null, type: null }
        },

        resetPaper() {
            this.answers = {}
            this.showAnswer = {}
            this.checked = {}
        }
    }
})

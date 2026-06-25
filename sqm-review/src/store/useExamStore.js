import { defineStore } from 'pinia'
import { examPapers } from '@/data/exams'

export const useExamStore = defineStore('exam', {
    state: () => ({
        papers: examPapers,
        currentPaperId: null,
        answers: {},
        showAnswer: {},
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
            return state.papers.filter(paper => {
                if (state.filters.year && paper.year !== state.filters.year) return false
                if (state.filters.type && paper.type !== state.filters.type) return false
                return true
            })
        },

        allYears: (state) => {
            const years = [...new Set(state.papers.map(p => p.year))]
            // 数字年份降序排列，非数字年份（如 '早期', '课堂'）排在最后
            return years.sort((a, b) => {
                const aNum = typeof a === 'number'
                const bNum = typeof b === 'number'
                if (aNum && bNum) return b - a
                if (aNum && !bNum) return -1
                if (!aNum && bNum) return 1
                return 0
            })
        },

        getAnswer: (state) => (questionId) => {
            return state.answers[questionId]
        },

        isAnswerShown: (state) => (questionId) => {
            return state.showAnswer[questionId] || false
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

        setFilter(key, value) {
            this.filters[key] = value
        },

        clearFilters() {
            this.filters = { year: null, type: null }
        },

        resetPaper() {
            this.answers = {}
            this.showAnswer = {}
        }
    }
})

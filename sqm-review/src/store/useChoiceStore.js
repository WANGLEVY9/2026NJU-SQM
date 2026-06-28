import { defineStore } from 'pinia'
import { choiceQuestions } from '@/data/choices'

export const useChoiceStore = defineStore('choice', {
    state: () => ({
        questions: choiceQuestions,
        currentIndex: 0,
        answers: {},        // user's selected answer per question
        showAnswer: {},     // whether to show answer panel per question
        checked: {},        // whether user has "checked" (=> stats count)
        showAllAnswers: false,
        selectedTopic: '全部',
        isRandomMode: false,
        filterMode: 'all',
        shuffledIndices: []
    }),

    getters: {
        filteredQuestions: (state) => {
            let qs = state.questions
            if (state.selectedTopic !== '全部') {
                qs = qs.filter(q => q.topic === state.selectedTopic)
            }
            return qs
        },

        currentQuestion: (state) => {
            const qs = state.filteredQuestions
            if (state.isRandomMode && state.shuffledIndices.length > 0) {
                const idx = state.shuffledIndices[state.currentIndex] || 0
                return qs[idx] || null
            }
            return qs[state.currentIndex] || null
        },

        totalCount: (state) => state.filteredQuestions.length,

        answeredCount: (state) => {
            return Object.keys(state.checked).length
        },

        correctCount: (state) => {
            let correct = 0
            state.filteredQuestions.forEach(q => {
                if (!state.checked[q.id]) return
                const ans = state.answers[q.id]
                if (ans === undefined) return
                if (isCorrectAnswer(q, ans)) correct++
            })
            return correct
        },

        wrongCount: (state) => {
            let wrong = 0
            state.filteredQuestions.forEach(q => {
                if (!state.checked[q.id]) return
                const ans = state.answers[q.id]
                if (ans === undefined) return
                if (!isCorrectAnswer(q, ans)) wrong++
            })
            return wrong
        },

        topics: () => {
            const topics = new Set(choiceQuestions.map(q => q.topic))
            return ['全部', ...Array.from(topics)]
        },

        wrongQuestions: (state) => {
            return state.filteredQuestions.filter(q => {
                if (!state.checked[q.id]) return false
                const ans = state.answers[q.id]
                return ans !== undefined && !isCorrectAnswer(q, ans)
            })
        },

        unansweredQuestions: (state) => {
            return state.filteredQuestions.filter(q => !state.checked[q.id])
        }
    },

    actions: {
        setAnswer(questionId, answer) {
            this.answers[questionId] = answer
        },

        // 校对答案：锁定答案，显示正误，计入统计
        checkAnswer(questionId) {
            this.checked[questionId] = true
            this.showAnswer[questionId] = true
        },

        // 直接查看答案：显示答案面板，不计入统计，不显示对错
        viewAnswer(questionId) {
            this.showAnswer[questionId] = true
        },

        // 隐藏答案
        hideAnswer(questionId) {
            this.showAnswer[questionId] = false
        },

        toggleAnswer(questionId) {
            this.showAnswer[questionId] = !this.showAnswer[questionId]
        },

        showAll() {
            this.filteredQuestions.forEach(q => {
                this.showAnswer[q.id] = true
            })
            this.showAllAnswers = true
        },

        hideAll() {
            this.showAnswer = {}
            this.showAllAnswers = false
        },

        nextQuestion() {
            if (this.currentIndex < this.filteredQuestions.length - 1) {
                this.currentIndex++
            }
        },

        prevQuestion() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },

        goToQuestion(index) {
            this.currentIndex = index
        },

        setTopic(topic) {
            this.selectedTopic = topic
            this.currentIndex = 0
            if (this.isRandomMode) {
                this.shuffle()
            }
        },

        toggleRandomMode() {
            this.isRandomMode = !this.isRandomMode
            if (this.isRandomMode) {
                this.shuffle()
            } else {
                this.shuffledIndices = []
            }
            this.currentIndex = 0
        },

        shuffle() {
            const indices = Array.from({ length: this.filteredQuestions.length }, (_, i) => i)
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[indices[i], indices[j]] = [indices[j], indices[i]]
            }
            this.shuffledIndices = indices
        },

        reset() {
            this.currentIndex = 0
            this.answers = {}
            this.showAnswer = {}
            this.checked = {}
            this.showAllAnswers = false
            this.shuffledIndices = []
        },

        clearAnswers() {
            this.answers = {}
            this.showAnswer = {}
            this.checked = {}
            this.showAllAnswers = false
        }
    }
})

function isCorrectAnswer(question, userAnswer) {
    const ca = question.correctAnswer
    if (typeof ca === 'boolean') return userAnswer === ca
    if (typeof ca === 'string') {
        if (ca.length <= 1) {
            const correctIndex = ca.charCodeAt(0) - 65
            return userAnswer === correctIndex
        } else {
            if (!Array.isArray(userAnswer)) return false
            const correctIndices = ca.split('').map(l => l.charCodeAt(0) - 65).sort((a, b) => a - b)
            const sortedUser = [...userAnswer].sort((a, b) => a - b)
            return JSON.stringify(correctIndices) === JSON.stringify(sortedUser)
        }
    }
    if (Array.isArray(ca)) {
        if (!Array.isArray(userAnswer)) return false
        const sortedCorrect = [...ca].sort()
        const sortedUser = [...userAnswer].sort()
        return JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser)
    }
    return userAnswer === ca
}

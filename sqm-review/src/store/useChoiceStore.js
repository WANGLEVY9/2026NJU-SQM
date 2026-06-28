import { defineStore } from 'pinia'
import { choiceQuestions } from '@/data/choices'

export const useChoiceStore = defineStore('choice', {
    state: () => ({
        questions: choiceQuestions,
        currentIndex: 0,
        answers: {},
        showAnswer: {},
        showAllAnswers: false,
        selectedTopic: '全部',
        isRandomMode: false,
        filterMode: 'all', // all, unanswered, wrong
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
            return Object.keys(state.answers).length
        },

        correctCount: (state) => {
            let correct = 0
            state.filteredQuestions.forEach(q => {
                const ans = state.answers[q.id]
                if (ans === undefined) return
                if (isCorrectAnswer(q, ans)) correct++
            })
            return correct
        },

        wrongCount: (state) => {
            let wrong = 0
            state.filteredQuestions.forEach(q => {
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
                const ans = state.answers[q.id]
                return ans !== undefined && !isCorrectAnswer(q, ans)
            })
        },

        unansweredQuestions: (state) => {
            return state.filteredQuestions.filter(q => state.answers[q.id] === undefined)
        }
    },

    actions: {
        setAnswer(questionId, answer) {
            this.answers[questionId] = answer
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
            // Fisher-Yates shuffle
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
            this.showAllAnswers = false
            this.shuffledIndices = []
        },

        clearAnswers() {
            this.answers = {}
            this.showAnswer = {}
            this.showAllAnswers = false
        }
    }
})

function isCorrectAnswer(question, userAnswer) {
    const ca = question.correctAnswer
    // Boolean (judge questions)
    if (typeof ca === 'boolean') return userAnswer === ca
    // String correctAnswer (letter-based, e.g., 'ABD' or 'C')
    if (typeof ca === 'string') {
        if (ca.length <= 1) {
            // Single choice: userAnswer is a number (index)
            const correctIndex = ca.charCodeAt(0) - 65
            return userAnswer === correctIndex
        } else {
            // Multiple choice: userAnswer is an array of indices
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

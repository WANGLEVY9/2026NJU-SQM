import { defineStore } from 'pinia'
import { choiceQuestions } from '@/data/choices'
import { shaoDongQuestions } from '@/data/shaoDongChoices'

// 为题目添加来源分类
function addSourceCategory(questions, category) {
    return questions.map(q => ({ ...q, sourceCategory: category }))
}

// 合并所有题目并添加来源分类
const rongQuestions = addSourceCategory(choiceQuestions, '课堂练习-荣国平')
const shaoQuestions = addSourceCategory(shaoDongQuestions, '课堂练习-邵栋')

// 重新分类：真题应该从荣国平题目中分离
const allQuestions = rongQuestions.map(q => {
    if (q.source === '往年真题' || q.source === '2022Fall') {
        return { ...q, sourceCategory: '真题练习' }
    }
    return q
}).concat(shaoQuestions)

export const useChoiceStore = defineStore('choice', {
    state: () => ({
        questions: allQuestions,
        currentIndex: 0,
        answers: {},
        showAnswer: {},
        checked: {},
        showAllAnswers: false,
        selectedCategory: '全部',
        selectedTopic: '全部',
        isRandomMode: false,
        shuffledIndices: []
    }),

    getters: {
        sourceCategories: () => ['全部', '课堂练习-荣国平', '课堂练习-邵栋', '真题练习'],

        filteredQuestions: (state) => {
            let qs = state.questions
            if (state.selectedCategory !== '全部') {
                qs = qs.filter(q => q.sourceCategory === state.selectedCategory)
            }
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

        answeredCount: (state) => Object.keys(state.checked).length,

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

        topics: (state) => {
            const filtered = state.selectedCategory !== '全部'
                ? state.questions.filter(q => q.sourceCategory === state.selectedCategory)
                : state.questions
            const topics = new Set(filtered.map(q => q.topic))
            return ['全部', ...Array.from(topics)]
        },
    },

    actions: {
        setAnswer(questionId, answer) {
            this.answers[questionId] = answer
        },

        checkAnswer(questionId) {
            this.checked[questionId] = true
            this.showAnswer[questionId] = true
        },

        viewAnswer(questionId) {
            this.showAnswer[questionId] = true
        },

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

        setCategory(category) {
            this.selectedCategory = category
            this.selectedTopic = '全部'
            this.currentIndex = 0
            if (this.isRandomMode) this.shuffle()
        },

        setTopic(topic) {
            this.selectedTopic = topic
            this.currentIndex = 0
            if (this.isRandomMode) this.shuffle()
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

        shuff() {
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

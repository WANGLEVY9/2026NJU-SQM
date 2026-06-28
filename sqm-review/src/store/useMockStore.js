import { defineStore } from 'pinia'
import { mockPapers } from '@/data/mockPapers'

export const useMockStore = defineStore('mock', {
    state: () => ({
        papers: mockPapers,
        currentPaperId: null,
        answers: {},
        timeRemaining: 0,
        isExamStarted: false,
        isExamFinished: false,
        isTimerPaused: false,
        examStartTime: null,
        timerInterval: null,
        // Per-question answer visibility for exam mode
        checkedQuestions: {},
        viewedQuestions: {}
    }),

    getters: {
        getPaperById: (state) => (id) => {
            return state.papers.find(p => p.id === id)
        },

        currentPaper: (state) => {
            return state.papers.find(p => p.id === state.currentPaperId)
        },

        answeredCount: (state) => {
            return Object.keys(state.answers).length
        },

        progress: (state) => (paperId) => {
            const paper = state.papers.find(p => p.id === paperId)
            if (!paper) return 0
            return Math.round((Object.keys(state.answers).length / paper.questions.length) * 100)
        },

        score: (state) => {
            if (!state.currentPaperId) return 0
            const paper = state.papers.find(p => p.id === state.currentPaperId)
            if (!paper) return 0

            // 仅对可自动评分的题型计分（排除essay简答/论述题）
            const autoScoreable = paper.questions.filter(q => q.type !== 'essay')
            if (autoScoreable.length === 0) return 0

            let correct = 0
            autoScoreable.forEach(q => {
                const userAnswer = state.answers[q.id]
                if (q.type === 'multiple') {
                    if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
                        const sortedUser = [...userAnswer].sort()
                        const sortedCorrect = [...q.answer].sort()
                        if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) {
                            correct++
                        }
                    }
                } else {
                    if (userAnswer === q.answer) {
                        correct++
                    }
                }
            })

            return Math.round((correct / autoScoreable.length) * 100)
        },

        formattedTime: (state) => {
            const minutes = Math.floor(state.timeRemaining / 60)
            const seconds = state.timeRemaining % 60
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }
    },

    actions: {
        startExam(paperId) {
            const paper = this.papers.find(p => p.id === paperId)
            if (!paper) return

            this.currentPaperId = paperId
            this.answers = {}
            this.isExamStarted = true
            this.isExamFinished = false
            this.examStartTime = Date.now()
            this.timeRemaining = paper.duration * 60

            this.timerInterval = setInterval(() => {
                if (this.timeRemaining > 0) {
                    this.timeRemaining--
                } else {
                    this.finishExam()
                }
            }, 1000)
        },

        setAnswer(questionId, answer) {
            this.answers[questionId] = answer
        },

        finishExam() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval)
                this.timerInterval = null
            }
            this.isExamFinished = true
        },

        pauseTimer() {
            if (this.timerInterval && !this.isTimerPaused) {
                clearInterval(this.timerInterval)
                this.timerInterval = null
                this.isTimerPaused = true
            }
        },

        resumeTimer() {
            if (!this.timerInterval && this.isTimerPaused && !this.isExamFinished && this.timeRemaining > 0) {
                this.timerInterval = setInterval(() => {
                    if (this.timeRemaining > 0) {
                        this.timeRemaining--
                    } else {
                        this.finishExam()
                    }
                }, 1000)
                this.isTimerPaused = false
            }
        },

        checkAnswer(questionId) {
            this.checkedQuestions[questionId] = true
        },

        viewAnswer(questionId) {
            this.viewedQuestions[questionId] = true
        },

        isQuestionChecked: (state) => (questionId) => {
            return !!state.checkedQuestions[questionId]
        },

        isQuestionViewed: (state) => (questionId) => {
            return !!state.viewedQuestions[questionId]
        },

        resetExam() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval)
                this.timerInterval = null
            }
            this.currentPaperId = null
            this.answers = {}
            this.timeRemaining = 0
            this.isExamStarted = false
            this.isExamFinished = false
            this.isTimerPaused = false
            this.examStartTime = null
            this.checkedQuestions = {}
            this.viewedQuestions = {}
        }
    }
})

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

/**
 * Fisher-Yates 洗牌算法，生成 [0..n-1] 的随机排列
 */
function shuffleArray(n) {
    const arr = Array.from({ length: n }, (_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

/**
 * 根据洗牌映射重新排列选项数组，并重新标记为 A/B/C/D
 * @param {string[]} originalOptions 原始选项数组 ['A. xxx', 'B. yyy', ...]
 * @param {number[]} shuffleMap 洗牌映射 [newPos0_oldIdx, newPos1_oldIdx, ...]
 * @returns {string[]} 重排后的选项数组 ['A. zzz', 'B. xxx', ...]
 */
function reshuffleOptions(originalOptions, shuffleMap) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    return shuffleMap.map((oldIdx, newPos) => {
        const originalText = originalOptions[oldIdx]
        // 提取原始选项文本（跳过分隔符和前缀字母）
        const delimIndex = originalText.search(/[、.,，]/)
        let finalTextStart
        if (delimIndex === -1) {
            finalTextStart = 1
        } else {
            finalTextStart = delimIndex + 1
            while (finalTextStart < originalText.length && originalText[finalTextStart] === ' ') {
                finalTextStart++
            }
        }
        return `${letters[newPos]}、${originalText.substring(finalTextStart)}`
    })
}

/**
 * 根据洗牌映射将原正确答案的字母转换为新字母
 * @param {string} originalAnswer 原正确答案，如 'B' 或 'ABD' 或 true/false
 * @param {number[]} shuffleMap 洗牌映射
 * @returns {string|boolean} 调整后的正确答案
 */
function adjustCorrectAnswer(originalAnswer, shuffleMap) {
    if (typeof originalAnswer !== 'string') return originalAnswer
    if (!originalAnswer || originalAnswer.length === 0) return originalAnswer

    // 构建反向映射：oldIdx -> newLetter
    const oldToNew = {}
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    shuffleMap.forEach((oldIdx, newPos) => {
        oldToNew[oldIdx] = letters[newPos]
    })

    // 将每个答案字母从旧索引映射到新字母
    return originalAnswer.split('').map(letter => {
        const oldIdx = letter.charCodeAt(0) - 65
        if (oldIdx >= 0 && oldIdx < shuffleMap.length && oldToNew[oldIdx]) {
            return oldToNew[oldIdx]
        }
        return letter // 无法映射则保留原样
    }).join('')
}

/**
 * 将解析文本中的选项字母引用（如 A ✅、B错误）按洗牌映射进行替换
 * 匹配模式：独立的 A/B/C/D 字母，前后不能是其他字母或数字
 * 支持的模式：
 *   - 单独字母：A / B / C / D
 *   - 带符号：A ✅ / B ❌ / C正确 / D错误
 *   - 列表形式：A、B、C、D
 *
 * @param {string} text 原解析文本
 * @param {number[]} shuffleMap 洗牌映射
 * @returns {string} 替换后的解析文本
 */
function remapExplanationLetters(text, shuffleMap) {
    if (!text || typeof text !== 'string' || !shuffleMap || shuffleMap.length === 0) return text

    // 构建双向映射
    const oldToNew = {}
    const newToOld = {}
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    shuffleMap.forEach((oldIdx, newPos) => {
        oldToNew[letters[oldIdx]] = letters[newPos]
        newToOld[letters[newPos]] = letters[oldIdx]
    })

    // 用正则匹配独立的大写字母 A-D（排除作为单词一部分的情况）
    // 匹配：行首/非字母字符 + [A-D] + 后面跟 空格/标点/✅/❌/：/、/，/结束 等
    // 排除：前面是字母的情况（避免替换单词中的字母）

    return text.replace(/(?<![a-zA-Z0-9])([A-D])(?![a-zA-Z0-9])/g, (match, letter) => {
        if (oldToNew[letter]) {
            return oldToNew[letter]
        }
        return match
    })
}

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
        shuffledIndices: [],
        isOptionShuffle: false,
        optionShuffleMaps: {} // { [questionId]: number[] }
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
                // 选项乱序开启时使用洗牌后的正确答案
                const effectiveQ = state.isOptionShuffle
                    ? (this.getShuffledQuestionData(q) || q)
                    : q
                if (isCorrectAnswer(effectiveQ, ans)) correct++
            })
            return correct
        },

        wrongCount: (state) => {
            let wrong = 0
            state.filteredQuestions.forEach(q => {
                if (!state.checked[q.id]) return
                const ans = state.answers[q.id]
                if (ans === undefined) return
                // 选项乱序开启时使用洗牌后的正确答案
                const effectiveQ = state.isOptionShuffle
                    ? (this.getShuffledQuestionData(q) || q)
                    : q
                if (!isCorrectAnswer(effectiveQ, ans)) wrong++
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
            if (this.isOptionShuffle) this.generateOptionShuffleMaps()
        },

        setTopic(topic) {
            this.selectedTopic = topic
            this.currentIndex = 0
            if (this.isRandomMode) this.shuffle()
            if (this.isOptionShuffle) this.generateOptionShuffleMaps()
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

        /**
         * 切换选项乱序模式
         */
        toggleOptionShuffle() {
            this.isOptionShuffle = !this.isOptionShuffle
            if (this.isOptionShuffle) {
                this.generateOptionShuffleMaps()
            } else {
                this.optionShuffleMaps = {}
            }
        },

        /**
         * 为当前筛选出的所有题目生成选项洗牌映射
         */
        generateOptionShuffleMaps() {
            const maps = {}
            this.filteredQuestions.forEach(q => {
                if (q.options && q.options.length > 1) {
                    // 只对选择题生成洗牌映射（判断题不需要）
                    const type = q.type || (q.correctAnswer.length > 1 ? 'multiple' : 'choice')
                    if (type !== 'judge' && type !== 'judgment') {
                        maps[q.id] = shuffleArray(q.options.length)
                    }
                }
            })
            this.optionShuffleMaps = maps
        },

        /**
         * 获取某道题的洗牌后的完整数据（含调整后的答案和解析）
         * 如果未开启乱序或该题无洗牌映射，返回 null（表示使用原始数据）
         * @param {Object} question 原始题目对象
         * @returns {Object|null} 洗牌后的数据对象 或 null
         */
        getShuffledQuestionData(question) {
            if (!this.isOptionShuffle || !question || !question.id) return null
            const map = this.optionShuffleMaps[question.id]
            if (!map || !question.options || question.options.length <= 1) return null

            const shuffledOptions = reshuffleOptions(question.options, map)
            const adjustedAnswer = adjustCorrectAnswer(question.correctAnswer, map)
            const adjustedExplanation = remapExplanationLetters(
                question.explanation || question.analysis || '',
                map
            )

            return {
                ...question,
                options: shuffledOptions,
                correctAnswer: adjustedAnswer,
                explanation: adjustedExplanation
            }
        },

        reset() {
            this.currentIndex = 0
            this.answers = {}
            this.showAnswer = {}
            this.checked = {}
            this.showAllAnswers = false
            this.shuffledIndices = []
            this.optionShuffleMaps = {}
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

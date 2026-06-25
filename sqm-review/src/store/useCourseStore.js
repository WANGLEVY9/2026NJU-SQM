import { defineStore } from 'pinia'
import { coursesData } from '@/data/courses'

export const useCourseStore = defineStore('course', {
    state: () => ({
        chapters: coursesData,
        currentChapterId: null,
        loading: false
    }),

    getters: {
        getChapterById: (state) => (id) => {
            return state.chapters.find(ch => ch.id === id)
        },

        currentChapter: (state) => {
            return state.chapters.find(ch => ch.id === state.currentChapterId)
        },

        totalChapters: (state) => state.chapters.length,

        currentChapterIndex: (state) => {
            return state.chapters.findIndex(ch => ch.id === state.currentChapterId)
        },

        hasPrevChapter: (state) => {
            const index = state.chapters.findIndex(ch => ch.id === state.currentChapterId)
            return index > 0
        },

        hasNextChapter: (state) => {
            const index = state.chapters.findIndex(ch => ch.id === state.currentChapterId)
            return index < state.chapters.length - 1
        }
    },

    actions: {
        setCurrentChapter(id) {
            this.currentChapterId = id
        },

        goToPrevChapter() {
            const index = this.currentChapterIndex
            if (index > 0) {
                this.currentChapterId = this.chapters[index - 1].id
            }
        },

        goToNextChapter() {
            const index = this.currentChapterIndex
            if (index < this.chapters.length - 1) {
                this.currentChapterId = this.chapters[index + 1].id
            }
        }
    }
})

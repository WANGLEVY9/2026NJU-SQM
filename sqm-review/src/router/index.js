import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import('@/views/CoursesView.vue'),
        meta: { title: '课件学习' }
    },
    {
        path: '/courses/:id',
        name: 'Chapter',
        component: () => import('@/views/ChapterView.vue'),
        meta: { title: '章节详情' }
    },
    {
        path: '/review',
        name: 'Review',
        component: () => import('@/views/ReviewView.vue'),
        meta: { title: '复习背诵' }
    },
    {
        path: '/exams',
        name: 'Exams',
        component: () => import('@/views/ExamsView.vue'),
        meta: { title: '真题练习' }
    },
    {
        path: '/choices',
        name: 'Choices',
        component: () => import('@/views/ChoicePracticeView.vue'),
        meta: { title: '选择题专项' }
    },
    {
        path: '/exams/:id',
        name: 'Paper',
        component: () => import('@/views/PaperView.vue'),
        meta: { title: '试卷详情' }
    },
    {
        path: '/mock',
        name: 'Mock',
        component: () => import('@/views/MockView.vue'),
        meta: { title: '模拟考试' }
    },
    {
        path: '/mock/:id',
        name: 'MockExam',
        component: () => import('@/views/MockExamView.vue'),
        meta: { title: '模拟答题' }
    },
    {
        path: '/mock/:id/result',
        name: 'MockResult',
        component: () => import('@/views/MockResultView.vue'),
        meta: { title: '考试成绩' }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: '关于' }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title || '页面'} - 软件质量管理复习平台`
    next()
})

export default router

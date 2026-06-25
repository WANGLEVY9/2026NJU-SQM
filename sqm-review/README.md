# 软件质量管理复习平台 - 部署与使用文档

## 项目概述

本项目是一个基于 Vue 3 + Vite 构建的软件质量管理课程复习平台，提供课件学习、复习背诵、真题练习和模拟考试功能。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 构建 | Vite 5 |
| 路由 | Vue Router 4 |
| 状态 | Pinia |
| 样式 | SCSS + CSS Variables |
| 图标 | Lucide Vue |

## 项目结构

```
sqm-review/
├── public/              # 静态资源
├── src/
│   ├── assets/         # 资源文件
│   │   ├── images/     # 图片
│   │   └── styles/     # 样式文件
│   ├── components/     # Vue组件
│   │   ├── common/     # 通用组件
│   │   ├── course/     # 课件相关组件
│   │   ├── exam/       # 考试相关组件
│   │   └── review/     # 复习相关组件
│   ├── views/          # 页面视图
│   ├── router/         # 路由配置
│   ├── store/          # Pinia状态管理
│   ├── utils/          # 工具函数
│   ├── data/           # 静态数据
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── index.html          # HTML模板
├── package.json        # 依赖配置
├── vite.config.js      # Vite配置
└── README.md           # 项目说明
```

## 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 功能模块

### 1. 课件学习 (/courses)
- 按章节展示课程内容
- 章节导航（前后切换、目录跳转）
- 每章节配有记忆闪卡

### 2. 复习背诵 (/review)
- 系统性梳理的核心知识点
- 可折叠/展开的层级展示
- 快速记忆检测闪卡

### 3. 真题练习 (/exams)
- 历年真题和课堂测试
- 按年份、题型筛选
- 答案显示/隐藏切换

### 4. 模拟考试 (/mock)
- 5套完整模拟试卷
- 计时器功能
- 自动评分系统

## 路由结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomeView | 首页 |
| `/courses` | CoursesView | 课件列表 |
| `/courses/:id` | ChapterView | 章节详情 |
| `/review` | ReviewView | 复习背诵 |
| `/exams` | ExamsView | 真题列表 |
| `/exams/:id` | PaperView | 试卷详情 |
| `/mock` | MockView | 模拟考试列表 |
| `/mock/:id` | MockExamView | 模拟答题 |
| `/mock/:id/result` | MockResultView | 考试成绩 |
| `/about` | AboutView | 关于 |

## 数据结构

### 课程数据 (src/data/courses.js)
```javascript
{
  id: 'ch1',
  title: 'Scrum敏捷框架',
  subtitle: '敏捷开发核心框架',
  source: '课件/1 Scrum.pptx',
  order: 1,
  content: '...', // Markdown格式内容
  keyPoints: ['重点1', '重点2'],
  flashcards: [
    { question: '问题', answer: '答案' }
  ]
}
```

### 试卷数据 (src/data/exams.js, mockPapers.js)
```javascript
{
  id: 'exam2023',
  title: '2023年期末真题',
  year: 2023,
  type: 'final',
  questions: [
    {
      id: 'q1',
      type: 'single', // single/multiple/judge
      question: '题目内容',
      options: ['A. 选项1', 'B. 选项2'],
      answer: 0,
      analysis: '解析内容'
    }
  ]
}
```

## 样式系统

### 色彩变量 (src/assets/styles/_variables.scss)
- 主色调：深蓝 (#1a365d)
- 强调色：金色 (#d69e2e)
- 背景色：深色主题
- 功能色：成功/警告/错误

### 响应式断点
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 部署方式

### 静态部署
构建后的文件位于 `dist/` 目录，可直接部署到任意静态服务器：

```bash
# 使用 nginx
cp -r dist/* /usr/share/nginx/html/

# 使用 Apache
cp -r dist/* /var/www/html/

# 使用 GitHub Pages
# 推送 dist 分支
```

### 使用 Vercel/Netlify

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

### Docker 部署

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## 性能优化

- 路由懒加载
- 组件按需引入
- SCSS 代码分割
- 静态资源压缩

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 开发指南

### 添加新课程章节

在 `src/data/courses.js` 中添加新章节对象：

```javascript
{
  id: 'ch-new',
  title: '新章节',
  subtitle: '副标题',
  source: '来源',
  order: 11,
  content: 'Markdown内容',
  keyPoints: ['重点1', '重点2'],
  flashcards: [
    { question: '问题', answer: '答案' }
  ]
}
```

### 添加新试卷

在 `src/data/exams.js` 或 `src/data/mockPapers.js` 中添加：

```javascript
{
  id: 'new-paper',
  title: '新试卷',
  year: 2024,
  duration: 90,
  questions: [...]
}
```

## 许可证

MIT License

# 软件质量管理复习平台 (SQM Review)

> 南京大学软件质量管理课程（荣国平 + 邵栋）一站式复习平台，覆盖课件学习、复习背诵、选择题专项、真题练习与模拟考试全流程。

**线上地址：https://wanglevy9.github.io/2026NJU-SQM/**

---

## 功能概览

| 模块 | 路径 | 说明 |
|------|------|------|
| 📚 **课件学习** | `/courses` | 18 章节完整课件，含章节闪卡与知识点标注 |
| 🧠 **复习背诵** | `/review` | 26 条核心考点，Markdown 渲染 + 快速记忆检测 |
| ✏️ **选择题专项** | `/choices` | 134 道精选选择题，支持来源分区、知识点筛选、选项乱序 |
| 📝 **真题练习** | `/exams` | 13 套历年试卷（2013–2025），含选择 / 判断 / 简答论述 |
| 🎯 **模拟考试** | `/mock` | 5 套模拟卷，计时倒计时 + 自动评分 + 考点解析 |

## 数据规模

| 数据文件 | 内容 | 记录数 |
|----------|------|--------|
| `courses.js` | 课件内容（荣国平 ch1-8 + 邵栋 ch9-19） | 18 章 |
| `review.js` | 复习背诵核心考点 | 26 条 |
| `choices.js` | 选择题专项（2023真题 + 往年真题 + 荣国平课堂独有） | 60 道 |
| `shaoDongChoices.js` | 邵栋老师敏捷课堂测试题（Agile/Kanban/Scrum/XP） | 74 道 |
| `exams.js` | 历年真题试卷（2022–2025 + 早期真题） | 13 套 / 124 题 |
| `mockPapers.js` | 模拟试卷 | 5 套 / 215 题 |

### 选择题来源分布

| 来源分区 | 数量 | 说明 |
|----------|------|------|
| 课堂练习 - 荣国平 | 14 道 | 需求工程、设计标准、集成策略、验证确认等 |
| 课堂练习 - 邵栋 | 74 道 | Agile、Kban & Lean、Scrum、XP 四大主题 |
| 真题练习 | 46 道 | 2023 期末真题 29 道 + 往年真题 17 道 |

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 构建 | Vite 5 |
| 路由 | Vue Router 4 (Hash 模式，适配 GitHub Pages) |
| 状态管理 | Pinia |
| 样式 | SCSS + CSS Variables（深色学术主题）|
| 图标 | Lucide Vue Next |

## 项目结构

```
sqm-review/
├── public/                     # 静态资源
├── src/
│   ├── assets/styles/          # SCSS 样式（变量、全局、组件）
│   ├── components/
│   │   ├── common/             # Header、Footer、BackToTop
│   │   ├── course/             # ChapterNav、FlashCard
│   │   ├── exam/               # QuestionCard（双按钮交互）、ExamFilter
│   │   └── review/             # MemorizationCard、ReviewDiagram（SVG）
│   ├── views/                  # 各功能页面视图
│   ├── router/index.js         # Hash History 路由配置
│   ├── store/                  # Pinia Store
│   │   ├── useChoiceStore.js   # 选择题专项（选项乱序 Fisher-Yates）
│   │   ├── useExamStore.js     # 真题练习
│   │   └── useMockStore.js     # 模拟考试（计时器暂停/恢复）
│   ├── data/                   # 核心 JS 数据文件
│   │   ├── courses.js          # 18 章课件
│   │   ├── review.js           # 26 条复习资料
│   │   ├── choices.js          # 60 道选择题
│   │   ├── shaoDongChoices.js  # 74 道邵栋课堂测试题
│   │   ├── exams.js            # 13 套真题
│   │   └── mockPapers.js       # 5 套模拟卷
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js              # base: '/2026NJU-SQM/'
├── package.json
└── .github/workflows/
    └── deploy.yml              # GitHub Actions → Pages 自动部署
```

## 特色功能

### 1. 双按钮答案交互
- **校对答案**：标记正误（✓ / ×），适合自测
- **直接查看答案**：仅展示答案和解析，不做正误判断

### 2. 选项乱序（防背答案）
- 基于 Fisher-Yates 洗牌算法，每次加载随机打乱选项顺序
- 自动映射答案字母（A→C 等）并替换题解中的引用字母
- 一键开关，随时切换

### 3. 来源分区筛选
选择题按三大来源分类浏览：
- **课堂练习 — 荣国平**：理论部分（软件过程、项目管理、质量管理、软件设计等）
- **课堂练习 — 邵栋**：敏捷实践（Agile、Kanban & Lean、Scrum、XP）
- **真题练习**：历年期末真题

### 4. 模拟考试计时系统
- 支持暂停 / 继续，精确控制倒计时
- 自动评分（客观题自动判分 + 主观题自评）
- 成绩统计与错题回顾

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/WANGLEVY9/2026NJU-SQM.git
cd 2026NJU-SQM/sqm-review

# 安装依赖
npm install

# 启动开发服务器 (http://localhost:5173)
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

## 部署

本项目通过 GitHub Actions 自动部署至 GitHub Pages：

1. 推送代码至 `main` 分支
2. Actions 自动执行：checkout → npm ci → npm run build → deploy-pages
3. 约 2–3 分钟后网站自动更新

手动部署：将 `dist/` 目录部署至任意静态服务器即可。

## 课程信息

- **课程名称**：软件质量与管理
- **授课教师**：荣国平（第 1–8 章）、邵栋（第 9–19 章）
- **适用对象**：南京大学软件工程学院本科生
- **涵盖范围**：
  - 软件发展三阶段、本质困难（Brooks）
  - 软件过程（TSP/CMM/IDEAL/PDCA）
  - 敏捷方法（Scrum/XP/Kanban/DevOps/TDD/CI-CD）
  - 团队动力学（马斯洛/海兹伯格/McGregor X-Y）
  - 项目管理（WBS/EVM/PROBE/Schedule Plan）
  - 质量管理（PSP/DRL/PQI/Yield/评审/设计验证）
  - 工程实践（需求工程/集成策略/配置管理/根因分析）

## 许可证

本项目仅供课程学习参考使用。

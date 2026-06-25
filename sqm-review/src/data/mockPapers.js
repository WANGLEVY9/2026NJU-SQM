// 模拟试卷数据 - 5套完整模拟试卷

export const mockPapers = [
    {
        id: 'mock1',
        title: '模拟试卷一',
        year: 2024,
        duration: 90,
        totalScore: 100,
        description: '涵盖Scrum框架、敏捷价值观、基础概念',
        sections: [
            { type: 'single', count: 25, score: 2, name: '单选题' },
            { type: 'multiple', count: 10, score: 3, name: '多选题' },
            { type: 'judge', count: 15, score: 1, name: '判断题' }
        ],
        questions: [
            // 单选题
            {
                id: 'm1-s1',
                type: 'single',
                question: 'Scrum框架中，负责管理产品待办列表的人是谁？',
                options: [
                    'A. ScrumMaster',
                    'B. 开发团队',
                    'C. 产品负责人',
                    'D. 项目经理'
                ],
                answer: 2,
                analysis: '产品负责人（Product Owner）负责管理产品待办列表，包括添加、删除、排序等工作项。'
            },
            {
                id: 'm1-s2',
                type: 'single',
                question: '敏捷宣言的第一价值观是？',
                options: [
                    'A. 可工作软件高于详尽文档',
                    'B. 个体和互动高于流程和工具',
                    'C. 客户合作高于合同谈判',
                    'D. 响应变化高于遵循计划'
                ],
                answer: 1,
                analysis: '敏捷宣言第一条是个体和互动高于流程和工具，强调人是最重要的因素。'
            },
            {
                id: 'm1-s3',
                type: 'single',
                question: '关于Sprint时长，以下说法正确的是？',
                options: [
                    'A. Sprint时长可以根据需要随时改变',
                    'B. Sprint时长应该在整个项目周期保持稳定',
                    'C. Sprint时长必须正好是2周',
                    'D. Sprint时长由开发团队自行决定'
                ],
                answer: 1,
                analysis: 'Scrum中Sprint时长一旦确定，应该在整个项目周期保持稳定，通常为1-4周。'
            },
            {
                id: 'm1-s4',
                type: 'single',
                question: '每日站会的目的是？',
                options: [
                    'A. 汇报工作进度给领导',
                    'B. 同步团队工作、识别障碍',
                    'C. 讨论技术实现细节',
                    'D. 评审已完成的功能'
                ],
                answer: 1,
                analysis: '每日站会的目的是让团队同步进度，了解谁在做什么，识别可能的障碍，而不是深入讨论技术细节。'
            },
            {
                id: 'm1-s5',
                type: 'single',
                question: 'TDD的三个阶段顺序是？',
                options: [
                    'A. 绿色→红色→重构',
                    'B. 红色→绿色→重构',
                    'C. 重构→红色→绿色',
                    'D. 红色→重构→绿色'
                ],
                answer: 1,
                analysis: 'TDD的标准节奏是：红色（写失败测试）→绿色（写最小代码通过）→重构（改进代码）'
            },
            {
                id: 'm1-s6',
                type: 'single',
                question: 'XP极限编程中，40小时工作制的核心理念是？',
                options: [
                    'A. 加班可以提高效率',
                    'B. 保持可持续的开发节奏',
                    'C. 每周必须工作满40小时',
                    'D. 可以无限加班'
                ],
                answer: 1,
                analysis: '40小时工作制强调避免疲劳加班，保持团队可持续的高效工作状态。'
            },
            {
                id: 'm1-s7',
                type: 'single',
                question: '持续集成要求代码多久集成一次？',
                options: [
                    'A. 每月',
                    'B. 每周',
                    'C. 每天多次',
                    'D. 每个Sprint结束时'
                ],
                answer: 2,
                analysis: '持续集成要求团队成员每天多次将代码集成到共享主干，通常是每次提交后触发。'
            },
            {
                id: 'm1-s8',
                type: 'single',
                question: 'Kanban方法的核心实践之一是？',
                options: [
                    'A. 固定长度Sprint',
                    'B. 限制WIP数量',
                    'C. Sprint计划会议',
                    'D. 每日站会必须15分钟'
                ],
                answer: 1,
                analysis: '限制在制品（WIP）数量是Kanban的核心实践，通过限制WIP来加快工作流动。'
            },
            {
                id: 'm1-s9',
                type: 'single',
                question: 'Scrum的三大工件不包括？',
                options: [
                    'A. 产品待办列表',
                    'B. Sprint待办列表',
                    'C. 燃尽图',
                    'D. 可交付产品增量'
                ],
                answer: 2,
                analysis: 'Scrum三大工件是产品待办列表、Sprint待办列表和可交付产品增量。燃尽图是工具而非工件。'
            },
            {
                id: 'm1-s10',
                type: 'single',
                question: '结对编程中，导航员的职责是？',
                options: [
                    'A. 只负责写代码',
                    'B. 观察、思考和审查',
                    'C. 休息和监督',
                    'D. 做笔记'
                ],
                answer: 1,
                analysis: '结对编程中，驾驶员写代码，导航员负责观察、思考、审查和指导。'
            },
            {
                id: 'm1-s11',
                type: 'single',
                question: 'DevOps的核心理念不包括？',
                options: [
                    'A. 协作',
                    'B. 自动化',
                    'C. 瀑布式开发',
                    'D. 持续改进'
                ],
                answer: 2,
                analysis: 'DevOps核心理念是协作、自动化和持续改进，瀑布式开发是传统方法。'
            },
            {
                id: 'm1-s12',
                type: 'single',
                question: 'Sprint评审会议的主要目的是？',
                options: [
                    'A. 团队内部评审代码',
                    'B. 展示完成的工作给利益相关者',
                    'C. 制定下一个Sprint计划',
                    'D. 回顾和改进开发过程'
                ],
                answer: 1,
                analysis: 'Sprint评审会议是向利益相关者展示完成的工作，收集反馈，而非内部评审。'
            },
            {
                id: 'm1-s13',
                type: 'single',
                question: 'YAGNI原则的含义是？',
                options: [
                    'A. 你需要它',
                    'B. 你不需要它',
                    'C. 你将要需要它',
                    'D. 你可能需要它'
                ],
                answer: 1,
                analysis: 'YAGNI = You Ain\'t Gonna Need It，意味着不要做过度设计，只实现当前需要的功能。'
            },
            {
                id: 'm1-s14',
                type: 'single',
                question: '持续集成的核心目标之一是？',
                options: [
                    'A. 增加代码审查',
                    'B. 尽早发现集成问题',
                    'C. 取代单元测试',
                    'D. 提高代码复杂度'
                ],
                answer: 1,
                analysis: '持续集成的核心目标是尽早发现集成问题，通过频繁集成和自动化测试来降低风险。'
            },
            {
                id: 'm1-s15',
                type: 'single',
                question: 'Scrum团队的最佳规模是？',
                options: [
                    'A. 3人以下',
                    'B. 5-9人',
                    'C. 10-15人',
                    'D. 20人以上'
                ],
                answer: 1,
                analysis: 'Scrum建议开发团队规模为5-9人，过小无法完成迭代目标，过大则沟通成本过高。'
            },
            {
                id: 'm1-s16',
                type: 'single',
                question: 'Sprint回顾会议的主要目的是？',
                options: [
                    'A. 评审完成的功能',
                    'B. 计划下一个Sprint',
                    'C. 检视和改进开发过程',
                    'D. 与客户沟通'
                ],
                answer: 2,
                analysis: 'Sprint回顾会议关注团队自身的工作过程，识别改进点，而非评审功能。'
            },
            {
                id: 'm1-s17',
                type: 'single',
                question: '在TDD绿色阶段，应该？',
                options: [
                    'A. 编写完美代码',
                    'B. 编写最简单让测试通过的代码',
                    'C. 进行全面重构',
                    'D. 编写所有测试'
                ],
                answer: 1,
                analysis: 'TDD绿色阶段只编写最简单的代码让测试通过，不追求完美，为重构留出空间。'
            },
            {
                id: 'm1-s18',
                type: 'single',
                question: 'XP中，代码所有权的概念是？',
                options: [
                    'A. 代码属于个人',
                    'B. 集体所有权，任何人都可以改进',
                    'C. 代码属于公司',
                    'D. 代码需要审批才能修改'
                ],
                answer: 1,
                analysis: 'XP强调集体所有权，任何团队成员都可以也应当改进任何代码。'
            },
            {
                id: 'm1-s19',
                type: 'single',
                question: 'Kanban看板的Lead Time是指？',
                options: [
                    'A. 开发时间',
                    'B. 从创建到完成的总时间',
                    'C. 测试时间',
                    'D. 部署时间'
                ],
                answer: 1,
                analysis: 'Lead Time（前置时间）是从工作项创建到完成的总时间，包括等待和处理时间。'
            },
            {
                id: 'm1-s20',
                type: 'single',
                question: '敏捷宣言发布于哪一年？',
                options: [
                    'A. 1999',
                    'B. 2001',
                    'C. 2005',
                    'D. 2010'
                ],
                answer: 1,
                analysis: '2001年，17位敏捷专家在犹他州雪鸟城发布了敏捷宣言。'
            },
            {
                id: 'm1-s21',
                type: 'single',
                question: 'Sprint计划会议的输出是？',
                options: [
                    'A. 产品待办列表',
                    'B. Sprint待办列表和Sprint目标',
                    'C. 团队绩效报告',
                    'D. 风险评估报告'
                ],
                answer: 1,
                analysis: 'Sprint计划会议的输出是Sprint待办列表和Sprint目标，明确本迭代的工作内容。'
            },
            {
                id: 'm1-s22',
                type: 'single',
                question: '持续交付的目的是？',
                options: [
                    'A. 加快开发速度',
                    'B. 能够频繁、可靠地发布软件',
                    'C. 减少测试',
                    'D. 提高代码质量'
                ],
                answer: 1,
                analysis: '持续交付的目标是让软件始终处于可发布状态，能够频繁、可靠地进行发布。'
            },
            {
                id: 'm1-s23',
                type: 'single',
                question: 'XP的结对编程中，两个角色定期？',
                options: [
                    'A. 固定不变',
                    'B. 轮换',
                    'C. 由经理决定',
                    'D. 随机选择'
                ],
                answer: 1,
                analysis: '结对编程中驾驶员和导航员角色定期轮换，让每个人都获得不同视角的经验。'
            },
            {
                id: 'm1-s24',
                type: 'single',
                question: 'Sprint期间，以下哪个可以变更？',
                options: [
                    'A. Sprint目标',
                    'B. Sprint范围',
                    'C. Sprint时长',
                    'D. Sprint日期'
                ],
                answer: 1,
                analysis: 'Scrum允许在Sprint期间根据情况调整Sprint范围，但Sprint目标、时长和日期应保持稳定。'
            },
            {
                id: 'm1-s25',
                type: 'single',
                question: '关于重构，以下说法正确的是？',
                options: [
                    'A. 重构会改变代码外在行为',
                    'B. 重构应有测试保护',
                    'C. 重构可以破坏现有功能',
                    'D. 重构等于重写'
                ],
                answer: 1,
                analysis: '重构是在不改变代码外在行为的前提下改善代码结构，应在测试保护下进行。'
            },
            // 多选题
            {
                id: 'm1-m1',
                type: 'multiple',
                question: '以下哪些是Scrum的五大事件？（多选）',
                options: [
                    'A. Sprint',
                    'B. Sprint计划会议',
                    'C. 代码评审',
                    'D. 每日站会'
                ],
                answer: [0, 1, 3],
                analysis: 'Scrum五大事件是：Sprint、Sprint计划会议、每日站会、Sprint评审会议、Sprint回顾会议。代码评审不是Scrum定义的事件。'
            },
            {
                id: 'm1-m2',
                type: 'multiple',
                question: '以下哪些是敏捷宣言的四价值观？（多选）',
                options: [
                    'A. 个体和互动高于流程和工具',
                    'B. 可工作软件高于详尽文档',
                    'C. 成本控制高于时间控制',
                    'D. 响应变化高于遵循计划'
                ],
                answer: [0, 1, 3],
                analysis: '敏捷宣言四价值观不包括成本控制高于时间控制。'
            },
            {
                id: 'm1-m3',
                type: 'multiple',
                question: '以下哪些是持续集成的核心原则？（多选）',
                options: [
                    'A. 频繁集成',
                    'B. 自动化构建',
                    'C. 手工部署',
                    'D. 快速反馈'
                ],
                answer: [0, 1, 3],
                analysis: '持续集成核心原则是频繁集成、自动化构建和快速反馈，手工部署与CI理念相悖。'
            },
            {
                id: 'm1-m4',
                type: 'multiple',
                question: 'TDD的三个定律包括？（多选）',
                options: [
                    'A. 先写测试',
                    'B. 只写失败测试',
                    'C. 写完美代码',
                    'D. 只写恰好通过代码'
                ],
                answer: [0, 1, 3],
                analysis: 'TDD三定律：1.先写失败测试 2.只写失败测试 3.只写恰好通过代码。不包括写完美代码。'
            },
            {
                id: 'm1-m5',
                type: 'multiple',
                question: '以下哪些是Kanban的核心实践？（多选）',
                options: [
                    'A. 可视化工作流程',
                    'B. 限制WIP',
                    'C. 固定Sprint',
                    'D. 管理流动'
                ],
                answer: [0, 1, 3],
                analysis: 'Kanban核心实践：可视化工作流、限制WIP、管理流动、明确策略、反馈循环、协作改进。固定Sprint是Scrum的做法。'
            },
            {
                id: 'm1-m6',
                type: 'multiple',
                question: '以下哪些是XP的工程实践？（多选）',
                options: [
                    'A. 结对编程',
                    'B. TDD',
                    'C. 持续集成',
                    'D. 详细文档'
                ],
                answer: [0, 1, 2],
                analysis: 'XP工程实践包括：结对编程、TDD、持续集成、重构、简单设计等。XP强调简洁文档而非详细文档。'
            },
            {
                id: 'm1-m7',
                type: 'multiple',
                question: 'DevOps的价值包括？（多选）',
                options: [
                    'A. 加速交付',
                    'B. 提高质量',
                    'C. 增强可靠性',
                    'D. 减少沟通'
                ],
                answer: [0, 1, 2],
                analysis: 'DevOps价值：加速交付、提高质量、增强可靠性。DevOps实际上是增强沟通而非减少。'
            },
            {
                id: 'm1-m8',
                type: 'multiple',
                question: 'Scrum的三大角色是？（多选）',
                options: [
                    'A. 产品负责人',
                    'B. 项目经理',
                    'C. ScrumMaster',
                    'D. 开发团队'
                ],
                answer: [0, 2, 3],
                analysis: 'Scrum三大角色：产品负责人、ScrumMaster、开发团队。项目经理不是Scrum定义的固定角色。'
            },
            {
                id: 'm1-m9',
                type: 'multiple',
                question: '以下哪些是好的单元测试的特征？（多选）',
                options: [
                    'A. 快速',
                    'B. 独立',
                    'C. 可重复',
                    'D. 依赖其他测试'
                ],
                answer: [0, 1, 2],
                analysis: '好的单元测试特征：快速、独立、可重复。单元测试不应依赖其他测试。'
            },
            {
                id: 'm1-m10',
                type: 'multiple',
                question: '敏捷十二原则包括？（多选）',
                options: [
                    'A. 尽早且持续交付有价值软件',
                    'B. 欢迎需求变化',
                    'C. 详尽文档优先',
                    'D. 定期反思调整'
                ],
                answer: [0, 1, 3],
                analysis: '敏捷原则强调：持续交付价值、欢迎变化、定期反思。详尽文档优先与敏捷理念相悖。'
            },
            // 判断题
            {
                id: 'm1-j1',
                type: 'judge',
                question: 'Scrum中，Sprint期间可以取消Sprint。',
                answer: true,
                analysis: 'Sprint可以被取消，但如果取消，通常是因为Sprint目标已经过时或有重大变化。取消Sprint不是常见做法。'
            },
            {
                id: 'm1-j2',
                type: 'judge',
                question: 'TDD意味着测试可以代替文档。',
                answer: false,
                analysis: 'TDD强调测试是文档的一种形式，但不是代替所有文档。某些重要说明仍需要文档。'
            },
            {
                id: 'm1-j3',
                type: 'judge',
                question: '每日站会应该每天同一时间召开。',
                answer: true,
                analysis: '每日站会应在每天同一时间召开，以建立稳定的节奏。'
            },
            {
                id: 'm1-j4',
                type: 'judge',
                question: '持续集成要求每次提交都运行完整的测试套件。',
                answer: false,
                analysis: '持续集成通常会运行快速测试，但完整测试可能需要更长时间，可以分层进行。'
            },
            {
                id: 'm1-j5',
                type: 'judge',
                question: 'Kanban是Scrum的一种变体。',
                answer: false,
                analysis: 'Kanban和Scrum是两种独立的敏捷方法，Kanban不是Scrum的变体。两者有相似之处但也有明显区别。'
            },
            {
                id: 'm1-j6',
                type: 'judge',
                question: 'XP的40小时工作制允许偶尔加班。',
                answer: false,
                analysis: '40小时工作制强调避免加班，保持可持续的开发节奏，不能连续加班。'
            },
            {
                id: 'm1-j7',
                type: 'judge',
                question: 'Sprint评审会议需要所有团队成员参加。',
                answer: false,
                analysis: 'Sprint评审会议是展示工作给利益相关者的会议，不仅限于团队成员。'
            },
            {
                id: 'm1-j8',
                type: 'judge',
                question: '重构可以改变代码的外在行为。',
                answer: false,
                analysis: '重构的原则是不改变代码的外在行为，只改善内部结构。'
            },
            {
                id: 'm1-j9',
                type: 'judge',
                question: '敏捷方法完全不需要任何计划。',
                answer: false,
                analysis: '敏捷方法不是不需要计划，而是强调响应变化高于遵循计划，计划仍然重要。'
            },
            {
                id: 'm1-j10',
                type: 'judge',
                question: 'DevOps强调开发和运维团队的紧密合作。',
                answer: true,
                analysis: 'DevOps的核心就是打破开发和运维之间的壁垒，实现紧密协作。'
            },
            {
                id: 'm1-j11',
                type: 'judge',
                question: 'Sprint待办列表在Sprint期间不能更新。',
                answer: false,
                analysis: 'Sprint待办列表在Sprint期间可以更新，但只能在Sprint内增加工作或删除工作，不能改变Sprint目标。'
            },
            {
                id: 'm1-j12',
                type: 'judge',
                question: 'TDD能100%保证代码质量。',
                answer: false,
                analysis: 'TDD能提高代码质量和测试覆盖率，但不能100%保证代码质量，还需要其他实践配合。'
            },
            {
                id: 'm1-j13',
                type: 'judge',
                question: '在制品（WIP）越多越好，能提高产出。',
                answer: false,
                analysis: 'WIP过多会导致多任务切换，降低效率。限制WIP是Kanban的核心实践。'
            },
            {
                id: 'm1-j14',
                type: 'judge',
                question: '敏捷宣言只有四条价值观。',
                answer: true,
                analysis: '敏捷宣言包含四条价值观和十二条原则。'
            },
            {
                id: 'm1-j15',
                type: 'judge',
                question: '持续集成需要CI服务器的支撑。',
                answer: true,
                analysis: '持续集成通常需要CI服务器（如Jenkins、GitLab CI）来自动执行构建和测试。'
            }
        ]
    },
    {
        id: 'mock2',
        title: '模拟试卷二',
        year: 2024,
        duration: 90,
        totalScore: 100,
        description: '深入考查TDD、CI/CD、工程实践',
        sections: [
            { type: 'single', count: 25, score: 2, name: '单选题' },
            { type: 'multiple', count: 10, score: 3, name: '多选题' },
            { type: 'judge', count: 15, score: 1, name: '判断题' }
        ],
        questions: [
            {
                id: 'm2-s1',
                type: 'single',
                question: 'TDD的第一定律是？',
                options: [
                    'A. 不允许写任何测试',
                    'B. 在写失败的生产代码前必须先写测试',
                    'C. 测试必须100%覆盖',
                    'D. 测试可以后写'
                ],
                answer: 1,
                analysis: 'TDD第一定律：在编写失败的生产代码之前，不允许编写任何测试代码。'
            },
            {
                id: 'm2-s2',
                type: 'single',
                question: '持续集成的"红色构建"指的是？',
                options: [
                    'A. 代码风格问题',
                    'B. 构建或测试失败',
                    'C. 代码审查未通过',
                    'D. 部署失败'
                ],
                answer: 1,
                analysis: '"红色"在CI中表示构建或测试失败，需要立即修复。绿色表示通过。'
            },
            {
                id: 'm2-s3',
                type: 'single',
                question: '关于结对编程，以下说法正确的是？',
                options: [
                    'A. 会降低开发效率',
                    'B. 驾驶员和导航员角色固定',
                    'C. 促进知识共享',
                    'D. 只适合初学者'
                ],
                answer: 2,
                analysis: '结对编程虽然看起来效率降低，但能促进知识共享、提高代码质量，长期来看是值得的。'
            },
            {
                id: 'm2-s4',
                type: 'single',
                question: '代码重构应该在什么情况下进行？',
                options: [
                    'A. 有测试保护的情况下',
                    'B. 任何时候都可以',
                    'C. 只有上线前',
                    'D. 不需要测试保护'
                ],
                answer: 0,
                analysis: '重构应该在有测试保护的情况下进行，确保重构不会破坏现有功能。'
            },
            {
                id: 'm2-s5',
                type: 'single',
                question: '持续交付（CD）的主要目标是？',
                options: [
                    'A. 加快开发速度',
                    'B. 软件随时可部署',
                    'C. 减少测试',
                    'D. 提高代码行数'
                ],
                answer: 1,
                analysis: '持续交付的目标是让软件始终处于可部署状态，能够随时发布。'
            },
            {
                id: 'm2-s6',
                type: 'single',
                question: 'XP的"简单设计"原则遵循什么规则？',
                options: [
                    'A. YAGNI',
                    'B. KISS',
                    'C. SOLID',
                    'D. 以上全部'
                ],
                answer: 3,
                analysis: '简单设计原则遵循多个规则：YAGNI（You Ain\'t Gonna Need It）、KISS（Keep It Simple）、DRY（Don\'t Repeat Yourself）等。'
            },
            {
                id: 'm2-s7',
                type: 'single',
                question: '单元测试的"AAA"模式指的是？',
                options: [
                    'A. Arrange, Act, Assert',
                    'B. Add, All, Assert',
                    'C. Any, Available, All',
                    'D. Arrange, Answer, Assert'
                ],
                answer: 0,
                analysis: 'AAA模式：Arrange（准备）→ Act（执行）→ Assert（断言）。'
            },
            {
                id: 'm2-s8',
                type: 'single',
                question: 'CI服务器的主要功能不包括？',
                options: [
                    'A. 代码拉取',
                    'B. 自动化构建',
                    'C. 代码编写',
                    'D. 测试执行'
                ],
                answer: 2,
                analysis: 'CI服务器负责拉取代码、构建和测试执行，但不负责代码编写。'
            },
            {
                id: 'm2-s9',
                type: 'single',
                question: '关于TDD中的"红色"，以下说法正确的是？',
                options: [
                    'A. 写通过测试',
                    'B. 写失败测试',
                    'C. 写生产代码',
                    'D. 运行测试'
                ],
                answer: 1,
                analysis: '红色阶段是写一个描述新功能的测试，这个测试应该失败（红色）。'
            },
            {
                id: 'm2-s10',
                type: 'single',
                question: 'XP中，集体所有权的含义是？',
                options: [
                    'A. 代码属于个人',
                    'B. 任何人都可以改进任何代码',
                    'C. 代码需要审批',
                    'D. 只有高级开发者能改代码'
                ],
                answer: 1,
                analysis: 'XP的集体所有权意味着任何团队成员都有权改进任何代码。'
            },
            {
                id: 'm2-s11',
                type: 'single',
                question: '持续集成要求构建时间应该？',
                options: [
                    'A. 越长越好',
                    'B. 控制在10分钟以内',
                    'C. 至少30分钟',
                    'D. 无所谓'
                ],
                answer: 1,
                analysis: 'CI最佳实践要求构建时间控制在10分钟以内，以保证快速反馈。'
            },
            {
                id: 'm2-s12',
                type: 'single',
                question: 'TDD能带来什么好处？',
                options: [
                    'A. 降低代码质量',
                    'B. 提高代码可测试性',
                    'C. 增加开发时间',
                    'D. 减少测试'
                ],
                answer: 1,
                analysis: 'TDD通过要求代码可测试来驱动设计，提高代码质量和可测试性。'
            },
            {
                id: 'm2-s13',
                type: 'single',
                question: 'XP编码标准的目的？',
                options: [
                    'A. 限制程序员自由',
                    'B. 提高代码可读性',
                    'C. 增加代码量',
                    'D. 减少沟通'
                ],
                answer: 1,
                analysis: '编码标准统一代码风格，提高可读性，便于团队协作。'
            },
            {
                id: 'm2-s14',
                type: 'single',
                question: '好的单元测试应该是？',
                options: [
                    'A. 依赖其他测试',
                    'B. 慢速的',
                    'C. 独立的',
                    'D. 有状态的'
                ],
                answer: 2,
                analysis: '好的单元测试应该是独立的、快速可重复的，不依赖其他测试。'
            },
            {
                id: 'm2-s15',
                type: 'single',
                question: '持续集成中，谁负责修复失败的构建？',
                options: [
                    'A. 只有构建负责人',
                    'B. 团队任何成员',
                    'C. 测试人员',
                    'D. 经理'
                ],
                answer: 1,
                analysis: '在持续集成中，修复失败的构建是最高优先级，通常是导致构建失败的人负责修复。'
            },
            {
                id: 'm2-s16',
                type: 'single',
                question: 'TDD绿色阶段完成后，应该？',
                options: [
                    'A. 继续写更多代码',
                    'B. 进行重构',
                    'C. 提交代码',
                    'D. 写文档'
                ],
                answer: 1,
                analysis: 'TDD绿色阶段后应该进行重构，改善代码结构而不改变行为。'
            },
            {
                id: 'm2-s17',
                type: 'single',
                question: 'XP中简单设计的"四次法则"指的是？',
                options: [
                    'A. 4人组队',
                    'B. 代码重复四次才重构',
                    'C. 4周一个迭代',
                    'D. 4种测试类型'
                ],
                answer: 1,
                analysis: '四次法则（Rule of Four）指当同样的代码出现四次时才进行重构，而不是第三次就重构。'
            },
            {
                id: 'm2-s18',
                type: 'single',
                question: 'CI/CD流水线的核心是？',
                options: [
                    'A. 手工操作',
                    'B. 自动化',
                    'C. 文档化',
                    'D. 审批流程'
                ],
                answer: 1,
                analysis: 'CI/CD的核心是自动化，从代码提交到部署的整个流程都应该自动化。'
            },
            {
                id: 'm2-s19',
                type: 'single',
                question: '在TDD中，测试应该描述什么？',
                options: [
                    'A. 实现细节',
                    'B. 期望的行为',
                    'C. 代码结构',
                    'D. 变量名'
                ],
                answer: 1,
                analysis: 'TDD中的测试应该描述期望的行为（what），而不是实现细节（how）。'
            },
            {
                id: 'm2-s20',
                type: 'single',
                question: 'XP的"可持续节奏"理念是？',
                options: [
                    'A. 加班加点',
                    'B. 保持稳定工作时长',
                    'C. 随时工作',
                    'D. 长期加班'
                ],
                answer: 1,
                analysis: 'XP强调40小时工作制，保持可持续的开发节奏，避免疲劳。'
            },
            {
                id: 'm2-s21',
                type: 'single',
                question: '代码气味（Code Smell）指的是？',
                options: [
                    'A. 编译错误',
                    'B. 潜在代码问题',
                    'C. 变量命名',
                    'D. 注释过多'
                ],
                answer: 1,
                analysis: 'Code Smell是指代码中潜在的问题，通常不是错误，但表明可能需要重构。'
            },
            {
                id: 'm2-s22',
                type: 'single',
                question: '集成测试的目的是？',
                options: [
                    'A. 测试单个函数',
                    'B. 测试模块间的交互',
                    'C. 测试整个系统',
                    'D. 测试UI'
                ],
                answer: 1,
                analysis: '集成测试验证多个模块或组件之间的交互是否正确。'
            },
            {
                id: 'm2-s23',
                type: 'single',
                question: 'TDD中，为什么先写测试？',
                options: [
                    'A. 为了覆盖率',
                    'B. 驱动出好的设计',
                    'C. 浪费时间',
                    'D. 满足要求'
                ],
                answer: 1,
                analysis: 'TDD先写测试的目的是通过测试来思考和明确需求，从而驱动出好的设计。'
            },
            {
                id: 'm2-s24',
                type: 'single',
                question: '持续集成的反馈包括哪些？',
                options: [
                    'A. 只有邮件',
                    'B. 构建状态、测试结果',
                    'C. 只有代码审查',
                    'D. 只有日志'
                ],
                answer: 1,
                analysis: 'CI反馈包括构建状态、测试结果、代码质量报告等多种信息。'
            },
            {
                id: 'm2-s25',
                type: 'single',
                question: 'XP的"隐喻"实践指的是？',
                options: [
                    'A. 代码注释',
                    'B. 用共享愿景指导开发',
                    'C. 秘密开发',
                    'D. 图形界面'
                ],
                answer: 1,
                analysis: 'XP的隐喻（Metaphor）是用共享的愿景和比喻来指导团队对系统的理解。'
            },
            // 多选题
            {
                id: 'm2-m1',
                type: 'multiple',
                question: '以下哪些是CI的必要组成部分？（多选）',
                options: [
                    'A. 版本控制系统',
                    'B. CI服务器',
                    'C. 手工构建',
                    'D. 自动化测试'
                ],
                answer: [0, 1, 3],
                analysis: 'CI需要版本控制系统存储代码、CI服务器执行自动化构建、自动化测试验证功能。手工构建与CI理念相悖。'
            },
            {
                id: 'm2-m2',
                type: 'multiple',
                question: 'TDD的好处包括？（多选）',
                options: [
                    'A. 改进设计',
                    'B. 100%覆盖率',
                    'C. 文档化',
                    'D. 安全网'
                ],
                answer: [0, 2, 3],
                analysis: 'TDD能改进设计、提供测试文档和重构安全网，但不保证100%覆盖率。'
            },
            {
                id: 'm2-m3',
                type: 'multiple',
                question: 'XP的核心实践包括？（多选）',
                options: [
                    'A. 结对编程',
                    'B. TDD',
                    'C. 持续集成',
                    'D. 详细文档'
                ],
                answer: [0, 1, 2],
                analysis: 'XP核心实践包括结对编程、TDD、持续集成、重构等。XP强调简洁而非详细文档。'
            },
            {
                id: 'm2-m4',
                type: 'multiple',
                question: '好的测试应该具备哪些特征？（多选）',
                options: [
                    'A. 快速',
                    'B. 可靠',
                    'C. 独立',
                    'D. 依赖其他测试'
                ],
                answer: [0, 1, 2],
                analysis: '好的测试应该是快速、可靠、独立的，不应依赖其他测试。'
            },
            {
                id: 'm2-m5',
                type: 'multiple',
                question: '持续集成最佳实践包括？（多选）',
                options: [
                    'A. 提交前本地测试',
                    'B. 保持构建快速',
                    'C. 忽略失败的构建',
                    'D. 修复优先'
                ],
                answer: [0, 1, 3],
                analysis: 'CI最佳实践：提交前本地测试减少失败、保持构建快速、修复失败构建优先。忽略失败构建是错误的。'
            },
            {
                id: 'm2-m6',
                type: 'multiple',
                question: '以下哪些可以提高代码质量？（多选）',
                options: [
                    'A. 代码审查',
                    'B. 结对编程',
                    'C. TDD',
                    'D. 不写测试'
                ],
                answer: [0, 1, 2],
                analysis: '代码审查、结对编程、TDD都能提高代码质量。不写测试会导致质量下降。'
            },
            {
                id: 'm2-m7',
                type: 'multiple',
                question: '重构的时机包括？（多选）',
                options: [
                    'A. 添加功能时',
                    'B. 修复bug时',
                    'C. 代码审查时',
                    'D. 有测试保护时'
                ],
                answer: [0, 1, 2, 3],
                analysis: '重构可以在添加功能、修复bug、代码审查时进行，但应有测试保护。'
            },
            {
                id: 'm2-m8',
                type: 'multiple',
                question: '持续交付/部署的区别是？（多选）',
                options: [
                    'A. CD可以自动部署到生产',
                    'B. CD可以手动部署到生产',
                    'C. CI是CD的一部分',
                    'D. CI和CD完全相同'
                ],
                answer: [1, 2],
                analysis: '持续交付（CD）通常指手动部署到生产，持续部署则自动部署。CI是CD的基础。'
            },
            {
                id: 'm2-m9',
                type: 'multiple',
                question: '自动化测试金字塔包括？（多选）',
                options: [
                    'A. 单元测试（底层）',
                    'B. 集成测试（中层）',
                    'C. UI测试（顶层）',
                    'D. 所有测试一样多'
                ],
                answer: [0, 1, 2],
                analysis: '测试金字塔：底层单元测试多、中层集成测试适量、顶层UI测试少。'
            },
            {
                id: 'm2-m10',
                type: 'multiple',
                question: '代码坏味道包括？（多选）',
                options: [
                    'A. 重复代码',
                    'B. 过长函数',
                    'C. 注释过多',
                    'D. 命名清晰'
                ],
                answer: [0, 1, 2],
                analysis: '代码坏味道包括重复代码、过长函数、过多注释等。命名清晰是好的实践。'
            },
            // 判断题
            {
                id: 'm2-j1',
                type: 'judge',
                question: 'TDD中的测试都是单元测试。',
                answer: false,
                analysis: 'TDD主要使用单元测试，但也可以包括集成测试等。'
            },
            {
                id: 'm2-j2',
                type: 'judge',
                question: '持续集成可以让问题在早期发现。',
                answer: true,
                analysis: 'CI通过频繁集成和自动化测试，让问题在早期发现和修复。'
            },
            {
                id: 'm2-j3',
                type: 'judge',
                question: 'XP的40小时工作制意味着每周不能加班。',
                answer: false,
                analysis: '40小时工作制强调避免长期加班，偶尔加班可能是必要的，但不鼓励连续加班。'
            },
            {
                id: 'm2-j4',
                type: 'judge',
                question: '重构可以改变代码的外在行为。',
                answer: false,
                analysis: '重构的核心原则是不改变代码的外在行为，只改善内部结构。'
            },
            {
                id: 'm2-j5',
                type: 'judge',
                question: '结对编程会降低开发效率。',
                answer: false,
                analysis: '结对编程短期看似乎降低效率，但长期能提高代码质量、减少bug、促进知识共享。'
            },
            {
                id: 'm2-j6',
                type: 'judge',
                question: '持续集成要求每次提交都运行完整测试套件。',
                answer: false,
                analysis: 'CI通常运行快速测试，完整测试可能分层进行或使用更长的CI管道。'
            },
            {
                id: 'm2-j7',
                type: 'judge',
                question: '好的单元测试应该独立运行。',
                answer: true,
                analysis: '好的单元测试应该独立，不依赖其他测试，能以任意顺序运行。'
            },
            {
                id: 'm2-j8',
                type: 'judge',
                question: 'TDD可以完全替代代码审查。',
                answer: false,
                analysis: 'TDD和代码审查是互补的实践，TDD不能替代代码审查。'
            },
            {
                id: 'm2-j9',
                type: 'judge',
                question: '持续交付意味着每次提交都会部署到生产。',
                answer: false,
                analysis: '持续交付是让软件随时可部署，但不一定是每次提交都部署到生产。'
            },
            {
                id: 'm2-j10',
                type: 'judge',
                question: '代码气味意味着代码有bug。',
                answer: false,
                analysis: 'Code Smell是代码中潜在问题的迹象，不一定有bug，但表明可能需要重构。'
            },
            {
                id: 'm2-j11',
                type: 'judge',
                question: '自动化测试可以完全替代手工测试。',
                answer: false,
                analysis: '自动化测试和手工测试各有优势，不能完全替代。某些测试（如可用性测试）仍需手工进行。'
            },
            {
                id: 'm2-j12',
                type: 'judge',
                question: 'XP的简单设计意味着不写文档。',
                answer: false,
                analysis: 'XP强调简洁（Sufficient）文档，而非不写文档。必要的文档仍然重要。'
            },
            {
                id: 'm2-j13',
                type: 'judge',
                question: '持续集成需要团队成员频繁提交代码。',
                answer: true,
                analysis: '持续集成要求团队成员频繁提交代码，通常每天至少一次。'
            },
            {
                id: 'm2-j14',
                type: 'judge',
                question: 'TDD的第二定律是只写恰好通过测试的代码。',
                answer: false,
                analysis: 'TDD第二定律是只写失败测试，第三定律才是只写恰好通过测试的代码。'
            },
            {
                id: 'm2-j15',
                type: 'judge',
                question: '代码重构应该是一次性的大规模修改。',
                answer: false,
                analysis: '重构应该是渐进式的、持续的小改，而不是一次性的大规模修改。'
            }
        ]
    },
    {
        id: 'mock3',
        title: '模拟试卷三',
        year: 2024,
        duration: 90,
        totalScore: 100,
        description: '软件质量与管理理论综合考查',
        sections: [
            { type: 'single', count: 20, score: 2, name: '单选题' },
            { type: 'multiple', count: 10, score: 3, name: '多选题' },
            { type: 'judge', count: 10, score: 1, name: '判断题' },
            { type: 'essay', count: 2, score: 10, name: '简答题' }
        ],
        questions: [
            // 单选题
            {
                id: 'm3-s1',
                type: 'single',
                question: 'CMMI-DEV V1.3的五个成熟度等级中，"定量管理级"是第几级？',
                options: [
                    'A. 第2级',
                    'B. 第3级',
                    'C. 第4级',
                    'D. 第5级'
                ],
                answer: 2,
                analysis: 'CMMI五个等级依次为：初始级(1)、已管理级(2)、已定义级(3)、定量管理级(4)、优化级(5)。定量管理级是第4级，构建预测模型，以统计过程控制的手段来管理过程。',
                score: 2
            },
            {
                id: 'm3-s2',
                type: 'single',
                question: 'PSP质量策略的核心思想是？',
                options: [
                    'A. 通过大量测试保证质量',
                    'B. 用缺陷管理替代质量管理',
                    'C. 依赖自动化工具发现缺陷',
                    'D. 增加开发人员数量'
                ],
                answer: 1,
                analysis: 'PSP质量策略的核心是用缺陷管理来替代质量管理，高质量产品意味着各个组件基本无缺陷，通过高质量评审来实现。',
                score: 2
            },
            {
                id: 'm3-s3',
                type: 'single',
                question: 'PROBE估算方法中，"代理(Proxy)"的主要作用是？',
                options: [
                    'A. 替代需求分析',
                    'B. 作为精确度量和早期规划之间的桥梁',
                    'C. 减少代码规模',
                    'D. 自动化测试'
                ],
                answer: 1,
                analysis: 'PROBE(PROxy Based Estimation)的作用是设计合理的代理作为精准度量和早期规划所需要的度量之间的桥梁，使用相对大小而不是绝对大小进行估算。',
                score: 2
            },
            {
                id: 'm3-s4',
                type: 'single',
                question: '挣值管理简单实现中，"0-100原则"指的是？',
                options: [
                    'A. 只有任务完成时才将PV值转化为EV值',
                    'B. 开始赋50%，完成加50%',
                    'C. 开始赋100%，完成赋0%',
                    'D. 每天赋10%的值'
                ],
                answer: 0,
                analysis: '0-100原则是指只有当某项任务完成时，该任务的PV值才转化成EV值，即完成时赋100%，未完成时为0%。50-50原则则是开始赋50%，完成加50%。',
                score: 2
            },
            {
                id: 'm3-s5',
                type: 'single',
                question: '关于WBS最底层要素，下列描述正确的是？',
                options: [
                    'A. 可以重复定义',
                    'B. 是实现目标的充分必要条件',
                    'C. 不需要明确的责任人',
                    'D. 必须是代码模块'
                ],
                answer: 1,
                analysis: '好的WBS检查标准包括：最底层要素不能重复、必须清晰完整定义、必须有定义清晰的责任人、是实现目标的充分必要条件（项目工作范围得到完整体现）。',
                score: 2
            },
            {
                id: 'm3-s6',
                type: 'single',
                question: 'PSP中Yield指标用以度量什么？',
                options: [
                    'A. 评审速度',
                    'B. 每个阶段在消除缺陷方面的效率',
                    'C. 代码复杂度',
                    'D. 开发时间'
                ],
                answer: 1,
                analysis: 'Yield指标用以度量每个阶段在消除缺陷方面的效率。Phase Yield = 100 * (某阶段发现的缺陷个数)/(某阶段注入的缺陷个数+进入该阶段前遗留的缺陷个数)。',
                score: 2
            },
            {
                id: 'm3-s7',
                type: 'single',
                question: 'PSP中A/FR的期望值是？',
                options: [
                    'A. 0.5',
                    'B. 1.0',
                    'C. 2.0',
                    'D. 5.0'
                ],
                answer: 2,
                analysis: 'A/FR = PSP质检成本/PSP失效成本。理论上A/FR值越大意味着质量越高，但过高的A/FR意味着评审过多导致效率下降，因此PSP中A/FR的期望值是2.0。',
                score: 2
            },
            {
                id: 'm3-s8',
                type: 'single',
                question: 'PQI是几个数据的乘积？',
                options: [
                    'A. 3个',
                    'B. 4个',
                    'C. 5个',
                    'D. 6个'
                ],
                answer: 2,
                analysis: 'PQI是5个数据的乘积：设计质量、设计评审质量、代码评审质量、代码质量、程序质量。结果越接近1，质量越高。',
                score: 2
            },
            {
                id: 'm3-s9',
                type: 'single',
                question: 'DRL指标的计算基准是？',
                options: [
                    'A. 设计评审每小时发现缺陷数',
                    'B. 代码评审每小时发现缺陷数',
                    'C. 单元测试每小时发现缺陷数',
                    'D. 系统测试每小时发现缺陷数'
                ],
                answer: 2,
                analysis: 'DRL(缺陷消除效率比)以某个测试阶段(一般为单元测试)每小时发现的缺陷数为基础，其他阶段每小时发现缺陷数与该测试阶段每小时发现的缺陷的比值就是DRL。',
                score: 2
            },
            {
                id: 'm3-s10',
                type: 'single',
                question: '关于验证(Verification)和确认(Validation)，下列说法正确的是？',
                options: [
                    'A. 验证关注客户需求是否满足',
                    'B. 确认关注产品是否符合需求规格',
                    'C. 单元测试属于确认活动',
                    'D. 验证是检验产品是否符合事先定义的需求规格'
                ],
                answer: 3,
                analysis: '验证(Verification)是检验获得的产品和产品组件能不能满足事先定义好的需求规格；确认(Validation)是确保产品可以满足客户的需求。单元测试属于验证活动，需求评审属于确认活动。',
                score: 2
            },
            {
                id: 'm3-s11',
                type: 'single',
                question: 'PDCA模型中的"C"代表？',
                options: [
                    'A. Control（控制）',
                    'B. Check（检查）',
                    'C. Change（变更）',
                    'D. Confirm（确认）'
                ],
                answer: 1,
                analysis: 'PDCA是Plan(计划)、Do(执行)、Check(检查)、Action(行动)的缩写，是软件过程改进参考元模型，又称戴明环。',
                score: 2
            },
            {
                id: 'm3-s12',
                type: 'single',
                question: 'IDEAL模型不包括以下哪个阶段？',
                options: [
                    'A. Initiating（初始）',
                    'B. Diagnosing（诊断）',
                    'C. Evaluating（评估）',
                    'D. Leveraging（调整）'
                ],
                answer: 2,
                analysis: 'IDEAL模型包括五个阶段：Initiating(初始)、Diagnosing(诊断)、Establishing(建立)、Acting(执行)、Leveraging(调整)。不包括Evaluating(评估)。',
                score: 2
            },
            {
                id: 'm3-s13',
                type: 'single',
                question: '配置管理中"基线"的作用是？',
                options: [
                    'A. 记录所有代码变更历史',
                    'B. 作为未来开发工作或交付的基础，只能经严格变更控制程序才能改变',
                    'C. 自动化测试的基础',
                    'D. 项目进度跟踪的工具'
                ],
                answer: 1,
                analysis: '基线是一组经正式审查同意的规格或工作产品集合，是未来开发工作或交付的基础，而且只能经由严格的变更控制程序才能改变。配置项持续演进的稳定基础。',
                score: 2
            },
            {
                id: 'm3-s14',
                type: 'single',
                question: '以下不属于软件开发四大本质困难的是？',
                options: [
                    'A. 复杂性',
                    'B. 不可见性',
                    'C. 可移植性',
                    'D. 一致性'
                ],
                answer: 2,
                analysis: '软件开发的四大本质困难是复杂性、不可见性、可变性、一致性。可移植性不是本质困难，而是软件质量属性之一。',
                score: 2
            },
            {
                id: 'm3-s15',
                type: 'single',
                question: '软件发展三大阶段中，"软件成为独立产品"阶段的时间是？',
                options: [
                    'A. 50年代-70年代',
                    'B. 70年代-90年代',
                    'C. 90年代中期至今',
                    'D. 2000年至今'
                ],
                answer: 1,
                analysis: '软件发展三大阶段：软硬件一体化(50年代-70年代)、软件成为独立产品(70年代-90年代)、网络化和服务化(90年代中期迄今)。',
                score: 2
            },
            {
                id: 'm3-s16',
                type: 'single',
                question: '根据马斯洛需求层次理论，最高的层次是？',
                options: [
                    'A. 尊重需求',
                    'B. 安全需求',
                    'C. 自我实现',
                    'D. 社交需求'
                ],
                answer: 2,
                analysis: '马斯洛需求层次理论中，自我实现是最高的层次。激励来自为没有满足的需求而努力奋斗，低层次的需求必须在高层次需求满足之前得到满足。',
                score: 2
            },
            {
                id: 'm3-s17',
                type: 'single',
                question: '麦克勒格的Y理论适用于以下哪种场合？',
                options: [
                    'A. 关注工作环境、薪金等',
                    'B. 更喜欢经常的指导，避免承担责任',
                    'C. 自我中心，对组织需求反应淡漠',
                    'D. 能够自我约束，自我导向与控制，渴望承担责任'
                ],
                answer: 3,
                analysis: '麦克勒格Y理论适用于能够自我约束、自我导向与控制、渴望承担责任的场合。X理论适用于A、B、C描述的场合。',
                score: 2
            },
            {
                id: 'm3-s18',
                type: 'single',
                question: '海兹伯格的激励理论将因素分为？',
                options: [
                    'A. 内在因素和外在因素',
                    'B. 物质因素和精神因素',
                    'C. 个人因素和组织因素',
                    'D. 主观因素和客观因素'
                ],
                answer: 0,
                analysis: '海兹伯格的激励理论区分为内在因素(激励因素：成就感、责任感、晋升、被赏识)和外在因素(保健因素：薪金、工作环境等)两种。',
                score: 2
            },
            {
                id: 'm3-s19',
                type: 'single',
                question: '关于软件估算，下列说法正确的是？',
                options: [
                    'A. 估算就是给出准确的结果',
                    'B. 估算关注的是过程，而非结果',
                    'C. 估算不需要依赖数据',
                    'D. 估算越粗略越好'
                ],
                answer: 1,
                analysis: '估算的基本要点包括：尽可能划分详细、建立对结果的信心、依赖数据、估算关注的是过程而非结果。估算是相关干系人达成一致共识的过程。',
                score: 2
            },
            {
                id: 'm3-s20',
                type: 'single',
                question: 'PSP中代码评审速度(Review Rate)的要求是？',
                options: [
                    'A. 小于100 LOC/小时',
                    'B. 小于200 LOC/小时',
                    'C. 小于500 LOC/小时',
                    'D. 小于1000 LOC/小时'
                ],
                answer: 1,
                analysis: 'Review Rate(评审速度)是指导软件工程师开展有效评审的指标。在PSP实践中，代码评审速度小于200 LOC/小时，文档评审速度小于4 Page/小时。',
                score: 2
            },
            // 多选题
            {
                id: 'm3-m1',
                type: 'multiple',
                question: '以下哪些是软件过程改进的参考元模型？（多选）',
                options: [
                    'A. PDCA',
                    'B. IDEAL',
                    'C. CMMI',
                    'D. SPICE'
                ],
                answer: [0, 1],
                analysis: 'PDCA和IDEAL是软件过程改进参考元模型；CMMI和SPICE是软件过程管理/改进模型，不是元模型。过程改进参考元模型提供改进的框架和方法论。',
                score: 3
            },
            {
                id: 'm3-m2',
                type: 'multiple',
                question: '关于PSP质量策略，下列说法正确的是？（多选）',
                options: [
                    'A. 用缺陷管理替代质量管理',
                    'B. 高质量产品意味着各个组件基本无缺陷',
                    'C. 各组件的高质量通过高质量评审实现',
                    'D. 主要解决外部质量而非内部质量'
                ],
                answer: [0, 1, 2],
                analysis: 'PSP质量策略：用缺陷管理替代质量管理；高质量产品意味着各个组件基本无缺陷；各组件的高质量通过高质量评审实现。PSP质量策略主要解决的是内部质量（组件质量），而非外部质量。',
                score: 3
            },
            {
                id: 'm3-m3',
                type: 'multiple',
                question: '挣值管理方法的三种实现方式包括？（多选）',
                options: [
                    'A. 简单实现',
                    'B. 中级实现',
                    'C. 高级实现',
                    'D. 超级实现'
                ],
                answer: [0, 1, 2],
                analysis: 'EVM三种实现方式：简单实现(仅关注进度信息)、中级实现(加入日程偏差计算SV、SPI)、高级实现(加入成本线AC和预测线BAC)。不存在"超级实现"。',
                score: 3
            },
            {
                id: 'm3-m4',
                type: 'multiple',
                question: '以下哪些是PSP的质量指标？（多选）',
                options: [
                    'A. Yield',
                    'B. A/FR',
                    'C. PQI',
                    'D. DRL'
                ],
                answer: [0, 1, 2, 3],
                analysis: 'PSP的质量指标包括：Yield(缺陷消除效率)、A/FR(质检失效比)、PQI(过程质量指标)、Review Rate(评审速度)、DRL(缺陷消除效率比)。四个选项都是PSP质量指标。',
                score: 3
            },
            {
                id: 'm3-m5',
                type: 'multiple',
                question: '关于PROBE估算方法，下列说法正确的是？（多选）',
                options: [
                    'A. 使用代理作为精确度量和早期规划的桥梁',
                    'B. 使用相对大小而不是绝对大小',
                    'C. 非常依赖高质量的历史数据',
                    'D. 可以完全替代需求分析'
                ],
                answer: [0, 1, 2],
                analysis: 'PROBE方法：设计合理的代理作为精准度量和早期规划的桥梁；使用相对大小而不是绝对大小；非常依赖高质量的历史数据。PROBE不能替代需求分析。',
                score: 3
            },
            {
                id: 'm3-m6',
                type: 'multiple',
                question: '以下哪些属于配置管理的活动？（多选）',
                options: [
                    'A. 配置项标识',
                    'B. 版本控制',
                    'C. 变更控制',
                    'D. 配置审计'
                ],
                answer: [0, 1, 2, 3],
                analysis: '配置管理活动包括：配置项标识、版本控制、变更控制、配置状态报告、配置审计等。目的是建立与维护工作产品的完整性。',
                score: 3
            },
            {
                id: 'm3-m7',
                type: 'multiple',
                question: '以下哪些是优秀需求规格文档的特征？（多选）',
                options: [
                    'A. 完整特征',
                    'B. 一致特征',
                    'C. 可验证特征',
                    'D. 模糊特征'
                ],
                answer: [0, 1, 2],
                analysis: '优秀需求规格文档特征：内聚、完整、一致、原子、可跟踪、非过期、可行性、非二义性、强制、可验证。模糊特征是错误的，应该是非二义性。',
                score: 3
            },
            {
                id: 'm3-m8',
                type: 'multiple',
                question: '关于WBS，下列说法正确的是？（多选）',
                options: [
                    'A. 提供项目范围基线',
                    'B. 是进行估算和编制项目日程计划的基础',
                    'C. 最底层要素不能重复',
                    'D. 分解时同一层可以应用不同标准'
                ],
                answer: [0, 1, 2],
                analysis: 'WBS提供项目范围基线、是估算和编制日程计划的基础、最底层要素不能重复。WBS分解时同一层不能应用不同标准，这是好的WBS的检查标准之一。',
                score: 3
            },
            {
                id: 'm3-m9',
                type: 'multiple',
                question: '以下哪些是团队集成策略？（多选）',
                options: [
                    'A. 大爆炸集成',
                    'B. 逐一添加集成',
                    'C. 集簇集成',
                    'D. 扁平化集成'
                ],
                answer: [0, 1, 2, 3],
                analysis: '团队集成策略包括：大爆炸集成、逐一添加集成、集簇集成、扁平化集成。每种策略都有其优缺点和适用场景。',
                score: 3
            },
            {
                id: 'm3-m10',
                type: 'multiple',
                question: '关于自主团队，下列说法正确的是？（多选）',
                options: [
                    'A. 自行定义项目的目标',
                    'B. 自行决定团队组成形式和成员角色',
                    'C. 自行决定项目的开发过程',
                    'D. 自行度量、管理和控制项目工作'
                ],
                answer: [0, 1, 2, 3],
                analysis: '自主团队的特点：自行定义项目目标、自行决定团队组成形式和成员角色、自行决定项目开发策略、自行决定项目开发过程、自行制定项目开发计划、自行度量管理和控制项目工作。',
                score: 3
            },
            // 判断题
            {
                id: 'm3-j1',
                type: 'judge',
                question: 'CMMI是软件过程改进模型，而非具体的软件过程或软件开发方法。',
                answer: true,
                analysis: 'CMMI是过程改进模型，刻画软件团队/组织从不成熟到成熟的每个阶段的特征，不是具体的软件过程或软件开发方法。',
                score: 1
            },
            {
                id: 'm3-j2',
                type: 'judge',
                question: 'CMMI模型需要适当裁剪以适应公司的实际情况。',
                answer: false,
                analysis: '需要裁减的是公司内部定义的组织级开发流程和开发规范，而不是CMMI模型本身。CMMI模型不需要裁剪。',
                score: 1
            },
            {
                id: 'm3-j3',
                type: 'judge',
                question: 'PSP中A/FR的值越大越好。',
                answer: false,
                analysis: '理论上A/FR值越大意味着质量越高，但过高的A/FR意味着做了过多的评审，反而会导致开发效率下降。PSP中A/FR的期望值是2.0。',
                score: 1
            },
            {
                id: 'm3-j4',
                type: 'judge',
                question: 'Yield指标既可以用来度量，也可以用来预测。',
                answer: false,
                analysis: 'Yield指标是一种事后的质量控制手段，很难非常精确地计算。Yield只能用来估算(预测)，不可以用来度量。',
                score: 1
            },
            {
                id: 'm3-j5',
                type: 'judge',
                question: '软件过程管理是软件项目管理应该要实现的目标。',
                answer: false,
                analysis: '软件过程管理和软件项目管理完全是两回事。软件过程管理的对象是软件过程，软件项目管理的对象是各项软件项目，两者不是目标与实现的关系。',
                score: 1
            },
            {
                id: 'm3-j6',
                type: 'judge',
                question: 'PDCA和IDEAL不适合在敏捷环境中使用。',
                answer: false,
                analysis: 'PDCA、IDEAL是软件过程改进参考元模型，适合在敏捷环境中使用。它们提供过程改进的框架，与敏捷方法不冲突。',
                score: 1
            },
            {
                id: 'm3-j7',
                type: 'judge',
                question: '挣值管理不适用于质量管理。',
                answer: true,
                analysis: 'EVM不可以支持质量管理。EVM是用来客观度量项目进度的一种项目管理方法，采用进度计划、成本预算和实际成本三个独立变量进行项目绩效测量。',
                score: 1
            },
            {
                id: 'm3-j8',
                type: 'judge',
                question: '评审消除缺陷的效率高于测试消除缺陷。',
                answer: true,
                analysis: '根据行业数据，评审消除缺陷的代价远低于测试消除。评审发现缺陷的同时就知道位置和原因，而测试需要调试定位。缺陷发现效率：代码评审>设计评审>单元测试>系统测试。',
                score: 1
            },
            {
                id: 'm3-j9',
                type: 'judge',
                question: 'PROBE方法中，规模估算和时间估算的偏差产生原因相同。',
                answer: false,
                analysis: '规模估算产生偏差的原因相对客观，偏差可以用来修正新的估算结果。而时间估算的偏差产生原因更加复杂，一方面和规模有关，另一方面和人的主观能动性有关。',
                score: 1
            },
            {
                id: 'm3-j10',
                type: 'judge',
                question: '配置管理的目的是建立与维护工作产品的完整性。',
                answer: true,
                analysis: '配置管理的目的就是建立与维护工作产品的完整性，通过配置项标识、版本控制、变更控制、配置审计等活动实现。',
                score: 1
            },
            // 简答题
            {
                id: 'm3-e1',
                type: 'essay',
                question: '请描述CMMI-DEV V1.3版本的五个成熟度等级，并解释为何四级和五级被称为高等级？与普通等级的本质差别是什么？',
                answer: '五个成熟度等级：1.初始级(Initial)：过程不可预测、项目管理很少、开发相对混乱，个人英雄主义、救火文化盛行；2.已管理级(Managed)：以项目为单位进行管理，有项目计划和跟踪、需求管理、配置管理等；3.已定义级(Defined)：以公司为单位进行管理，公司层面有标准流程和规范，每个项目小组可以基于此定义自己的过程；4.定量管理级(Quantitatively Managed)：构建预测模型，以统计过程控制的手段来管理过程；5.优化级(Optimizing)：继续应用统计方法识别过程偏差，找到问题根源并消除。四级和五级被称为高等级是因为：等级2、3关注的是当前状态，等级4、5是根据结果（未来）进行管理。本质差别在于从定性管理转向定量管理，从被动应对转向主动优化。',
                analysis: '考查CMMI五级特征及高等级的本质差别。关键点：1-3级关注当前状态的定性管理，4-5级关注未来结果的定量管理，从被动应对转向主动优化。',
                score: 10
            },
            {
                id: 'm3-e2',
                type: 'essay',
                question: '请解释PSP质量策略和Quality Journey（质量路径）。',
                answer: 'PSP质量策略：1.用缺陷管理来替代质量管理，首先确保没有缺陷，然后再考察其他质量目标；2.高质量产品意味着软件产品的各个组件基本无缺陷；3.各个组件的高质量是通过高质量评审来实现的。质量路径(Quality Journey)8个步骤：Step1各种测试；Step2进入测试之前的产物质量提升；Step3评审过程度量和稳定；Step4质量意识和主人翁态度；Step5个体review的度量和稳定；Step6诉诸设计；Step7缺陷预防；Step8用户质量观——其他质量属性。',
                analysis: '考查PSP质量策略的核心思想和质量路径的完整步骤。质量策略强调用缺陷管理替代质量管理，通过高质量评审实现组件基本无缺陷；质量路径展示了从测试到缺陷预防再到用户质量观的渐进式质量提升路径。',
                score: 10
            }
        ]
    },
    {
        id: 'mock4',
        title: '模拟试卷四',
        year: 2024,
        duration: 90,
        totalScore: 100,
        description: '敏捷开发方法与实践综合考查',
        sections: [
            { type: 'single', count: 20, score: 2, name: '单选题' },
            { type: 'multiple', count: 10, score: 3, name: '多选题' },
            { type: 'judge', count: 10, score: 1, name: '判断题' },
            { type: 'essay', count: 2, score: 10, name: '简答题' }
        ],
        questions: [
            // 单选题
            {
                id: 'm4-s1',
                type: 'single',
                question: 'Scrum框架中，负责管理产品待办列表(Product Backlog)的角色是？',
                options: [
                    'A. Scrum Master',
                    'B. 开发团队',
                    'C. 产品负责人(Product Owner)',
                    'D. 项目经理'
                ],
                answer: 2,
                analysis: '产品负责人(Product Owner)负责将解决复杂问题所需的工作整理成一份Product Backlog，管理产品待办列表的优先级和内容。',
                score: 2
            },
            {
                id: 'm4-s2',
                type: 'single',
                question: 'Scrum的三大支柱不包括？',
                options: [
                    'A. 透明',
                    'B. 检视',
                    'C. 适应',
                    'D. 计划'
                ],
                answer: 3,
                analysis: 'Scrum基于经验主义的三大支柱：透明(Transparency)、检视(Inspection)、适应(Adaptation)。计划不是Scrum的三大支柱之一。',
                score: 2
            },
            {
                id: 'm4-s3',
                type: 'single',
                question: 'XP的迭代周期通常为？',
                options: [
                    'A. 1-2周',
                    'B. 2-4周',
                    'C. 1个月',
                    'D. 3个月'
                ],
                answer: 0,
                analysis: 'Scrum的迭代周期为2-4周，XP的迭代周期为1-2周，XP比Scrum迭代更短。',
                score: 2
            },
            {
                id: 'm4-s4',
                type: 'single',
                question: 'TDD的三个阶段正确顺序是？',
                options: [
                    'A. 绿色-红色-重构',
                    'B. 红色-绿色-重构',
                    'C. 重构-红色-绿色',
                    'D. 红色-重构-绿色'
                ],
                answer: 1,
                analysis: 'TDD的标准节奏：红色(写失败测试)-绿色(写最小代码通过测试)-重构(改善代码结构而不改变行为)。',
                score: 2
            },
            {
                id: 'm4-s5',
                type: 'single',
                question: '持续集成(CI)要求开发者多久将代码合并到主干？',
                options: [
                    'A. 每月',
                    'B. 每周',
                    'C. 每天乃至每小时',
                    'D. 每个Sprint结束'
                ],
                answer: 2,
                analysis: '持续集成(CI)要求开发者频繁(每天乃至每小时)将代码变更合并到主干分支，触发自动化构建和测试。',
                score: 2
            },
            {
                id: 'm4-s6',
                type: 'single',
                question: 'Kanban方法的核心实践是？',
                options: [
                    'A. 固定Sprint长度',
                    'B. 限制在制品(WIP)数量',
                    'C. 强制每日站会',
                    'D. 强制结对编程'
                ],
                answer: 1,
                analysis: 'Kanban的核心实践包括：定义并可视化工作流程、主动管理工作流程中的事项(限制WIP)、改进工作流程。限制WIP是Kanban区别于Scrum的关键特征。',
                score: 2
            },
            {
                id: 'm4-s7',
                type: 'single',
                question: 'DevOps三步法中的第一步是？',
                options: [
                    'A. 建立创意和高可信度的企业文化',
                    'B. 从右向左的持续快速反馈',
                    'C. 实现开发到运维的工作快速从左向右流动',
                    'D. 自动化所有流程'
                ],
                answer: 2,
                analysis: 'DevOps三个步骤：第一步实现开发到运维的工作快速地从左向右流动；第二步从右向左的每个阶段采用持续、快速的工作反馈机制；第三步建立具有创意和高可信度的企业文化。',
                score: 2
            },
            {
                id: 'm4-s8',
                type: 'single',
                question: '敏捷宣言发布于哪一年？',
                options: [
                    'A. 1999',
                    'B. 2001',
                    'C. 2005',
                    'D. 2010'
                ],
                answer: 1,
                analysis: '2001年，17位敏捷实践者在犹他州雪鸟城召开会议，发布了敏捷软件开发宣言。',
                score: 2
            },
            {
                id: 'm4-s9',
                type: 'single',
                question: 'Scrum团队的推荐规模是？',
                options: [
                    'A. 3人以下',
                    'B. 10人或更少',
                    'C. 15-20人',
                    'D. 20人以上'
                ],
                answer: 1,
                analysis: 'Scrum Guide指出Scrum Team规模足够小以保持灵活，同时足够大以便完成重要工作，通常只有10人或更少。较小的团队沟通更好，效率更高。',
                score: 2
            },
            {
                id: 'm4-s10',
                type: 'single',
                question: 'XP中"40小时工作制"的核心理念是？',
                options: [
                    'A. 每周必须工作满40小时',
                    'B. 保持可持续的开发节奏，连续加班不超过2周',
                    'C. 鼓励加班加点',
                    'D. 每天工作8小时'
                ],
                answer: 1,
                analysis: 'XP规定开发人员每周工作时间不超过40小时，连续加班不可以超过2周，强调保持可持续的开发节奏，避免疲劳。',
                score: 2
            },
            {
                id: 'm4-s11',
                type: 'single',
                question: '以下哪个不是Scrum的五个事件？',
                options: [
                    'A. Sprint',
                    'B. Sprint计划会议',
                    'C. 代码评审',
                    'D. Sprint回顾会议'
                ],
                answer: 2,
                analysis: 'Scrum五个事件：Sprint、Sprint计划会议、每日Scrum会议、Sprint评审会议、Sprint回顾会议。代码评审不是Scrum定义的事件。',
                score: 2
            },
            {
                id: 'm4-s12',
                type: 'single',
                question: 'Kanban起源于哪个行业？',
                options: [
                    'A. 软件开发',
                    'B. 汽车制造',
                    'C. 航空航天',
                    'D. 医疗'
                ],
                answer: 1,
                analysis: 'Kanban起源于20世纪50年代日本丰田汽车制造业，工程师大野耐一受美国超市补货方式启发，引入以纸卡片传递生产需求信号的系统。',
                score: 2
            },
            {
                id: 'm4-s13',
                type: 'single',
                question: 'DevOps中DORA指标体系不包括？',
                options: [
                    'A. 部署频率',
                    'B. 变更前置时间',
                    'C. 代码行数',
                    'D. 平均恢复时间'
                ],
                answer: 2,
                analysis: 'DORA指标体系包括四个指标：部署频率、变更前置时间、变更失败率、平均恢复时间(MTTR)。代码行数不是DORA指标。',
                score: 2
            },
            {
                id: 'm4-s14',
                type: 'single',
                question: '关于Scrum中Sprint的说法，正确的是？',
                options: [
                    'A. Sprint时长可以随时改变',
                    'B. Sprint时长应在整个项目周期保持稳定',
                    'C. Sprint必须正好2周',
                    'D. Sprint由项目经理决定时长'
                ],
                answer: 1,
                analysis: 'Sprint时长一旦确定，应该在整个项目周期保持稳定，通常为1-4周。稳定的节奏有助于团队形成工作节奏和可预测性。',
                score: 2
            },
            {
                id: 'm4-s15',
                type: 'single',
                question: '结对编程中，驾驶员(Driver)的职责是？',
                options: [
                    'A. 只负责观察',
                    'B. 编写代码',
                    'C. 做笔记',
                    'D. 休息监督'
                ],
                answer: 1,
                analysis: '结对编程中，驾驶员(Driver)负责编写代码，导航员(Navigator)负责观察、思考、审查和指导。两个角色定期轮换。',
                score: 2
            },
            {
                id: 'm4-s16',
                type: 'single',
                question: '持续交付(CD)与持续部署的主要区别是？',
                options: [
                    'A. 持续交付自动部署到生产，持续部署需要手动触发',
                    'B. 持续交付手动部署到生产，持续部署自动部署到生产',
                    'C. 两者完全相同',
                    'D. 持续交付不需要CI'
                ],
                answer: 1,
                analysis: '持续交付(CD)是将CI产出的构件自动部署到测试或预生产环境，部署到生产需要手动触发；持续部署是持续交付的极致，代码通过自动化流程验证后直接部署到生产环境。',
                score: 2
            },
            {
                id: 'm4-s17',
                type: 'single',
                question: '敏捷宣言中"尽管右项有其价值"之后是？',
                options: [
                    'A. 我们更重视右项的价值',
                    'B. 我们更重视左项的价值',
                    'C. 我们否定右项的价值',
                    'D. 我们只关注左项'
                ],
                answer: 1,
                analysis: '敏捷宣言的完整表述是"也就是说，尽管右项有其价值，我们更重视左项的价值。"敏捷宣言并非否定右项，而是强调左项更为重要。',
                score: 2
            },
            {
                id: 'm4-s18',
                type: 'single',
                question: '以下哪个是XP的价值观？',
                options: [
                    'A. 效率',
                    'B. 勇气',
                    'C. 竞争',
                    'D. 完美'
                ],
                answer: 1,
                analysis: 'XP的五个价值观：沟通(Communication)、简单(Simplicity)、反馈(Feedback)、勇气(Courage)、尊重(Respect)。',
                score: 2
            },
            {
                id: 'm4-s19',
                type: 'single',
                question: 'Kanban中"拉动式系统"(Pull System)的含义是？',
                options: [
                    'A. 上游推任务给下游',
                    'B. 下游消耗后才触发上游补充生产',
                    'C. 经理分配任务',
                    'D. 随机选择任务'
                ],
                answer: 1,
                analysis: '拉动式系统源于丰田生产方式，下游工序消耗零件时，卡片返回上游作为补充生产信号。这种拉动式生产极大减少了库存和浪费。',
                score: 2
            },
            {
                id: 'm4-s20',
                type: 'single',
                question: '关于DevOps与敏捷的关系，下列说法正确的是？',
                options: [
                    'A. DevOps替代了敏捷',
                    'B. 敏捷关注开发团队内部效率，DevOps扩展到交付和运维全生命周期',
                    'C. 两者完全对立',
                    'D. DevOps只适用于运维团队'
                ],
                answer: 1,
                analysis: '敏捷关注开发团队内部效率和响应变化，DevOps扩展敏捷理念，范围从开发延伸到软件交付和运维全生命周期。两者互补，敏捷提供快速交付框架，DevOps确保顺畅部署。',
                score: 2
            },
            // 多选题
            {
                id: 'm4-m1',
                type: 'multiple',
                question: '以下哪些是Scrum的三个角色？（多选）',
                options: [
                    'A. 产品负责人',
                    'B. Scrum Master',
                    'C. 项目经理',
                    'D. 开发人员'
                ],
                answer: [0, 1, 3],
                analysis: 'Scrum三个角色：产品负责人(Product Owner)、Scrum Master、开发人员(Developers)。项目经理不是Scrum定义的角色。',
                score: 3
            },
            {
                id: 'm4-m2',
                type: 'multiple',
                question: '以下哪些是敏捷宣言的四条价值观？（多选）',
                options: [
                    'A. 个体和互动胜过流程和工具',
                    'B. 可以工作的软件胜过详尽的文档',
                    'C. 客户合作胜过合同谈判',
                    'D. 成本控制胜过时间控制'
                ],
                answer: [0, 1, 2],
                analysis: '敏捷宣言四条价值观：个体和互动胜过流程和工具、可以工作的软件胜过详尽的文档、客户合作胜过合同谈判、响应变化胜过遵循计划。成本控制胜过时间控制不是敏捷价值观。',
                score: 3
            },
            {
                id: 'm4-m3',
                type: 'multiple',
                question: '以下哪些是XP的核心实践？（多选）',
                options: [
                    'A. 结对编程',
                    'B. 测试驱动开发(TDD)',
                    'C. 持续集成',
                    'D. 详细文档优先'
                ],
                answer: [0, 1, 2],
                analysis: 'XP核心实践包括：结对编程、TDD、持续集成、重构、简单设计、集体所有权、编码标准、隐喻、可持续节奏等。XP强调简洁文档而非详细文档优先。',
                score: 3
            },
            {
                id: 'm4-m4',
                type: 'multiple',
                question: 'DevOps三步法包括哪些？（多选）',
                options: [
                    'A. 实现开发到运维的工作快速从左向右流动',
                    'B. 从右向左的持续快速工作反馈',
                    'C. 建立创意和高可信度的企业文化',
                    'D. 完全自动化所有流程'
                ],
                answer: [0, 1, 2],
                analysis: 'DevOps三个步骤：第一步实现开发到运维的工作快速地从左向右流动；第二步从右向左的每个阶段采用持续、快速的工作反馈机制；第三步建立具有创意和高可信度的企业文化。完全自动化不是三步法之一。',
                score: 3
            },
            {
                id: 'm4-m5',
                type: 'multiple',
                question: '以下哪些是Kanban的核心实践？（多选）',
                options: [
                    'A. 定义并可视化工作流程',
                    'B. 主动管理工作流程中的事项',
                    'C. 改进工作流程',
                    'D. 固定Sprint长度'
                ],
                answer: [0, 1, 2],
                analysis: 'Kanban由三种协同工作的实践组成：定义并可视化工作流程、主动管理工作流程中的事项(限制WIP)、改进工作流程。固定Sprint长度是Scrum的做法，不是Kanban的实践。',
                score: 3
            },
            {
                id: 'm4-m6',
                type: 'multiple',
                question: '以下哪些是Scrum的五个价值观？（多选）',
                options: [
                    'A. 承诺',
                    'B. 专注',
                    'C. 开放',
                    'D. 勇气'
                ],
                answer: [0, 1, 2, 3],
                analysis: 'Scrum五个价值观：承诺(Commitment)、专注(Focus)、开放(Openness)、尊重(Respect)和勇气(Courage)。四个选项都是Scrum价值观（尊重未列出）。',
                score: 3
            },
            {
                id: 'm4-m7',
                type: 'multiple',
                question: '以下哪些是DevOps的核心实践？（多选）',
                options: [
                    'A. 持续集成(CI)',
                    'B. 持续交付/部署(CD)',
                    'C. 基础设施即代码(IaC)',
                    'D. 持续监控与反馈'
                ],
                answer: [0, 1, 2, 3],
                analysis: 'DevOps核心实践包括：CI/CD、自动化测试、基础设施即代码(IaC)、配置管理、容器化、持续监控与反馈等。四个选项都是DevOps核心实践。',
                score: 3
            },
            {
                id: 'm4-m8',
                type: 'multiple',
                question: '关于Scrum和XP的比较，下列说法正确的是？（多选）',
                options: [
                    'A. Scrum迭代周期为2-4周，XP为1-2周',
                    'B. Scrum迭代中需求冻结，XP只要时间资源相同即可变更',
                    'C. Scrum开发过程未工程化，XP对开发流程严格定义',
                    'D. Scrum严格遵守需求优先级，XP比较灵活'
                ],
                answer: [0, 1, 2],
                analysis: 'Scrum与XP比较：迭代周期不同(Scrum 2-4周，XP 1-2周)；Scrum迭代中需求冻结，XP允许变更；Scrum过程未工程化，XP严格定义。Scrum比较灵活(可能有需求依赖)，XP严格遵守需求优先级。D选项说反了。',
                score: 3
            },
            {
                id: 'm4-m9',
                type: 'multiple',
                question: '以下哪些是TDD三定律的内容？（多选）',
                options: [
                    'A. 在写失败的生产代码前必须先写测试',
                    'B. 只写恰好失败的测试',
                    'C. 只写恰好通过测试的代码',
                    'D. 测试必须100%覆盖'
                ],
                answer: [0, 1, 2],
                analysis: 'TDD三定律：1.在编写失败的生产代码之前，不允许编写任何测试代码（先写测试）；2.只写恰好失败的测试（不写多余的测试）；3.只写恰好通过测试的代码（不写多余的代码）。100%覆盖率不是TDD定律。',
                score: 3
            },
            {
                id: 'm4-m10',
                type: 'multiple',
                question: 'DevOps中DORA指标体系包括哪些？（多选）',
                options: [
                    'A. 部署频率',
                    'B. 变更前置时间',
                    'C. 变更失败率',
                    'D. 平均恢复时间(MTTR)'
                ],
                answer: [0, 1, 2, 3],
                analysis: 'DORA(DevOps Research and Assessment)指标体系包括四个指标：部署频率、变更前置时间、变更失败率、平均恢复时间(MTTR)。前两个体现交付速度和效率，后两个体现交付质量和稳定性。',
                score: 3
            },
            // 判断题
            {
                id: 'm4-j1',
                type: 'judge',
                question: 'Scrum中Sprint期间完全不能取消Sprint。',
                answer: false,
                analysis: 'Sprint可以被取消，但通常是因为Sprint目标已经过时或有重大变化。取消Sprint不是常见做法，会浪费已完成的工作。',
                score: 1
            },
            {
                id: 'm4-j2',
                type: 'judge',
                question: 'Kanban是Scrum的一种变体。',
                answer: false,
                analysis: 'Kanban和Scrum是两种独立的敏捷方法。Kanban起源于丰田制造，Scrum起源于软件工程。Kanban无固定Sprint和角色规定，Scrum有严格的框架定义。两者可以结合使用(Scrumban)。',
                score: 1
            },
            {
                id: 'm4-j3',
                type: 'judge',
                question: '敏捷宣言否定文档和计划的价值。',
                answer: false,
                analysis: '敏捷宣言并非否定右项的价值，而是强调左项更为重要。敏捷不是无文档、无计划、无流程，而是更注重人的交互、可工作的软件、客户合作和响应变化。',
                score: 1
            },
            {
                id: 'm4-j4',
                type: 'judge',
                question: 'TDD能100%保证代码质量。',
                answer: false,
                analysis: 'TDD能提高代码质量和测试覆盖率，但不能100%保证代码质量。还需要代码审查、集成测试、用户验收测试等其他实践配合。',
                score: 1
            },
            {
                id: 'm4-j5',
                type: 'judge',
                question: '持续集成要求每次提交都运行完整的测试套件。',
                answer: false,
                analysis: '持续集成通常运行快速测试以保证快速反馈，完整测试可能分层进行或使用更长的CI管道。构建时间应控制在10分钟以内。',
                score: 1
            },
            {
                id: 'm4-j6',
                type: 'judge',
                question: 'DevOps就是CI/CD。',
                answer: false,
                analysis: 'CI/CD是技术实践，DevOps是文化和流程理念。CI/CD是实现DevOps目标的核心实践手段之一，但仅有CI/CD工具不代表完成DevOps转型。DevOps涵盖人、流程、工具范围更广。',
                score: 1
            },
            {
                id: 'm4-j7',
                type: 'judge',
                question: 'Scrum团队是跨职能的(cross-functional)。',
                answer: true,
                analysis: 'Scrum Team是跨职能的，团队成员具有在每个Sprint中创造价值所需的全部技能，具备端到端交付价值所需全部能力，不依赖其他团队的工作交接。',
                score: 1
            },
            {
                id: 'm4-j8',
                type: 'judge',
                question: '重构可以改变代码的外在行为。',
                answer: false,
                analysis: '重构的核心原则是在不改变代码外在行为的前提下改善代码内部结构。重构应在测试保护下进行，确保不破坏现有功能。',
                score: 1
            },
            {
                id: 'm4-j9',
                type: 'judge',
                question: '金丝雀发布(Canary Deployment)是一种零停机部署策略。',
                answer: false,
                analysis: '金丝雀发布是渐进式部署策略，将一小部分用户/流量切换到新版本，逐步扩大。零停机部署策略是蓝绿部署(Blue-Green Deployment)。金丝雀发布更注重渐进式验证安全性。',
                score: 1
            },
            {
                id: 'm4-j10',
                type: 'judge',
                question: 'DevSecOps强调安全左移(Shift Left)。',
                answer: true,
                analysis: 'DevSecOps的核心观念是"安全左移"，在开发和集成环节就开展安全工作，强调内建安全(Build Security In)而非事后补救(Bolt Security On)。',
                score: 1
            },
            // 简答题
            {
                id: 'm4-e1',
                type: 'essay',
                question: '请完整描述敏捷宣言，并说明我们该如何正确理解敏捷宣言。',
                answer: '敏捷宣言四条价值观：1.个体和互动胜过流程和工具；2.可以工作的软件胜过详尽的文档；3.客户合作胜过合同谈判；4.响应变化胜过遵循计划。也就是说，尽管右项有其价值，我们更重视左项的价值。正确理解：敏捷宣言并非否定右项的价值，而是强调左项更为重要。敏捷不是无文档、无计划、无流程，而是更注重人的交互、可工作的软件、客户合作和响应变化。右项仍然有其价值，只是在价值优先级上左项更高。',
                analysis: '考查敏捷宣言的完整内容和正确理解。关键点：四条价值观的完整表述，以及"尽管右项有其价值，我们更重视左项"的正确理解，避免将敏捷误解为不要文档和计划。',
                score: 10
            },
            {
                id: 'm4-e2',
                type: 'essay',
                question: '请描述DevOps的三个步骤及各自特点。',
                answer: 'DevOps三个步骤：第一步，实现开发到运维的工作快速地从左向右流动。特点：通过CI/CD、自动化测试、基础设施即代码等实践，加速代码从开发到部署的流动，减少交接等待和浪费。第二步，从右向左的每个阶段，采用持续、快速的工作反馈机制。特点：通过持续监控、告警、日志分析等手段，将运维和用户反馈快速传递回开发团队，形成闭环反馈，及时发现问题并改进。第三步，建立具有创意和高可信度的企业文化，支持动态的、严格的、科学的实验。特点：鼓励团队进行实验和创新，通过A/B测试、金丝雀发布等方式验证假设，建立信任和学习的文化，不惩罚失败而是从中学习。',
                analysis: '考查DevOps三步法的内容和特点。关键点：第一步是价值流动(左向右)，第二步是反馈循环(右向左)，第三步是文化实验。三步形成持续改进的闭环。',
                score: 10
            }
        ]
    },
    {
        id: 'mock5',
        title: '模拟试卷五',
        year: 2024,
        duration: 90,
        totalScore: 100,
        description: '全真模拟冲刺卷',
        sections: [
            { type: 'multiple', count: 15, score: 2, name: '不定项选择题' },
            { type: 'judge', count: 5, score: 2, name: '判断题' },
            { type: 'essay', count: 5, score: 10, name: '简答题' },
            { type: 'essay', count: 1, score: 10, name: '论述题' }
        ],
        questions: [
            // 不定项选择题
            {
                id: 'm5-s1',
                type: 'single',
                question: '以下哪项不属于软件开发的四大本质困难？',
                options: [
                    'A. 复杂性',
                    'B. 不可见性',
                    'C. 可移植性',
                    'D. 一致性'
                ],
                answer: 2,
                analysis: '软件开发四大本质困难：复杂性、不可见性、可变性、一致性。可移植性是软件质量属性，不是本质困难。',
                score: 2
            },
            {
                id: 'm5-s2',
                type: 'single',
                question: '软硬件一体化阶段的典型开发实践是？',
                options: [
                    'A. 迭代式开发',
                    'B. 瀑布模型',
                    'C. Code and Fix（编码和改错）',
                    'D. 成熟度模型'
                ],
                answer: 2,
                analysis: '软硬件一体化阶段(50-70年代)的典型实践是"Code and Fix"(编码和改错)和"Measure twice, cut once"(三思而后行)。瀑布模型和成熟度模型是软件成为独立产品阶段的实践。',
                score: 2
            },
            {
                id: 'm5-s3',
                type: 'single',
                question: '关于CMMI，下列说法正确的是？',
                options: [
                    'A. CMMI是具体的软件开发方法',
                    'B. CMMI是过程优劣的标准',
                    'C. CMMI是过程改进模型，不是软件开发方法',
                    'D. CMMI只适合大公司大项目'
                ],
                answer: 2,
                analysis: 'CMMI是过程改进模型，不是具体的软件过程或软件开发方法；不能作为过程优劣的标准；不适合用作公司之间的能力比较；不只适合大公司大项目。',
                score: 2
            },
            {
                id: 'm5-s4',
                type: 'multiple',
                question: '关于PSP质量策略，下列说法中正确的是？（不定项）',
                options: [
                    'A. 用缺陷管理替代质量管理，既有必要性，也有合理性',
                    'B. 基本无缺陷的开发是通过高质量评审实现的',
                    'C. 评审是所有消除缺陷手段中最高效的',
                    'D. PSP质量策略主要解决外部质量'
                ],
                answer: [0, 1, 2],
                analysis: 'PSP质量策略：用缺陷管理替代质量管理（必要且合理）；基本无缺陷通过高质量评审实现；评审是最高效的消除缺陷手段。PSP主要解决内部质量（组件质量），D错误。',
                score: 2
            },
            {
                id: 'm5-s5',
                type: 'multiple',
                question: '关于PQI，下列说法不正确的是？（不定项）',
                options: [
                    'A. PQI越高越好，可以充分保障质量',
                    'B. PQI越低越好',
                    'C. PQI不能用作质量规划',
                    'D. PQI可以辅助判断模块开发质量'
                ],
                answer: [0, 1, 2],
                analysis: 'PQI越接近1质量越高，但不是"越高越好"（A错）；PQI越低意味着质量越差（B错）；PQI可以用作质量规划（C错）；PQI可以辅助判断模块开发质量和提供过程改进依据（D正确）。',
                score: 2
            },
            {
                id: 'm5-s6',
                type: 'multiple',
                question: '关于挣值管理(EVM)，下列说法正确的是？（不定项）',
                options: [
                    'A. EVM可以适应需求变更',
                    'B. EVM高度依赖估算准确',
                    'C. EVM不适用于质量管理',
                    'D. EVM的中级实现引入成本信息'
                ],
                answer: [0, 1, 2],
                analysis: 'EVM可以适应项目动态变化（A对）；EVM高度依赖估算准确（B对）；EVM不适用于质量管理（C对）。EVM中级实现加入的是日程偏差计算(SV、SPI)，成本信息(AC)在高级实现才引入（D错）。',
                score: 2
            },
            {
                id: 'm5-s7',
                type: 'single',
                question: '关于WBS，下列说法不正确的是？',
                options: [
                    'A. WBS应该对应OBS',
                    'B. WBS提供了范围管理的基础',
                    'C. WBS最底层要素是实现目标的充分必要条件',
                    'D. WBS分解时同一层可以应用不同标准'
                ],
                answer: 3,
                analysis: '好的WBS检查标准包括同一层不能应用不同标准。WBS应对应OBS（组织分解结构），提供范围管理基础，最底层要素是实现目标的充分必要条件。',
                score: 2
            },
            {
                id: 'm5-s8',
                type: 'single',
                question: '关于DRL，下列说法不正确的是？',
                options: [
                    'A. DRL是模块级开发中质量控制的指标',
                    'B. DRL以单元测试每小时发现缺陷率为基准',
                    'C. DRL以单元测试发现的缺陷个数为基准',
                    'D. DRL只能预测，不能度量'
                ],
                answer: 2,
                analysis: 'DRL以单元测试每小时发现的缺陷数（不是缺陷个数）为基础，考察上游其他缺陷消除阶段的消除效率。DRL是效率比，不是个数比。',
                score: 2
            },
            {
                id: 'm5-s9',
                type: 'single',
                question: '麦克勒格Y理论适用的激励场合是？',
                options: [
                    'A. 关注工作环境、薪金等',
                    'B. 更喜欢经常的指导，避免承担责任',
                    'C. 自我中心，对组织需求反应淡漠',
                    'D. 能够自我约束，自我导向与控制，渴望承担责任'
                ],
                answer: 3,
                analysis: 'Y理论适用于能够自我约束、自我导向与控制、渴望承担责任的场合。A、B、C是X理论适用的场合。',
                score: 2
            },
            {
                id: 'm5-s10',
                type: 'single',
                question: '关于团队动力学，下列说法不恰当的是？',
                options: [
                    'A. 马斯洛需求层次理论可以用来维持激励水平',
                    'B. 智力工作的激励方式中，应该尽可能使用鼓励承诺',
                    'C. 麦克勒格的X理论适合用马斯洛底层需求激励',
                    'D. 海兹伯格的激励理论不区分内外因素'
                ],
                answer: 3,
                analysis: '海兹伯格的激励理论明确区分为内在因素（激励因素）和外在因素（保健因素）两种，D说法不恰当。A、B、C都是正确的论述。',
                score: 2
            },
            {
                id: 'm5-s11',
                type: 'multiple',
                question: '关于PROBE估算方法，下列说法正确的是？（不定项）',
                options: [
                    'A. 使用代理作为精确度量和早期规划的桥梁',
                    'B. 使用相对大小而不是绝对大小',
                    'C. 非常依赖高质量的历史数据',
                    'D. 可以完全替代需求分析'
                ],
                answer: [0, 1, 2],
                analysis: 'PROBE方法：使用代理(Proxy)作为桥梁；使用相对大小；依赖高质量历史数据。PROBE不能替代需求分析（D错）。',
                score: 2
            },
            {
                id: 'm5-s12',
                type: 'multiple',
                question: '关于配置管理，下列说法正确的是？（不定项）',
                options: [
                    'A. 配置管理的目的是建立与维护工作产品的完整性',
                    'B. 基线只能通过严格的变更控制程序才能改变',
                    'C. 配置项包括源代码、设计文档等',
                    'D. 配置管理就是版本控制'
                ],
                answer: [0, 1, 2],
                analysis: '配置管理目的：建立与维护工作产品完整性（A对）；基线经正式审查同意，只能通过严格变更控制改变（B对）；配置项包括源代码、文档等（C对）。配置管理包括版本控制、变更控制、配置审计等，不只是版本控制（D错）。',
                score: 2
            },
            {
                id: 'm5-s13',
                type: 'multiple',
                question: '关于V&V（验证与确认），下列说法正确的是？（不定项）',
                options: [
                    'A. 验证是检验产品是否符合需求规格',
                    'B. 确认是确保产品满足客户需求',
                    'C. 单元测试属于验证活动',
                    'D. 验收测试属于验证活动'
                ],
                answer: [0, 1, 2],
                analysis: '验证(Verification)检验产品是否符合需求规格（A对）；确认(Validation)确保产品满足客户需求（B对）；单元测试属于验证（C对）；验收测试属于确认活动（D错）。',
                score: 2
            },
            {
                id: 'm5-s14',
                type: 'multiple',
                question: '关于自主团队，下列说法正确的是？（不定项）',
                options: [
                    'A. 自主团队可以形成胶冻状团队',
                    'B. 自主团队成员互相支持，有强烈的归属感',
                    'C. 自主团队是偶然形成的',
                    'D. 自主团队需要获得管理层的支持'
                ],
                answer: [0, 1, 3],
                analysis: '自主团队可以形成胶冻状团队（A对）；成员互相支持、互相信任有归属感（B对）；自主团队不是偶然形成的，需要经过协同工作演化而成（C错）；需要管理层支持（D对）。',
                score: 2
            },
            {
                id: 'm5-s15',
                type: 'multiple',
                question: '关于软件估算，下列说法正确的是？（不定项）',
                options: [
                    'A. 估算应尽可能划分详细',
                    'B. 估算应依赖数据',
                    'C. 估算关注的是过程而非结果',
                    'D. 估算就是给出准确的数字'
                ],
                answer: [0, 1, 2],
                analysis: '估算基本要点：尽可能划分详细（A对）；依赖数据（B对）；关注过程而非结果（C对）。估算是主观猜测，很难给出准确数字（D错）。',
                score: 2
            },
            // 判断题
            {
                id: 'm5-j1',
                type: 'judge',
                question: '软件过程管理是软件项目管理应该要实现的目标。',
                answer: false,
                analysis: '软件过程管理和软件项目管理完全是两回事。软件过程管理的对象是软件过程，软件项目管理的对象是各项软件项目，两者不是目标与实现的关系。',
                score: 2
            },
            {
                id: 'm5-j2',
                type: 'judge',
                question: 'CMM/CMMI不适合当今互联网环境的项目管理需求。',
                answer: true,
                analysis: 'CMM/CMMI是用来做过程管理和改进的，根本不是满足项目管理需求的手段。但注意这不意味着CMMI不适合互联网环境的过程改进。',
                score: 2
            },
            {
                id: 'm5-j3',
                type: 'judge',
                question: 'PDCA和IDEAL不适合在敏捷环境中使用。',
                answer: false,
                analysis: 'PDCA、IDEAL是软件过程改进参考元模型，适合在敏捷环境中使用。它们提供过程改进的框架，与敏捷方法不冲突。',
                score: 2
            },
            {
                id: 'm5-j4',
                type: 'judge',
                question: '挣值管理不适用于质量管理。',
                answer: true,
                analysis: 'EVM是用来客观度量项目进度的项目管理方法，采用进度计划、成本预算和实际成本三个变量进行绩效测量，不可以支持质量管理。',
                score: 2
            },
            {
                id: 'm5-j5',
                type: 'judge',
                question: '评审消除缺陷的效率低于测试消除缺陷。',
                answer: false,
                analysis: '根据行业数据，评审消除缺陷的代价远低于测试消除。评审发现缺陷的同时就知道位置和原因，效率更高。缺陷发现效率：代码评审>设计评审>单元测试>系统测试。',
                score: 2
            },
            // 简答题
            {
                id: 'm5-e1',
                type: 'essay',
                question: '请完整描述敏捷宣言，并说明我们该如何正确理解敏捷宣言。',
                answer: '敏捷宣言四条价值观：1.个体和互动胜过流程和工具；2.可以工作的软件胜过详尽的文档；3.客户合作胜过合同谈判；4.响应变化胜过遵循计划。也就是说，尽管右项有其价值，我们更重视左项的价值。正确理解：敏捷宣言并非否定右项的价值，而是强调左项更为重要。敏捷不是无文档、无计划、无流程，而是更注重人的交互、可工作的软件、客户合作和响应变化。右项仍然有其价值，只是在价值优先级上左项更高。',
                analysis: '考查敏捷宣言的完整内容和正确理解。关键点：四条价值观完整表述，"尽管右项有其价值，我们更重视左项"的正确理解，避免将敏捷误解为不要文档和计划。',
                score: 10
            },
            {
                id: 'm5-e2',
                type: 'essay',
                question: '挣值管理有三种实现方式，分别是简单、中级和高级。分别阐述上述三种方式的基本要点。',
                answer: '简单实现：仅关注进度信息。建立WBS定义工作范围，为每项工作定义计划价值(PV)，按照规则将数值赋给已完成的工作成为挣值(EV)。常用规则：0-100原则（完成时转化）、50-50原则（开始赋50%，完成加50%）。AC不对EV产生影响。中级实现：在简单实现基础上加入日程偏差计算。SV=EV-PV，SPI=EV/PV。高级实现：加入成本线(AC)和预测线(BAC)。延伸EV找到与BAC的交点确定项目落后时间。EV与AC的差异是成本差异，EV与PV的差异是进度差异。',
                analysis: '考查EVM三种实现方式的要点。关键点：简单实现关注进度(PV、EV)；中级实现加入日程偏差(SV、SPI)；高级实现加入成本(AC)和预测(BAC)。',
                score: 10
            },
            {
                id: 'm5-e3',
                type: 'essay',
                question: '请描述PROBE估算方法的基本原理和估算要点。',
                answer: 'PROBE(PROxy Based Estimation)估算方法的基本原理：1.设计合理的代理(Proxy)作为精确度量和早期规划所需要的度量之间的桥梁；2.使用相对大小而不是绝对大小进行估算。估算过程：首先进行概要设计，确认产品功能，明确所需的程序组件/模块，将这些组件与之前编写的程序比较，估算规模，得到总规模。估算要点：1.尽可能划分详细一些（估算多个部件时，总的误差比各个部件的误差总和小）；2.建立对结果的信心；3.依赖数据（非常依赖高质量的历史数据）；4.估算关注的是过程，而非结果，估算是相关干系人达成一致共识的过程。',
                analysis: '考查PROBE方法的原理和要点。关键点：代理作为桥梁、相对大小、依赖历史数据、估算关注过程。',
                score: 10
            },
            {
                id: 'm5-e4',
                type: 'essay',
                question: '请描述CMMI-DEV V1.3版本的五个成熟度等级，并解释为何四级和五级被称为高等级？与普通等级的本质差别是什么？',
                answer: '五个成熟度等级：1.初始级(Initial)：过程不可预测、项目管理很少、开发相对混乱，个人英雄主义、救火文化盛行；2.已管理级(Managed)：以项目为单位进行管理，有项目计划和跟踪、需求管理、配置管理等；3.已定义级(Defined)：以公司为单位进行管理，公司层面有标准流程和规范，每个项目小组可以基于此定义自己的过程；4.定量管理级(Quantitatively Managed)：构建预测模型，以统计过程控制的手段来管理过程；5.优化级(Optimizing)：继续应用统计方法识别过程偏差，找到问题根源并消除。四级和五级被称为高等级是因为：等级2、3关注的是当前状态，等级4、5是根据结果（未来）进行管理。本质差别在于从定性管理转向定量管理，从被动应对转向主动优化。',
                analysis: '考查CMMI五级特征及高等级的本质差别。关键点：1-3级关注当前状态的定性管理，4-5级关注未来结果的定量管理，从被动应对转向主动优化。',
                score: 10
            },
            {
                id: 'm5-e5',
                type: 'essay',
                question: '结合"软件开发作为一种知识工作"，阐述为什么需要自主团队？自主团队有什么特点？',
                answer: '软件开发是一项既复杂又富有创造性的知识工作，需要工程师全身心参与、主观意愿上追求卓越，这要求管理者激励并维持激励。管理知识工作的关键规则是：管理者无法管理工作者，知识工作者必须实现并学会自我管理。因此需要自主团队。自主团队的特点：1.自行定义项目的目标；2.自行决定团队组成形式以及成员的角色；3.自行决定项目的开发策略；4.自行决定项目的开发过程；5.自行制定项目的开发计划；6.自行度量、管理和控制项目工作。自主团队可以形成胶冻状团队，团队成员互相支持，互相信任，有强烈的归属感。自主团队不是偶然形成的，需要经过一段时间的协同工作演化而成，同时需要获得管理层的支持。',
                analysis: '考查自主团队的必要性和特点。关键点：知识工作需要自我管理，自主团队的六个"自行"特点，胶冻状团队的形成。',
                score: 10
            },
            // 论述题
            {
                id: 'm5-e6',
                type: 'essay',
                question: '随着ChatGPT的横空出世，以大模型为代表的AI技术势必对各行各业带来前所未有的影响。请结合本课程涉及的若干话题畅想AI浪潮中的挑战和机遇。至少包括：项目管理、质量管理、过程改进。',
                answer: '项目管理：AI可提供更准确的预测，帮助分配资源、识别风险。挑战是团队需适应与AI系统集成，确保人机合作高效。AI模型训练需要更多计算资源，需求可能在开发中变化，敏捷方法更受青睐。质量管理：AI可通过自动化测试、静态代码分析、缺陷预测提高质量。挑战是AI模型不透明性和复杂性使测试更困难，需要创新性测试方法确保AI系统可靠性。过程改进：AI可帮助发现效率低下的环节、优化流程、提供个性化指导。需要重新评估开发过程，关注数据质量和模型解释性，确保AI系统的可解释性和可信度。',
                analysis: '考查对AI技术影响软件工程的理解。关键点：从项目管理、质量管理、过程改进三个维度分析AI的机遇和挑战，体现对课程内容的综合理解。',
                score: 10
            }
        ]
    }
]

export default mockPapers

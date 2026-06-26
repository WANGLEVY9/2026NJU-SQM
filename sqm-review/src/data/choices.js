// 选择题专项练习数据
// 汇总所有真题和课堂测试中的选择题、多选题、判断题

export const choiceQuestions = [
  // === 2023年期末真题选择题 ===
  {
    id: 'q2023-1',
    source: '2023期末真题',
    type: 'choice',
    question: '"Measure twice, cut once"描述的是下述哪个软件开发场景：',
    options: ['A. 软件设计', 'B. 代码评审', 'C. 需求开发', 'D. V&V'],
    correctAnswer: 'A',
    explanation: '"Measure twice, cut once"（三思而后行）强调在行动前要仔细思考和规划。在软件开发中，这对应于软件设计阶段，需要在编码前充分设计方案，避免后期返工。这是软硬件一体化阶段的典型理念。',
    topic: '软件发展'
  },
  {
    id: 'q2023-2',
    source: '2023期末真题',
    type: 'choice',
    question: '整体来看，我们可以把软件的发展分为三大阶段，以下不属于三大主要阶段的是：',
    options: ['A. 软硬件一体化（1950s-1970s）', 'B. 网络化和服务化（1970s-1990s）', 'C. 云计算化和云原生', 'D. 软件成为独立产品（1990s-）'],
    correctAnswer: 'C',
    explanation: '软件发展的三大阶段为：软硬件一体化（1950s-1970s）、软件成为独立产品（1970s-1990s）、网络化和服务化（1990s-）。云计算化和云原生不属于这三大主要阶段的划分。',
    topic: '软件发展'
  },
  {
    id: 'q2023-3',
    source: '2023期末真题',
    type: 'choice',
    question: '以下描述中，不属于软件开发本质困难或者本质挑战的是：',
    options: ['A. 质量难题', 'B. 复杂性', 'C. 不可见', 'D. 一致性'],
    correctAnswer: 'A',
    explanation: '根据 Brooks 在《没有银弹》中提出的理论，软件开发的四大本质困难是：复杂性（Complexity）、一致性（Conformity）、可变性（Changeability）、不可见性（Invisibility）。「质量难题」不属于四大本质困难，软件质量是衍生属性。一致性（Conformity）指软件必须与不断变化的外部世界、遗留系统和人为习惯保持对接，是四大本质困难之一。',
    topic: '软件发展'
  },
  {
    id: 'q2023-4',
    source: '2023期末真题',
    type: 'choice',
    question: '以下描述中，哪一种实践是软硬件一体化阶段的典型实践：',
    options: ['A. Code and Fix', 'B. 迭代式开发', 'C. 瀑布生命周期模型', 'D. 成熟度模型'],
    correctAnswer: 'A',
    explanation: '软硬件一体化阶段（1950s-1970s）的典型实践是Code and Fix（编码+改错），因为当时软件支持硬件完成计算任务，功能单一、复杂度有限，几乎不需要需求变更。迭代式开发、瀑布模型和成熟度模型属于后续阶段。',
    topic: '软件发展'
  },
  {
    id: 'q2023-5',
    source: '2023期末真题',
    type: 'choice',
    question: '对比TSP和SCRUM，下列说法不恰当的是：',
    options: ['A. 都是过程框架，需要填补具体实践之后才是一个可以工作的过程', 'B. 一种是计划驱动方法，另外一种是敏捷方法', 'C. SCRUM适合迭代式场景，TSP适合瀑布场景', 'D. 两种方法都需要进行度量数据收集、分析，从而支持管理决策'],
    correctAnswer: 'BC',
    explanation: 'B不恰当：TSP和SCRUM都是计划驱动的方法，不能简单地将一种归为计划驱动、另一种归为敏捷。C不恰当：两者都适合迭代式场景，不能说SCRUM适合迭代而TSP只适合瀑布。A和D的描述是正确的。',
    topic: '软件过程'
  },
  {
    id: 'q2023-6',
    source: '2023期末真题',
    type: 'choice',
    question: '以下特征适用麦克勒格Y理论（McGregor\'s Theory Y）激励的场合是：',
    options: ['A. 关注工作环境，薪金等', 'B. 更喜欢经常的指导，避免承担责任，缺乏主动性', 'C. 自我中心，对组织需求反应淡漠，反对变革', 'D. 能够自我约束，自我导向与控制，渴望承担责任'],
    correctAnswer: 'D',
    explanation: 'Y理论认为人能够自我约束、自我导向与控制，渴望承担责任，这是Y理论激励的典型特征。A、B、C都是X理论的特征：关注工作环境薪金（A）、避免承担责任缺乏主动性（B）、自我中心反对变革（C）。',
    topic: '团队管理'
  },
  {
    id: 'q2023-7',
    source: '2023期末真题',
    type: 'choice',
    question: '以下关于马斯洛的需求层次理论描述不正确的是：',
    options: ['A. 自我实现是寻求自尊（Esteem）', 'B. 激励来自为没有满足的需求而努力奋斗', 'C. 低层次的需求必须在高层次需求满足之前得到满足', 'D. 满足高层次的需求的途径比满足低层次的途径更少'],
    correctAnswer: 'A',
    explanation: 'A不正确：自我实现（Self-actualization）是马斯洛需求层次的最高层，不是寻求自尊。自尊（Esteem）是第四层次的需求。B、C、D的描述都是正确的：激励来自未满足的需求、低层次需求先于高层次需求满足、满足高层次需求的途径更少。',
    topic: '团队管理'
  },
  {
    id: 'q2023-8',
    source: '2023期末真题',
    type: 'choice',
    question: '以下关于团队动力学的论述，不恰当的是：',
    options: ['A. 马斯洛的需求层次理论可以用来更好地维持激励水平', 'B. 智力工作的激励方式中，应该尽可能使用鼓励承诺这种方式', 'C. 麦克勒格的X理论适合用马斯洛底层需求激励', 'D. 海兹伯格的激励理论区分为内在因素和外在因素两种'],
    correctAnswer: 'B',
    explanation: 'B不恰当：智力工作的激励方式中，不应该尽可能使用鼓励承诺这种方式。根据期望理论，过高的目标虽然提高了价值（Valence），但会降低期望值（Expectancy），反而可能降低团队凝聚力和工作效率。A、C、D的描述都是恰当的。',
    topic: '团队管理'
  },
  {
    id: 'q2023-9',
    source: '2023期末真题',
    type: 'choice',
    question: '下列关于挣值管理方法的描述中正确的是：',
    options: ['A. 挣值管理中进度的计算可以区分悲观和乐观两种方式', 'B. 挣值管理的简单、中级和高级实现三种方式中，只有高级实现才会涉及成本因素', 'C. 挣值管理与项目类型无关', 'D. 挣值管理不适用于需求频繁变更的软件项目管理中'],
    correctAnswer: 'AB',
    explanation: 'A正确：挣值管理中进度计算可区分悲观（0-100原则）和乐观（50-50原则）两种方式。B正确：简单实现仅关注进度信息，中级实现加入日程偏差计算，只有高级实现才引入成本线（AC）和预测线（BAC）。C错误：挣值管理与项目类型有关。D错误：挣值管理可以适应需求频繁变更的项目。',
    topic: '项目管理'
  },
  {
    id: 'q2023-10',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于WBS的描述中，哪些说法不正确的？',
    options: ['A. WBS应该对应OBS', 'B. WBS提供了范围管理的基础', 'C. WBS工作分解最底层的要素是实现目标的充分必要条件', 'D. WBS分解的时候，同一层不能应用不同标准'],
    correctAnswer: 'C',
    explanation: 'C不正确：WBS工作分解最底层的要素是实现目标的充分条件，但不是必要条件。A正确：WBS应该对应OBS（组织分解结构）。B正确：WBS提供了范围管理的基础。D正确：WBS分解时同一层不能应用不同标准。',
    topic: '项目管理'
  },
  {
    id: 'q2023-11',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于EVM的描述中，哪些说法不正确的？',
    options: ['A. EVM不适用于质量管理', 'B. EVM的中级实现中引入成本信息', 'C. EVM高度依赖估算准确', 'D. EVM可以适应需求变更'],
    correctAnswer: 'B',
    explanation: 'B不正确：EVM的中级实现中加入的是日程偏差计算（SV=EV-PV，SPI=EV/PV），而不是成本信息。成本信息是在高级实现中才引入的。A正确：EVM不适用于质量管理。C正确：EVM高度依赖估算准确性。D正确：EVM可以适应需求变更。',
    topic: '项目管理'
  },
  {
    id: 'q2023-12',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PSP质量管理策略，下列说法中正确的是：',
    options: ['A. 用缺陷管理替代质量管理，既有必要性，也有合理性', 'B. 基本无缺陷的开发是通过开展高质量的评审来实现的', 'C. 经过训练，评审是所有消除缺陷的手段当中最高效的', 'D. PSP质量策略主要解决的是外部质量，而非内部质量'],
    correctAnswer: 'ABC',
    explanation: 'A正确：用缺陷管理替代质量管理既有必要性也有合理性，因为缺陷是质量问题的直接体现。B正确：基本无缺陷的开发通过高质量评审实现。C正确：经过训练，评审是消除缺陷手段中最高效的。D错误：PSP质量策略主要解决的是内部质量（开发过程质量），而非外部质量。',
    topic: '质量管理'
  },
  {
    id: 'q2023-13',
    source: '2023期末真题',
    type: 'choice',
    question: '关于DRL，下列说法中不正确的是：',
    options: ['A. 这是一种模块级开发中质量控制的指标', 'B. DRL以单元测试每小时发现缺陷率作为基准，考察上游其他缺陷消除阶段的消除效率', 'C. DRL以单元测试发现的缺陷个数作为基准，考察上游其他缺陷消除阶段消除缺陷的效率', 'D. DRL只能预测，不能度量'],
    correctAnswer: 'C',
    explanation: 'C不正确：DRL以单元测试每小时发现缺陷率（缺陷数/小时）作为基准，而不是以缺陷个数作为基准。A正确：DRL是模块级开发中质量控制的指标。B正确：DRL以单元测试每小时发现缺陷率作为基准。D正确：DRL只能预测，不能度量。',
    topic: '质量管理'
  },
  {
    id: 'q2023-14',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PQI，下列说法中不正确的是：',
    options: ['A. PQI表征模块级别开发中的过程规范化程度', 'B. PQI越高越好，可以充分保障质量', 'C. PQI越低越好', 'D. PQI不能用作质量规划'],
    correctAnswer: 'BCD',
    explanation: 'B不正确：PQI并非越高越好，过高的PQI可能意味着做了过多的评审，导致开发效率下降。C不正确：PQI不是越低越好，PQI越低意味着质量风险越大。D不正确：PQI可以用作质量规划。A正确：PQI表征模块级别开发中的过程规范化程度。',
    topic: '质量管理'
  },
  {
    id: 'q2023-15',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PQI，下列说法中正确的是：',
    options: ['A. PQI可以辅助判断模块开发质量', 'B. PQI可以提供过程改进的依据', 'C. PQI确保大于1，从而确保开发质量', 'D. PQI只能预测，不能度量'],
    correctAnswer: 'AB',
    explanation: 'A正确：PQI可以辅助判断模块开发质量。B正确：PQI可以提供过程改进的依据。C错误：PQI是0到1之间的数值，不是大于1。D错误：PQI既可以预测也可以度量，与Yield不同（Yield只能预测不能度量）。',
    topic: '质量管理'
  },
  {
    id: 'q2023-j1',
    source: '2023期末真题',
    type: 'judge',
    question: '软件过程管理是软件项目管理应该要实现的目标。',
    correctAnswer: false,
    explanation: '错误。软件过程管理和软件项目管理完全是两回事。软件项目管理是应用方法、工具、技术以及人员能力来完成软件项目，实现项目目标的过程；软件过程管理是为了让软件过程在开发效率、质量等方面有着更好性能绩效。因此软件过程管理不是软件项目管理的实现目标。',
    topic: '软件过程'
  },
  {
    id: 'q2023-j2',
    source: '2023期末真题',
    type: 'judge',
    question: 'CMM/CMMI不适合当今互联网环境的项目管理需求。',
    correctAnswer: true,
    explanation: '正确。CMM/CMMI是用来做过程管理和改进的，根本不是满足项目管理需求的手段。CMM/CMMI刻画了软件组织从不成熟到成熟的路线图，与项目管理是不同性质的事物。',
    topic: '软件过程'
  },
  {
    id: 'q2023-j3',
    source: '2023期末真题',
    type: 'judge',
    question: 'PDCA和IDEAL不适合在敏捷环境中使用。',
    correctAnswer: false,
    explanation: '错误。PDCA和IDEAL是软件过程改进参考元模型，它们适用于各种环境，包括敏捷环境。过程改进模型可以在敏捷环境中使用，帮助团队持续改进开发过程。',
    topic: '软件过程'
  },

  // === 课堂测试选择题 ===
  {
    id: 'qclass-1',
    source: '课堂测试',
    type: 'choice',
    question: '"Measure twice, cut once"描述的是下述哪个软件开发场景：',
    options: ['A. 软件设计', 'B. 代码评审', 'C. 需求开发', 'D. V&V'],
    correctAnswer: 'A',
    explanation: '"Measure twice, cut once"（三思而后行）强调在行动前要仔细思考和规划，对应于软件设计阶段。',
    topic: '软件发展'
  },
  {
    id: 'qclass-2',
    source: '课堂测试',
    type: 'choice',
    question: '整体来看，我们可以把软件的发展分为三大阶段，以下不属于三大主要阶段的是：',
    options: ['A. 软硬件一体化（1950s-1970s）', 'B. 网络化和服务化（1970s-1990s）', 'C. 云计算化和云原生', 'D. 软件成为独立产品（1990s-）'],
    correctAnswer: 'C',
    explanation: '云计算化和云原生不属于软件发展三大主要阶段的划分。',
    topic: '软件发展'
  },
  {
    id: 'qclass-3',
    source: '课堂测试',
    type: 'choice',
    question: '以下描述中，不属于软件开发本质困难或者本质挑战的是：',
    options: ['A. 质量难题', 'B. 复杂性', 'C. 不可见', 'D. 一致性'],
    correctAnswer: 'A',
    explanation: 'Brooks 四大本质困难为：复杂性、一致性、可变性、不可见性。「质量难题」不属于本质困难，软件质量是衍生属性。一致性指软件须与外部环境、遗留系统和人为习惯保持对接，是四大本质困难之一。',
    topic: '软件发展'
  },
  {
    id: 'qclass-4',
    source: '课堂测试',
    type: 'choice',
    question: '以下描述中，哪一种实践是软硬件一体化阶段的典型实践：',
    options: ['A. Code and Fix', 'B. 迭代式开发', 'C. 瀑布生命周期模型', 'D. 成熟度模型'],
    correctAnswer: 'A',
    explanation: 'Code and Fix是软硬件一体化阶段的典型实践。',
    topic: '软件发展'
  },
  {
    id: 'qclass-5',
    source: '课堂测试',
    type: 'choice',
    question: '对比TSP和SCRUM，下列说法不恰当的是：',
    options: ['A. 都是过程框架，需要填补具体实践之后才是一个可以工作的过程', 'B. 一种是计划驱动方法，另外一种是敏捷方法', 'C. SCRUM适合迭代式场景，TSP适合瀑布场景', 'D. 两种方法都需要进行度量数据收集、分析，从而支持管理决策'],
    correctAnswer: 'BC',
    explanation: 'B不恰当：TSP和SCRUM都是计划驱动的方法。C不恰当：两者都适合迭代式场景。',
    topic: '软件过程'
  },
  {
    id: 'qclass-6',
    source: '课堂测试',
    type: 'choice',
    question: '以下特征适用麦克勒格Y理论（McGregor\'s Theory Y）激励的场合是：',
    options: ['A. 关注工作环境，薪金等', 'B. 更喜欢经常的指导，避免承担责任，缺乏主动性', 'C. 自我中心，对组织需求反应淡漠，反对变革', 'D. 能够自我约束，自我导向与控制，渴望承担责任'],
    correctAnswer: 'D',
    explanation: 'Y理论认为人能够自我约束、自我导向与控制，渴望承担责任。A、B、C都是X理论的特征。',
    topic: '团队管理'
  },
  {
    id: 'qclass-7',
    source: '课堂测试',
    type: 'choice',
    question: '以下关于马斯洛的需求层次理论描述不正确的是：',
    options: ['A. 自我实现是寻求自尊（Esteem）', 'B. 激励来自为没有满足的需求而努力奋斗', 'C. 低层次的需求必须在高层次需求满足之前得到满足', 'D. 满足高层次的需求的途径比满足低层次的途径更少'],
    correctAnswer: 'A',
    explanation: 'A不正确：自我实现是最高层次，不是寻求自尊。自尊是第四层次。',
    topic: '团队管理'
  },
  {
    id: 'qclass-8',
    source: '课堂测试',
    type: 'choice',
    question: '以下关于团队动力学的论述，不恰当的是：',
    options: ['A. 马斯洛的需求层次理论可以用来更好地维持激励水平', 'B. 智力工作的激励方式中，应该尽可能使用鼓励承诺这种方式', 'C. 麦克勒格的X理论适合用马斯洛底层需求激励', 'D. 海兹伯格的激励理论区分为内在因素和外在因素两种'],
    correctAnswer: 'B',
    explanation: 'B不恰当：过高的目标会降低期望值，反而可能降低团队凝聚力和工作效率。',
    topic: '团队管理'
  },
  {
    id: 'qclass-9',
    source: '课堂测试',
    type: 'choice',
    question: '下列关于挣值管理方法的描述中正确的是：',
    options: ['A. 挣值管理中进度的计算可以区分悲观和乐观两种方式', 'B. 挣值管理的简单、中级和高级实现三种方式中，只有高级实现才会涉及成本因素', 'C. 挣值管理与项目类型无关', 'D. 挣值管理不适用于需求频繁变更的软件项目管理中'],
    correctAnswer: 'AB',
    explanation: 'A正确：可区分悲观（0-100）和乐观（50-50）。B正确：只有高级实现引入成本因素。',
    topic: '项目管理'
  },
  {
    id: 'qclass-10',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于WBS的描述中，哪些说法不正确的？',
    options: ['A. WBS应该对应OBS', 'B. WBS提供了范围管理的基础', 'C. WBS工作分解最底层的要素是实现目标的充分必要条件', 'D. WBS分解的时候，同一层不能应用不同标准'],
    correctAnswer: 'C',
    explanation: 'C不正确：WBS最底层要素是充分条件，但不是必要条件。',
    topic: '项目管理'
  },
  {
    id: 'qclass-11',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于EVM的描述中，哪些说法不正确的？',
    options: ['A. EVM不适用于质量管理', 'B. EVM的中级实现中引入成本信息', 'C. EVM高度依赖估算准确', 'D. EVM可以适应需求变更'],
    correctAnswer: 'B',
    explanation: 'B不正确：中级实现加入的是日程偏差计算，不是成本信息。成本在高级实现才引入。',
    topic: '项目管理'
  },
  {
    id: 'qclass-12',
    source: '课堂测试',
    type: 'choice',
    question: '关于PSP质量管理策略，下列说法中正确的是：',
    options: ['A. 用缺陷管理替代质量管理，既有必要性，也有合理性', 'B. 基本无缺陷的开发是通过开展高质量的评审来实现的', 'C. 经过训练，评审是所有消除缺陷的手段当中最高效的', 'D. PSP质量策略主要解决的是外部质量，而非内部质量'],
    correctAnswer: 'ABC',
    explanation: 'D错误：PSP质量策略主要解决内部质量（开发过程质量），而非外部质量。',
    topic: '质量管理'
  },
  {
    id: 'qclass-13',
    source: '课堂测试',
    type: 'choice',
    question: '关于DRL，下列说法中不正确的是：',
    options: ['A. 这是一种模块级开发中质量控制的指标', 'B. DRL以单元测试每小时发现缺陷率作为基准', 'C. DRL以单元测试发现的缺陷个数作为基准', 'D. DRL只能预测，不能度量'],
    correctAnswer: 'C',
    explanation: 'C不正确：DRL以每小时发现缺陷率（缺陷数/小时）作为基准，不是以缺陷个数。',
    topic: '质量管理'
  },
  {
    id: 'qclass-14',
    source: '课堂测试',
    type: 'choice',
    question: '关于PQI，下列说法中不正确的是：',
    options: ['A. PQI表征模块级别开发中的过程规范化程度', 'B. PQI越高越好，可以充分保障质量', 'C. PQI越低越好', 'D. PQI不能用作质量规划'],
    correctAnswer: 'BCD',
    explanation: 'B不正确：PQI并非越高越好。C不正确：PQI不是越低越好。D不正确：PQI可以用作质量规划。',
    topic: '质量管理'
  },
  {
    id: 'qclass-15',
    source: '课堂测试',
    type: 'choice',
    question: '关于PQI，下列说法中正确的是：',
    options: ['A. PQI可以辅助判断模块开发质量', 'B. PQI可以提供过程改进的依据', 'C. PQI确保大于1，从而确保开发质量', 'D. PQI只能预测，不能度量'],
    correctAnswer: 'AB',
    explanation: 'C错误：PQI是0到1之间的数值。D错误：PQI既可以预测也可以度量。',
    topic: '质量管理'
  },
  {
    id: 'qclass-16',
    source: '课堂测试',
    type: 'choice',
    question: '关于Yield，下列说法中正确的是：',
    options: ['A. Yield可以辅助判断模块开发质量', 'B. Yield可以提供过程改进的依据', 'C. Yield区分为Process Yield和Phase Yield', 'D. Yield只能预测，不能度量'],
    correctAnswer: 'ABCD',
    explanation: 'A正确：Yield可辅助判断模块开发质量。B正确：Yield可提供过程改进依据。C正确：Yield区分为Process Yield和Phase Yield。D正确：Yield只能预测，不能度量（与PQI不同）。',
    topic: '质量管理'
  },
  {
    id: 'qclass-17',
    source: '课堂测试',
    type: 'choice',
    question: '关于评审速度，下列说法中正确的是：',
    options: ['A. 进行代码评审的时候，控制评审速度不超过每小时1000LOC就能实现大部分质量要求', 'B. 实战中，评审速度应该根据资源水平而定，时间充分就评审慢一些', 'C. 文档评审速度应该控制每小时不超过4页', 'D. 评审速度与人的技能有关，技能强的人可以突破每小时1000 LOC代码这个限制'],
    correctAnswer: 'C',
    explanation: 'C正确：文档评审速度应控制每小时不超过4页。A错误：代码评审速度应远低于1000 LOC/小时（约200 LOC/小时）。B错误：评审速度应保持一致，不应根据资源水平随意调整。D错误：无论技能强弱都不应突破评审速度限制。',
    topic: '质量管理'
  },
  {
    id: 'qclass-18',
    source: '课堂测试',
    type: 'choice',
    question: '关于Quality Journey，下列说法中正确的是：',
    options: ['A. Quality Journey中列出的步骤可以在适当的时候更换顺序', 'B. 由于需求是一切工程活动的基础，因此加强需求开发应该是Quality Journey早期的必备步骤', 'C. Quality Journey仍然仅仅是在"用缺陷管理替代质量管理"这一基本策略之下进行讨论', 'D. Quality Journey中测试应该先于评审得到贯彻和改善'],
    correctAnswer: 'C',
    explanation: 'C正确：Quality Journey是在"用缺陷管理替代质量管理"策略下讨论的。A错误：步骤应按顺序执行。B错误：Quality Journey聚焦于评审和测试活动，不是需求开发。D错误：评审应先于测试。',
    topic: '质量管理'
  },
  {
    id: 'qclass-19',
    source: '课堂测试',
    type: 'choice',
    question: 'PSP四大设计模板中，哪一个用来记录软件的内部动态信息？',
    options: ['A. OST（Operational Specification Template）', 'B. SST（State Specification Template）', 'C. LST（Logic Specification Template）', 'D. FST（Functional Specification Template）'],
    correctAnswer: 'B',
    explanation: 'B正确：SST（状态规格说明模板）用来记录软件的内部动态信息，即状态机信息。OST记录外部行为，LST记录逻辑，FST记录功能。',
    topic: '软件设计'
  },
  {
    id: 'qclass-20',
    source: '课堂测试',
    type: 'choice',
    question: '关于PSP四大设计模板和UML，下列说法中正确的是：',
    options: ['A. OST在UML中没有对应的设计图', 'B. UML中的类结构以及类之间的关系，在PSP四大设计模板中无法体现', 'C. LST在UML中可以通过类图来体现', 'D. FST在UML中可以通过类图来体现'],
    correctAnswer: 'C',
    explanation: 'C正确：LST（逻辑规格说明模板）可以通过UML类图来体现。A错误：OST对应用例图。B错误：LST可以体现类结构。D错误：FST是关于功能的，不是类图。',
    topic: '软件设计'
  },
  {
    id: 'qclass-21',
    source: '课堂测试',
    type: 'choice',
    question: '一个完全正确的状态机应该满足下列哪些条件？',
    options: ['A. 没有死循环和陷阱', 'B. 状态转化条件满足正交性', 'C. 状态转化条件满足完整性', 'D. 状态转化条件满足独立性'],
    correctAnswer: 'ABC',
    explanation: 'A正确：无死循环和陷阱。B正确：状态转化条件满足正交性（互斥）。C正确：状态转化条件满足完整性（覆盖所有情况）。D不是必要条件。',
    topic: '软件设计'
  },
  {
    id: 'qclass-22',
    source: '课堂测试',
    type: 'choice',
    question: '关于设计验证手段，下列说法中正确的是：',
    options: ['A. 执行表是唯一一种提供全面设计验证的手段', 'B. 跟踪表是唯一一种提供全面设计验证的手段', 'C. 受限于手工方式，都易于出错', 'D. 符号化执行验证不适合复杂的计算过程'],
    correctAnswer: 'C',
    explanation: 'C正确：执行表和跟踪表都受限于手工方式，易于出错。A和B错误：执行表和跟踪表都不是"唯一"的全面验证手段。D错误：符号化执行验证适合复杂计算过程。',
    topic: '软件设计'
  },
  {
    id: 'qclass-23',
    source: '课堂测试',
    type: 'choice',
    question: '使用程序正确性证明验证while-do循环时，下列说法中正确的是：',
    options: ['A. 循环判断条件最后一定可以变为false', 'B. 循环判断条件为真时，单独循环结构执行结果与循环体再加一个循环结构一致', 'C. 循环判断条件为false时，循环体内所有变量不能被修改', 'D. 该方法并不能保证循环体算法实现设计意图'],
    correctAnswer: 'ABCD',
    explanation: 'A正确：循环必须能终止（条件最终变为false）。B正确：描述了循环不变式的归纳步骤。C正确：条件为false时循环体不执行，变量不被修改。D正确：正确性证明验证循环结构，但不保证算法实现设计意图。',
    topic: '软件设计'
  },
  {
    id: 'qclass-24',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的客户需求？',
    options: ['A. 客户期望', 'B. 预算限制', 'C. 法律法规限制', 'D. 系统功能描述'],
    correctAnswer: 'AB',
    explanation: 'A正确：客户期望是客户需求。B正确：预算限制是客户需求的一个方面。C错误：法律法规是外部约束。D错误：系统功能描述是产品需求，不是客户需求。',
    topic: '需求工程'
  },
  {
    id: 'qclass-25',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的设计标准？',
    options: ['A. 命名规范', 'B. 接口标准', 'C. 出错或者异常处理信息', 'D. 设计表示方式'],
    correctAnswer: 'ABCD',
    explanation: '四项都是典型的设计标准：命名规范（A）、接口标准（B）、出错/异常处理信息（C）、设计表示方式（D）。',
    topic: '软件设计'
  },
  {
    id: 'qclass-26',
    source: '课堂测试',
    type: 'choice',
    question: '团队设计活动中需要注意的内容包括：',
    options: ['A. 设计标准的应用', 'B. 复用的考虑', 'C. 可测试性支持', 'D. 可用性支持'],
    correctAnswer: 'ABCD',
    explanation: '四项都是团队设计活动中需要注意的内容：设计标准应用（A）、复用考虑（B）、可测试性支持（C）、可用性支持（D）。',
    topic: '软件设计'
  },
  {
    id: 'qclass-27',
    source: '课堂测试',
    type: 'choice',
    question: '关于集成策略，下列说法中正确的是：',
    options: ['A. 当待集成组件质量普遍不高的时候，不可以使用扁平化策略', 'B. 当需要尽早获取可以工作的组件的时候，应该使用集簇式策略', 'C. 当待集成组件质量普遍较高的时候，可以使用大爆炸式集成策略', 'D. 持续集成本质上就是逐一添加策略'],
    correctAnswer: 'ABCD',
    explanation: 'A正确：组件质量不高时不能用扁平化策略。B正确：需要尽早获取工作组件时用集簇式。C正确：组件质量高时可用大爆炸式。D正确：CI本质是逐一添加。',
    topic: '软件集成'
  },
  {
    id: 'qclass-28',
    source: '课堂测试',
    type: 'choice',
    question: '选择集成策略的时候，应该考虑下列哪些方面？',
    options: ['A. 待集成组件的质量状态', 'B. 待集成组件的获取方式', 'C. 待集成组件的功能和关系', 'D. 待集成组件的数量'],
    correctAnswer: 'ABCD',
    explanation: '四项都是选择集成策略时需要考虑的方面：质量状态（A）、获取方式（B）、功能和关系（C）、数量（D）。',
    topic: '软件集成'
  },
  {
    id: 'qclass-29',
    source: '课堂测试',
    type: 'choice',
    question: '关于扁平化策略和集簇式集成策略，下列说法中正确的是：',
    options: ['A. 扁平化策略可以较早地充分地暴露系统级别的错误', 'B. 扁平化策略对于系统级别错误的暴露能力有限', 'C. 集簇式集成策略有助于复用策略的实现', 'D. 扁平化策略和集簇式策略的优缺点正好相反'],
    correctAnswer: 'AC',
    explanation: 'A正确：扁平化策略能较早暴露系统级错误。C正确：集簇式策略有助于复用。B错误：与A矛盾。D错误：两者优缺点并非正好相反，而是各有侧重。',
    topic: '软件集成'
  },
  {
    id: 'qclass-30',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的验证（Verification）活动？',
    options: ['A. 需求评审', 'B. 详细设计评审', 'C. 单元测试', 'D. 试运行'],
    correctAnswer: 'ABC',
    explanation: 'A、B、C都是验证活动（检查是否符合规格）。D（试运行）是确认活动（检查是否满足客户需要），不是验证。',
    topic: '质量管理'
  },
  {
    id: 'qclass-31',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的确认（Validation）活动？',
    options: ['A. 验收测试', 'B. 代码评审', 'C. 系统测试', 'D. 持续集成'],
    correctAnswer: 'AC',
    explanation: 'A（验收测试）和C（系统测试）是确认活动（检查是否满足客户需要）。B（代码评审）是验证活动。D（持续集成）是开发实践，不是确认活动。',
    topic: '质量管理'
  },
  {
    id: 'qclass-32',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的确认（Validation）对象？',
    options: ['A. 接口设计文档', 'B. 源代码', 'C. 用户手册', 'D. 系统使用培训材料'],
    correctAnswer: 'CD',
    explanation: 'C（用户手册）和D（培训材料）是确认对象，需要检查是否满足客户需要。A（接口设计文档）和B（源代码）是验证对象，检查是否符合规格。',
    topic: '质量管理'
  },
  {
    id: 'qclass-33',
    source: '课堂测试',
    type: 'choice',
    question: '关于需求开发，下列说法中不恰当的是：',
    options: ['A. 客户需求是指客户提出的关于软件功能的具体要求', 'B. 工期或者预算往往都是客户需求的一个方面', 'C. 产品需求需要跟客户充分讨论才能获取', 'D. 客户应该在需求开发活动中起到主导作用'],
    correctAnswer: 'AD',
    explanation: 'A不恰当：客户需求不限于软件功能，还包括工期、预算等。D不恰当：需求开发应由开发团队主导，客户配合而非主导。B和C的描述是恰当的。',
    topic: '需求工程'
  },
  {
    id: 'qclass-34',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的配置项？',
    options: ['A. 接口设计文档', 'B. 源代码', 'C. 用户手册', 'D. 系统使用培训材料'],
    correctAnswer: 'ABCD',
    explanation: '四项都是典型的配置项：接口设计文档（A）、源代码（B）、用户手册（C）、培训材料（D），都需要纳入配置管理。',
    topic: '配置管理'
  },
  {
    id: 'qclass-35',
    source: '课堂测试',
    type: 'choice',
    question: '团队内部的配置审计通常包含下列哪些内容？',
    options: ['A. 物理审计', 'B. 配置项列表', 'C. 配置管理记录', 'D. 基线计划'],
    correctAnswer: 'AD',
    explanation: 'A（物理审计）和D（基线计划）是配置审计的内容。B（配置项列表）和C（配置管理记录）是配置管理的产出物，不是审计的内容。',
    topic: '配置管理'
  },
  {
    id: 'qclass-36',
    source: '课堂测试',
    type: 'choice',
    question: '关于决策分析，下列说法中不恰当的是：',
    options: ['A. 决策分析指南中最关键的是明确需要开展决策分析活动的判定标准', 'B. 评价方法是体现决策者利益诉求的关键，因此，需要谨慎设计', 'C. 候选方案的识别应该晚于评价标准', 'D. 现实生活中的项目投标就是一个典型的决策分析活动'],
    correctAnswer: 'C',
    explanation: 'C不恰当：候选方案的识别不应晚于评价标准，两者应同时或先识别候选方案再制定评价标准。A、B、D的描述是恰当的。',
    topic: '决策分析'
  },
  {
    id: 'qclass-37',
    source: '课堂测试',
    type: 'choice',
    question: '关于根因分析，下列说法中不恰当的是：',
    options: ['A. 根因分析必须基于丰富的数据来选择合适的问题', 'B. 鱼骨图是根因分析的有效手段', 'C. 典型地，可以从技术、人员、培训以及过程角度开展根因分析', 'D. 根因分析活动终止的唯一特征就是找到相应的根因的明确解决方案'],
    correctAnswer: 'AD',
    explanation: 'A不恰当："必须基于丰富的数据"过于绝对，根因分析可以在数据有限时开展。D不恰当：终止特征是找到根因，而非找到明确解决方案。B和C的描述是恰当的。',
    topic: '根因分析'
  },

  // === 往年真题选择题（中期/期中） ===
  {
    id: 'qearly-c1',
    source: '往年真题',
    type: 'choice',
    question: '关于Brooks提及的软件开发本质难题，下列说法中不准确的是：',
    options: ['A. 本质难题总共有四个，分别为复杂、不可见、可变和质量挑战', 'B. 既然是本质难题，那就说明是根植于软件开发本身，因而不可能在软件开发当中得到缓解', 'C. 严格来说，只有不可见才是真正的"本质"难题，其他三个因项目而异', 'D. 四大本质难题贯穿软件发展的不同历史阶段，但是在不同历史阶段，相互凸显程度不一样'],
    correctAnswer: 'AB',
    explanation: 'A不准确：四大本质难题的描述有误。B不准确：本质难题虽然根植于软件开发本身，但仍然可以在开发过程中得到缓解。C和D的描述是准确的。',
    topic: '软件发展'
  },
  {
    id: 'qearly-c2',
    source: '往年真题',
    type: 'choice',
    question: '下列软件应用和开发的典型特征中属于软硬件一体化阶段的是：',
    options: ['A. 可以通过引入操作系统来支持硬件完成计算任务', 'B. 几乎不需要考虑需求变更', 'C. 缺乏科班的软件工程师', 'D. 系统兼容，可移植性不是主要的考虑因素'],
    correctAnswer: 'BC',
    explanation: 'B和C是软硬件一体化阶段的特征：几乎不需要需求变更、缺乏科班软件工程师。A错误：引入操作系统是第二阶段的特征。D不属于该阶段的典型特征。',
    topic: '软件发展'
  },
  {
    id: 'qearly-c3',
    source: '往年真题',
    type: 'choice',
    question: '下列名词和术语中不属于软件过程的有：',
    options: ['A. SCRUM', 'B. CMM/CMMI', 'C. GATE方法', 'D. IDEAL'],
    correctAnswer: 'BD',
    explanation: 'B（CMM/CMMI）是过程管理和改进模型，不是软件过程。D（IDEAL）是过程改进参考元模型，不是软件过程。A（SCRUM）和C（GATE方法）是软件过程。',
    topic: '软件过程'
  },
  {
    id: 'qearly-c4',
    source: '往年真题',
    type: 'choice',
    question: 'CMM的创始人是哪位？',
    options: ['A. Boehm', 'B. Juran', 'C. Humphrey', 'D. Crosby'],
    correctAnswer: 'C',
    explanation: 'CMM的创始人是Watts Humphrey。Boehm是COCOMO模型的提出者，Juran是质量管理专家，Crosby是质量管理专家。',
    topic: '软件过程'
  },
  {
    id: 'qearly-c5',
    source: '往年真题',
    type: 'choice',
    question: 'XP规定开发人员每周工作时间不超过多少小时？',
    options: ['A. 30', 'B. 40', 'C. 50', 'D. 60'],
    correctAnswer: 'B',
    explanation: 'XP（极限编程）规定开发人员每周工作时间不超过40小时，强调可持续的开发节奏，避免过度加班导致质量下降。',
    topic: '敏捷方法'
  },
  {
    id: 'qearly-c6',
    source: '往年真题',
    type: 'choice',
    question: '下列不属于看板方法典型实践的是：',
    options: ['A. 可视化工作流', 'B. 站立式会议', 'C. 限定WIP', 'D. 重构'],
    correctAnswer: 'BD',
    explanation: 'B（站立式会议）是Scrum的典型实践，不是看板方法的核心实践。D（重构）是XP的典型实践。A（可视化工作流）和C（限定WIP）是看板方法的核心实践。',
    topic: '敏捷方法'
  },
  {
    id: 'qearly-c7',
    source: '往年真题',
    type: 'choice',
    question: '完成一份完整的项目日程计划，需要下列哪些信息？',
    options: ['A. 任务清单', 'B. 任务顺序', 'C. 质量要求', 'D. 人员资源水平'],
    correctAnswer: 'ABD',
    explanation: '日程计划需要任务清单（A）、任务顺序（B）和人员资源水平（D）。质量要求（C）不是制定日程计划的直接输入，而是质量计划的内容。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c8',
    source: '往年真题',
    type: 'choice',
    question: '在TSP的团队组建过程中，确定软件开发策略的是第几次会议？',
    options: ['A. 第一次', 'B. 第二次', 'C. 第三次', 'D. 第四次'],
    correctAnswer: 'C',
    explanation: 'TSP团队组建的9次会议中，第3次会议确定开发策略。第1次建立团队目标，第2次确定角色，第3次确定策略，后续会议制定详细计划。',
    topic: '团队管理'
  },
  {
    id: 'qearly-c9',
    source: '往年真题',
    type: 'choice',
    question: '下列关于挣值管理方法的描述中错误的是：',
    options: ['A. 跟踪预算消耗', 'B. 高度依赖估算准确性', 'C. 可以支持质量管理', 'D. 跟踪项目进度'],
    correctAnswer: 'C',
    explanation: 'C错误：挣值管理（EVM）不能支持质量管理，EVM主要关注进度和成本。A、B、D的描述都是正确的。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c10',
    source: '往年真题',
    type: 'choice',
    question: '下列描述当中，属于过程经理的工作内容有哪些？',
    options: ['A. 建立团队的开发标准', 'B. 主持项目周例会', 'C. 记录周例会的会议记录', 'D. 制定开发计划'],
    correctAnswer: 'AC',
    explanation: 'A（建立团队开发标准）和C（记录会议记录）是过程经理的职责。B（主持周例会）是项目组长的职责。D（制定开发计划）是计划经理的职责。',
    topic: '团队管理'
  },
  {
    id: 'qearly-c11',
    source: '往年真题',
    type: 'choice',
    question: '为了制定Schedule plan，下述描述中，哪一项是不需要的？',
    options: ['A. Task size', 'B. Task Order', 'C. Schedule Hour', 'D. Task hour for each task'],
    correctAnswer: 'A',
    explanation: 'A（Task size）不是制定日程计划的直接输入。日程计划需要任务顺序（B）、日程可用时间（C）和每项任务的计划工时（D）。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c12',
    source: '往年真题',
    type: 'choice',
    question: '在上题中，还需要补充下述哪一项数据就可以定义Schedule Plan了？',
    options: ['A. Task List', 'B. Plan Value', 'C. Earned Value', 'D. Nothing'],
    correctAnswer: 'A',
    explanation: '还需要补充Task List（任务清单）。有了任务清单、任务顺序、日程可用时间和每项任务的计划工时，就可以制定完整的日程计划。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c13',
    source: '往年真题',
    type: 'choice',
    question: '下列术语描述的技术或者方法是同类型的是？',
    options: ['A. CMMI SPICE PDCA', 'B. IDEAL XP SCRUM', 'C. Cleanroom Gate TSP', 'D. Waterfall SCRUM XP'],
    correctAnswer: 'CD',
    explanation: 'C（Cleanroom、Gate、TSP）都是软件开发过程/方法，属于同类型。D（Waterfall、SCRUM、XP）都是软件开发方法/实践，属于同类型。A中CMMI/SPICE是过程管理，PDCA是过程改进，不同类型。B中IDEAL是过程改进，XP/SCRUM是开发方法，不同类型。',
    topic: '软件过程'
  }
]

// 知识点分类
export const choiceTopics = [
  '全部',
  '软件发展',
  '软件过程',
  '敏捷方法',
  '团队管理',
  '项目管理',
  '质量管理',
  '软件设计',
  '需求工程',
  '软件集成',
  '配置管理',
  '决策分析',
  '根因分析'
]

export default choiceQuestions

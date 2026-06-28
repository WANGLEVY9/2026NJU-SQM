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
    correctAnswer: 'B',
    explanation: 'B正确：这句话强调了在应用更改之前仔细检查代码以在问题成为主要问题之前识别和纠正问题的重要性，对应代码评审。',
    topic: '软件发展'
  },
  {
    id: 'q2023-2',
    source: '2023期末真题',
    type: 'choice',
    question: '整体来看，我们可以把软件的发展分为三大阶段，以下不属于三大主要阶段的是：',
    options: ['A. 软硬件一体化', 'B. 网络化和服务化', 'C. 云计算化和云原生', 'D. 软件成为独立产品'],
    correctAnswer: 'C',
    explanation: '三大阶段为：软硬件一体化、软件成为独立产品、网络化和服务化。云计算化和云原生不属于三大主要阶段。',
    topic: '软件发展'
  },
  {
    id: 'q2023-3',
    source: '2023期末真题',
    type: 'choice',
    question: '以下描述中，不属于软件开发本质困难或者本质挑战的是：',
    options: ['A. 质量难题', 'B. 复杂性', 'C. 不可见', 'D. 一致性'],
    correctAnswer: 'A',
    explanation: 'Brooks四大本质困难：复杂性、一致性、可变性、不可见性。质量难题不属于本质困难。',
    topic: '软件发展'
  },
  {
    id: 'q2023-4',
    source: '2023期末真题',
    type: 'choice',
    question: '以下描述中，哪一种实践是软硬件一体化阶段的典型实践：',
    options: ['A. Code and Fix', 'B. 迭代式开发', 'C. 瀑布生命周期模型', 'D. 成熟度模型'],
    correctAnswer: 'A',
    explanation: '软硬件一体化阶段典型实践是Code and Fix（编码+改错）。',
    topic: '软件发展'
  },
  {
    id: 'q2023-5',
    source: '2023期末真题',
    type: 'choice',
    question: '对比TSP和SCRUM，下列说法不恰当的是：',
    options: ['A. 都是过程框架，需要填补具体实践之后才是一个可以工作的过程', 'B. 一种是计划驱动方法，另外一种是敏捷方法', 'C. SCRUM适合迭代式场景，TSP适合瀑布场景', 'D. 两种方法都需要进行度量数据收集、分析，从而支持管理决策'],
    correctAnswer: 'BC',
    explanation: 'B不恰当：计划驱动和敏捷不是对立的。C不恰当：SCRUM更适合需要快速迭代和灵活变更的场景，TSP更适合对过程管理和控制要求更高的场景。',
    topic: '软件过程'
  },
  {
    id: 'q2023-6',
    source: '2023期末真题',
    type: 'choice',
    question: '以下特征适用麦克勒格Y理论（McGregor\'s Theory Y）激励的场合是：',
    options: ['A. 关注工作环境，薪金等', 'B. 更喜欢经常的指导，避免承担责任，缺乏主动性', 'C. 自我中心，对组织需求反应淡漠，反对变革', 'D. 能够自我约束，自我导向与控制，渴望承担责任'],
    correctAnswer: 'AD',
    explanation: 'A ✅ D ✅：A关注工作环境薪金属于外部激励因素（也适用于Y理论情境），D能够自我约束、自我导向与控制、渴望承担责任是Y理论核心特征。B ❌ C ❌ 均为X理论的特征。',
    topic: '团队管理'
  },
  {
    id: 'q2023-7',
    source: '2023期末真题',
    type: 'choice',
    question: '以下关于马斯洛的需求层次理论描述不正确的是：',
    options: ['A. 自我实现是寻求自尊（Esteem）', 'B. 激励来自为没有满足的需求而努力奋斗', 'C. 低层次的需求必须在高层次需求满足之前得到满足', 'D. 满足高层次的需求的途径比满足低层次的途径更少'],
    correctAnswer: 'AD',
    explanation: 'A不正确：自我实现是第五层，自尊是第四层。D不正确：满足高层次需求的途径更多而非更少。',
    topic: '团队管理'
  },
  {
    id: 'q2023-8',
    source: '2023期末真题',
    type: 'choice',
    question: '以下关于团队动力学的论述，不恰当的是：',
    options: ['A. 马斯洛的需求层次理论可以用来更好地维持激励水平', 'B. 智力工作的激励方式中，应该尽可能使用鼓励承诺这种方式', 'C. 麦克勒格的X理论适合用马斯洛底层需求激励', 'D. 海兹伯格的激励理论区分为内在因素和外在因素两种'],
    correctAnswer: 'A',
    explanation: 'A不恰当：马斯洛的需求层次理论可用于**指导激励手段的选择**，不是激励维持手段。',
    topic: '团队管理'
  },
  {
    id: 'q2023-9',
    source: '2023期末真题',
    type: 'choice',
    question: '下列关于挣值管理方法的描述中正确的是：',
    options: ['A. 挣值管理中进度的计算可以区分悲观和乐观两种方式', 'B. 挣值管理的简单、中级和高级实现三种方式中，只有高级实现才会涉及成本因素', 'C. 挣值管理与项目类型无关', 'D. 挣值管理不适用于需求频繁变更的软件项目管理中'],
    correctAnswer: 'AB',
    explanation: 'A正确：可区分悲观（0-100）和乐观（50-50）。B正确：只有高级实现引入成本因素。',
    topic: '项目管理'
  },
  {
    id: 'q2023-10',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于WBS的描述中，哪些说法不正确的？',
    options: ['A. WBS应该对应OBS', 'B. WBS提供了范围管理的基础', 'C. WBS工作分解最底层的要素是实现目标的充分必要条件', 'D. WBS分解的时候，同一层不能应用不同标准'],
    correctAnswer: 'A',
    explanation: 'A不正确：WBS和OBS**关注的角度和目的不同**。',
    topic: '项目管理'
  },
  {
    id: 'q2023-11',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于EVM的描述中，哪些说法不正确的？',
    options: ['A. EVM不适用于质量管理', 'B. EVM的中级实现中引入成本信息', 'C. EVM高度依赖估算准确', 'D. EVM可以适应需求变更'],
    correctAnswer: 'B',
    explanation: 'B不正确：中级实现加入的是日程偏差计算，不是成本信息。成本在高级实现才引入。',
    topic: '项目管理'
  },
  {
    id: 'q2023-12',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PSP质量管理策略，下列说法中正确的是：',
    options: ['A. 用缺陷管理替代质量管理，既有必要性，也有合理性', 'B. 基本无缺陷的开发是通过开展高质量的评审来实现的', 'C. 经过训练，评审是所有消除缺陷的手段当中最高效的', 'D. PSP质量策略主要解决的是外部质量，而非内部质量'],
    correctAnswer: 'ABD',
    explanation: 'A ✅ B ✅ D ✅：PSP使用面向用户的视图，主要解决外部质量。C ❌：**编译**是最高效的缺陷消除手段，不是评审。',
    topic: '质量管理'
  },
  {
    id: 'q2023-13',
    source: '2023期末真题',
    type: 'choice',
    question: '关于DRL，下列说法中不正确的是：',
    options: ['A. 这是一种模块级开发中质量控制的指标', 'B. DRL以单元测试每小时发现缺陷率作为基准', 'C. DRL以单元测试发现的缺陷个数作为基准', 'D. DRL只能预测，不能度量'],
    correctAnswer: 'CD',
    explanation: 'C ❌：基准是每小时缺陷率，不是缺陷总个数。D ❌：DRL**只能度量，不能预测**。',
    topic: '质量管理'
  },
  {
    id: 'q2023-14',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PQI，下列说法中不正确的是：',
    options: ['A. PQI表征模块级别开发中的过程规范化程度', 'B. PQI越高越好，可以充分保障质量', 'C. PQI越低越好', 'D. PQI不能用作质量规划'],
    correctAnswer: 'BCD',
    explanation: 'B ❌：PQI大于0.4即可，过大成本太高。C ❌：PQI越低缺陷密度越高。D ❌：PQI可以用作质量规划和过程改进。',
    topic: '质量管理'
  },
  {
    id: 'q2023-15',
    source: '2023期末真题',
    type: 'choice',
    question: '关于PQI，下列说法中正确的是：',
    options: ['A. PQI可以辅助判断模块开发质量', 'B. PQI可以提供过程改进的依据', 'C. PQI确保大于1，从而确保开发质量', 'D. PQI只能预测，不能度量'],
    correctAnswer: 'AB',
    explanation: 'A ✅ B ✅。C ❌：PQI是0-1之间的乘积。D ❌：PQI可以度量。',
    topic: '质量管理'
  },
  {
    id: 'q2023-16',
    source: '2023期末真题',
    type: 'choice',
    question: '关于Yield，下列说法中正确的是：',
    options: ['A. Yield可以辅助判断模块开发质量', 'B. Yield可以提供过程改进的依据', 'C. Yield区分为Process Yield和Phase Yield', 'D. Yield只能预测，不能度量'],
    correctAnswer: 'ABC',
    explanation: 'A ✅：Yield可辅助判断模块开发质量。B ✅：Yield可提供过程改进依据。C ✅：Yield区分为Process Yield和Phase Yield。D ❌：Yield可以度量（基于缺陷日志统计各阶段缺陷消除效率），并非只能预测。',
    topic: '质量管理'
  },
  {
    id: 'q2023-17',
    source: '2023期末真题',
    type: 'choice',
    question: '关于评审速度，下列说法中正确的是：',
    options: ['A. 控制评审速度不超过每小时1000LOC就能实现大部分质量要求', 'B. 评审速度应该根据资源水平而定', 'C. 文档评审速度应该控制每小时不超过4页', 'D. 技能强的人可以突破每小时1000LOC限制'],
    correctAnswer: 'C',
    explanation: 'C ✅：文档评审速度应控制每小时不超过4页。评审速度应基于项目的需求和时间限制。',
    topic: '质量管理'
  },
  {
    id: 'q2023-18',
    source: '2023期末真题',
    type: 'choice',
    question: '关于Humphrey梳理的Quality Journey，下列说法中正确的是：',
    options: ['A. 步骤可以在适当的时候更换顺序', 'B. 加强需求开发应该是早期必备步骤', 'C. 仍然在"用缺陷管理替代质量管理"策略之下进行讨论', 'D. 测试应该先于评审得到贯彻和改善', 'E. 加强团队评审是QJ后期的步骤'],
    correctAnswer: 'CD',
    explanation: 'A ❌：先后顺序不能改变。B ❌：QJ并不包括需求开发。C ✅ D ✅。E ❌：团队评审不在QJ后期步骤中。',
    topic: '质量管理'
  },
  {
    id: 'q2023-19',
    source: '2023期末真题',
    type: 'choice',
    question: '下述设计模板中用来记录内部动态信息的是：',
    options: ['A. OST', 'B. SST', 'C. LST', 'D. FST'],
    correctAnswer: 'B',
    explanation: 'B ✅：SST（状态规格模板）记录内部动态信息——状态机状态转换。',
    topic: '软件设计'
  },
  {
    id: 'q2023-20',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于PSP四大设计模板和UML典型设计图的描述中完全正确的是：',
    options: ['A. OST在UML中没有对应的设计图', 'B. UML中的类结构以及类之间的关系，在PSP四大设计模板中无法体现', 'C. LST在UML中可以通过类图来体现', 'D. FST在UML中可以通过类图来体现'],
    correctAnswer: 'B',
    explanation: 'B ✅。A ❌：OST对应用例图和时序图。C ❌：LST无对应体现。D ❌：FST体现了方法的行为而类图不能。',
    topic: '软件设计'
  },
  {
    id: 'q2023-21',
    source: '2023期末真题',
    type: 'choice',
    question: '下列关于各种设计验证手段的描述中正确的是：',
    options: ['A. 执行表是唯一一种提供全面设计验证的手段', 'B. 跟踪表是唯一一种提供全面设计验证的手段', 'C. 受限于手工方式，都易于出错', 'D. 符号化执行不适合复杂算法', 'E. 执行表是跟踪表的扩展'],
    correctAnswer: 'C',
    explanation: 'C ✅。A/B ❌：**符号化验证**才是唯一提供全面验证的手段。D ❌：符号化验证适合复杂计算过程，不适合复杂逻辑。E ❌：跟踪表是执行表的扩展，不是反过来。',
    topic: '软件设计'
  },
  {
    id: 'q2023-22',
    source: '2023期末真题',
    type: 'choice',
    question: '一个完全正确的状态机应该满足：',
    options: ['A. 没有死循环和陷阱', 'B. 状态转化条件满足正交性', 'C. 状态转化条件满足完整性', 'D. 状态转化条件满足独立性', 'E. 符合设计意图'],
    correctAnswer: 'ABCE',
    explanation: 'A ✅ B ✅ C ✅ E ✅。D ❌：PPT无"独立性"要求。',
    topic: '软件设计'
  },
  {
    id: 'q2023-23',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于质量的描述中，哪些说法不正确的？',
    options: ['A. 质量是一种多重属性的组合', 'B. 最终用户一般不能感知内部质量', 'C. 安全和保密一般不是质量要素', 'D. 质量与主观感受有关'],
    correctAnswer: 'C',
    explanation: 'C ❌：安全和保密**是**核心质量要素。A ✅ B ✅ D ✅。',
    topic: '质量管理'
  },
  {
    id: 'q2023-24',
    source: '2023期末真题',
    type: 'choice',
    question: '下述关于质量控制指标，哪些说法正确？',
    options: ['A. A/FR应该是越高越好', 'B. Yield是一种精确度量模块质量的手段', 'C. 评审活动应该早于编译或者测试活动而开展', 'D. PQI只能事后统计，不能用于指导质量计划'],
    correctAnswer: 'C',
    explanation: 'C ✅：先评审后编译减少时间。A ❌：A/FR达到2.0即可。B ❌：Yield是估计度量，不可能精确度量。D ❌：PQI可以预测和度量，可以指导质量计划。',
    topic: '质量管理'
  },
  {
    id: 'q2023-25',
    source: '2023期末真题',
    type: 'choice',
    question: '下述设计验证手段的描述，哪些是正确的？',
    options: ['A. 符号化执行容易引入人为错误', 'B. 状态机验证是唯一一种提供一般意义上的正确性检验的验证手段', 'C. 执行表对设计缺陷的验证能力强于跟踪表', 'D. 正确性检验是唯一可靠的设计验证手段'],
    correctAnswer: 'A',
    explanation: 'A ✅：手工符号化推演容易产生人为错误。B ❌ C ❌ D ❌：不存在唯一/绝对的验证手段。',
    topic: '软件设计'
  },
  {
    id: 'q2023-26',
    source: '2023期末真题',
    type: 'choice',
    question: '关于使用程序正确性证明手段验证while-do循环设计的描述中，正确的是：',
    options: ['A. 循环判断条件最后一定可以变为false', 'B. 循环条件为真时单独循环结构与循环体+循环结构执行结果一致', 'C. 循环条件为false时循环体内所有变量不能被修改', 'D. 该方法并不能保证循环体算法实现设计意图'],
    correctAnswer: 'ABCD',
    explanation: 'A ✅ 终止性。B ✅ 不变式。C ✅ 条件为false时变量不被修改。D ✅ 正确性证明不保证算法实现设计意图。',
    topic: '软件设计'
  },
  {
    id: 'q2023-j1',
    source: '2023期末真题',
    type: 'judge',
    question: '软件过程管理是软件项目管理应该要实现的目标。',
    correctAnswer: false,
    explanation: '错误。软件过程管理和软件项目管理完全是两回事。',
    topic: '软件过程'
  },
  {
    id: 'q2023-j2',
    source: '2023期末真题',
    type: 'judge',
    question: 'CMM/CMMI不适合当今互联网环境的项目管理需求。',
    correctAnswer: true,
    explanation: '正确。CMM/CMMI是用来做过程管理和改进的，根本不是满足项目管理需求的手段。',
    topic: '软件过程'
  },
  {
    id: 'q2023-j3',
    source: '2023期末真题',
    type: 'judge',
    question: 'PDCA和IDEAL不适合在敏捷环境中使用。',
    correctAnswer: false,
    explanation: '错误。PDCA和IDEAL是软件过程改进参考元模型，适合在敏捷环境中使用。',
    topic: '软件过程'
  },

  // === 课堂测试选择题 ===
  {
    id: 'qclass-1',
    source: '课堂测试',
    type: 'choice',
    question: '"Measure twice, cut once"描述的是下述哪个软件开发场景：',
    options: ['A. 软件设计', 'B. 代码评审', 'C. 需求开发', 'D. V&V'],
    correctAnswer: 'B',
    explanation: 'B ✅：强调在应用更改之前仔细检查代码，对应代码评审。',
    topic: '软件发展'
  },
  {
    id: 'qclass-2',
    source: '课堂测试',
    type: 'choice',
    question: '整体来看，我们可以把软件的发展分为三大阶段，以下不属于三大主要阶段的是：',
    options: ['A. 软硬件一体化', 'B. 网络化和服务化', 'C. 云计算化和云原生', 'D. 软件成为独立产品'],
    correctAnswer: 'C',
    explanation: '云计算化和云原生不属于三大主要阶段。',
    topic: '软件发展'
  },
  {
    id: 'qclass-3',
    source: '课堂测试',
    type: 'choice',
    question: '以下描述中，不属于软件开发本质困难或者本质挑战的是：',
    options: ['A. 质量难题', 'B. 复杂性', 'C. 不可见', 'D. 一致性'],
    correctAnswer: 'A',
    explanation: 'Brooks四大本质困难：复杂性、一致性、可变性、不可见性。质量难题不属于本质困难。',
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
    explanation: 'B不恰当：计划驱动和敏捷不是对立的。C不恰当：SCRUM更适合快速迭代，TSP更适合过程管理控制要求高的场景。',
    topic: '软件过程'
  },
  {
    id: 'qclass-6',
    source: '课堂测试',
    type: 'choice',
    question: '以下特征适用麦克勒格Y理论（McGregor\'s Theory Y）激励的场合是：',
    options: ['A. 关注工作环境，薪金等', 'B. 更喜欢经常的指导，避免承担责任，缺乏主动性', 'C. 自我中心，对组织需求反应淡漠，反对变革', 'D. 能够自我约束，自我导向与控制，渴望承担责任'],
    correctAnswer: 'AD',
    explanation: 'A ✅ D ✅：A关注工作环境薪金属于外部激励因素（也适用于Y理论情境），D能够自我约束、自我导向与控制、渴望承担责任是Y理论核心特征。B ❌ C ❌ 均为X理论的特征。',
    topic: '团队管理'
  },
  {
    id: 'qclass-7',
    source: '课堂测试',
    type: 'choice',
    question: '以下关于马斯洛的需求层次理论描述不正确的是：',
    options: ['A. 自我实现是寻求自尊（Esteem）', 'B. 激励来自为没有满足的需求而努力奋斗', 'C. 低层次的需求必须在高层次需求满足之前得到满足', 'D. 满足高层次的需求的途径比满足低层次的途径更少'],
    correctAnswer: 'AD',
    explanation: 'A不正确：自我实现是第五层，自尊是第四层。D不正确：满足高层次需求的途径更多而非更少。',
    topic: '团队管理'
  },
  {
    id: 'qclass-8',
    source: '课堂测试',
    type: 'choice',
    question: '以下关于团队动力学的论述，不恰当的是：',
    options: ['A. 马斯洛的需求层次理论可以用来更好地维持激励水平', 'B. 智力工作的激励方式中，应该尽可能使用鼓励承诺这种方式', 'C. 麦克勒格的X理论适合用马斯洛底层需求激励', 'D. 海兹伯格的激励理论区分为内在因素和外在因素两种'],
    correctAnswer: 'A',
    explanation: 'A不恰当：马斯洛理论用于**指导激励手段的选择**，不是激励维持手段。',
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
    correctAnswer: 'A',
    explanation: 'A不正确：WBS和OBS关注的角度和目的不同。',
    topic: '项目管理'
  },
  {
    id: 'qclass-11',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于EVM的描述中，哪些说法不正确的？',
    options: ['A. EVM不适用于质量管理', 'B. EVM的中级实现中引入成本信息', 'C. EVM高度依赖估算准确', 'D. EVM可以适应需求变更'],
    correctAnswer: 'B',
    explanation: 'B不正确：中级实现加入的是日程偏差计算，不是成本信息。',
    topic: '项目管理'
  },
  {
    id: 'qclass-12',
    source: '课堂测试',
    type: 'choice',
    question: '关于PSP质量管理策略，下列说法中正确的是：',
    options: ['A. 用缺陷管理替代质量管理，既有必要性，也有合理性', 'B. 基本无缺陷的开发是通过开展高质量的评审来实现的', 'C. 经过训练，评审是所有消除缺陷的手段当中最高效的', 'D. PSP质量策略主要解决的是外部质量，而非内部质量'],
    correctAnswer: 'ABD',
    explanation: 'A ✅ B ✅ D ✅。C ❌：**编译**是最高效的缺陷消除手段。PSP使用面向用户的视图，主要解决外部质量。',
    topic: '质量管理'
  },
  {
    id: 'qclass-13',
    source: '课堂测试',
    type: 'choice',
    question: '关于DRL，下列说法中不正确的是：',
    options: ['A. 这是一种模块级开发中质量控制的指标', 'B. DRL以单元测试每小时发现缺陷率作为基准', 'C. DRL以单元测试发现的缺陷个数作为基准', 'D. DRL只能预测，不能度量'],
    correctAnswer: 'CD',
    explanation: 'C ❌：基准是每小时缺陷率。D ❌：DRL**只能度量，不能预测**。',
    topic: '质量管理'
  },
  {
    id: 'qclass-14',
    source: '课堂测试',
    type: 'choice',
    question: '关于PQI，下列说法中不正确的是：',
    options: ['A. PQI表征模块级别开发中的过程规范化程度', 'B. PQI越高越好，可以充分保障质量', 'C. PQI越低越好', 'D. PQI不能用作质量规划'],
    correctAnswer: 'BCD',
    explanation: 'B ❌ C ❌ D ❌：PQI大于0.4即可，可以用作质量规划和过程改进。',
    topic: '质量管理'
  },
  {
    id: 'qclass-15',
    source: '课堂测试',
    type: 'choice',
    question: '关于PQI，下列说法中正确的是：',
    options: ['A. PQI可以辅助判断模块开发质量', 'B. PQI可以提供过程改进的依据', 'C. PQI确保大于1，从而确保开发质量', 'D. PQI只能预测，不能度量'],
    correctAnswer: 'AB',
    explanation: 'A ✅ B ✅。C ❌：PQI是0-1之间的乘积。D ❌：PQI可以度量。',
    topic: '质量管理'
  },
  {
    id: 'qclass-16',
    source: '课堂测试',
    type: 'choice',
    question: '关于Yield，下列说法中正确的是：',
    options: ['A. Yield可以辅助判断模块开发质量', 'B. Yield可以提供过程改进的依据', 'C. Yield区分为Process Yield和Phase Yield', 'D. Yield只能预测，不能度量'],
    correctAnswer: 'ABC',
    explanation: 'A ✅：Yield可辅助判断模块开发质量。B ✅：Yield可提供过程改进依据。C ✅：Yield区分为Process Yield和Phase Yield。D ❌：Yield可以度量（基于缺陷日志统计各阶段缺陷消除效率），并非只能预测。',
    topic: '质量管理'
  },
  {
    id: 'qclass-17',
    source: '课堂测试',
    type: 'choice',
    question: '关于评审速度，下列说法中正确的是：',
    options: ['A. 控制评审速度不超过每小时1000LOC就能实现大部分质量要求', 'B. 评审速度应该根据资源水平而定', 'C. 文档评审速度应该控制每小时不超过4页', 'D. 技能强的人可以突破每小时1000LOC限制'],
    correctAnswer: 'C',
    explanation: 'C ✅：文档评审速度应控制每小时不超过4页。评审速度应基于项目的需求和时间限制。',
    topic: '质量管理'
  },
  {
    id: 'qclass-18',
    source: '课堂测试',
    type: 'choice',
    question: '关于Humphrey梳理的Quality Journey，下列说法中正确的是：',
    options: ['A. 步骤可以在适当的时候更换顺序', 'B. 加强需求开发应该是早期必备步骤', 'C. 仍然在"用缺陷管理替代质量管理"策略之下进行讨论', 'D. 测试应该先于评审得到贯彻和改善', 'E. 加强团队评审是QJ后期的步骤'],
    correctAnswer: 'CD',
    explanation: 'A ❌：顺序不能改变。B ❌：QJ不包括需求开发。C ✅ D ✅。E ❌。',
    topic: '质量管理'
  },
  {
    id: 'qclass-19',
    source: '课堂测试',
    type: 'choice',
    question: 'PSP四大设计模板中，哪一个用来记录软件的内部动态信息？',
    options: ['A. OST', 'B. SST', 'C. LST', 'D. FST'],
    correctAnswer: 'B',
    explanation: 'B ✅：SST（状态规格模板）记录内部动态信息——状态机。',
    topic: '软件设计'
  },
  {
    id: 'qclass-20',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于PSP四大设计模板和UML典型设计图的描述中完全正确的是：',
    options: ['A. OST在UML中没有对应的设计图', 'B. UML中的类结构以及类之间的关系，在PSP四大设计模板中无法体现', 'C. LST在UML中可以通过类图来体现', 'D. FST在UML中可以通过类图来体现'],
    correctAnswer: 'B',
    explanation: 'B ✅。A ❌：OST对应用例图和时序图。C ❌：LST无对应体现。D ❌：FST体现了方法的行为而类图不能。',
    topic: '软件设计'
  },
  {
    id: 'qclass-21',
    source: '课堂测试',
    type: 'choice',
    question: '下列关于各种设计验证手段的描述中正确的是：',
    options: ['A. 执行表是唯一一种提供全面设计验证的手段', 'B. 跟踪表是唯一一种提供全面设计验证的手段', 'C. 受限于手工方式，都易于出错', 'D. 符号化执行不适合复杂算法', 'E. 执行表是跟踪表的扩展'],
    correctAnswer: 'C',
    explanation: 'C ✅。A/B ❌：符号化验证才是唯一全面验证手段。D ❌：符号化验证适合复杂计算过程。E ❌：跟踪表是执行表的扩展。',
    topic: '软件设计'
  },
  {
    id: 'qclass-22',
    source: '课堂测试',
    type: 'choice',
    question: '一个完全正确的状态机应该满足：',
    options: ['A. 没有死循环和陷阱', 'B. 状态转化条件满足正交性', 'C. 状态转化条件满足完整性', 'D. 状态转化条件满足独立性', 'E. 符合设计意图'],
    correctAnswer: 'ABCE',
    explanation: 'A ✅ B ✅ C ✅ E ✅。D ❌：PPT无"独立性"要求。',
    topic: '软件设计'
  },
  {
    id: 'qclass-23',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于质量的描述中，哪些说法不正确的？',
    options: ['A. 质量是一种多重属性的组合', 'B. 最终用户一般不能感知内部质量', 'C. 安全和保密一般不是质量要素', 'D. 质量与主观感受有关'],
    correctAnswer: 'C',
    explanation: 'C ❌：安全和保密**是**核心质量要素。',
    topic: '质量管理'
  },
  {
    id: 'qclass-24',
    source: '课堂测试',
    type: 'choice',
    question: '下述关于质量控制指标，哪些说法正确？',
    options: ['A. A/FR应该是越高越好', 'B. Yield是一种精确度量模块质量的手段', 'C. 评审活动应该早于编译或者测试活动而开展', 'D. PQI只能事后统计，不能用于指导质量计划'],
    correctAnswer: 'C',
    explanation: 'C ✅。A ❌：A/FR达到2.0即可。B ❌：Yield是估计度量。D ❌：PQI可以指导质量计划。',
    topic: '质量管理'
  },
  {
    id: 'qclass-25',
    source: '课堂测试',
    type: 'choice',
    question: '下述设计验证手段的描述，哪些是正确的？',
    options: ['A. 符号化执行容易引入人为错误', 'B. 状态机验证是唯一一种提供一般意义上的正确性检验的验证手段', 'C. 执行表对设计缺陷的验证能力强于跟踪表', 'D. 正确性检验是唯一可靠的设计验证手段'],
    correctAnswer: 'A',
    explanation: 'A ✅。B ❌ C ❌ D ❌：不存在唯一/绝对的验证手段。',
    topic: '软件设计'
  },
  {
    id: 'qclass-26',
    source: '课堂测试',
    type: 'choice',
    question: '关于使用程序正确性证明验证while-do循环时，下列说法中正确的是：',
    options: ['A. 循环判断条件最后一定可以变为false', 'B. 循环条件为真时单独循环结构与循环体+循环结构执行结果一致', 'C. 循环条件为false时循环体内所有变量不能被修改', 'D. 该方法并不能保证循环体算法实现设计意图'],
    correctAnswer: 'ABCD',
    explanation: 'A ✅ 终止性。B ✅ 不变式。C ✅。D ✅：正确性证明不保证算法实现设计意图。',
    topic: '软件设计'
  },
  {
    id: 'qclass-27',
    source: '课堂测试',
    type: 'choice',
    question: '下面描述属于典型客户需求的是：',
    options: ['A. 客户期望', 'B. 预算限制', 'C. 法律法规限制', 'D. 系统功能描述'],
    correctAnswer: 'ABC',
    explanation: 'A ✅ B ✅ C ✅。D ❌：系统功能描述属于产品需求。',
    topic: '需求工程'
  },
  {
    id: 'qclass-28',
    source: '课堂测试',
    type: 'choice',
    question: '下列属于典型的设计标准应该约定的是：',
    options: ['A. 命名规范', 'B. 接口标准', 'C. 出错或者异常处理信息', 'D. 设计表示方式'],
    correctAnswer: 'ABCD',
    explanation: '四项都是团队设计标准：命名规范、接口标准、出错信息、设计表示。',
    topic: '软件设计'
  },
  {
    id: 'qclass-29',
    source: '课堂测试',
    type: 'choice',
    question: '在团队设计活动中，应该注意哪些内容：',
    options: ['A. 设计标准的应用', 'B. 复用的考虑', 'C. 可测试性支持', 'D. 可用性支持'],
    correctAnswer: 'ABCD',
    explanation: '四项都是团队设计核心关注点。',
    topic: '软件设计'
  },
  {
    id: 'qclass-30',
    source: '课堂测试',
    type: 'choice',
    question: '关于集成策略，下述描述中正确的是：',
    options: ['A. 组件质量不高时不可以使用扁平化策略', 'B. 需要尽早获取可工作组件时应该使用集簇式策略', 'C. 组件质量较高时可使用大爆炸式集成策略', 'D. 持续集成本质上就是逐一添加策略'],
    correctAnswer: 'BCD',
    explanation: 'A ❌：扁平化是分层增量集成，组件质量差反而适合分步排查。B ✅ C ✅ D ✅。',
    topic: '软件集成'
  },
  {
    id: 'qclass-31',
    source: '课堂测试',
    type: 'choice',
    question: '选择集成策略的时候，应该考虑下列哪些方面？',
    options: ['A. 待集成组件的质量状态', 'B. 待集成组件的获取方式', 'C. 待集成组件的功能和关系', 'D. 待集成组件的数量'],
    correctAnswer: 'ABCD',
    explanation: '四项都是选择集成策略时需要考虑的方面。',
    topic: '软件集成'
  },
  {
    id: 'qclass-32',
    source: '课堂测试',
    type: 'choice',
    question: '关于扁平化策略和集簇式集成策略，下列说法中正确的是：',
    options: ['A. 扁平化策略可以较早地充分地暴露系统级别的错误', 'B. 扁平化策略对于系统级别错误的暴露能力有限', 'C. 集簇式集成策略有助于复用策略的实现', 'D. 扁平化策略和集簇式策略的优缺点正好相反'],
    correctAnswer: 'BC',
    explanation: 'A ❌：扁平化能较早但不能充分暴露系统级错误。B ✅ C ✅。D ❌：关注点不同，不是恰恰相反。',
    topic: '软件集成'
  },
  {
    id: 'qclass-33',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的验证（Verification）活动？',
    options: ['A. 需求评审', 'B. 详细设计评审', 'C. 单元测试', 'D. 试运行'],
    correctAnswer: 'BC',
    explanation: 'B ✅ C ✅。A ❌：需求评审偏确认。D ❌：试运行属于确认活动。',
    topic: '质量管理'
  },
  {
    id: 'qclass-34',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的确认（Validation）活动？',
    options: ['A. 验收测试', 'B. 代码评审', 'C. 系统测试', 'D. 持续集成'],
    correctAnswer: 'A',
    explanation: 'A ✅：验收测试由用户验证。B ❌ C ❌ D ❌：属于验证活动。',
    topic: '质量管理'
  },
  {
    id: 'qclass-35',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的确认（Validation）对象？',
    options: ['A. 接口设计文档', 'B. 源代码', 'C. 用户手册', 'D. 系统使用培训材料'],
    correctAnswer: 'BCD',
    explanation: 'B ✅ C ✅ D ✅。A ❌：接口设计文档是验证对象。',
    topic: '质量管理'
  },
  {
    id: 'qclass-36',
    source: '课堂测试',
    type: 'choice',
    question: '关于需求开发，下列说法中正确的：',
    options: ['A. 客户需求是指客户提出的关于软件功能的具体要求', 'B. 工期或者预算往往都是客户需求的一个方面', 'C. 产品需求需要跟客户充分讨论才能获取', 'D. 客户应该在需求开发活动中起到主导作用'],
    correctAnswer: 'BC',
    explanation: 'B ✅ C ✅。A ❌：客户需求不只功能，还含预算、法规等。D ❌：需求开发由团队主导。',
    topic: '需求工程'
  },
  {
    id: 'qclass-37',
    source: '课堂测试',
    type: 'choice',
    question: '下列哪些是典型的配置项？',
    options: ['A. 接口设计文档', 'B. 源代码', 'C. 用户手册', 'D. 系统使用培训材料'],
    correctAnswer: 'ABCD',
    explanation: '四项都是典型的配置项，都需要纳入配置管理。',
    topic: '配置管理'
  },
  {
    id: 'qclass-38',
    source: '课堂测试',
    type: 'choice',
    question: '团队内部的配置审计通常应该关注什么：',
    options: ['A. 物理审计', 'B. 配置项列表', 'C. 配置管理记录', 'D. 基线计划'],
    correctAnswer: 'ABCD',
    explanation: '四项都是配置审计应关注的内容。',
    topic: '配置管理'
  },
  {
    id: 'qclass-39',
    source: '课堂测试',
    type: 'choice',
    question: '关于决策分析，下列说法中不恰当的是：',
    options: ['A. 决策分析指南中最关键的是明确判定标准', 'B. 评价方法是体现决策者利益诉求的关键，因此，需要谨慎设计', 'C. 候选方案的识别应该晚于评价标准', 'D. 现实生活中的项目投标就是一个典型的决策分析活动'],
    correctAnswer: 'BD',
    explanation: 'B不恰当：**评价标准**才是关键，不是评价方法。D不恰当：**招标**才是决策分析过程，投标不是。',
    topic: '决策分析'
  },
  {
    id: 'qclass-40',
    source: '课堂测试',
    type: 'choice',
    question: '关于根因分析，下列说法中不恰当的是：',
    options: ['A. 根因分析必须基于丰富的数据来选择合适的问题', 'B. 鱼骨图是根因分析的有效手段', 'C. 典型地，可以从技术、人员、培训以及过程角度开展根因分析', 'D. 根因分析活动终止的唯一特征就是找到相应的根因的明确解决方案'],
    correctAnswer: 'AD',
    explanation: 'A不恰当：有时没有丰富的数据也能开展。D不恰当：有时确定没有解决方案也可以终止。',
    topic: '根因分析'
  },

  // === 往年真题选择题（中期/期中） ===
  {
    id: 'qearly-c1',
    source: '往年真题',
    type: 'choice',
    question: '关于Brooks提及的软件开发本质难题，下列说法中不准确的是：',
    options: ['A. 本质难题总共有四个，分别为复杂、不可见、可变和质量挑战', 'B. 既然是本质难题，就不可能在软件开发当中得到缓解', 'C. 严格来说，只有不可见才是真正的"本质"难题，其他三个因项目而异', 'D. 四大本质难题贯穿软件发展的不同历史阶段，凸显程度不一样'],
    correctAnswer: 'AB',
    explanation: 'A不准确：质量挑战不是本质难题。B不准确：本质难题可以缓解，不可消除。',
    topic: '软件发展'
  },
  {
    id: 'qearly-c2',
    source: '往年真题',
    type: 'choice',
    question: '下列软件应用和开发的典型特征中属于软硬件一体化阶段的是：',
    options: ['A. 可以通过引入操作系统，摆脱硬件束缚', 'B. 几乎不需要考虑需求变更', 'C. 缺乏科班的软件工程师', 'D. 系统兼容对应软件开发的成败非常关键'],
    correctAnswer: 'BC',
    explanation: 'B和C是软硬件一体化阶段的特征。A和D是软件成为独立产品阶段的特征。',
    topic: '软件发展'
  },
  {
    id: 'qearly-c3',
    source: '往年真题',
    type: 'choice',
    question: '下列名词和术语中不属于软件过程的有：',
    options: ['A. SCRUM', 'B. CMM/CMMI', 'C. GATE方法', 'D. IDEAL'],
    correctAnswer: 'BD',
    explanation: 'B（CMM/CMMI）是过程管理模型。D（IDEAL）是过程改进元模型。A和C是软件过程。',
    topic: '软件过程'
  },
  {
    id: 'qearly-c4',
    source: '往年真题',
    type: 'choice',
    question: '下列哪些项不属于管理活动应该包含的要素：',
    options: ['A. 成本', 'B. 质量', 'C. 目标', 'D. 工期'],
    correctAnswer: 'ABD',
    explanation: '管理活动的要素是**目标、状态、纠偏**。成本、质量、工期是三大典型目标，不是管理活动本身的要素。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c5',
    source: '往年真题',
    type: 'choice',
    question: '完成一份完整的项目日程计划，需要下列哪些信息？',
    options: ['A. 任务清单', 'B. 任务顺序', 'C. 质量要求', 'D. 人员资源水平'],
    correctAnswer: 'ABD',
    explanation: '日程计划需要任务清单、任务顺序、人员资源水平。质量要求属于质量计划范畴。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c6',
    source: '往年真题',
    type: 'choice',
    question: '在TSP的团队组建过程中，确定软件开发策略的是第几次会议？',
    options: ['A. 第一次', 'B. 第二次', 'C. 第三次', 'D. 第四次'],
    correctAnswer: 'C',
    explanation: 'TSP第3次会议确定开发策略。第1次建立目标，第2次分配角色，第3次确定策略。',
    topic: '团队管理'
  },
  {
    id: 'qearly-c7',
    source: '往年真题',
    type: 'choice',
    question: '下列术语描述的技术或者方法是同类型的是：',
    options: ['A. CMMI SPICE PDCA', 'B. IDEAL XP SCRUM', 'C. Cleanroom Gate TSP', 'D. Waterfall SCRUM XP'],
    correctAnswer: 'CD',
    explanation: 'C都是软件过程。D都是软件实践。A中SPICE是过程管理；B中IDEAL是过程改进。',
    topic: '软件过程'
  },
  {
    id: 'qearly-c8',
    source: '往年真题',
    type: 'choice',
    question: '下列关于挣值管理方法的描述中错误的是：',
    options: ['A. 跟踪预算消耗', 'B. 高度依赖估算准确性', 'C. 可以支持质量管理', 'D. 跟踪项目进度'],
    correctAnswer: 'C',
    explanation: 'C错误：EVM不能支持质量管理，只关注进度和成本。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c9',
    source: '往年真题',
    type: 'choice',
    question: '下列描述当中，属于过程经理的工作内容有哪些？',
    options: ['A. 建立团队的开发标准', 'B. 主持项目周例会', 'C. 记录周例会的会议记录', 'D. 制定开发计划'],
    correctAnswer: 'AC',
    explanation: 'A和C是过程经理职责。B是项目组长职责。D是计划经理职责。',
    topic: '团队管理'
  },
  {
    id: 'qearly-c10',
    source: '往年真题',
    type: 'choice',
    question: '为了制定Schedule plan，下述描述中，哪一项是不需要的？',
    options: ['A. Task size', 'B. Task Order', 'C. Schedule Hour', 'D. Task hour for each task'],
    correctAnswer: 'A',
    explanation: 'A（Task size）不是制定日程计划的直接输入。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c11',
    source: '往年真题',
    type: 'choice',
    question: '在上题中，还需要补充下述哪一项数据就可以定义Schedule Plan了？',
    options: ['A. Task List', 'B. Plan Value', 'C. Earned Value', 'D. Nothing'],
    correctAnswer: 'A',
    explanation: '还需要补充Task List（任务清单）。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c12',
    source: '往年真题',
    type: 'choice',
    question: 'CMM的创始人是哪位？',
    options: ['A. Boehm', 'B. Juran', 'C. Humphrey', 'D. Crosby'],
    correctAnswer: 'C',
    explanation: 'CMM创始人是Watts Humphrey。',
    topic: '软件过程'
  },
  {
    id: 'qearly-c13',
    source: '往年真题',
    type: 'choice',
    question: 'XP规定开发人员每周工作时间不超过多少小时？',
    options: ['A. 30', 'B. 40', 'C. 50', 'D. 60'],
    correctAnswer: 'B',
    explanation: 'XP规定每周不超过40小时，避免加班降低质量。',
    topic: '敏捷方法'
  },
  {
    id: 'qearly-c14',
    source: '往年真题',
    type: 'choice',
    question: '下列不属于看板方法典型实践的是：',
    options: ['A. 可视化工作流', 'B. 站立式会议', 'C. 限定WIP', 'D. 重构'],
    correctAnswer: 'BD',
    explanation: 'B是Scrum的实践。D是XP的实践。A和C是看板核心实践。',
    topic: '敏捷方法'
  },
  {
    id: 'qearly-c15',
    source: '往年真题',
    type: 'choice',
    question: '下述内容在状态机验证中不用以验证状态机本身是否正确的是：',
    options: ['A. 没有隐藏的陷阱和死循环', 'B. 状态转换是否完整', 'C. 状态描述是否完整', 'D. 状态转换是否正交'],
    correctAnswer: 'C',
    explanation: 'C（状态描述是否完整）不用以验证状态机本身正确性。验证的是状态转换的完整性和正交性，以及无死循环陷阱。',
    topic: '软件设计'
  },
  {
    id: 'qearly-c16',
    source: '2022Fall',
    type: 'choice',
    question: '以下关于规模估算和度量的描述中，正确的是：',
    options: ['A. 功能点是一种可提供精确规模度量结果的方式', 'B. 规模数据扮演了沟通历史数据的桥梁的角色', 'C. 规模估算通常不用于质量计划当中', 'D. PROBE只用于规模估算'],
    correctAnswer: 'B',
    explanation: 'B正确：规模数据扮演沟通历史数据的桥梁角色。A ❌：功能点不能精确度量。C ❌：规模估算可用于质量计划。D ❌：PROBE不只用于规模估算。',
    topic: '项目管理'
  },
  {
    id: 'qearly-c17',
    source: '2022Fall',
    type: 'choice',
    question: '关于PSP缺陷日志，哪些信息是至关重要的：',
    options: ['A. 缺陷发现时间', 'B. 缺陷重现方式', 'C. 缺陷根因描述', 'D. 缺陷关联的其他缺陷'],
    correctAnswer: 'AC',
    explanation: 'A ✅：缺陷发现时间。C ✅：缺陷根因描述。B和D不是至关重要的。',
    topic: '质量管理'
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

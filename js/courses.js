/* =========================================================================
 * 课程数据（可扩展）
 * 想加新课程：往 COURSES 数组里再加一个对象即可，无需改 app.js 逻辑。
 * ========================================================================= */

window.COURSES = [
  {
    id: "mcp",
    emoji: "🔌",
    title: "MCP 入门",
    subtitle: "给 AI 装个万能接口",
    tagline: "零基础 · 边玩边学 · 约 20 分钟",
    gradient: "linear-gradient(135deg,#ff8fb1 0%,#ffb6c9 55%,#c4b5fd 100%)",
    mascot: "🤖",
    mascotName: "布丁",
    lessons: [
      /* ---------- 第 0 课：欢迎 ---------- */
      {
        id: "mcp-0",
        emoji: "👋",
        title: "认识布丁 & 冒险地图",
        minutes: 2,
        xp: 30,
        intro: "认识你的学习搭子布丁，看看这次冒险怎么玩。",
        blocks: [
          { type: "text", html: "你好呀，<b>{{name}}</b>！我是<b>布丁</b>🤖，你的学习搭子。<br/>接下来的几站，我会带你认识一个叫 <b>MCP</b> 的小家伙。" },
          { type: "callout", tone: "fun", title: "🗺️ 这次冒险的地图", html: "我们要经过 <b>6 个小站</b>，每一站都超短（2~4 分钟）👇<br/>① MCP 是什么　② 没有它多麻烦　③ 三个小伙伴　④ 点菜流程　⑤ 动手接一个工具　⑥ 毕业啦！" },
          { type: "callout", tone: "tip", title: "🎮 怎么玩才好玩？", html: "每答对一题会得到 <b>✨经验值(XP)</b>、每完成一站会 <b>撒花庆祝</b>，还会解锁<b>徽章</b>🏅。<br/>连着几天来，<b>🔥连击</b>会越攒越高。学一点、赢一点，超有成就感！" },
          { type: "quiz", id: "mcp-0-q1", question: "先来个热身题：布丁是谁呀？", options: [
            { text: "一只会陪你学习的小机器人 🤖", correct: true },
            { text: "一杯奶茶 🧋", correct: false },
            { text: "一道甜品 🍮", correct: false }
          ], explain: "对啦！布丁就是你的专属学习搭子，会一路陪你闯关～" },
          { type: "final", html: "热身结束，走起！下一站我们正式开始认识 <b>MCP</b> ～" }
        ]
      },

      /* ---------- 第 1 课：MCP 是什么 ---------- */
      {
        id: "mcp-1",
        emoji: "❓",
        title: "MCP 是个啥？",
        minutes: 3,
        xp: 50,
        intro: "用一个「万能转接头」的比喻，秒懂 MCP。",
        blocks: [
          { type: "text", html: "你有没有遇到过：手机、平板、耳机……<b>充电口长得不一样</b>，出门要带一堆线，烦死了😤。<br/>要是有一个<b>万能转接头</b>，任何线插上去都能用，是不是超爽？" },
          { type: "callout", tone: "analogy", title: "🔌 万能转接头", html: "MCP 就是 <b>AI 世界的万能转接头</b>。<br/>AI 想用各种工具/数据，不用再给每个工具做一根「专属线」，只要都插到这个<b>统一接口</b>上就行。" },
          { type: "text", html: "<b>MCP</b> = <b>M</b>odel <b>C</b>ontext <b>P</b>rotocol，中文叫「<b>模型上下文协议</b>」。<br/>别被名字吓到，它本质就一句话：<b>给 AI 一个统一的标准接口，去连接各种工具和数据。</b>" },
          { type: "quiz", id: "mcp-1-q1", question: "MCP 更像下面哪个东西？", options: [
            { text: "一个万能转接头 🔌", correct: true },
            { text: "一节电池 🔋", correct: false },
            { text: "一个遥控器 🎮", correct: false }
          ], explain: "没错！MCP 就是让 AI 和所有工具之间「一个接口通吃」的标准。" },
          { type: "match", id: "mcp-1-m1", prompt: "连一连：把左右两边配成对 👇", pairs: [
            { left: "工具 / 数据 🛠️", right: "各种电器 📱" },
            { left: "MCP 🔌", right: "万能转接头 🔌" },
            { left: "AI 助手 🤖", right: "插座 / 电源 ⚡" }
          ], explain: "工具→电器，AI→电源，MCP→转接头。工具和 AI 之间，就差一个 MCP 转接头！" },
          { type: "final", html: "记住这句话就够啦：<b>MCP = AI 的万能接口</b>。下一站看看没有它会有多抓狂。" }
        ]
      },

      /* ---------- 第 2 课：没有 MCP 多麻烦 ---------- */
      {
        id: "mcp-2",
        emoji: "😫",
        title: "没有它，有多抓狂？",
        minutes: 3,
        xp: 50,
        intro: "看看「一个工具一根专属线」到底有多乱。",
        blocks: [
          { type: "text", html: "想象一下：<b>没有统一接口</b>的时代，AI 每认识一个新工具，工程师都要单独给它写一套「对接代码」——就像给每个电器都单独造一根<b>专属充电线</b>。" },
          { type: "callout", tone: "warn", title: "😵 专属线地狱", html: "你的 AI 想用 <b>10 个工具</b>？那就得做 <b>10 根专属线</b>。<br/>20 个工具 = 20 根线…… 线缠成一团，又贵又容易坏，还改一次累一次。" },
          { type: "quiz", id: "mcp-2-q1", question: "如果 AI 想用 10 个不同的工具，没 MCP 时大概要做几根「专属线」？", options: [
            { text: "10 根", correct: true },
            { text: "1 根", correct: false },
            { text: "0 根", correct: false }
          ], explain: "对，一个工具一根线，10 个工具就是 10 根，想想就头大😵。" },
          { type: "text", html: "有了 <b>MCP</b> 之后：<br/>工程师只要让工具「<b>说标准的 MCP 话</b>」、插到标准接口上，<b>任何 AI 都能直接用它</b>。<br/>一次对接，到处通用 ✨" },
          { type: "callout", tone: "fun", title: "🌈 一次对接，到处通用", html: "工具作者：写好一个 MCP 接口 ✅<br/>所有 AI（Claude、ChatGPT、各种助手……）：都能直接接上 ✅<br/>你：开箱即用，超省心 ✅" },
          { type: "quiz", id: "mcp-2-q2", question: "下面哪句话说得对？", options: [
            { text: "MCP 让一个工具能被很多 AI 通用", correct: true },
            { text: "MCP 让每个 AI 都更费电", correct: false },
            { text: "MCP 是一种新手机", correct: false }
          ], explain: "Bingo！一次对接、到处通用，这正是 MCP 的厉害之处。" },
          { type: "final", html: "搞懂「为什么需要它」啦。下一站认识 MCP 家里的 <b>三个小伙伴</b>～" }
        ]
      },

      /* ---------- 第 3 课：三个小伙伴 ---------- */
      {
        id: "mcp-3",
        emoji: "👥",
        title: "三个小伙伴",
        minutes: 4,
        xp: 50,
        intro: "用「点外卖」认识 Host、Client、Server。",
        blocks: [
          { type: "text", html: "MCP 的运转里，有三个重要的<b>小伙伴</b>。我们用「<b>点外卖</b>」来记，超好记👇" },
          { type: "callout", tone: "analogy", title: "🍜 点外卖三人组", html: "<b>👤 顾客</b>（想吃饭的人）　→　<b>Host（宿主）</b>：你正在用的 AI 应用，比如 Claude、聊天助手<br/><b>📱 外卖 App</b>（下单通道）　→　<b>Client（客户端）</b>：AI 内部的「连接器」，负责跟外面沟通<br/><b>👨‍🍳 餐厅后厨</b>（真正做菜）　→　<b>Server（服务器）</b>：提供工具/数据的那一方" },
          { type: "match", id: "mcp-3-m1", prompt: "把三个小伙伴和它们的比喻连起来 👇", pairs: [
            { left: "Host（宿主）", right: "顾客 👤" },
            { left: "Client（客户端）", right: "外卖 App 📱" },
            { left: "Server（服务器）", right: "餐厅后厨 👨‍🍳" }
          ], explain: "Host=顾客，Client=外卖App，Server=后厨。以后想到点外卖，就想起这三个小伙伴啦！" },
          { type: "text", html: "后厨（Server）会端出三种「菜」：<br/>🍳 <b>Tools 工具</b>：能帮 AI 干活（查天气、读文件、发消息…）<br/>🥬 <b>Resources 资源</b>：能提供的数据/资料<br/>📝 <b>Prompts 提示模板</b>：现成的提问模板" },
          { type: "quiz", id: "mcp-3-q1", question: "「餐厅后厨」对应的是哪个小伙伴？", options: [
            { text: "Server（服务器）", correct: true },
            { text: "Host（宿主）", correct: false },
            { text: "Client（客户端）", correct: false }
          ], explain: "后厨负责真正做菜，Server 负责真正提供工具/数据，对上了！" },
          { type: "final", html: "三个小伙伴都认识啦！下一站看看它们是怎么<b>配合起来</b>的。" }
        ]
      },

      /* ---------- 第 4 课：点菜流程 ---------- */
      {
        id: "mcp-4",
        emoji: "🔄",
        title: "一次「点菜」怎么发生",
        minutes: 3,
        xp: 50,
        intro: "把「AI 调用工具」排成一条清晰的流水线。",
        blocks: [
          { type: "text", html: "三个小伙伴是怎么配合的？其实就是一条<b>流水线</b>👇" },
          { type: "callout", tone: "fun", title: "🍜 点菜流水线", html: "你下单 → 平台传给后厨 → 后厨做菜 → 平台把菜送回 → 你开吃<br/><br/>换成 AI：<br/>你提问 → AI 想用工具 → 通过 MCP 找到并调用工具 → 工具干活并返回结果 → AI 把答案告诉你" },
          { type: "order", id: "mcp-4-o1", prompt: "给下面的流程排个正确的顺序（从「你提问」开始）👇", items: [
            "你提问 🙋",
            "AI 想用某个工具 🤔",
            "通过 MCP 找到并调用工具 🔌",
            "工具干活并返回结果 🛠️",
            "AI 把答案告诉你 ✅"
          ], explain: "完美！这就是 MCP 一次完整「点菜」的全过程。" },
          { type: "quiz", id: "mcp-4-q1", question: "「工具干活并返回结果」之后，接下来发生什么？", options: [
            { text: "AI 把答案告诉你 ✅", correct: true },
            { text: "工具自己消失了", correct: false },
            { text: "AI 重新开始提问", correct: false }
          ], explain: "对！工具把结果交回来，AI 整理成你能听懂的话告诉你。" },
          { type: "final", html: "流程理顺啦！下一站就是最爽的——<b>亲手给 AI 接一个工具</b> 🔧" }
        ]
      },

      /* ---------- 第 5 课：动手接一个工具 ---------- */
      {
        id: "mcp-5",
        emoji: "🔧",
        title: "动手！接第一个工具",
        minutes: 4,
        xp: 60,
        intro: "看一眼真实的配置，亲手把它补完整。",
        blocks: [
          { type: "text", html: "到了最爽的一站：<b>亲手给 AI 接一个工具</b>！<br/>我们接一个「<b>文件系统</b>」工具——让 AI 能读取你电脑上指定文件夹里的文件 📁" },
          { type: "callout", tone: "tip", title: "💡 真实世界长这样", html: "在 Claude Desktop 等应用里，通常就是<b>加一小段配置</b>，告诉它「这里有一个工具，怎么启动」。下面就是一个例子（别怕，看个眼熟就行）：" },
          { type: "code", lang: "json", code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/我的资料"]
    }
  }
}` },
          { type: "text", html: "这段配置在说：<b>“我有一个叫 filesystem 的工具，用 npx 启动它，它管着 /我的资料 这个文件夹”</b>。<br/>改一下文件夹路径，就能让 AI 读你指定的文件啦。" },
          { type: "fill", id: "mcp-5-f1", prompt: "小挑战：这段配置最外层的「工具清单」叫 <code>___</code>（看上面代码里的英文哦）", sentence: "最外层写着 \"___\"，里面装着各个工具。", answers: ["mcpServers", "mcpservers"], explain: "对！最外层的 mcpServers 就是「工具清单」，里面每个 key（比如 filesystem）就是一个工具。" },
          { type: "quiz", id: "mcp-5-q1", question: "想换个文件夹让 AI 读取，最可能改哪里？", options: [
            { text: "路径 \"/我的资料\" 那个位置", correct: true },
            { text: "把 npx 改成 mp3", correct: false },
            { text: "什么都不用改", correct: false }
          ], explain: "对，改路径就能让 AI 读不同文件夹，其余大多照抄即可。" },
          { type: "callout", tone: "fun", title: "🎉 你已经会了！", html: "真实世界里，MCP 就是这么用的：<b>找一个现成的工具 → 加一行配置 → AI 就能用了</b>。不同 App 界面略有差别，但思路完全一样。" },
          { type: "final", html: "恭喜你亲手「接」好了第一个工具！最后一站：<b>毕业大闯关</b> 🎓" }
        ]
      },

      /* ---------- 第 6 课：毕业大闯关 ---------- */
      {
        id: "mcp-6",
        emoji: "🎓",
        title: "毕业大闯关",
        minutes: 4,
        xp: 100,
        intro: "把一路学到的都拿出来，通关领毕业证！",
        blocks: [
          { type: "text", html: "毕业大闯关来啦！一共 <b>4 道题</b>，答完就解锁毕业证书 🎓<br/>放轻松，都是我们一路学过的～" },
          { type: "quiz", id: "mcp-6-q1", question: "① MCP 的全称是什么？", options: [
            { text: "Model Context Protocol", correct: true },
            { text: "Model Control Program", correct: false },
            { text: "My Cool Plug", correct: false }
          ], explain: "对！Model Context Protocol（模型上下文协议）。" },
          { type: "quiz", id: "mcp-6-q2", question: "② MCP 最像生活中的什么？", options: [
            { text: "万能转接头 🔌", correct: true },
            { text: "充电宝", correct: false },
            { text: "路由器天线", correct: false }
          ], explain: "万能转接头——统一接口，一次对接、到处通用。" },
          { type: "quiz", id: "mcp-6-q3", question: "③ 「餐厅后厨」对应哪个角色？", options: [
            { text: "Server（服务器）", correct: true },
            { text: "Host（宿主）", correct: false },
            { text: "Client（客户端）", correct: false }
          ], explain: "Server 负责真正提供工具和数据，就像后厨负责做菜。" },
          { type: "quiz", id: "mcp-6-q4", question: "④ 给 AI 接一个新工具，通常要做的事是？", options: [
            { text: "加一小段配置，告诉它工具怎么启动", correct: true },
            { text: "给 AI 买新手机", correct: false },
            { text: "把 AI 关机重启 100 次", correct: false }
          ], explain: "对！加配置、指定工具，就是 MCP 的标准用法。" },
          { type: "final", html: "闯关完成！你已经是一名<b>合格的 MCP 小冒险家</b>啦 🏆<br/>点击下方按钮，领取你的毕业证书和超多奖励吧～" }
        ]
      }
    ],

    /* ---------- 本课程的徽章 ---------- */
    badges: [
      { id: "mcp-b-welcome", emoji: "🌱", name: "新手启航", desc: "完成第 0 课", cond: { lesson: "mcp-0" } },
      { id: "mcp-b-l1", emoji: "💡", name: "概念入门", desc: "完成「MCP 是个啥」", cond: { lesson: "mcp-1" } },
      { id: "mcp-b-l3", emoji: "🧩", name: "拼图小能手", desc: "完成 5 课", cond: { lessons: 5 } },
      { id: "mcp-b-perfect", emoji: "⚡", name: "一次全对", desc: "整课挑战一次通过", cond: { perfect: true } },
      { id: "mcp-b-streak", emoji: "🔥", name: "三日连击", desc: "连续学习 3 天", cond: { streak: 3 } },
      { id: "mcp-b-grad", emoji: "🎓", name: "毕业啦", desc: "完成全部课程", cond: { courseDone: true } }
    ]
  }
];

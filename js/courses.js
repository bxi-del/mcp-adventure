/* =========================================================================
 * 课程数据（可扩展）
 * 想加新课程：往 COURSES 数组里再加一个对象即可，无需改 app.js 逻辑。
 * 学习目标节奏：约 100 节课 ≈ 100 级（每节课完成 +500 XP，答题另 +20 XP）。
 * ========================================================================= */

window.COURSES = [
  /* =======================================================================
   * 课程一：MCP 入门（零基础）
   * ======================================================================= */
  {
    id: "mcp",
    emoji: "🔌",
    title: "MCP 入门",
    subtitle: "给 AI 装个万能接口",
    tagline: "零基础 · 边玩边学 · 12 关",
    gradient: "linear-gradient(135deg,#ff8fb1 0%,#ffb6c9 55%,#c4b5fd 100%)",
    mascotName: "明兰",
    lessons: [
      {
        id: "mcp-0",
        emoji: "👋",
        title: "认识明兰 & 学习地图",
        minutes: 2,
        xp: 500,
        intro: "认识你的学习搭子明兰，看看这次冒险怎么玩。",
        blocks: [
          { type: "text", html: "你好呀，<b>{{name}}</b>！我是<b>明兰</b>👧🏻，你的学习搭子。<br/>接下来的几站，我会带你认识一个叫 <b>MCP</b> 的小家伙，学完你就能给 AI「装接口」啦。" },
          { type: "callout", tone: "fun", title: "🗺️ 学习地图", html: "这次要闯 <b>12 个小站</b>，每一站都超短（2~4 分钟）👇<br/>① MCP 是什么　② 没有它多麻烦　③ 三个小伙伴　④ 点菜流程　⑤ 三个法宝　⑥ 动手接工具<br/>⑦ 找现成工具　⑧ 传输方式　⑨ 安全提醒　⑩ 复习　⑪ 毕业闯关" },
          { type: "callout", tone: "tip", title: "🎮 怎么玩才好玩？", html: "每答对一题得 <b>✨经验值(XP)</b>、每完成一站 <b>撒花庆祝</b>、还能解锁<b>徽章</b>🏅。<br/>升到 <b>100 / 200 / 300 级</b>会有<b>神秘大奖</b>🎁！连着几天来，<b>🔥连击</b>会越攒越高。" },
          { type: "quiz", id: "mcp-0-q1", question: "先来个热身题：你的学习搭子是谁呀？", options: [
            { text: "会陪你学习的明兰 👧🏻", correct: true },
            { text: "一杯奶茶 🧋", correct: false },
            { text: "一只小猫 🐱", correct: false }
          ], explain: "对啦！明兰就是你的专属学习搭子，会一路陪你闯关～" },
          { type: "final", html: "热身结束，走起！下一站我们正式开始认识 <b>MCP</b> ～" }
        ]
      },
      {
        id: "mcp-1",
        emoji: "❓",
        title: "MCP 是个啥？",
        minutes: 3,
        xp: 500,
        intro: "用一个「万能转接头」的比喻，秒懂 MCP。",
        blocks: [
          { type: "text", html: "你有没有遇到过：手机、平板、耳机……<b>充电口长得不一样</b>，出门要带一堆线，烦死了😤。<br/>要是有一个<b>万能转接头</b>，任何线插上去都能用，是不是超爽？" },
          { type: "callout", tone: "analogy", title: "🔌 万能转接头", html: "MCP 就是 <b>AI 世界的万能转接头</b>。<br/>AI 想用各种工具/数据，不用再给每个工具做一根「专属线」，只要都插到这个<b>统一接口</b>上就行。" },
          { type: "text", html: "<b>MCP</b> = <b>M</b>odel <b>C</b>ontext <b>P</b>rotocol，中文叫「<b>模型上下文协议</b>」，是一个<b>开放标准</b>（2024 年由 Anthropic 发起）。<br/>别被名字吓到，本质一句话：<b>给 AI 一个统一标准接口，去连接各种工具和数据。</b>" },
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
          { type: "final", html: "记住这句话：<b>MCP = AI 的万能接口</b>。下一站看看没有它会有多抓狂。" }
        ]
      },
      {
        id: "mcp-2",
        emoji: "😫",
        title: "没有它，有多抓狂？",
        minutes: 3,
        xp: 500,
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
      {
        id: "mcp-3",
        emoji: "👥",
        title: "三个小伙伴",
        minutes: 4,
        xp: 500,
        intro: "用「点外卖」认识 Host、Client、Server。",
        blocks: [
          { type: "text", html: "MCP 的运转里，有三个重要的<b>小伙伴</b>。我们用「<b>点外卖</b>」来记，超好记👇" },
          { type: "callout", tone: "analogy", title: "🍜 点外卖三人组", html: "<b>👤 顾客</b>（想吃饭的人）　→　<b>Host（宿主）</b>：你正在用的 AI 应用，比如 Claude、ChatGPT<br/><b>📱 外卖 App</b>（下单通道）　→　<b>Client（客户端）</b>：AI 内部的「连接器」，负责跟外面沟通<br/><b>👨‍🍳 餐厅后厨</b>（真正做菜）　→　<b>Server（服务器）</b>：提供工具/数据的那一方" },
          { type: "match", id: "mcp-3-m1", prompt: "把三个小伙伴和它们的比喻连起来 👇", pairs: [
            { left: "Host（宿主）", right: "顾客 👤" },
            { left: "Client（客户端）", right: "外卖 App 📱" },
            { left: "Server（服务器）", right: "餐厅后厨 👨‍🍳" }
          ], explain: "Host=顾客，Client=外卖App，Server=后厨。以后想到点外卖，就想起这三个小伙伴啦！" },
          { type: "callout", tone: "idea", title: "💡 小知识：一个 Host 可以有多个 Client", html: "一个 AI 应用（Host）可能同时接着好几个不同的工具，所以它内部可以有<b>多个 Client</b>，每个 Client 连一个 Server。就像你手机里能同时装好几个外卖 App 一样。" },
          { type: "quiz", id: "mcp-3-q1", question: "「餐厅后厨」对应的是哪个小伙伴？", options: [
            { text: "Server（服务器）", correct: true },
            { text: "Host（宿主）", correct: false },
            { text: "Client（客户端）", correct: false }
          ], explain: "后厨负责真正做菜，Server 负责真正提供工具/数据，对上了！" },
          { type: "final", html: "三个小伙伴都认识啦！下一站看看它们是怎么<b>配合起来</b>的。" }
        ]
      },
      {
        id: "mcp-4",
        emoji: "🔄",
        title: "一次「点菜」怎么发生",
        minutes: 3,
        xp: 500,
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
          { type: "final", html: "流程理顺啦！下一站认识 MCP 的 <b>三个法宝</b>——Tools、Resources、Prompts。" }
        ]
      },
      {
        id: "mcp-5",
        emoji: "🛠️",
        title: "三个法宝：Tools / Resources / Prompts",
        minutes: 4,
        xp: 500,
        intro: "Server 会端出的三种「菜」，各有什么用？",
        blocks: [
          { type: "text", html: "还记得「后厨」（Server）吗？它会端出三种不同的「菜」，也就是 MCP 的<b>三个法宝</b>👇" },
          { type: "callout", tone: "analogy", title: "🍳 三个法宝", html: "<b>🍳 Tools 工具</b>：能帮 AI「干活」——查天气、读文件、发消息、搜网页……<br/><b>🥬 Resources 资源</b>：能给 AI 的「资料」——文件内容、数据库数据、API 返回……<br/><b>📝 Prompts 提示模板</b>：现成的「提问模板」——一键套用的固定话术" },
          { type: "match", id: "mcp-5-m1", prompt: "把三个法宝和它们的用途连起来 👇", pairs: [
            { left: "Tools 工具", right: "帮 AI 干活（查天气/读文件）" },
            { left: "Resources 资源", right: "给 AI 资料（文件/数据）" },
            { left: "Prompts 模板", right: "现成的提问话术" }
          ], explain: "Tools=干活，Resources=资料，Prompts=话术。三样加起来，AI 就全能啦！" },
          { type: "quiz", id: "mcp-5-q1", question: "AI 想「查今天的天气」，这更像哪个法宝？", options: [
            { text: "Tools 工具", correct: true },
            { text: "Resources 资源", correct: false },
            { text: "Prompts 模板", correct: false }
          ], explain: "对！「查天气」是一个动作/能力，所以是 Tools 工具。" },
          { type: "final", html: "三个法宝记住了。下一站是最爽的——<b>亲手给 AI 接一个工具</b> 🔧" }
        ]
      },
      {
        id: "mcp-6",
        emoji: "🔧",
        title: "动手！接第一个工具",
        minutes: 4,
        xp: 500,
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
          { type: "fill", id: "mcp-6-f1", prompt: "小挑战：这段配置最外层的「工具清单」叫 <code>___</code>（看上面代码里的英文哦）", sentence: "最外层写着 \"___\"，里面装着各个工具。", answers: ["mcpServers", "mcpservers"], explain: "对！最外层的 mcpServers 就是「工具清单」，里面每个 key（比如 filesystem）就是一个工具。" },
          { type: "quiz", id: "mcp-6-q1", question: "想换个文件夹让 AI 读取，最可能改哪里？", options: [
            { text: "路径 \"/我的资料\" 那个位置", correct: true },
            { text: "把 npx 改成 mp3", correct: false },
            { text: "什么都不用改", correct: false }
          ], explain: "对，改路径就能让 AI 读不同文件夹，其余大多照抄即可。" },
          { type: "final", html: "恭喜你亲手「接」好了第一个工具！下一站：<b>去哪找现成的工具</b>～" }
        ]
      },
      {
        id: "mcp-7",
        emoji: "🗂️",
        title: "去哪找现成的工具？",
        minutes: 3,
        xp: 500,
        intro: "不用自己造轮子，这些地方有现成的 MCP 工具。",
        blocks: [
          { type: "text", html: "好消息：<b>绝大多数工具不用自己写</b>！社区已经做好了海量现成的 MCP Server，你只要「加一行配置」就能用。" },
          { type: "callout", tone: "fun", title: "🔍 两个找工具的宝藏地", html: "① <b>官方 Registry（注册表）</b>：modelcontextprotocol.io/registry，官方收录<br/>② <b>awesome-mcp-servers</b>：GitHub 上一个超全的社区精选清单，按「浏览器/数据库/搜索/文件」等分类" },
          { type: "quiz", id: "mcp-7-q1", question: "想快速找到现成的 MCP 工具，可以去哪？", options: [
            { text: "官方 Registry 或 awesome-mcp-servers 清单", correct: true },
            { text: "自己从头写一个", correct: false },
            { text: "去菜市场问", correct: false }
          ], explain: "对！先去 Registry 和 awesome 清单里淘，能找到就「加配置即用」，找不到再自己写。" },
          { type: "links", title: "🔗 找工具的入口", links: [
            { label: "MCP 官方 Registry", url: "https://modelcontextprotocol.io/registry/about", desc: "官方收录的工具注册表" },
            { label: "awesome-mcp-servers（GitHub）", url: "https://github.com/punkpeye/awesome-mcp-servers", desc: "社区精选 MCP Server 清单" }
          ] },
          { type: "final", html: "淘工具的技能 get！下一站搞懂「<b>本地 vs 远程</b>」的传输方式～" }
        ]
      },
      {
        id: "mcp-8",
        emoji: "📡",
        title: "本地 vs 远程：传输方式",
        minutes: 4,
        xp: 500,
        intro: "工具「插」在哪里？先懂本地与远程的区别。",
        blocks: [
          { type: "text", html: "一个 MCP 工具，可以<b>跑在你电脑本地</b>，也可以<b>跑在远方的服务器上</b>。这就涉及到「传输方式」。" },
          { type: "callout", tone: "analogy", title: "📡 两种传输方式", html: "<b>① stdio（本地）</b>：工具像你电脑上装的一个小程序，AI 直接「喊」它干活。快、私密，数据不出本机。<br/><b>② Streamable HTTP（远程）</b>：工具跑在别人服务器上，AI 通过网址去调用。适合团队共享、联网服务。<br/>（还有一种老的 SSE 方式，正在被 Streamable HTTP 取代，知道即可。）" },
          { type: "quiz", id: "mcp-8-q1", question: "想把「读自己电脑文件」的工具跑在本地、数据不出本机，用哪种传输方式？", options: [
            { text: "stdio（本地）", correct: true },
            { text: "Streamable HTTP（远程）", correct: false },
            { text: "快递", correct: false }
          ], explain: "对！本地工具用 stdio，快且私密。远程共享才用 Streamable HTTP。" },
          { type: "final", html: "传输方式有个印象就够了（进阶课会讲透）。下一站：<b>安全小提醒</b>～" }
        ]
      },
      {
        id: "mcp-9",
        emoji: "🛡️",
        title: "安全小提醒",
        minutes: 3,
        xp: 500,
        intro: "AI 会读会写，所以要给工具「设好边界」。",
        blocks: [
          { type: "text", html: "给 AI 装工具很爽，但也要留个心眼：<b>AI 会按你的指令读、写、甚至删文件</b>。所以给工具的「权限范围」要设好边界。" },
          { type: "callout", tone: "warn", title: "🛡️ 三条安全守则", html: "① <b>只给需要的权限</b>：比如文件工具只给某一个文件夹，别给整个硬盘<br/>② <b>别乱接来路不明的工具</b>：优先用官方/知名来源<br/>③ <b>重要操作前先看清</b>：让 AI 说清楚它准备干什么，再批准" },
          { type: "quiz", id: "mcp-9-q1", question: "接「文件」工具时，哪种做法更安全？", options: [
            { text: "只开放某个指定文件夹给它", correct: true },
            { text: "把整个电脑硬盘都开放给它", correct: false },
            { text: "顺便把密码也告诉它", correct: false }
          ], explain: "对！最小权限原则——只给需要的范围，风险就小很多。" },
          { type: "final", html: "安全守则记心里。下一站把一路学的<b>串起来复习</b>～" }
        ]
      },
      {
        id: "mcp-10",
        emoji: "🧠",
        title: "复习小结",
        minutes: 3,
        xp: 500,
        intro: "把核心概念再过一遍，打牢地基。",
        blocks: [
          { type: "callout", tone: "idea", title: "📋 一张图复习全部", html: "<b>MCP</b>：AI 的万能接口（统一标准）<br/><b>三伙伴</b>：Host（AI 应用）→ Client（连接器）→ Server（提供工具）<br/><b>三法宝</b>：Tools 干活 / Resources 资料 / Prompts 话术<br/><b>用法</b>：找现成工具 → 加一行配置 → AI 就能用" },
          { type: "order", id: "mcp-10-o1", prompt: "把「用上一个 MCP 工具」的正确顺序排出来 👇", items: [
            "找一个现成的 MCP 工具",
            "加一行配置（告诉 AI 怎么启动它）",
            "给工具设好权限范围",
            "AI 调用工具帮你干活"
          ], explain: "完美！找工具 → 加配置 → 设权限 → 开用，这就是标准流程。" },
          { type: "final", html: "地基打牢啦！最后一站：<b>毕业大闯关</b> 🎓" }
        ]
      },
      {
        id: "mcp-11",
        emoji: "🎓",
        title: "毕业大闯关",
        minutes: 4,
        xp: 500,
        intro: "把一路学到的都拿出来，通关领毕业证！",
        blocks: [
          { type: "text", html: "毕业大闯关来啦！一共 <b>4 道题</b>，答完就解锁毕业证书 🎓<br/>放轻松，都是我们一路学过的～" },
          { type: "quiz", id: "mcp-11-q1", question: "① MCP 的全称是什么？", options: [
            { text: "Model Context Protocol", correct: true },
            { text: "Model Control Program", correct: false },
            { text: "My Cool Plug", correct: false }
          ], explain: "对！Model Context Protocol（模型上下文协议）。" },
          { type: "quiz", id: "mcp-11-q2", question: "② 「餐厅后厨」对应哪个角色？", options: [
            { text: "Server（服务器）", correct: true },
            { text: "Host（宿主）", correct: false },
            { text: "Client（客户端）", correct: false }
          ], explain: "Server 负责真正提供工具和数据，就像后厨负责做菜。" },
          { type: "quiz", id: "mcp-11-q3", question: "③ 想让 AI「读文件」，这属于哪个法宝？", options: [
            { text: "Tools 工具", correct: true },
            { text: "Resources 资源", correct: false },
            { text: "Prompts 模板", correct: false }
          ], explain: "「读文件」是个动作，属于 Tools 工具。" },
          { type: "quiz", id: "mcp-11-q4", question: "④ 给 AI 接一个新工具，通常要做的事是？", options: [
            { text: "加一小段配置，告诉它工具怎么启动", correct: true },
            { text: "给 AI 买新手机", correct: false },
            { text: "把 AI 关机重启 100 次", correct: false }
          ], explain: "对！加配置、指定工具，就是 MCP 的标准用法。" },
          { type: "final", html: "入门闯关完成！你已经是一名<b>合格的 MCP 小冒险家</b>啦 🏆<br/>点击下方按钮领取毕业证书，然后就可以挑战<b>「MCP 进阶」</b>课程了～" }
        ]
      }
    ],
    badges: [
      { id: "mcp-b-welcome", emoji: "🌱", name: "新手启航", desc: "完成第 0 关", cond: { lesson: "mcp-0" } },
      { id: "mcp-b-l1", emoji: "💡", name: "概念入门", desc: "完成「MCP 是个啥」", cond: { lesson: "mcp-1" } },
      { id: "mcp-b-half", emoji: "🧩", name: "拼图小能手", desc: "完成 6 关", cond: { lessons: 6 } },
      { id: "mcp-b-perfect", emoji: "⚡", name: "一次全对", desc: "整关挑战一次通过", cond: { perfect: true } },
      { id: "mcp-b-streak", emoji: "🔥", name: "三日连击", desc: "连续学习 3 天", cond: { streak: 3 } },
      { id: "mcp-b-grad", emoji: "🎓", name: "入门毕业", desc: "完成入门全部关卡", cond: { courseDone: true } }
    ]
  },

  /* =======================================================================
   * 课程二：MCP 进阶（专业深入）
   * ======================================================================= */
  {
    id: "mcp-advanced",
    emoji: "🧠",
    title: "MCP 进阶",
    subtitle: "深入原理与实战开发",
    tagline: "专业 · 含官方文档与视频课 · 13 关",
    gradient: "linear-gradient(135deg,#38bdf8 0%,#7dd3fc 55%,#a78bfa 100%)",
    mascotName: "明兰",
    lessons: [
      {
        id: "adv-0",
        emoji: "🧭",
        title: "进阶导览 & 学习路径",
        minutes: 2,
        xp: 500,
        intro: "进阶课会学什么？需要什么基础？",
        blocks: [
          { type: "text", html: "欢迎来到<b>进阶课</b>！这里会更「专业」：讲协议、讲原理、甚至<b>手写一个 MCP Server</b>。<br/>别担心，我会继续用大白话 + 小例子带你走。" },
          { type: "callout", tone: "tip", title: "🎯 你会学到", html: "① MCP 架构全景　② 通信协议 JSON-RPC　③ 传输方式详解<br/>④ 认证授权　⑤ Tools/Resources/Prompts 深入　⑥ Sampling/Roots<br/>⑦ 用 Python / TypeScript 写 Server　⑧ 真实世界最佳实践" },
          { type: "callout", tone: "fun", title: "📚 课前准备", html: "完成「MCP 入门」即可。想跟做代码的话，准备一个能跑 Python 或 Node.js 的电脑环境就行（不写代码也能听懂原理）。" },
          { type: "quiz", id: "adv-0-q1", question: "进阶课会带你「手写」什么东西？", options: [
            { text: "一个 MCP Server", correct: true },
            { text: "一个手机 App", correct: false },
            { text: "一个游戏", correct: false }
          ], explain: "对！我们会用 Python 和 TypeScript 各写一个简单的 MCP Server。" },
          { type: "final", html: "准备好了吗？第一站：<b>MCP 架构全景</b> 🏗️" }
        ]
      },
      {
        id: "adv-1",
        emoji: "🏗️",
        title: "架构全景",
        minutes: 4,
        xp: 500,
        intro: "从「上帝视角」看清 MCP 的完整版图。",
        blocks: [
          { type: "text", html: "入门课我们认识了 Host / Client / Server。进阶版要把这幅图<b>看得更完整</b>。" },
          { type: "callout", tone: "analogy", title: "🏗️ 完整架构", html: "<b>Host（AI 应用）</b>里可以装<b>多个 Client</b>，每个 Client 连一个 Server。<br/>两边各自「贡献」能力：<br/>Server 提供 → <b>Tools / Resources / Prompts</b><br/>Client 提供 → <b>Sampling / Roots / Elicitation</b><br/>双方连接时还会先「<b>握手</b>」：初始化 + 互相告知自己支持哪些能力（能力协商）。" },
          { type: "match", id: "adv-1-m1", prompt: "把能力和「谁提供」连起来 👇", pairs: [
            { left: "Tools / Resources / Prompts", right: "Server 提供" },
            { left: "Sampling / Roots", right: "Client 提供" },
            { left: "初始化 + 能力协商", right: "连接时双方握手" }
          ], explain: "Server 给工具/资料/模板，Client 给采样/目录，连上先握手协商。" },
          { type: "quiz", id: "adv-1-q1", question: "一个 Host（AI 应用）内部，可以有几个 Client？", options: [
            { text: "多个（每个连一个 Server）", correct: true },
            { text: "只能有一个", correct: false },
            { text: "永远没有", correct: false }
          ], explain: "对！一个 Host 可以同时接多个工具，所以有多个 Client。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "官方架构文档 Architecture", url: "https://modelcontextprotocol.io/specification/2025-11-25/architecture", desc: "官方对架构的权威定义" }
          ] },
          { type: "final", html: "版图看清了。下一站：MCP 的「语言」——<b>JSON-RPC</b>。" }
        ]
      },
      {
        id: "adv-2",
        emoji: "💬",
        title: "通信协议：JSON-RPC 2.0",
        minutes: 4,
        xp: 500,
        intro: "Client 和 Server 是怎么「说话」的？",
        blocks: [
          { type: "text", html: "Client 和 Server 之间说的「行话」，是一种叫 <b>JSON-RPC 2.0</b> 的协议。<br/>简单说：就是用 <b>JSON 格式</b>发「请求」，对方回「结果」或「报错」。" },
          { type: "callout", tone: "analogy", title: "💬 三种消息", html: "<b>① 请求 Request</b>：带一个 id，问对方要结果<br/><b>② 响应 Response</b>：带同样的 id，回「结果」或「错误」<br/><b>③ 通知 Notification</b>：不带 id，只发消息、不期待回复" },
          { type: "code", lang: "json", code: `// 一个「调用工具」的请求示例
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "city": "杭州" }
  }
}` },
          { type: "quiz", id: "adv-2-q1", question: "MCP 的消息遵循哪个协议规范？", options: [
            { text: "JSON-RPC 2.0", correct: true },
            { text: "HTML 5", correct: false },
            { text: "蓝牙 4.0", correct: false }
          ], explain: "对！MCP 所有消息都遵循 JSON-RPC 2.0 规范。" },
          { type: "quiz", id: "adv-2-q2", question: "「不带 id、只发消息不期待回复」的是哪种消息？", options: [
            { text: "通知 Notification", correct: true },
            { text: "请求 Request", correct: false },
            { text: "响应 Response", correct: false }
          ], explain: "对！Notification 不带 id，是「单向通知」。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "JSON-RPC 2.0 规范", url: "https://www.jsonrpc.org/specification", desc: "协议的官方规范" },
            { label: "MCP 官方 Spec（Base Protocol）", url: "https://modelcontextprotocol.io/specification/2025-11-25/basic", desc: "MCP 对消息的权威定义" }
          ] },
          { type: "final", html: "会「听行话」了。下一站：<b>传输方式</b>详解。" }
        ]
      },
      {
        id: "adv-3",
        emoji: "📡",
        title: "传输方式详解",
        minutes: 4,
        xp: 500,
        intro: "stdio vs Streamable HTTP vs SSE，怎么选？",
        blocks: [
          { type: "text", html: "入门课提过「本地 vs 远程」。进阶版把三种传输方式<b>一次讲清</b>。" },
          { type: "callout", tone: "analogy", title: "📡 三种传输对比", html: "<b>stdio（本地）</b>：把 JSON 消息当「命令行输入输出」传，工具和 AI 在同一台机器。<br/><b>Streamable HTTP（远程，推荐）</b>：用一个 HTTP 地址传消息，支持「服务器主动推流」，是远程的主流选择。<br/><b>SSE（远程，旧）</b>：单向「服务器→客户端」事件流，正在被 Streamable HTTP 取代。" },
          { type: "quiz", id: "adv-3-q1", question: "远程 MCP 现在推荐用哪种传输方式？", options: [
            { text: "Streamable HTTP", correct: true },
            { text: "stdio", correct: false },
            { text: "SSE（已过时）", correct: false }
          ], explain: "对！远程首选 Streamable HTTP；SSE 是旧的，正在退役。" },
          { type: "match", id: "adv-3-m1", prompt: "把传输方式和「场景」连起来 👇", pairs: [
            { left: "stdio", right: "本地工具，数据不出本机" },
            { left: "Streamable HTTP", right: "远程工具，团队共享" },
            { left: "SSE", right: "旧远程方式，正被取代" }
          ], explain: "本地用 stdio，远程用 Streamable HTTP，SSE 是老黄历。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "官方 Transports 文档", url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/transports", desc: "传输方式的权威说明" }
          ] },
          { type: "final", html: "传输方式拿下。下一站：<b>认证与授权</b>。" }
        ]
      },
      {
        id: "adv-4",
        emoji: "🔐",
        title: "认证与授权",
        minutes: 4,
        xp: 500,
        intro: "远程工具怎么保证「只有你能用」？",
        blocks: [
          { type: "text", html: "本地工具（stdio）就在你电脑里，相对安全。但<b>远程工具</b>跑在别人服务器上，得先「验明正身」——这就是<b>认证授权</b>。" },
          { type: "callout", tone: "analogy", title: "🔐 OAuth 2.1", html: "MCP 的远程认证用的是 <b>OAuth 2.1</b>（跟「用微信/Google 登录第三方 App」是同一套思路）。<br/>流程大概是：AI 想连远程 Server → Server 说「先去授权」→ 你授权 → 拿到一个 <b>token（令牌）</b> → 之后都带着 token 访问。" },
          { type: "quiz", id: "adv-4-q1", question: "MCP 远程认证主要用哪种协议？", options: [
            { text: "OAuth 2.1", correct: true },
            { text: "FTP", correct: false },
            { text: "SMTP", correct: false }
          ], explain: "对！远程用 OAuth 2.1 做认证授权。" },
          { type: "quiz", id: "adv-4-q2", question: "授权成功后，客户端后续访问会带着什么？", options: [
            { text: "token（令牌）", correct: true },
            { text: "你的手机号", correct: false },
            { text: "不用带任何东西", correct: false }
          ], explain: "对！拿到 token 后，后续请求都带着它，Server 凭 token 识别你。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "官方 Authorization 文档", url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization", desc: "认证授权规范" }
          ] },
          { type: "final", html: "安全课通关。下一站：把 <b>Tools</b> 挖深一点。" }
        ]
      },
      {
        id: "adv-5",
        emoji: "🍳",
        title: "Tools 深入",
        minutes: 4,
        xp: 500,
        intro: "一个工具是怎么被精确定义的？",
        blocks: [
          { type: "text", html: "入门课说 Tools 是「干活的能力」。进阶版看它<b>内部结构</b>：一个 Tool 要告诉 AI 三件事——" },
          { type: "callout", tone: "analogy", title: "🍳 一个 Tool 的「说明书」", html: "<b>① 名字 name</b>：比如 get_weather<br/><b>② 描述 description</b>：告诉 AI 这工具是干嘛的、什么时候该用<br/><b>③ 参数 schema</b>：用 <b>JSON Schema</b> 定义入参（比如 city 必须是字符串）<br/><br/>AI 就是靠这张「说明书」来正确调用工具、并校验参数类型。" },
          { type: "code", lang: "json", code: `// 工具的「参数说明书」示意（JSON Schema）
{
  "name": "get_weather",
  "description": "查询城市天气",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": { "type": "string", "description": "城市名" }
    },
    "required": ["city"]
  }
}` },
          { type: "quiz", id: "adv-5-q1", question: "工具靠什么来定义「参数长什么样、什么类型」？", options: [
            { text: "JSON Schema", correct: true },
            { text: "一张照片", correct: false },
            { text: "一段录音", correct: false }
          ], explain: "对！用 JSON Schema 精确描述入参的类型、必填项等。" },
          { type: "final", html: "Tools 看清了。下一站：<b>Resources</b> 深入。" }
        ]
      },
      {
        id: "adv-6",
        emoji: "🥬",
        title: "Resources 深入",
        minutes: 4,
        xp: 500,
        intro: "资料是怎么被地址化、还能订阅更新的？",
        blocks: [
          { type: "text", html: "Resources 是给 AI 的「资料」。进阶版看它的两个高级特性：<b>地址</b>和<b>订阅</b>。" },
          { type: "callout", tone: "analogy", title: "🥬 Resources 两个特性", html: "<b>① 用 URI 当「门牌号」</b>：每份资料有一个唯一地址，像 file:///docs/report.md、db://users。<br/><b>② 内容协商</b>：同一份资料，AI 可以要「纯文本」，也可以要「二进制」（如图片）。<br/><b>③ 订阅更新</b>：资料变了，Server 能主动通知 AI「文件更新啦」，不用反复问。" },
          { type: "quiz", id: "adv-6-q1", question: "每份 Resource 用什么来当「唯一门牌号」？", options: [
            { text: "URI", correct: true },
            { text: "手机号", correct: false },
            { text: "身份证号", correct: false }
          ], explain: "对！Resource 用 URI 唯一标识，AI 按地址取资料。" },
          { type: "final", html: "Resources 拿下。下一站：<b>Prompts</b> 深入。" }
        ]
      },
      {
        id: "adv-7",
        emoji: "📝",
        title: "Prompts 深入",
        minutes: 4,
        xp: 500,
        intro: "带参数的「话术模板」，还能引用资料。",
        blocks: [
          { type: "text", html: "Prompts 是「现成的提问模板」。进阶版看它两个进阶点：<b>参数化</b>和<b>引用资源</b>。" },
          { type: "callout", tone: "analogy", title: "📝 模板的两个进阶点", html: "<b>① 参数化</b>：模板里留「填空」，比如「写一封给 {{name}} 的感谢信」，用时填 name 即可。<br/><b>② 引用资源</b>：模板里可以「内嵌」某份资料，AI 写文案时自动带上那份资料当上下文。" },
          { type: "quiz", id: "adv-7-q1", question: "一个 Prompt 模板「留空、用时再填」的能力叫什么？", options: [
            { text: "参数化", correct: true },
            { text: "加密", correct: false },
            { text: "压缩", correct: false }
          ], explain: "对！参数化让模板可复用，填不同值出不同结果。" },
          { type: "final", html: "三个法宝都挖深了。下一站：Client 那边的能力 <b>Sampling / Roots</b>。" }
        ]
      },
      {
        id: "adv-8",
        emoji: "🤝",
        title: "Client 的能力：Sampling / Roots",
        minutes: 5,
        xp: 500,
        intro: "这次是「反过来」——Server 也能让 Client 帮忙。",
        blocks: [
          { type: "text", html: "前面都是「Client 找 Server 要工具」。其实还有<b>反过来的情况</b>：Server 也能请求 Client 帮忙。这就是 <b>Sampling</b> 和 <b>Roots</b>。" },
          { type: "callout", tone: "analogy", title: "🤝 三个「反向」能力", html: "<b>① Sampling（采样）</b>：Server 反过来请「AI 模型」帮它生成一段内容（Server 自己没有大脑）。<br/><b>② Roots（根目录）</b>：Server 问 Client「你能访问哪些文件夹」，好让工具知道边界。<br/><b>③ Elicitation（征询）</b>：Server 向「用户」要信息（比如「请用户选一个文件」）。" },
          { type: "quiz", id: "adv-8-q1", question: "「Server 请 AI 模型帮它生成内容」是哪个能力？", options: [
            { text: "Sampling", correct: true },
            { text: "Roots", correct: false },
            { text: "Cookies", correct: false }
          ], explain: "对！Sampling 让 Server 能「借用」AI 模型的能力。" },
          { type: "match", id: "adv-8-m1", prompt: "连一连反向能力 👇", pairs: [
            { left: "Sampling", right: "Server 请 AI 生成内容" },
            { left: "Roots", right: "Server 问可访问的文件夹" },
            { left: "Elicitation", right: "Server 向用户要信息" }
          ], explain: "Sampling=借 AI，Roots=问目录，Elicitation=问用户。" },
          { type: "final", html: "双向能力都懂了。下一站开始<b>动手写代码</b>！🐍" }
        ]
      },
      {
        id: "adv-9",
        emoji: "🐍",
        title: "用 Python 写一个 Server",
        minutes: 5,
        xp: 500,
        intro: "用官方 Python SDK (FastMCP) 写个天气工具。",
        blocks: [
          { type: "text", html: "动手时间！用官方 <b>Python SDK</b> 里的 <b>FastMCP</b>，几行代码写一个「查天气」工具。<br/>（原理看懂了就行，不要求你现在就装环境。）" },
          { type: "callout", tone: "tip", title: "🐍 极简示例", html: "一个 <code>@mcp.tool()</code> 装饰器就定义一个工具；<code>mcp.run()</code> 默认用 stdio 传输启动。" },
          { type: "code", lang: "python", code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather")

@mcp.tool()
def get_weather(city: str) -> str:
    """查询指定城市的天气"""
    return f"{city}：晴，25°C"

if __name__ == "__main__":
    mcp.run()   # 默认 stdio 传输` },
          { type: "quiz", id: "adv-9-q1", question: "FastMCP 里定义一个工具，用的装饰器是？", options: [
            { text: "@mcp.tool()", correct: true },
            { text: "@app.route()", correct: false },
            { text: "@click.option()", correct: false }
          ], explain: "对！@mcp.tool() 装饰器把函数变成一个 MCP 工具。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "官方 Python SDK", url: "https://github.com/modelcontextprotocol/python-sdk", desc: "Python 官方 SDK 仓库" }
          ] },
          { type: "final", html: "Python 版写好啦。下一站：<b>TypeScript</b> 版本。" }
        ]
      },
      {
        id: "adv-10",
        emoji: "🟦",
        title: "用 TypeScript 写一个 Server",
        minutes: 5,
        xp: 500,
        intro: "用官方 TypeScript SDK 写同样的工具。",
        blocks: [
          { type: "text", html: "同样一个「查天气」工具，用官方 <b>TypeScript SDK</b> 也能写。它常用 <b>zod</b> 库来定义参数类型。" },
          { type: "code", lang: "typescript", code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "weather", version: "1.0.0" });

server.tool("get_weather", { city: z.string() }, async ({ city }) => ({
  content: [{ type: "text", text: city + ": 晴 25°C" }]
}));

await server.connect(new StdioServerTransport());` },
          { type: "quiz", id: "adv-10-q1", question: "TypeScript SDK 里常用哪个库来定义参数类型？", options: [
            { text: "zod", correct: true },
            { text: "react", correct: false },
            { text: "jquery", correct: false }
          ], explain: "对！官方 TypeScript SDK 常用 zod 做参数校验。" },
          { type: "links", title: "🔗 深入阅读", links: [
            { label: "官方 TypeScript SDK", url: "https://github.com/modelcontextprotocol/typescript-sdk", desc: "TypeScript 官方 SDK 仓库" }
          ] },
          { type: "final", html: "两种语言都会写啦！下一站：<b>真实世界</b>的最佳实践。" }
        ]
      },
      {
        id: "adv-11",
        emoji: "🌍",
        title: "真实世界 & 最佳实践",
        minutes: 4,
        xp: 500,
        intro: "热门工具、生态现状、实用建议。",
        blocks: [
          { type: "text", html: "学了原理和开发，最后看看<b>真实世界怎么用</b>。" },
          { type: "callout", tone: "fun", title: "🌍 生态现状", html: "热门 MCP Server 有：<b>filesystem</b>（文件）、<b>github</b>（代码仓库）、<b>brave-search</b>（搜索）、<b>puppeteer</b>（浏览器自动化）、<b>memory</b>（记忆）、<b>sqlite</b>（数据库）…… 数量还在快速增长。" },
          { type: "callout", tone: "tip", title: "✨ 三条实用建议", html: "① <b>先淘后写</b>：先去 Registry / awesome 清单找现成的<br/>② <b>最小权限</b>：只给工具必要的访问范围<br/>③ <b>写清描述</b>：工具的 description 写得好，AI 才调用得准" },
          { type: "quiz", id: "adv-11-q1", question: "想让 AI 调用工具更「准」，最关键的是？", options: [
            { text: "把工具的 description 写清楚", correct: true },
            { text: "把工具名字起得越长越好", correct: false },
            { text: "把工具藏起来", correct: false }
          ], explain: "对！description 是 AI 判断「何时用、怎么用」的依据，写清楚很重要。" },
          { type: "final", html: "最后一站：<b>资源库</b>——官方文档、视频课、社区全在这。" }
        ]
      },
      {
        id: "adv-12",
        emoji: "📚",
        title: "延伸资源库",
        minutes: 3,
        xp: 500,
        intro: "官方文档、视频课、社区，收藏这一站就够。",
        blocks: [
          { type: "text", html: "把进阶课提到的权威资料<b>汇总在这里</b>，想深入时来这一站翻就行。👇" },
          { type: "links", title: "🏛️ 官方一手资料", links: [
            { label: "MCP 官方网站", url: "https://modelcontextprotocol.io", desc: "总入口，文档 + 规范 + 注册表" },
            { label: "官方 GitHub 组织", url: "https://github.com/modelcontextprotocol", desc: "规范与各语言 SDK" },
            { label: "官方入门教程", url: "https://modelcontextprotocol.io/docs/2025-11-25/getting-started/intro", desc: "Getting Started" }
          ] },
          { type: "links", title: "🎬 视频课 & 中文教程", links: [
            { label: "B站搜「MCP 教程」", url: "https://search.bilibili.com/all?keyword=MCP%E6%95%99%E7%A8%8B", desc: "大量中文视频实战课" },
            { label: "MCP 终极指南（博客园）", url: "https://www.cnblogs.com/Mickey-7/p/23083453", desc: "中文基础篇+进阶篇笔记" }
          ] },
          { type: "links", title: "🧰 社区 & 工具清单", links: [
            { label: "awesome-mcp-servers", url: "https://github.com/punkpeye/awesome-mcp-servers", desc: "精选 Server 清单" },
            { label: "Awesome-MCP（客户端/工具）", url: "https://github.com/tonydzi/Awesome-MCP", desc: "MCP 生态大合集" }
          ] },
          { type: "quiz", id: "adv-12-q1", question: "想系统查 MCP 权威资料，第一站应该去哪？", options: [
            { text: "MCP 官方网站 modelcontextprotocol.io", correct: true },
            { text: "随便一个短视频", correct: false },
            { text: "问路边的 AI", correct: false }
          ], explain: "对！官方站是权威第一站，其余资源作为补充。" },
          { type: "final", html: "进阶课全部通关！你已经从「会用 MCP」升级到「懂原理、会开发」啦 🎉<br/>点击下方按钮领取进阶毕业证书吧～" }
        ]
      }
    ],
    badges: [
      { id: "adv-b-start", emoji: "🧭", name: "进阶启程", desc: "完成进阶导览", cond: { lesson: "adv-0" } },
      { id: "adv-b-proto", emoji: "💬", name: "协议达人", desc: "完成「JSON-RPC」", cond: { lesson: "adv-2" } },
      { id: "adv-b-dev", emoji: "👩‍💻", name: "开发者", desc: "完成「写 Server」任一课", cond: { lesson: "adv-9" } },
      { id: "adv-b-half", emoji: "🧠", name: "进阶过半", desc: "完成 7 关", cond: { lessons: 7 } },
      { id: "adv-b-grad", emoji: "🏆", name: "进阶毕业", desc: "完成进阶全部关卡", cond: { courseDone: true } }
    ]
  },

  /* =======================================================================
   * 课程三：Prompt 高效入门（零基础）
   * ======================================================================= */
  {
    id: "prompt",
    emoji: "🪄",
    title: "Prompt 高效入门",
    subtitle: "把话说清楚，AI 更听话",
    tagline: "零基础 · 万能公式 · 10 关",
    gradient: "linear-gradient(135deg,#fbbf24 0%,#fcd34d 55%,#34d399 100%)",
    mascotName: "明兰",
    lessons: [
      {
        id: "prompt-0",
        emoji: "👋",
        title: "为什么学 Prompt？",
        minutes: 2,
        xp: 500,
        intro: "一句话：会提问，AI 才高效。",
        blocks: [
          { type: "text", html: "欢迎来到第三门课！这次我们不学「技术」，学一门更通用的本事——<b>怎么把话说清楚，让 AI 少跑偏</b>。" },
          { type: "callout", tone: "analogy", title: "🪄 Prompt 是什么？", html: "Prompt 就是你对 AI 说的那段话。<br/>同一个 AI，你问得糊里糊涂，它就答得乱七八糟；你问得清清楚楚，它就答得又快又准。<b>好 Prompt 就像会魔法。</b>" },
          { type: "quiz", id: "prompt-0-q1", question: "一个好的 Prompt 能带来什么？", options: [
            { text: "让 AI 答得更准、更省时间", correct: true },
            { text: "让 AI 更耗电", correct: false },
            { text: "让电脑变快", correct: false }
          ], explain: "对！好 Prompt 的核心价值就是「更准、更快、少返工」。" },
          { type: "final", html: "下一站，我教你一个<b>万能公式</b>，背下来就能用～" }
        ]
      },
      {
        id: "prompt-1",
        emoji: "🧮",
        title: "万能公式",
        minutes: 4,
        xp: 500,
        intro: "五样东西拼成一个好 Prompt。",
        blocks: [
          { type: "text", html: "写 Prompt 有个<b>万能公式</b>，五个零件拼起来就行：" },
          { type: "callout", tone: "idea", title: "🧮 万能公式", html: "<b>[角色]</b> 你是谁<br/><b>[任务]</b> 帮我干什么<br/><b>[具体要求]</b> 多长、什么风格、给谁看<br/><b>[参考/上下文]</b> 把材料贴给它<br/><b>[输出格式]</b> 要它输出成什么样" },
          { type: "match", id: "prompt-1-m1", prompt: "把公式零件和它的作用连起来 👇", pairs: [
            { left: "角色", right: "让它进入正确状态" },
            { left: "任务", right: "说清要干嘛" },
            { left: "具体要求", right: "长度/风格/语气" },
            { left: "参考上下文", right: "贴材料，别让它猜" }
          ], explain: "角色=进入状态，任务=干嘛，要求=长什么样，参考=给材料。" },
          { type: "quiz", id: "prompt-1-q1", question: "下面哪个 Prompt 最完整？", options: [
            { text: "「你是耐心的数学老师，给10岁孩子用100字讲清什么是分数，要口语化，附上一个小例子」", correct: true },
            { text: "「讲一下分数」", correct: false },
            { text: "「数学」", correct: false }
          ], explain: "对！第一个有角色、任务、要求、长度和例子，信息最全。" },
          { type: "final", html: "公式记住了。下一站拆开看第一个零件：<b>角色</b>。" }
        ]
      },
      {
        id: "prompt-2",
        emoji: "🎭",
        title: "角色：一句「你是一个…」",
        minutes: 3,
        xp: 500,
        intro: "开头一句话，效果立竿见影。",
        blocks: [
          { type: "text", html: "最划算的一招：开头加一句 <b>「你是一位……的……」</b>，AI 会立刻切换到那个「身份」来回答。" },
          { type: "callout", tone: "fun", title: "🎭 对比", html: "❌ 「帮我看看这段代码哪里错了」<br/>✅ 「<b>你是一位资深程序员</b>，帮我看看这段代码哪里错了，顺便告诉我怎么改」<br/><br/>同样的问题，第二个答案会更专业、更具体。" },
          { type: "quiz", id: "prompt-2-q1", question: "下面哪个「角色设定」最可能让回答更专业？", options: [
            { text: "「你是一位有 10 年经验的营养师」", correct: true },
            { text: "「你是个随便的人」", correct: false },
            { text: "什么都不加", correct: false }
          ], explain: "对！具体、有专业感的角色设定，能让 AI 更「入戏」。" },
          { type: "final", html: "角色这招最好用。下一站：<b>任务和具体要求</b>。" }
        ]
      },
      {
        id: "prompt-3",
        emoji: "🎯",
        title: "任务 & 具体要求",
        minutes: 4,
        xp: 500,
        intro: "要什么、多长、什么风格、给谁看。",
        blocks: [
          { type: "text", html: "任务要<b>具体</b>，要求要<b>说全</b>。常见的要求有四类：<b>长度、风格、语气、受众</b>。" },
          { type: "callout", tone: "tip", title: "🎯 四类要求", html: "<b>长度</b>：写 100 字 / 3 段<br/><b>风格</b>：正式 / 轻松 / 幽默<br/><b>语气</b>：温柔 / 专业 / 鼓励<br/><b>受众</b>：给 10 岁小孩 / 给老板 / 给初学者" },
          { type: "quiz", id: "prompt-3-q1", question: "想让 AI 写一份「给老板看的周报」，哪个要求最该写清？", options: [
            { text: "受众是老板 + 要正式、简洁", correct: true },
            { text: "让 AI 随便写", correct: false },
            { text: "只写「写个周报」", correct: false }
          ], explain: "对！受众和风格决定语气，「给老板+正式简洁」是最关键的信息。" },
          { type: "final", html: "要求说全了。下一站：<b>给上下文和示例</b>。" }
        ]
      },
      {
        id: "prompt-4",
        emoji: "📎",
        title: "给上下文 & 示例",
        minutes: 4,
        xp: 500,
        intro: "贴材料、给例子，别让它瞎猜。",
        blocks: [
          { type: "text", html: "AI 不会读心。你能给它材料，就别只用嘴描述——<b>直接贴代码、贴原文、贴资料</b>。" },
          { type: "callout", tone: "analogy", title: "📎 两种「给料」", html: "<b>① 贴上下文</b>：把报错代码、原文、简历直接粘进去。<br/><b>② 给示例（few-shot）</b>：告诉它「照着这个格式写」，并给 1~2 个例子，它就能稳定模仿。" },
          { type: "quiz", id: "prompt-4-q1", question: "想让 AI 帮你改一段报错代码，最有效的做法是？", options: [
            { text: "把报错代码和报错信息一起贴给它", correct: true },
            { text: "口头描述「好像有个 bug」", correct: false },
            { text: "只发「帮我修」", correct: false }
          ], explain: "对！把原始代码和报错信息都贴过去，AI 才能对症下药。" },
          { type: "final", html: "会「喂料」了。下一站：<b>输出格式</b>。" }
        ]
      },
      {
        id: "prompt-5",
        emoji: "📐",
        title: "输出格式",
        minutes: 3,
        xp: 500,
        intro: "要它输出成什么样，直接说。",
        blocks: [
          { type: "text", html: "想让答案好用，就<b>规定它的形状</b>：表格、列表、分点、还是 JSON。" },
          { type: "callout", tone: "tip", title: "📐 常用格式", html: "「用 3 个要点回答」<br/>「做成一个对比表格」<br/>「按 标题→摘要→正文 的结构写」<br/>「只输出 JSON 格式」" },
          { type: "quiz", id: "prompt-5-q1", question: "想要一个「优缺点对比」，最好让 AI 输出成什么格式？", options: [
            { text: "对比表格", correct: true },
            { text: "一大段散文", correct: false },
            { text: "一首诗", correct: false }
          ], explain: "对！对比信息用表格最清晰，直接要求它「做成表格」即可。" },
          { type: "final", html: "格式也会管了。下一站是个「大招」：<b>让它先想再说</b>。" }
        ]
      },
      {
        id: "prompt-6",
        emoji: "🧠",
        title: "先想再说",
        minutes: 4,
        xp: 500,
        intro: "加一句「一步步来」，减少胡编。",
        blocks: [
          { type: "text", html: "遇到难题，AI 急着给答案容易错。这时加一句 <b>「先分析一下，再给出答案」</b> 或 <b>「一步一步来」</b>，它会先理清思路，答案准很多。" },
          { type: "callout", tone: "analogy", title: "🧠 为什么有效？", html: "就像考试时先打草稿再写答案，比直接写对的多。<br/>让 AI「先思考」= 给它时间打草稿，减少一本正经地胡说。" },
          { type: "quiz", id: "prompt-6-q1", question: "遇到一个复杂的推理题，哪句「追加要求」最能提高准确率？", options: [
            { text: "「先分析，再一步步给出答案」", correct: true },
            { text: "「越快越好，别废话」", correct: false },
            { text: "什么都不加", correct: false }
          ], explain: "对！「先分析、一步步来」能显著减少 AI 瞎编答案。" },
          { type: "final", html: "会「逼它打草稿」了。下一站：<b>拆解复杂任务</b>。" }
        ]
      },
      {
        id: "prompt-7",
        emoji: "🧩",
        title: "拆解 & 迭代",
        minutes: 4,
        xp: 500,
        intro: "大任务拆小步，不满意就让它改。",
        blocks: [
          { type: "text", html: "别指望一句话让 AI 交出一篇完美长文。<b>大任务拆成小步</b>，一步步来，质量高得多。" },
          { type: "order", id: "prompt-7-o1", prompt: "把「写一篇长文章」的高效流程排个序 👇", items: [
            "先让 AI 列出大纲",
            "确认大纲后再按大纲写",
            "写完后让它自查并修改",
            "最后润色定稿"
          ], explain: "对！大纲→写→改→定稿，拆开走，每一步都更可控。" },
          { type: "quiz", id: "prompt-7-q1", question: "AI 写的第一版不满意，最高效的做法是？", options: [
            { text: "在对话里让它「改这里、换那个」", correct: true },
            { text: "删掉对话，重新从零问一遍", correct: false },
            { text: "放弃", correct: false }
          ], explain: "对！在已有回答上让它修改，比从头重问省时省力得多。" },
          { type: "final", html: "会拆解、会迭代了。下一站：<b>避坑 + 实战</b>。" }
        ]
      },
      {
        id: "prompt-8",
        emoji: "⚠️",
        title: "常见坑 & 实战",
        minutes: 4,
        xp: 500,
        intro: "三个最容易犯的错，一眼识破。",
        blocks: [
          { type: "callout", tone: "warn", title: "⚠️ 三个常见坑", html: "① <b>太模糊</b>：只说「帮我写个东西」，让 AI 瞎猜<br/>② <b>一次塞太多</b>：一个问题问 8 件事，答得杂<br/>③ <b>不验收</b>：写完不检查，错在哪都不知道" },
          { type: "quiz", id: "prompt-8-q1", question: "下面哪个是「太模糊」的 Prompt？", options: [
            { text: "「帮我弄一下这个」", correct: true },
            { text: "「帮我把这段 200 字的简介改得口语化一点」", correct: false },
            { text: "「用表格对比 A 和 B 的优缺点」", correct: false }
          ], explain: "对！「弄一下这个」既没说清「这个」是什么，也没说要什么样，最模糊。" },
          { type: "final", html: "坑都认清了。最后一站：<b>毕业闯关</b> 🎓" }
        ]
      },
      {
        id: "prompt-9",
        emoji: "🎓",
        title: "毕业闯关",
        minutes: 4,
        xp: 500,
        intro: "四道题，通关领毕业证！",
        blocks: [
          { type: "text", html: "毕业闯关来啦，<b>4 道题</b>，都是这一路学过的～" },
          { type: "quiz", id: "prompt-9-q1", question: "① 万能公式里，「角色」的作用是？", options: [
            { text: "让它进入正确的状态", correct: true },
            { text: "规定字数", correct: false },
            { text: "给代码", correct: false }
          ], explain: "对！角色让它「入戏」，回答更专业对味。" },
          { type: "quiz", id: "prompt-9-q2", question: "② 想让 AI 稳定模仿某种格式，最有效的是？", options: [
            { text: "给它一个示例（few-shot）", correct: true },
            { text: "什么都不给", correct: false },
            { text: "让它猜", correct: false }
          ], explain: "对！给个例子，它照着模仿，格式最稳。" },
          { type: "quiz", id: "prompt-9-q3", question: "③ 遇到复杂推理题，加哪句最能提高准确率？", options: [
            { text: "「先分析，再一步步给出答案」", correct: true },
            { text: "「随便写写」", correct: false },
            { text: "「别思考，直接说」", correct: false }
          ], explain: "对！让它「先想再说」，减少胡编。" },
          { type: "quiz", id: "prompt-9-q4", question: "④ 一次想让它干很多事，最好的做法是？", options: [
            { text: "拆成多个小任务，一步步来", correct: true },
            { text: "一句话全塞给它", correct: false },
            { text: "不告诉它要干嘛", correct: false }
          ], explain: "对！大任务拆小步，质量更高、更可控。" },
          { type: "final", html: "Prompt 闯关完成！你已经掌握了「高效提问」的本事 🎉<br/>点击下方按钮领取毕业证书吧～" }
        ]
      }
    ],
    badges: [
      { id: "prompt-b-start", emoji: "👋", name: "提问新手", desc: "完成「为什么学 Prompt」", cond: { lesson: "prompt-0" } },
      { id: "prompt-b-formula", emoji: "🧮", name: "公式达人", desc: "完成「万能公式」", cond: { lesson: "prompt-1" } },
      { id: "prompt-b-half", emoji: "🎯", name: "提问高手", desc: "完成 5 关", cond: { lessons: 5 } },
      { id: "prompt-b-grad", emoji: "🎓", name: "Prompt 毕业", desc: "完成 Prompt 全部关卡", cond: { courseDone: true } }
    ]
  }
];

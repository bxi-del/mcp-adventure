# 🎓 课程中心

一个**零基础、不枯燥**的 AI 学习课程中心。跟着「明兰」一起闯关，边玩边学。

- 🌸 可爱萌系界面
- 🎮 闯关 + 经验值(XP) + **300 级等级** + 徽章 + 连击 + 撒花
- 🎁 **100 / 200 / 300 级神秘大奖**（约 100 节课 ≈ 100 级）
- 📚 多门课程：**MCP 入门**（12 关）+ **MCP 进阶**（13 关，含官方文档 / SDK / 视频课链接）
- 🧠 短关卡设计，对注意力易分散的小伙伴（ADHD）友好
- 📱 手机 / 电脑都能用
- 💾 进度自动保存在浏览器本地（localStorage），无需注册登录

## 怎么用

直接打开 `index.html` 即可，或部署到任意静态托管（GitHub Pages / Vercel / Netlify 等）。

没有任何构建步骤，不需要安装任何东西。

## 目录结构

```
mcp-adventure/
├── index.html        # 页面骨架
├── styles.css        # 可爱萌系样式与动画
└── js/
    ├── courses.js    # ★ 课程内容（数据，可扩展）
    └── app.js        # 应用逻辑（渲染、互动、奖励、存档）
```

## 想加新课程？超简单 👇

所有课程都在 `js/courses.js` 里，是一个 `COURSES` 数组。**新增一门课 = 往数组里再塞一个对象**，不用改任何逻辑代码。

一个课程对象长这样：

```js
{
  id: "新课程的id",            // 唯一，别和已有的重复
  emoji: "🎨",
  title: "课程名",
  subtitle: "一句话介绍",
  tagline: "小标签",
  gradient: "linear-gradient(135deg,#ff8fb1,#c4b5fd)",
  mascot: "🦊",               // 这门课的吉祥物
  mascotName: "小狐狸",
  lessons: [ /* 关卡列表 */ ],
  badges: [ /* 徽章列表 */ ]
}
```

### 关卡（lesson）支持的内容块类型

| 类型 | 说明 | 例子 |
|------|------|------|
| `text` | 一段话（支持 `<b>` 加粗、`{{name}}` 显示名字） | `{ type:"text", html:"你好，<b>{{name}}</b>！" }` |
| `callout` | 彩色提示框，`tone` 可选 `fun`/`tip`/`warn`/`analogy`/`idea` | `{ type:"callout", tone:"fun", title:"标题", html:"内容" }` |
| `code` | 代码块 | `{ type:"code", code:"..." }` |
| `quiz` | 选择题（+10 XP） | 见下方示例 |
| `match` | 连连看连线（+15 XP） | 见下方示例 |
| `order` | 排序题（+15 XP） | 见下方示例 |
| `fill` | 填空题（+10 XP） | 见下方示例 |
| `final` | 关卡收尾的话 | `{ type:"final", html:"..." }` |

### 各互动块示例

```js
// 选择题
{ type:"quiz", id:"唯一id", question:"问题？",
  options:[{ text:"对的", correct:true }, { text:"错的", correct:false }],
  explain:"答对后的讲解" }

// 连连看（左右配对）
{ type:"match", id:"唯一id", prompt:"把两边连起来",
  pairs:[{ left:"左边1", right:"右边1" }, { left:"左边2", right:"右边2" }],
  explain:"连对啦" }

// 排序（按正确顺序写 items 即可，页面会自动打乱）
{ type:"order", id:"唯一id", prompt:"排个顺序",
  items:["第一步","第二步","第三步"],
  explain:"顺序对啦" }

// 填空（sentence 里的 "___" 是空格，answers 是正确答案，可多个）
{ type:"fill", id:"唯一id", prompt:"填一下",
  sentence:"答案是 \"___\"", answers:["mcpServers"],
  explain:"填对啦" }
```

> 每个互动块的 `id` 必须**全局唯一**（用来记录「这道题已经答过、发过奖励」）。

### 徽章（badge）的解锁条件 `cond`

| cond | 含义 |
|------|------|
| `{ lesson:"关卡id" }` | 完成某个关卡 |
| `{ lessons: 5 }` | 完成 ≥5 个关卡 |
| `{ courseDone:true }` | 完成全部关卡 |
| `{ streak: 3 }` | 连续学习 ≥3 天 |
| `{ perfect:true }` | 任一关卡所有挑战一次答对 |

---

开心学习，去给 AI 装个万能接口吧 🔌✨

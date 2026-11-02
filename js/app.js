/* =========================================================================
 * 课程中心 · 应用逻辑
 * 渲染、互动、奖励（XP / 300级 / 里程碑神秘大奖 / 徽章 / 连击 / 撒花）、持久化
 * ========================================================================= */

(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const SITE_NAME = '课程中心';
  // 稳定存储 key：以后永远不改这个名字，避免「升级代码=清空进度」。
  const STORE_KEY = 'course-center-progress';
  // 历史遗留的旧 key，加载时自动迁移到新 key（保留已有进度）。
  const LEGACY_KEYS = ['mcp-adventure-v2', 'mcp-adventure-v1'];

  /* ---------------- 等级系统（300 级，约 20 节课 ≈ 100 级） ---------------- */
  const LEVEL_CAP = 300;
  const MILESTONES = [100, 200, 300];
  const REWARDS = {
    100: {
      emoji: '🎁', title: '神秘大奖 · 壹',
      desc: '解锁专属称号「入门毕业」，获得神秘徽章「🏵️ 百级达人」！<br/>这份奖励，是你坚持学完约 20 节课的见证。',
      badges: ['🏵️ 百级达人', '🎖️ 称号：入门毕业']
    },
    200: {
      emoji: '💎', title: '神秘大奖 · 贰',
      desc: '解锁专属称号「进阶宗师」，获得神秘徽章「🌟 两百级宗师」！<br/>你已经远超大多数人，继续保持～',
      badges: ['🌟 两百级宗师', '🎖️ 称号：进阶宗师']
    },
    300: {
      emoji: '👑', title: '神秘大奖 · 叁（终极大奖）',
      desc: '解锁最高称号「一代宗师」，获得终极徽章「👑 满级传奇」！<br/>你是当之无愧的 MCP 大师！',
      badges: ['👑 满级传奇', '🎖️ 称号：一代宗师']
    }
  };
  // 累计经验达到 level 级所需 XP
  function levelThreshold(L) {
    if (L <= 1) return 0;
    if (L <= 100) return (L - 1) * 100;
    if (L <= 200) return 10000 + (L - 100) * 200;
    return 30000 + (L - 200) * 400;
  }
  function levelFor(xp) {
    let lv = 1;
    for (let L = 2; L <= LEVEL_CAP; L++) { if (xp >= levelThreshold(L)) lv = L; else break; }
    return lv;
  }
  function levelTitle(lv) {
    if (lv >= 300) return '一代宗师';
    if (lv >= 200) return '进阶宗师';
    if (lv >= 100) return '入门毕业';
    if (lv >= 50) return '小有所成';
    if (lv >= 20) return '勤奋学徒';
    return '萌新学徒';
  }

  /* ---------------- 状态 ---------------- */
  const defaultState = () => ({
    name: '',
    color: 'pink',
    xp: 0,
    sound: false,
    streak: { last: '', count: 0 },
    done: {},        // { lessonId: timestamp }
    blocksDone: {},  // { blockId: true }
    badges: {},      // { badgeId: timestamp }
    rewards: { 100: false, 200: false, 300: false },
    flags: { perfect: false }
  });

  let state = load();

  // 迁移：把存档合并到「最新默认结构」上。
  // 原则：新加的字段用默认值补齐，旧的 done/blocksDone/badges 等原样保留，
  // 这样以后无论我怎么加功能、加字段，她的进度都不会丢。
  function migrate(saved) {
    if (!saved || typeof saved !== 'object') return defaultState();
    const base = defaultState();
    const out = Object.assign({}, base, saved);
    out.streak = Object.assign({}, base.streak, saved.streak || {});
    out.flags = Object.assign({}, base.flags, saved.flags || {});
    out.rewards = Object.assign({}, base.rewards, saved.rewards || {});
    out.done = saved.done || {};
    out.blocksDone = saved.blocksDone || {};
    out.badges = saved.badges || {};
    out.name = typeof saved.name === 'string' ? saved.name : '';
    out.color = typeof saved.color === 'string' ? saved.color : 'pink';
    out.xp = typeof saved.xp === 'number' ? saved.xp : 0;
    out.sound = !!saved.sound;
    return out;
  }

  function load() {
    let raw = localStorage.getItem(STORE_KEY);
    // 若稳定 key 还没有数据，尝试从旧 key 迁移（并立刻写到稳定 key）
    if (!raw) {
      for (const k of LEGACY_KEYS) {
        const legacy = localStorage.getItem(k);
        if (legacy) {
          raw = legacy;
          try { localStorage.setItem(STORE_KEY, legacy); } catch (e) { /* ignore */ }
          break;
        }
      }
    }
    if (!raw) return defaultState();
    try { return migrate(JSON.parse(raw)); }
    catch (e) { return defaultState(); }
  }
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      // 迁移完成后清理旧 key，避免将来读到过期数据
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* ignore */ }
  }

  /* ---------------- 工具 ---------------- */
  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function yesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function fillName(html) {
    const name = (state.name || '朋友').trim() || '朋友';
    return html.replace(/\{\{name\}\}/g, `<b>${esc(name)}</b>`);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function mascotHTML() {
    return `<img class="mascot-img" src="assets/minglan.svg" alt="明兰" />`;
  }
  function courseById(id) { return COURSES.find((c) => c.id === id); }
  function lessonById(lid) {
    for (const c of COURSES) { const l = c.lessons.find((x) => x.id === lid); if (l) return { course: c, lesson: l }; }
    return null;
  }

  /* ---------------- 连击 ---------------- */
  function refreshStreakOnLoad() {
    const s = state.streak;
    if (s.last && s.last !== todayStr() && s.last !== yesterdayStr()) {
      s.count = 0; s.last = '';
      save();
    }
  }
  function touchStreak() {
    const t = todayStr();
    if (state.streak.last === t) return;
    if (state.streak.last === yesterdayStr()) state.streak.count += 1;
    else state.streak.count = 1;
    state.streak.last = t;
    save();
  }

  /* ---------------- 音效 ---------------- */
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; } }
    return audioCtx;
  }
  function tone(freq, dur, type, vol) {
    if (!state.sound) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.value = vol || 0.12;
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.start(now); o.stop(now + dur + 0.02);
  }
  const sfx = {
    correct() { tone(880, 0.12, 'triangle'); tone(1320, 0.16, 'triangle'); },
    wrong() { tone(180, 0.18, 'sawtooth', 0.06); },
    pop() { tone(660, 0.1, 'triangle'); setTimeout(() => tone(990, 0.16, 'triangle'), 80); },
    fanfare() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.1), i * 110)); }
  };

  /* ---------------- 撒花 ---------------- */
  const confettiCanvas = $('#confetti');
  let ctx2d = null;
  function confettiBurst(n) {
    if (!confettiCanvas) return;
    if (!ctx2d) ctx2d = confettiCanvas.getContext('2d');
    const W = confettiCanvas.width = window.innerWidth;
    const H = confettiCanvas.height = window.innerHeight;
    const colors = ['#ff8fb1', '#a78bfa', '#34d399', '#fbbf24', '#38bdf8', '#ff5c8a', '#f76a8c'];
    const parts = [];
    for (let i = 0; i < (n || 120); i++) {
      parts.push({
        x: W / 2 + (Math.random() - 0.5) * 180,
        y: H * 0.35,
        vx: (Math.random() - 0.5) * 13,
        vy: -Math.random() * 12 - 3,
        g: 0.32,
        s: Math.random() * 8 + 5,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        c: colors[(Math.random() * colors.length) | 0],
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    let frame = 0;
    (function tick() {
      ctx2d.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx2d.save();
        ctx2d.translate(p.x, p.y); ctx2d.rotate(p.r);
        ctx2d.fillStyle = p.c;
        if (p.shape === 'rect') ctx2d.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
        else { ctx2d.beginPath(); ctx2d.arc(0, 0, p.s / 2, 0, Math.PI * 2); ctx2d.fill(); }
        ctx2d.restore();
      }
      if (++frame < 130) requestAnimationFrame(tick);
      else ctx2d.clearRect(0, 0, W, H);
    })();
  }

  /* ---------------- 提示 / 飘字 ---------------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }
  function flyXp(anchor, amount) {
    const el = document.createElement('div');
    el.className = 'fly-xp';
    el.textContent = `+${amount} ✨`;
    const r = anchor.getBoundingClientRect();
    el.style.left = Math.max(8, r.left + r.width / 2 - 20) + 'px';
    el.style.top = Math.max(8, r.top - 6) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }

  /* ---------------- 奖励：XP / 等级 / 里程碑大奖 ---------------- */
  function addXp(amount, anchor) {
    const before = levelFor(state.xp);
    state.xp += amount;
    const after = levelFor(state.xp);
    save();
    updateHUD();
    if (anchor) flyXp(anchor, amount);
    if (after > before) {
      sfx.pop();
      toast(`🎉 升到 Lv.${after} ${levelTitle(after)}！`);
      for (const m of MILESTONES) {
        if (after >= m && before < m) { showReward(m); break; }
      }
    }
  }

  function showReward(m) {
    if (state.rewards[m]) return;
    state.rewards[m] = true;
    save();
    const r = REWARDS[m];
    $('#rewardEmoji').textContent = r.emoji;
    $('#rewardLevel').textContent = 'Lv.' + m;
    $('#rewardTitle').textContent = r.title;
    $('#rewardDesc').innerHTML = r.desc;
    const box = $('#rewardBadges');
    box.innerHTML = '';
    r.badges.forEach((t) => { const s = document.createElement('span'); s.className = 'celeb-badge'; s.textContent = t; box.appendChild(s); });
    $('#reward').classList.remove('hidden');
    confettiBurst(260);
    sfx.fanfare();
  }

  /* ---------------- 奖励：徽章 ---------------- */
  function countDone(course) { return course.lessons.filter((l) => state.done[l.id]).length; }
  function courseDone(course) { return course.lessons.every((l) => state.done[l.id]); }
  function badgeEarned(course, b) {
    const c = b.cond || {};
    if (c.lesson) return !!state.done[c.lesson];
    if (c.lessons) return countDone(course) >= c.lessons;
    if (c.courseDone) return courseDone(course);
    if (c.streak) return state.streak.count >= c.streak;
    if (c.perfect) return !!state.flags.perfect;
    return false;
  }
  function checkBadges(silent) {
    const newly = [];
    for (const course of COURSES) {
      for (const b of course.badges) {
        if (state.badges[b.id]) continue;
        if (badgeEarned(course, b)) { state.badges[b.id] = todayStr(); newly.push(b); }
      }
    }
    if (newly.length) {
      save();
      updateHUD();
      if (silent) toast(`🏅 解锁 ${newly.length} 枚徽章！`);
      else {
        celebrate({ emoji: newly.length > 1 ? '🏅' : newly[0].emoji, title: newly.length > 1 ? `一次解锁 ${newly.length} 枚徽章！` : '解锁新徽章！', desc: '快去看看你的徽章墙吧～', badges: newly.map((b) => `${b.emoji} ${b.name}`) });
        confettiBurst(160);
        sfx.fanfare();
      }
    }
  }

  /* ---------------- 弹窗庆祝 ---------------- */
  const celebQueue = [];
  function celebrate(obj) { celebQueue.push(obj); showNextCelebration(); }
  function showNextCelebration() {
    const overlay = $('#celebration');
    if (!overlay) return;
    if (overlay.classList.contains('hidden') && celebQueue.length) {
      const o = celebQueue.shift();
      $('#celebEmoji').textContent = o.emoji || '🎉';
      $('#celebTitle').textContent = o.title || '太棒了！';
      $('#celebDesc').innerHTML = o.desc || '';
      const box = $('#celebBadges');
      box.innerHTML = '';
      (o.badges || []).forEach((t) => { const s = document.createElement('span'); s.className = 'celeb-badge'; s.textContent = t; box.appendChild(s); });
      overlay.classList.remove('hidden');
      sfx.pop();
    }
  }
  $('#celebBtn').addEventListener('click', () => {
    $('#celebration').classList.add('hidden');
    if (celebQueue.length) setTimeout(showNextCelebration, 120);
    else if (currentLessonId) { renderCourse(currentCourseId); }
  });
  $('#rewardBtn').addEventListener('click', () => {
    $('#reward').classList.add('hidden');
  });

  /* ---------------- 毕业证书 ---------------- */
  function showCertificate(course) {
    $('#certName').textContent = (state.name || '朋友').trim() || '朋友';
    $('#certCourse').textContent = `${course.emoji} ${course.title} · ${course.subtitle}`;
    $('#certDate').textContent = todayStr() + ' · ' + SITE_NAME;
    $('#certificate').classList.remove('hidden');
    sfx.fanfare();
  }
  $('#certBtn').addEventListener('click', () => {
    $('#certificate').classList.add('hidden');
    renderBadges();
  });

  /* ---------------- HUD（顶部等级条） ---------------- */
  function updateHUD() {
    const lv = levelFor(state.xp);
    const cur = levelThreshold(lv);
    const next = lv < LEVEL_CAP ? levelThreshold(lv + 1) : cur;
    const pct = next > cur ? Math.min(100, Math.round((state.xp - cur) / (next - cur) * 100)) : 100;

    $('#lvlN').textContent = lv;
    $('#lvlName').textContent = levelTitle(lv);
    $('#xpN').textContent = state.xp;
    $('#streakN').textContent = state.streak.count;
    $('#lvlFill').style.width = pct + '%';

    const nextMilestone = MILESTONES.find((m) => m > lv);
    if (nextMilestone) $('#lvlNext').textContent = `🎁 距 ${nextMilestone} 级神秘大奖还差 ${nextMilestone - lv} 级`;
    else $('#lvlNext').textContent = '👑 已达满级 300 级，收下终极大奖！';

    $('#mascotBubble').innerHTML = mascotHTML();
    $('#soundToggle').textContent = state.sound ? '🔊' : '🔕';
  }

  /* ---------------- 导航 ---------------- */
  let currentCourseId = null;
  let currentLessonId = null;
  let lessonWrong = false;

  function showView(id) {
    $$('.view').forEach((v) => v.classList.add('hidden'));
    const el = $('#view-' + id);
    if (el) el.classList.remove('hidden');
    window.scrollTo({ top: 0 });
  }
  function setActiveNav(id) {
    $$('.navbtn').forEach((b) => b.classList.toggle('active', b.dataset.nav === id));
  }
  function navigate(id) {
    currentLessonId = null;
    if (id === 'home') renderHome();
    else if (id === 'badges') renderBadges();
  }

  /* ---------------- 首页（课程中心） ---------------- */
  function renderHome() {
    setActiveNav('home');
    showView('home');
    const v = $('#view-home');
    const name = (state.name || '朋友').trim() || '朋友';

    let totalLessons = 0, totalDone = 0, totalBadges = 0, totalBadgesEarned = 0;
    COURSES.forEach((c) => {
      totalLessons += c.lessons.length;
      totalDone += countDone(c);
      totalBadges += c.badges.length;
      totalBadgesEarned += c.badges.filter((b) => state.badges[b.id]).length;
    });

    let nextLesson = null;
    for (const c of COURSES) {
      const l = c.lessons.find((x) => !state.done[x.id]);
      if (l) { nextLesson = l; break; }
    }

    v.innerHTML = `
      <div class="hero">
        <div class="hero-mascot">${mascotHTML()}</div>
        <div>
          <h1>嗨，${esc(name)}！<br/>今天想学点<b class="hl">什么</b>？</h1>
          <p>我是明兰，陪你在课程中心，一点点变成 AI 小达人～</p>
        </div>
      </div>

      <div class="home-grid">
        <div class="card stat-card"><span class="stat-num">${totalDone}/${totalLessons}</span><span class="stat-label">🎯 已完成课程</span></div>
        <div class="card stat-card"><span class="stat-num">${totalBadgesEarned}/${totalBadges}</span><span class="stat-label">🏅 已解锁徽章</span></div>
      </div>

      <button class="card continue-card" id="continueBtn" style="width:100%; text-align:left;">
        <span class="big">${nextLesson ? '继续学习 🚀' : '全部学完啦 🎉'}</span>
        <span class="sub">${nextLesson ? `下一站：${nextLesson.emoji} ${nextLesson.title}` : '去徽章墙看看你的成果吧！'}</span>
        <span class="btn-ghost-light">${nextLesson ? '出发' : '查看徽章'}</span>
      </button>

      <h2 class="section-title">📚 全部课程</h2>
      <div id="homeCourses"></div>
    `;

    $('#continueBtn').addEventListener('click', () => {
      if (nextLesson) openLesson(nextLesson.id);
      else renderBadges();
    });

    const box = $('#homeCourses');
    COURSES.forEach((course) => {
      const cd = countDone(course);
      const p = course.lessons.length ? Math.round(cd / course.lessons.length * 100) : 0;
      const el = document.createElement('button');
      el.className = 'card course-card';
      el.style.setProperty('--course-grad', course.gradient);
      el.innerHTML = `
        <div class="course-emoji">${course.emoji}</div>
        <div class="course-info">
          <h3>${course.emoji} ${course.title}</h3>
          <div class="tagline">${course.subtitle}</div>
          <div class="meta">${course.tagline}</div>
          <div class="course-progress-wrap">
            <div class="course-progress"><i style="width:${p}%"></i></div>
            <span class="course-pct">${p}%</span>
          </div>
        </div>`;
      el.addEventListener('click', () => { currentCourseId = course.id; renderCourse(course.id); });
      box.appendChild(el);
    });
  }

  /* ---------------- 课程（章节列表） ---------------- */
  function renderCourse(cid) {
    currentCourseId = cid;
    setActiveNav('home');
    showView('course');
    const v = $('#view-course');
    const c = courseById(cid);
    const done = countDone(c);
    const pct = c.lessons.length ? Math.round(done / c.lessons.length * 100) : 0;

    let html = `
      <div class="breadcrumb">
        <button class="backbtn" data-back="home">← 返回</button>
        <span>${c.emoji} ${c.title} · ${c.subtitle}</span>
      </div>
      <div class="card" style="text-align:center; margin-bottom:16px;">
        <div class="course-mascot">${mascotHTML()}</div>
        <h2 style="font-size:20px">${c.emoji} ${c.title}</h2>
        <p style="color:var(--ink-soft); font-size:14px">${c.subtitle} · ${c.tagline}</p>
        <div class="course-progress-wrap" style="margin-top:10px">
          <div class="course-progress" style="flex:1"><i style="width:${pct}%"></i></div>
          <span class="course-pct">${done}/${c.lessons.length} 关</span>
        </div>
      </div>
      <div class="lesson-list">`;

    let lastDone = true;
    c.lessons.forEach((l, i) => {
      const isDone = !!state.done[l.id];
      const unlocked = lastDone;
      if (!isDone) lastDone = false;
      const isCurrent = unlocked && !isDone;
      html += `
        <button class="lesson-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${unlocked ? '' : 'locked'}" data-lesson="${l.id}" ${unlocked ? '' : 'disabled'}>
          <div class="lesson-ico">${l.emoji}</div>
          <div class="lesson-main">
            <h4>第 ${i + 1} 关 · ${l.title}</h4>
            <div class="intro">${l.intro}</div>
            <div class="lesson-meta">⏱ 约 ${l.minutes} 分钟 · ✨ ${l.xp} XP</div>
          </div>
          <div class="lesson-status">${isDone ? '✅' : (isCurrent ? '👉' : '🔒')}</div>
        </button>`;
    });
    html += '</div>';
    v.innerHTML = html;

    $$('[data-back]', v).forEach((b) => b.addEventListener('click', () => navigate(b.dataset.back)));
    $$('[data-lesson]', v).forEach((b) => b.addEventListener('click', () => openLesson(b.dataset.lesson)));
  }

  /* ---------------- 学习页 ---------------- */
  function openLesson(lid) {
    const found = lessonById(lid);
    if (!found) return;
    currentLessonId = lid;
    currentCourseId = found.course.id;
    renderLesson(found.course, found.lesson);
  }

  function renderLesson(course, lesson) {
    showView('lesson');
    setActiveNav('home');
    lessonWrong = false;
    const v = $('#view-lesson');
    const idx = course.lessons.indexOf(lesson);
    const isDone = !!state.done[lesson.id];

    v.innerHTML = `
      <div class="breadcrumb">
        <button class="backbtn" data-back="course">← 课程列表</button>
        <span>${course.emoji} ${course.title} · 第 ${idx + 1} 关</span>
      </div>
      <div class="lesson-head">
        <div class="lesson-ico">${lesson.emoji}</div>
        <div>
          <h2>第 ${idx + 1} 关 · ${lesson.title}</h2>
          <div class="intro">${lesson.intro}</div>
        </div>
      </div>
      <div class="blocks" id="blocks"></div>
      <div class="lesson-actions" id="lessonActions"></div>
    `;

    $$('[data-back]', v).forEach((b) => b.addEventListener('click', () => navigate(b.dataset.back)));

    const blocks = $('#blocks');
    lesson.blocks.forEach((block) => { blocks.appendChild(renderBlock(block)); });

    const actions = $('#lessonActions');
    const btn = document.createElement('button');
    btn.className = 'btn btn-big ' + (isDone ? 'btn-soft' : 'btn-primary');
    btn.textContent = isDone ? '已完成 ✓ 回课程列表' : `完成本关，领取 +${lesson.xp} XP 🎉`;
    btn.addEventListener('click', () => {
      if (isDone) renderCourse(course.id);
      else completeLesson(course, lesson);
    });
    actions.appendChild(btn);
  }

  function isBlockDone(id) { return !!state.blocksDone[id]; }
  function awardBlock(block, anchor) {
    if (!block.id || state.blocksDone[block.id]) return;
    state.blocksDone[block.id] = true;
    addXp(20, anchor);
    touchStreak();
    checkBadges();
  }

  function renderBlock(block) {
    const wrap = document.createElement('div');
    wrap.className = 'block block-' + block.type;

    if (block.type === 'text') {
      wrap.classList.add('block-text');
      wrap.innerHTML = `<p>${fillName(block.html)}</p>`;
    }
    else if (block.type === 'callout') {
      wrap.innerHTML = `<div class="callout ${block.tone}">
        <div class="co-title">${block.title || ''}</div>
        <div class="co-body">${fillName(block.html)}</div>
      </div>`;
    }
    else if (block.type === 'code') {
      wrap.innerHTML = `<div class="codeblock"><pre><code>${esc(block.code)}</code></pre></div>`;
    }
    else if (block.type === 'quiz') { wrap.appendChild(buildQuiz(block)); }
    else if (block.type === 'match') { wrap.appendChild(buildMatch(block)); }
    else if (block.type === 'order') { wrap.appendChild(buildOrder(block)); }
    else if (block.type === 'fill') { wrap.appendChild(buildFill(block)); }
    else if (block.type === 'links') { wrap.appendChild(buildLinks(block)); }
    else if (block.type === 'final') {
      wrap.classList.add('block-final');
      wrap.innerHTML = `<p>${fillName(block.html)}</p>`;
    }
    return wrap;
  }

  /* ---- 选择题 ---- */
  function buildQuiz(block) {
    const box = document.createElement('div');
    box.className = 'interact';
    const done = isBlockDone(block.id);
    box.innerHTML = `<div class="q-label">选择题 · +20 ✨</div><div class="prompt">${fillName(block.question)}</div><div class="opts"></div>`;
    const opts = $('.opts', box);
    const letters = ['A', 'B', 'C', 'D'];

    block.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${esc(o.text)}</span>`;
      if (done) { b.disabled = true; if (o.correct) b.classList.add('correct'); }
      b.addEventListener('click', () => {
        if (b.disabled || box.dataset.solved) return;
        if (o.correct) {
          b.classList.add('correct');
          box.dataset.solved = '1';
          $$('.opt', box).forEach((x) => x.disabled = true);
          if (!done) { awardBlock(block, b); sfx.correct(); }
          const ex = document.createElement('div');
          ex.className = 'explain';
          ex.innerHTML = '✅ ' + fillName(block.explain || '回答正确！');
          box.appendChild(ex);
        } else {
          lessonWrong = true;
          b.classList.add('wrong');
          sfx.wrong();
          setTimeout(() => b.classList.remove('wrong'), 500);
        }
      });
      opts.appendChild(b);
    });

    if (done) {
      const ex = document.createElement('div');
      ex.className = 'explain';
      ex.innerHTML = '✅ ' + fillName(block.explain || '回答正确！');
      box.appendChild(ex);
    }
    return box;
  }

  /* ---- 连连看 ---- */
  function buildMatch(block) {
    const box = document.createElement('div');
    box.className = 'interact';
    const done = isBlockDone(block.id);
    box.innerHTML = `<div class="q-label">连连看 · +20 ✨</div><div class="prompt">${fillName(block.prompt)}</div><div class="match-cols"></div>`;
    const cols = $('.match-cols', box);
    const leftCol = document.createElement('div');
    const rightCol = document.createElement('div');
    leftCol.className = 'match-col'; rightCol.className = 'match-col';
    cols.appendChild(leftCol); cols.appendChild(rightCol);

    const rightOrder = shuffle(block.pairs.map((p, i) => i));
    let selectedLeft = null;
    let matched = 0;

    block.pairs.forEach((p, i) => {
      const b = document.createElement('button');
      b.className = 'match-item';
      b.textContent = p.left;
      b.dataset.idx = i;
      if (done) { b.classList.add('done'); b.disabled = true; }
      b.addEventListener('click', () => {
        if (done || b.classList.contains('done')) return;
        $$('.match-item', leftCol).forEach((x) => x.classList.remove('sel'));
        selectedLeft = i;
        b.classList.add('sel');
      });
      leftCol.appendChild(b);
    });

    rightOrder.forEach((pi) => {
      const p = block.pairs[pi];
      const b = document.createElement('button');
      b.className = 'match-item';
      b.textContent = p.right;
      b.dataset.right = pi;
      if (done) { b.classList.add('done'); b.disabled = true; }
      b.addEventListener('click', () => {
        if (done || b.classList.contains('done')) return;
        if (selectedLeft === null) { lessonWrong = true; b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 500); sfx.wrong(); return; }
        if (block.pairs[selectedLeft].right === p.right) {
          const leftItem = $$('.match-item', leftCol)[selectedLeft];
          leftItem.classList.add('done'); leftItem.classList.remove('sel'); leftItem.disabled = true;
          b.classList.add('done'); b.disabled = true;
          selectedLeft = null;
          matched++;
          sfx.correct();
          if (matched === block.pairs.length) {
            box.dataset.solved = '1';
            awardBlock(block, b);
            const ex = document.createElement('div');
            ex.className = 'explain';
            ex.innerHTML = '✅ ' + fillName(block.explain || '全部连对啦！');
            box.appendChild(ex);
          }
        } else {
          lessonWrong = true;
          b.classList.add('wrong'); sfx.wrong();
          setTimeout(() => b.classList.remove('wrong'), 500);
        }
      });
      rightCol.appendChild(b);
    });

    if (done) {
      const ex = document.createElement('div');
      ex.className = 'explain';
      ex.innerHTML = '✅ ' + fillName(block.explain || '全部连对啦！');
      box.appendChild(ex);
    }
    return box;
  }

  /* ---- 排序 ---- */
  function buildOrder(block) {
    const box = document.createElement('div');
    box.className = 'interact';
    const done = isBlockDone(block.id);
    box.innerHTML = `<div class="q-label">排序题 · +20 ✨</div><div class="prompt">${fillName(block.prompt)}</div><div class="order-items"></div><div class="order-progress">第 0 / ${block.items.length} 步</div>`;
    const items = $('.order-items', box);
    const prog = $('.order-progress', box);
    let nextIdx = 0;

    const shuffled = shuffle(block.items.map((text, i) => ({ text, i })));
    shuffled.forEach((it) => {
      const b = document.createElement('button');
      b.className = 'order-item';
      b.textContent = it.text;
      if (done) { b.classList.add('done'); b.disabled = true; }
      b.addEventListener('click', () => {
        if (done || b.classList.contains('done')) return;
        if (it.i === nextIdx) {
          b.classList.add('done'); b.disabled = true;
          b.textContent = `${nextIdx + 1}. ${it.text}`;
          nextIdx++;
          sfx.correct();
          prog.textContent = `第 ${nextIdx} / ${block.items.length} 步`;
          if (nextIdx === block.items.length) {
            box.dataset.solved = '1';
            awardBlock(block, b);
            const ex = document.createElement('div');
            ex.className = 'explain';
            ex.innerHTML = '✅ ' + fillName(block.explain || '顺序完全正确！');
            box.appendChild(ex);
          }
        } else {
          lessonWrong = true;
          b.classList.add('wrong'); sfx.wrong();
          setTimeout(() => b.classList.remove('wrong'), 500);
        }
      });
      items.appendChild(b);
    });

    if (done) {
      prog.textContent = `第 ${block.items.length} / ${block.items.length} 步`;
      const ex = document.createElement('div');
      ex.className = 'explain';
      ex.innerHTML = '✅ ' + fillName(block.explain || '顺序完全正确！');
      box.appendChild(ex);
    }
    return box;
  }

  /* ---- 填空 ---- */
  function buildFill(block) {
    const box = document.createElement('div');
    box.className = 'interact';
    const done = isBlockDone(block.id);
    const parts = (block.sentence || '___').split('___');
    box.innerHTML = `<div class="q-label">填空题 · +20 ✨</div><div class="prompt">${fillName(block.prompt)}</div><div class="fill-row"></div>`;
    const row = $('.fill-row', box);
    const before = document.createElement('span');
    before.innerHTML = parts[0] ? fillName(parts[0]) : '';
    const input = document.createElement('input');
    input.className = 'fill-input';
    input.type = 'text';
    input.placeholder = '在这里填';
    input.autocomplete = 'off';
    const after = document.createElement('span');
    after.innerHTML = parts[1] ? fillName(parts[1]) : '';
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = '提交';
    btn.style.padding = '11px 20px';
    btn.style.fontSize = '14px';
    row.appendChild(before); row.appendChild(input); row.appendChild(after); row.appendChild(btn);

    const answers = (block.answers || []).map((a) => a.toLowerCase().trim());

    function solveOk() {
      input.classList.add('ok');
      input.disabled = true; btn.disabled = true;
      box.dataset.solved = '1';
      awardBlock(block, input);
      sfx.correct();
      const ex = document.createElement('div');
      ex.className = 'explain';
      ex.innerHTML = '✅ ' + fillName(block.explain || '填对啦！');
      box.appendChild(ex);
    }

    btn.addEventListener('click', () => {
      if (input.disabled) return;
      const val = input.value.toLowerCase().trim();
      if (answers.includes(val)) solveOk();
      else { lessonWrong = true; input.classList.add('bad'); sfx.wrong(); setTimeout(() => input.classList.remove('bad'), 500); }
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });

    if (done) {
      input.value = block.answers[0];
      input.classList.add('ok'); input.disabled = true; btn.disabled = true;
      const ex = document.createElement('div');
      ex.className = 'explain';
      ex.innerHTML = '✅ ' + fillName(block.explain || '填对啦！');
      box.appendChild(ex);
    }
    return box;
  }

  /* ---- 延伸资源（外部链接） ---- */
  function buildLinks(block) {
    const box = document.createElement('div');
    box.className = 'interact links-block';
    box.innerHTML = `<div class="links-title">${block.title || '🔗 延伸资源'}</div><div class="links-list"></div>`;
    const list = $('.links-list', box);
    (block.links || []).forEach((l) => {
      const a = document.createElement('a');
      a.className = 'link-item';
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `<span class="link-main"><span class="link-label">${esc(l.label)}</span><span class="link-desc">${esc(l.desc || '')}</span></span><span class="link-arrow">↗</span>`;
      list.appendChild(a);
    });
    return box;
  }

  /* ---- 完成课程 ---- */
  function completeLesson(course, lesson) {
    if (state.done[lesson.id]) return;
    state.done[lesson.id] = todayStr();

    // 「一次全对」：本关所有挑战都做完，且本次会话没有答错
    const interactBlocks = lesson.blocks.filter((b) => b.id);
    const allSolved = interactBlocks.length > 0 && interactBlocks.every((b) => state.blocksDone[b.id]);
    if (allSolved && !lessonWrong) state.flags.perfect = true;

    addXp(lesson.xp, null);
    touchStreak();
    save();
    updateHUD();

    const idx = course.lessons.indexOf(lesson);
    const next = course.lessons[idx + 1];
    const isFinal = !next;

    if (isFinal) {
      checkBadges(true);
      confettiBurst(240);
      showCertificate(course);
    } else {
      celebrate({
        emoji: lesson.emoji,
        title: `第 ${idx + 1} 关完成！`,
        desc: `获得 <b>+${lesson.xp} XP</b><br/>下一关已解锁：${next.emoji} ${next.title}`,
        badges: []
      });
      confettiBurst(180);
      sfx.fanfare();
      checkBadges();
    }
    renderLesson(course, lesson);
  }

  /* ---------------- 徽章墙 ---------------- */
  function renderBadges() {
    setActiveNav('badges');
    showView('badges');
    const v = $('#view-badges');
    let html = `
      <div class="breadcrumb"><button class="backbtn" data-back="home">← 返回</button><span>🏅 我的徽章</span></div>
      <div class="card" style="text-align:center; margin-bottom:16px">
        <div class="course-mascot" style="margin:0 auto">${mascotHTML()}</div>
        <h2 style="font-size:19px">徽章墙 & 里程碑大奖</h2>
        <p style="color:var(--ink-soft); font-size:14px">每学一点，就解锁一枚。100/200/300 级还有神秘大奖！</p>
      </div>`;

    // 里程碑大奖
    html += `<h2 class="section-title">🏆 里程碑大奖</h2><div class="badges-grid">`;
    MILESTONES.forEach((m) => {
      const earned = !!state.rewards[m];
      const r = REWARDS[m];
      html += `
        <div class="badge-card ${earned ? 'unlocked' : 'locked'}">
          <span class="badge-emoji">${earned ? r.emoji : '🔒'}</span>
          <div class="badge-name">Lv.${m} ${r.title}</div>
          <div class="badge-desc">${earned ? '已领取' : `升到 ${m} 级解锁`}</div>
        </div>`;
    });
    html += '</div>';

    // 课程徽章
    COURSES.forEach((course) => {
      html += `<h2 class="section-title">${course.emoji} ${course.title}</h2><div class="badges-grid">`;
      course.badges.forEach((b) => {
        const earned = !!state.badges[b.id];
        html += `
          <div class="badge-card ${earned ? 'unlocked' : 'locked'}">
            <span class="badge-emoji">${earned ? b.emoji : '🔒'}</span>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.desc}</div>
          </div>`;
      });
      html += '</div>';
    });

    // 数据备份
    html += `<h2 class="section-title">💾 数据备份</h2>
      <div class="card backup-card">
        <p class="backup-tip">进度存在<b>浏览器本地</b>。换设备、换浏览器或清理浏览器前，先在这里<b>导出备份</b>，之后可一键恢复。</p>
        <div class="backup-actions">
          <button class="btn btn-soft" id="exportBtn">💾 导出备份</button>
          <button class="btn btn-soft" id="importBtn">📥 恢复备份</button>
        </div>
      </div>`;

    v.innerHTML = html;
    $$('[data-back]', v).forEach((b) => b.addEventListener('click', () => navigate(b.dataset.back)));
    const exp = $('#exportBtn'); if (exp) exp.addEventListener('click', exportBackup);
    const imp = $('#importBtn'); if (imp) imp.addEventListener('click', importBackup);
  }

  /* ---------------- 备份 / 恢复 ---------------- */
  function exportBackup() {
    try {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '课程中心-进度备份-' + todayStr() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 800);
      toast('💾 进度已导出，请保存好这个文件');
    } catch (e) { toast('⚠️ 导出失败'); }
  }
  function importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      const f = input.files && input.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(String(r.result));
          state = migrate(data);
          save();
          updateHUD();
          renderHome();
          toast('✅ 进度已恢复，继续学习吧！');
        } catch (e) { toast('⚠️ 恢复失败：文件格式不对'); }
      };
      r.readAsText(f);
    };
    input.click();
  }

  /* ---------------- 初始化 & 事件 ---------------- */
  function init() {
    document.body.dataset.color = state.color || 'pink';
    refreshStreakOnLoad();
    updateHUD();

    $$('.navbtn').forEach((b) => b.addEventListener('click', () => navigate(b.dataset.nav)));
    $('.logo').addEventListener('click', () => navigate('home'));

    $('#soundToggle').addEventListener('click', () => {
      state.sound = !state.sound;
      save();
      updateHUD();
      if (state.sound) { ensureAudio(); sfx.pop(); toast('🔊 音效已开启'); }
      else toast('🔕 音效已关闭');
    });

    $('#resetBtn').addEventListener('click', () => {
      if (confirm('确定要清空所有进度、重新开始吗？这个操作不能撤销哦。')) {
        localStorage.removeItem(STORE_KEY);
        location.reload();
      }
    });

    if (!state.name) {
      $('#onboarding').classList.remove('hidden');
    } else {
      renderHome();
    }

    $('#onbStart').addEventListener('click', () => {
      const name = $('#nameInput').value.trim();
      state.name = name || '朋友';
      state.color = $('#colorPicker .swatch.active').dataset.color || 'pink';
      document.body.dataset.color = state.color;
      save();
      $('#onboarding').classList.add('hidden');
      renderHome();
      confettiBurst(140);
      sfx.fanfare();
      toast('🎉 欢迎来到课程中心！');
    });

    $$('.swatch').forEach((s) => s.addEventListener('click', () => {
      $$('.swatch').forEach((x) => x.classList.remove('active'));
      s.classList.add('active');
      document.body.dataset.color = s.dataset.color;
    }));
  }

  init();
})();

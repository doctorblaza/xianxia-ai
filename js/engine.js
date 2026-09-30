/* ============ 《码修》AVG 引擎：单线剧情 / 左侧立绘 / 算法题关卡 ============ */
(function () {
"use strict";

function $(id) { return document.getElementById(id); }

var LS_SAVE = "maxiu_save_v2";
var LS_BGM  = "maxiu_bgm_on";
var LS_PLAYS = "maxiu_battle_plays";  /* 各算法战已通关次数（决定备选题轮换） */

var idx = 0;                 /* 当前剧情节点下标 */
var battlePlays = {};        /* {战斗名: 已通关次数}，跨存档持久 */
try { battlePlays = JSON.parse(localStorage.getItem(LS_PLAYS) || "{}") || {}; } catch (e) { battlePlays = {}; }
var typing = false, typeTimer = null, fullText = "";
var bgmOn = true;
var curBgm = null;

/* ---------- 存档 ---------- */
function saveGame(silent) {
  try {
    localStorage.setItem(LS_SAVE, JSON.stringify({ idx: idx }));
    if (!silent) toast("已存档");
  } catch (e) {}
}
function loadSave() {
  try {
    var v = localStorage.getItem(LS_SAVE);
    return v ? JSON.parse(v) : null;
  } catch (e) { return null; }
}
try { bgmOn = localStorage.getItem(LS_BGM) !== "0"; } catch (e) {}

function toast(msg) {
  var t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(function () { t.classList.add("hidden"); }, 1600);
}

/* ---------- 背景 / BGM / 章节 ---------- */
var bgFlip = false;
function setBG(key) {
  var url = BGS[key];
  if (!url) return;
  var showEl = bgFlip ? $("bg-a") : $("bg-b");
  var hideEl = bgFlip ? $("bg-b") : $("bg-a");
  showEl.style.backgroundImage = "url('" + url + "')";
  showEl.classList.add("show");
  hideEl.classList.remove("show");
  bgFlip = !bgFlip;
}
function setBGM(key) {
  var url = key ? BGMS[key] : null;
  var audio = $("bgm");
  if (url === curBgm) return;
  curBgm = url;
  if (!url) { audio.pause(); return; }
  audio.src = url;
  if (bgmOn) { audio.play().catch(function () {}); }
}
/* ---------- 剧情 CG：全屏展示，点按/空格继续（无收集/回看） ---------- */
function renderCg(node) {
  stopBattleTimer(); hideXiaoman();
  $("dialogue").classList.add("hidden");
  $("sprite").classList.add("hidden");
  var img = $("cg-img");
  if (img.getAttribute("src") !== node.img) img.src = node.img;
  $("cg-overlay").classList.remove("hidden");
}
function advanceCg() {
  $("cg-overlay").classList.add("hidden");
  idx++;
  if (idx % 5 === 0) saveGame(true);   /* 与台词一致的自动存档节奏 */
  renderNode();
}
function preloadCg() {
  var done = {};
  STORY.forEach(function (n) {
    if (n.t === "cg" && n.img && !done[n.img]) {
      done[n.img] = true;
      var im = new Image(); im.src = n.img;
    }
  });
}

function showChapter(text, done) {
  var c = $("chapter");
  $("chapter-text").textContent = text;
  c.classList.remove("hidden");
  setTimeout(function () {
    c.classList.add("hidden");
    if (done) done();
  }, 2200);
}

/* ---------- 立绘（左侧）：按情绪取表情差分，缺图回退原立绘 ---------- */
function spriteFor(who, emotion) {
  var def = CHARS[who];
  if (!def || !def.sprite) return null;
  if (emotion && emotion !== "calm" && def.expressions && def.expressions[emotion])
    return def.expressions[emotion];
  return def.sprite;
}
function setSprite(who, emotion) {
  var box = $("sprite"), img = $("sprite-img");
  var src = spriteFor(who, emotion);
  if (!src) { box.classList.add("hidden"); return; }
  if (img.getAttribute("src") !== src) img.src = src;
  box.classList.remove("hidden");
}
/* 启动时校验表情差分文件：404 的一律剔除，保证回退到原立绘 */
function validateExpressions() {
  Object.keys(CHARS).forEach(function (who) {
    var ex = CHARS[who].expressions;
    if (!ex) return;
    Object.keys(ex).forEach(function (k) {
      var url = ex[k], probe = new Image();
      probe.onerror = function () { delete CHARS[who].expressions[k]; };
      probe.src = url;
    });
  });
}

/* ---------- 打字机 ---------- */
function typeText(text, done) {
  var el = $("text");
  clearInterval(typeTimer);
  fullText = text;
  typing = true;
  var i = 0;
  el.textContent = "";
  typeTimer = setInterval(function () {
    i += 2;
    el.textContent = text.slice(0, i);
    if (i >= text.length) { clearInterval(typeTimer); typing = false; if (done) done(); }
  }, 28);
}
function finishTyping() {
  if (!typing) return false;
  clearInterval(typeTimer);
  typing = false;
  $("text").textContent = fullText;
  return true;
}

/* ---------- 对话节点 ---------- */
function renderSay(node) {
  $("dialogue").classList.remove("hidden");
  var def = CHARS[node.who] || CHARS["旁白"];
  $("speaker").textContent = def.label || "";
  /* EMO: js/emotions.js，按 STORY 数组下标标注的表情；缺省 calm */
  var emo = (typeof EMO !== "undefined" && EMO[idx]) || "calm";
  setSprite(node.who, emo);
  typeText(node.text);
}

/* ---------- 算法题关卡 ---------- */
/* 按剧本位置固定出题：战斗名 -> BATTLE_PROBLEMS 备选（同主题同难度），
 * 按该战斗已通关次数轮换。完全确定性：不随机、不跨难度。 */
function findProblem(id) {
  for (var i = 0; i < PROBLEMS.length; i++) if (PROBLEMS[i].id === id) return PROBLEMS[i];
  return null;
}
function pickProblem(node) {
  var ids = (typeof BATTLE_PROBLEMS !== "undefined" && BATTLE_PROBLEMS[node.battle]) || [];
  var pool = [];
  ids.forEach(function (id) { var p = findProblem(id); if (p) pool.push(p); });
  if (!pool.length) {
    /* 兜底：按主题取第一道（理论上不会走到） */
    pool = PROBLEMS.filter(function (p) { return !node.theme || p.theme === node.theme; });
  }
  if (!pool.length) pool = PROBLEMS.slice();
  var plays = battlePlays[node.battle] || 0;
  return pool[plays % pool.length];
}
var curProblem = null, curBattle = null;

/* ---------- 算法战倒计时 ---------- */
/* ★=10分钟 ★★=15分钟 ★★★=20分钟；剩3分钟变红+小师妹担忧；
 * 超时=挑战失败（可重来，同一道题）；切后台自动暂停。 */
var BATTLE_MINUTES = { 1: 10, 2: 15, 3: 20 };
var DANGER_SEC = 180;
var timerTotal = 0, timerEndAt = 0, timerTickId = null;
var timerPaused = false, hiddenAt = 0, battleActive = false, dangerOn = false;

function battleMinutes(p) {
  var m = String((p && p.diff) || "").match(/★/g);
  var stars = m ? m.length : 1;
  return BATTLE_MINUTES[stars] || 10;
}
function fmtTime(sec) {
  sec = Math.max(0, Math.ceil(sec));
  var m = Math.floor(sec / 60), s = sec % 60;
  return (m < 10 ? "0" + m : "" + m) + ":" + (s < 10 ? "0" + s : "" + s);
}
function renderTimer() {
  if (!battleActive) return;
  var left = (timerEndAt - Date.now()) / 1000;
  var el = $("prob-timer");
  el.textContent = "⏳ " + fmtTime(left);
  if (left <= DANGER_SEC && !dangerOn) {
    dangerOn = true;
    el.classList.add("danger");
    setXiaoman("worried");
    toast("小满：师兄，时间不多了！");
  }
  if (left <= 0) failBattle();
}
function startBattleTimer(p) {
  stopBattleTimer();
  timerTotal = battleMinutes(p) * 60;
  timerEndAt = Date.now() + timerTotal * 1000;
  dangerOn = false; timerPaused = false; battleActive = true;
  $("prob-timer").classList.remove("danger");
  renderTimer();
  timerTickId = setInterval(renderTimer, 500);
}
function stopBattleTimer() {
  if (timerTickId) { clearInterval(timerTickId); timerTickId = null; }
  battleActive = false; timerPaused = false;
}
function pauseBattleTimer() {
  if (!battleActive || timerPaused || !timerTickId) return;
  timerPaused = true; hiddenAt = Date.now();
  clearInterval(timerTickId); timerTickId = null;
}
function resumeBattleTimer() {
  if (!battleActive || !timerPaused) return;
  timerEndAt += Date.now() - hiddenAt;
  timerPaused = false;
  renderTimer();
  timerTickId = setInterval(renderTimer, 500);
}
function failBattle() {
  stopBattleTimer();
  $("fail-screen").classList.remove("hidden");
}
function retryBattle() {
  /* 同一道题重来：curProblem 不变；计时与提示次数重置，代码保留 */
  $("fail-screen").classList.add("hidden");
  $("prob-results").innerHTML = "";
  resetHints();
  setXiaoman("smile");
  startBattleTimer(curProblem);
}

/* ---------- 小师妹：战斗旁观 + 请教提示 ---------- */
function setXiaoman(emotion) {
  var def = CHARS["林小满"];
  var src = (def.expressions && def.expressions[emotion]) || def.sprite;
  var a = $("xiaoman-img"), b = $("xiaoman-avatar");
  if (a.getAttribute("src") !== src) a.src = src;
  if (b.getAttribute("src") !== src) b.src = src;
}
function showXiaoman() {
  setXiaoman("smile");
  $("xiaoman").classList.remove("hidden");
  hideBubble();
}
function hideXiaoman() {
  $("xiaoman").classList.add("hidden");
  hideBubble();
}
function showBubble(text) {
  $("xiaoman-text").textContent = text;
  $("xiaoman-bubble").classList.remove("hidden");
}
function hideBubble() { $("xiaoman-bubble").classList.add("hidden"); }

var hintsLeft = 3, hintLevel = 0;
function resetHints() {
  hintsLeft = 3; hintLevel = 0;
  var b = $("btn-hint");
  b.disabled = false;
  b.textContent = "请教师妹（3）";
  hideBubble();
}
function getHints(p) {
  if (typeof HINTS !== "undefined" && HINTS[p.id]) return HINTS[p.id];
  if (typeof HINTS_GENERIC !== "undefined" && HINTS_GENERIC[p.theme]) return HINTS_GENERIC[p.theme];
  return (typeof HINTS_GENERIC !== "undefined" && HINTS_GENERIC["default"]) || ["师兄加油！"];
}
function askHint() {
  if (!curProblem || hintsLeft <= 0) return;
  var arr = getHints(curProblem);
  showBubble(arr[Math.min(hintLevel, arr.length - 1)]);
  hintLevel++; hintsLeft--;
  var b = $("btn-hint");
  if (hintsLeft <= 0) { b.disabled = true; b.textContent = "师妹也无计了"; }
  else b.textContent = "请教师妹（" + hintsLeft + "）";
}

function renderProblem(node) {
  curBattle = node.battle;
  curProblem = pickProblem(node);
  $("dialogue").classList.add("hidden");
  $("sprite").classList.add("hidden");
  $("prob-title").textContent = "算法战 · " + (node.battle || curProblem.title);
  $("prob-diff").textContent = curProblem.diff;
  $("prob-flavor").textContent = node.flavor || curProblem.flavor;
  $("prob-desc").textContent = curProblem.desc;
  $("prob-code").value = curProblem.template;
  $("prob-results").innerHTML = "";
  $("prob-loading").classList.add("hidden");
  $("btn-prob-continue").classList.add("hidden");
  $("fail-screen").classList.add("hidden");
  $("problem-panel").classList.remove("hidden");
  showXiaoman();
  resetHints();
  startBattleTimer(curProblem);
}
function resetCode() {
  if (curProblem) $("prob-code").value = curProblem.template;
  $("prob-results").innerHTML = "";
  $("btn-prob-continue").classList.add("hidden");
}
function runCode() {
  if (!curProblem) return;
  var code = $("prob-code").value;
  if (!code.trim()) { toast("剑诀不能为空"); return; }
  $("prob-loading").classList.remove("hidden");
  $("prob-results").innerHTML = "";
  $("btn-prob-continue").classList.add("hidden");
  PyRunner.runTests(curProblem, code).then(function (results) {
    $("prob-loading").classList.add("hidden");
    if (!battleActive) return;   /* 超时已判失败：此次运行结果作废 */
    var box = $("prob-results");
    var allOk = true;
    results.forEach(function (r, i) {
      if (!r.ok) allOk = false;
      var row = document.createElement("div");
      row.className = "test-row";
      row.innerHTML = '<span class="' + (r.ok ? "ok" : "fail") + '">' +
        (r.ok ? "✓" : "✗") + " 用例 " + (i + 1) + "</span>" +
        '<span class="detail">得 ' + escapeHtml(String(r.got)) +
        " ｜ 期望 " + escapeHtml(String(r.expected)) + "</span>";
      box.appendChild(row);
    });
    if (allOk) {
      stopBattleTimer();   /* 通关：停表 */
      toast("剑气贯通！");
      $("btn-prob-continue").classList.remove("hidden");
    } else {
      toast("心魔未除，再试一次");
    }
  }).catch(function (e) {
    $("prob-loading").classList.add("hidden");
    toast("灵气紊乱：" + (e && e.message || e));
  });
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------- 流程推进 ---------- */
function renderNode() {
  var node = STORY[idx];
  if (!node) { showEnd(); return; }
  if (node.t === "scene") {
    if (node.bg) setBG(node.bg);
    if (node.bgm !== undefined) setBGM(node.bgm);
    if (node.chapter) { showChapter(node.chapter, function () { idx++; renderNode(); }); return; }
    idx++; renderNode(); return;
  }
  if (node.t === "say") { renderSay(node); return; }
  if (node.t === "cg") { renderCg(node); return; }
  if (node.t === "problem") { renderProblem(node); return; }
  if (node.t === "end") { showEnd(); return; }
  idx++; renderNode();
}
function advance() {
  var node = STORY[idx];
  if (!node) return;
  if (node.t === "say") {
    if (finishTyping()) return;
    idx++;
    if (idx % 5 === 0) saveGame(true);   /* 每 5 句自动存档 */
    renderNode();
  }
  if (node.t === "cg") { advanceCg(); return; }
}
function showEnd() {
  stopBattleTimer();
  hideXiaoman();
  $("dialogue").classList.add("hidden");
  $("sprite").classList.add("hidden");
  $("end-screen").classList.remove("hidden");
  try { localStorage.removeItem(LS_SAVE); } catch (e) {}
}

/* ---------- 标题屏 ---------- */
function showTitle() {
  stopBattleTimer();
  hideXiaoman();
  ["dialogue", "toolbar", "end-screen", "problem-panel", "cg-overlay"].forEach(function (id) {
    $(id).classList.add("hidden");
  });
  $("sprite").classList.add("hidden");
  $("title-screen").classList.remove("hidden");
  setBG("mage");
  setBGM("wenqing");
  refreshContinue();
}
function refreshContinue() {
  $("btn-continue").classList.toggle("hidden", !loadSave());
}
/* 读档时往回找到最近的 scene 节点，恢复背景与 BGM（不重播章节卡） */
function restoreScene(fromIdx) {
  for (var i = fromIdx; i >= 0; i--) {
    var n = STORY[i];
    if (n && n.t === "scene") {
      if (n.bg) setBG(n.bg);
      if (n.bgm !== undefined) setBGM(n.bgm);
      return;
    }
  }
}
function startGame(fromSave) {
  $("title-screen").classList.add("hidden");
  $("dialogue").classList.remove("hidden");
  $("toolbar").classList.remove("hidden");
  if (fromSave) {
    var s = loadSave();
    if (s) { idx = s.idx || 0; restoreScene(idx); }
  } else {
    idx = 0;
  }
  /* 用户手势后启动 BGM（过 autoplay 限制） */
  if (bgmOn && curBgm) { $("bgm").play().catch(function () {}); }
  renderNode();
}

/* ---------- 事件 ---------- */
function bind() {
  $("dialogue").addEventListener("click", advance);
  $("cg-overlay").addEventListener("click", advanceCg);
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.code === "Enter") {
      if (!$("problem-panel").classList.contains("hidden")) return;
      if (!$("title-screen").classList.contains("hidden")) return;
      if (!$("end-screen").classList.contains("hidden")) return;
      e.preventDefault();
      advance();
    }
  });
  $("btn-start").addEventListener("click", function () { startGame(false); });
  $("btn-continue").addEventListener("click", function () { startGame(true); });
  $("btn-save").addEventListener("click", function () { saveGame(false); });
  $("btn-load").addEventListener("click", function () {
    var s = loadSave();
    if (!s) { toast("没有存档"); return; }
    idx = s.idx || 0;
    restoreScene(idx);
    $("problem-panel").classList.add("hidden");
    renderNode();
    toast("已读档");
  });
  $("btn-bgm").addEventListener("click", function () {
    bgmOn = !bgmOn;
    try { localStorage.setItem(LS_BGM, bgmOn ? "1" : "0"); } catch (e) {}
    $("btn-bgm").textContent = bgmOn ? "音乐:开" : "音乐:关";
    var audio = $("bgm");
    if (bgmOn && curBgm) { if (!audio.src) audio.src = curBgm; audio.play().catch(function () {}); }
    else audio.pause();
  });
  $("btn-title").addEventListener("click", showTitle);
  $("btn-back-title").addEventListener("click", showTitle);
  $("btn-run").addEventListener("click", runCode);
  $("btn-reset-code").addEventListener("click", resetCode);
  $("btn-hint").addEventListener("click", askHint);
  $("btn-retry").addEventListener("click", retryBattle);
  $("xiaoman-close").addEventListener("click", hideBubble);
  /* 切后台/切标签页：暂停计时，回前台继续 */
  document.addEventListener("visibilitychange", function () {
    if ($("problem-panel").classList.contains("hidden")) return;
    if (document.hidden) pauseBattleTimer(); else resumeBattleTimer();
  });
  $("btn-prob-continue").addEventListener("click", function () {
    stopBattleTimer();
    hideXiaoman();
    $("problem-panel").classList.add("hidden");
    if (curBattle) {
      /* 通关计数+1：下次再打这场战斗，轮换到下一道备选题 */
      battlePlays[curBattle] = (battlePlays[curBattle] || 0) + 1;
      try { localStorage.setItem(LS_PLAYS, JSON.stringify(battlePlays)); } catch (e) {}
    }
    idx++;
    saveGame(true);
    renderNode();
  });
  /* Tab 键在代码区缩进 */
  $("prob-code").addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      var t = e.target, s = t.selectionStart;
      t.value = t.value.slice(0, s) + "    " + t.value.slice(t.selectionEnd);
      t.selectionStart = t.selectionEnd = s + 4;
    }
    e.stopPropagation();
  });
}

bind();
validateExpressions(); /* 表情差分 404 剔除，回退原立绘 */
preloadCg();            /* 剧情 CG 预加载，切换无黑闪 */
$("btn-bgm").textContent = bgmOn ? "音乐:开" : "音乐:关";
setBG("mage");
showTitle();
})();

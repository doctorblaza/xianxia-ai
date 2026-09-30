/* ============ 《码修》AVG 引擎：单线剧情 / 左侧立绘 / 算法题关卡 ============ */
(function () {
"use strict";

function $(id) { return document.getElementById(id); }

var LS_SAVE = "maxiu_save_v2";
var LS_BGM  = "maxiu_bgm_on";

var idx = 0;                 /* 当前剧情节点下标 */
var usedProblems = [];       /* 本轮已出过的题 id（不重复） */
var typing = false, typeTimer = null, fullText = "";
var bgmOn = true;
var curBgm = null;

/* ---------- 存档 ---------- */
function saveGame(silent) {
  try {
    localStorage.setItem(LS_SAVE, JSON.stringify({ idx: idx, used: usedProblems }));
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
function showChapter(text, done) {
  var c = $("chapter");
  $("chapter-text").textContent = text;
  c.classList.remove("hidden");
  setTimeout(function () {
    c.classList.add("hidden");
    if (done) done();
  }, 2200);
}

/* ---------- 立绘（左侧） ---------- */
function setSprite(who) {
  var box = $("sprite"), img = $("sprite-img");
  var def = CHARS[who];
  if (!def || !def.sprite) { box.classList.add("hidden"); return; }
  if (img.getAttribute("src") !== def.sprite) img.src = def.sprite;
  box.classList.remove("hidden");
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
  setSprite(node.who);
  typeText(node.text);
}

/* ---------- 算法题关卡 ---------- */
/* theme：剧本指定的算法主题（如 graph / dp）；同主题内随机且尽量不重复 */
function pickProblem(theme) {
  var pool = PROBLEMS.filter(function (p) { return !theme || p.theme === theme; });
  if (!pool.length) pool = PROBLEMS.slice();
  var fresh = pool.filter(function (p) { return usedProblems.indexOf(p.id) < 0; });
  if (!fresh.length) fresh = pool;
  var p = fresh[Math.floor(Math.random() * fresh.length)];
  usedProblems.push(p.id);
  return p;
}
var curProblem = null;
function renderProblem(node) {
  curProblem = pickProblem(node.theme);
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
  $("problem-panel").classList.remove("hidden");
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
}
function showEnd() {
  $("dialogue").classList.add("hidden");
  $("sprite").classList.add("hidden");
  $("end-screen").classList.remove("hidden");
  try { localStorage.removeItem(LS_SAVE); } catch (e) {}
}

/* ---------- 标题屏 ---------- */
function showTitle() {
  ["dialogue", "toolbar", "end-screen", "problem-panel"].forEach(function (id) {
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
function startGame(fromSave) {
  $("title-screen").classList.add("hidden");
  $("dialogue").classList.remove("hidden");
  $("toolbar").classList.remove("hidden");
  if (fromSave) {
    var s = loadSave();
    if (s) { idx = s.idx || 0; usedProblems = s.used || []; }
  } else {
    idx = 0; usedProblems = [];
  }
  /* 用户手势后启动 BGM（过 autoplay 限制） */
  if (bgmOn && curBgm) { $("bgm").play().catch(function () {}); }
  renderNode();
}

/* ---------- 事件 ---------- */
function bind() {
  $("dialogue").addEventListener("click", advance);
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
    idx = s.idx || 0; usedProblems = s.used || [];
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
  $("btn-prob-continue").addEventListener("click", function () {
    $("problem-panel").classList.add("hidden");
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
$("btn-bgm").textContent = bgmOn ? "音乐:开" : "音乐:关";
setBG("mage");
showTitle();
})();

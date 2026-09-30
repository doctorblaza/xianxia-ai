/* ============ 《码修》基础数据：人物 / 背景 / BGM ============ */
"use strict";

/* 人物：说话时立绘出现在 UI 左侧 */
var CHARS = {
  /* expressions: 表情差分（缺省 calm 用 sprite 原图；缺文件时 engine 会回退 sprite） */
  "陈砚":   { sprite: "assets/sprites/chenyan.png",     label: "陈砚",
    expressions: { firm:"assets/sprites/expr/chenyan_firm.png", sad:"assets/sprites/expr/chenyan_sad.png", angry:"assets/sprites/expr/chenyan_angry.png", hurt:"assets/sprites/expr/chenyan_hurt.png", smile:"assets/sprites/expr/chenyan_smile.png" } },
  "林小满": { sprite: "assets/sprites/linxiaoman.png",  label: "林小满",
    expressions: { smile:"assets/sprites/expr/linxiaoman_smile.png", worried:"assets/sprites/expr/linxiaoman_worried.png", sad:"assets/sprites/expr/linxiaoman_sad.png", firm:"assets/sprites/expr/linxiaoman_firm.png" } },
  "陈玄机": { sprite: "assets/sprites/chenxuanji.png",   label: "陈玄机 · 家主",
    expressions: { angry:"assets/sprites/expr/chenxuanji_angry.png", sad:"assets/sprites/expr/chenxuanji_sad.png", firm:"assets/sprites/expr/chenxuanji_firm.png" } },
  "苏婉":   { sprite: "assets/sprites/suwan.png",       label: "苏婉 · 主母",
    expressions: { firm:"assets/sprites/expr/suwan_firm.png", sad:"assets/sprites/expr/suwan_sad.png", angry:"assets/sprites/expr/suwan_angry.png" } },
  "陈玄刚": { sprite: "assets/sprites/elder_gang.png",  label: "大长老 · 陈玄刚",
    expressions: { angry:"assets/sprites/expr/elder_gang_angry.png", firm:"assets/sprites/expr/elder_gang_firm.png" } },
  "陈玄文": { sprite: "assets/sprites/elder_wen.png",   label: "二长老 · 陈玄文",
    expressions: { sad:"assets/sprites/expr/elder_wen_sad.png", firm:"assets/sprites/expr/elder_wen_firm.png" } },
  "陈玄冥": { sprite: "assets/sprites/elder_ming.png",  label: "三长老 · 陈玄冥",
    expressions: { caring:"assets/sprites/expr/elder_ming_caring.png", sinister:"assets/sprites/expr/elder_ming_sinister.png" } },
  "旁白":   { sprite: null, label: "" },
  /* 七宗宗主（复仇篇用，序章暂未登场，立绘已就绪） */
  "Musk":      { sprite: "assets/sprites/musk.png",       label: "Musk 宗主",
    expressions: { smirk:"assets/sprites/expr/musk_smirk.png", angry:"assets/sprites/expr/musk_angry.png" } },
  "Altman":    { sprite: "assets/sprites/altman.png",     label: "Altman 宗主",
    expressions: { smirk:"assets/sprites/expr/altman_smirk.png", angry:"assets/sprites/expr/altman_angry.png" } },
  "Zuckerberg":{ sprite: "assets/sprites/zuckerberg.png", label: "Zuckerberg 宗主",
    expressions: { smirk:"assets/sprites/expr/zuckerberg_smirk.png", angry:"assets/sprites/expr/zuckerberg_angry.png" } },
  "Pichai":    { sprite: "assets/sprites/pichai.png",     label: "Pichai 宗主",
    expressions: { sad:"assets/sprites/expr/pichai_sad.png", smile:"assets/sprites/expr/pichai_smile.png" } },
  "张一鸣":    { sprite: "assets/sprites/zhangyiming.png",label: "张一鸣 宗主",
    expressions: { smirk:"assets/sprites/expr/zhangyiming_smirk.png", sad:"assets/sprites/expr/zhangyiming_sad.png" } },
  "Dario":     { sprite: "assets/sprites/dario.png",      label: "Dario 宗主",
    expressions: { firm:"assets/sprites/expr/dario_firm.png", sad:"assets/sprites/expr/dario_sad.png" } },
  "Cook":      { sprite: "assets/sprites/cook.png",       label: "Cook 宗主",
    expressions: { firm:"assets/sprites/expr/cook_firm.png", smirk:"assets/sprites/expr/cook_smirk.png" } },
  "弟子甲":    { sprite: null, label: "弟子甲" },
  "弟子乙":    { sprite: null, label: "弟子乙" }
};

/* 水墨背景 */
var BGS = {
  "mage":     "assets/bg/bg-mage.webp",      /* 陈氏码阁 · 晨 */
  "night":    "assets/bg/bg-night.webp",     /* 灭门之夜 */
  "duanwang": "assets/bg/bg-duanwang.webp",  /* 断网崖 */
  "xiulian":  "assets/bg/bg-xiulian.webp",  /* 竹林修炼 */
  "jianshan": "assets/bg/bg-jianshan.webp",  /* xAI 宗 · 倒悬铁剑山 */
  "danlu":    "assets/bg/bg-danlu.webp",     /* OpenAI 宗 · 通天丹炉 */
  "shushan":  "assets/bg/bg-shushan.webp",   /* Google 宗 · 书山 */
  "guangmu":  "assets/bg/bg-guangmu.webp",   /* ByteDance 宗 · 流转光幕 */
  "yinbai":   "assets/bg/bg-yinbai.webp",    /* Apple 宗 · 银白守御大阵 */
  "lanwu":    "assets/bg/bg-lanwu.webp"      /* Meta 宗 · 蓝雾幻阵 */
};

/* 仙剑四 OST BGM：按曲名氛围匹配场景 */
var BGMS = {
  /* 標題 / 碼閣日常：仙劍問情 · 抒情溫柔 */
  "wenqing":  "assets/bgm/bgm-wenqing.mp3",
  /* 序章滅門夜：肅殺絕劍（神將句芒）· 殺伐肅殺 */
  "susha":    "assets/bgm/bgm-susha.mp3",
  /* 第一章斷網崖：回夢遊仙 · 空靈 */
  "huimeng":  "assets/bgm/bgm-huimeng.mp3",
  /* 第二章 Musk 快劍對決：浣花洗劍 · 劍氣縱橫 */
  "huanhua":  "assets/bgm/bgm-huanhua.mp3",
  /* 第三章 Altman 丹爐對決：焚心以火 · 烈焰煉丹 */
  "fenxin":   "assets/bgm/bgm-fenxin.mp3",
  /* 第四章 Pichai 書生劍：仙劍問情 · 溫文 */
  /* 第五章 張一鳴光幕沉浸：哀幻瞑（幻瞑界）· 迷離幻境 */
  "aihuan":   "assets/bgm/bgm-aihuan.mp3",
  /* 第六章 Dario 竹林品茶：蝶戀 · 清雅 */
  "dielian":  "assets/bgm/bgm-dielian.mp3",
  /* 第七章 Cook 守御攻堅：危時仗劍 · 仗劍破陣 */
  "weishi":   "assets/bgm/bgm-weishi.mp3",
  /* 終章撕下偽裝：浮生長恨（亡悼）· 悲愴收場 */
  "fusheng":  "assets/bgm/bgm-fusheng.mp3"
};

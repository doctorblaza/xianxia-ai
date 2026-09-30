/* ============ 《码修》Python 执行器：Pyodide（浏览器内执行）
 * 首次进入算法题时懒加载 CDN Pyodide；之后复用。
 * runTests(problem, code) -> Promise<[{ok, got, expected}]>
 * ============================================================ */
"use strict";

var PyRunner = (function () {
  var pyodide = null;
  var loading = null;
  var PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("Pyodide CDN 加载失败，请检查网络")); };
      document.head.appendChild(s);
    });
  }

  function ensure() {
    if (pyodide) return Promise.resolve(pyodide);
    if (loading) return loading;
    loading = loadScript(PYODIDE_URL).then(function () {
      /* global loadPyodide */
      return loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    }).then(function (p) {
      pyodide = p;
      return pyodide;
    }).catch(function (e) {
      loading = null;
      throw e;
    });
    return loading;
  }

  /* 把题目测试转成 Python 可执行的判定脚本 */
  function buildHarness(problem, code) {
    var testsJSON = JSON.stringify(problem.tests);
    var lines = [];
    lines.push("import json");
    lines.push("_tests = json.loads('" + testsJSON.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "')");
    if (problem.kind === "linkedlist") {
      /* 链表题：测试参数 list <-> ListNode 自动转换 */
      lines.push("class ListNode:");
      lines.push("    def __init__(self, val=0, next=None):");
      lines.push("        self.val = val");
      lines.push("        self.next = next");
      lines.push("def _to_ll(lst):");
      lines.push("    _d = ListNode(); _c = _d");
      lines.push("    for _v in (lst or []): _c.next = ListNode(_v); _c = _c.next");
      lines.push("    return _d.next");
      lines.push("def _to_ll_arg(a):");
      lines.push("    if isinstance(a, list) and len(a) > 0 and isinstance(a[0], list):");
      lines.push("        return [_to_ll(_x) for _x in a]");
      lines.push("    return _to_ll(a) if isinstance(a, list) else a");
      lines.push("def _to_list(node):");
      lines.push("    if isinstance(node, list): return list(node)");
      lines.push("    _o = []");
      lines.push("    while node: _o.append(node.val); node = node.next");
      lines.push("    return _o");
    }
    lines.push(code);
    lines.push("_results = []");
    lines.push("for _t in _tests:");
    lines.push("    _exp = _t['expected']");
    lines.push("    try:");
    if (problem.kind === "linkedlist") {
      lines.push("        _args = [_to_ll_arg(a) for a in _t['args']]");
      lines.push("        _out = _to_list(" + problem.func + "(*_args))");
    } else {
      lines.push("        _args = _t['args']");
      lines.push("        _out = " + problem.func + "(*_args)");
    }
    if (problem.normalize === "sort") {
      lines.push("        _key = lambda x: json.dumps(x, sort_keys=True)");
      lines.push("        _ok = sorted(map(_key, _out)) == sorted(map(_key, _exp))");
    } else {
      lines.push("        if isinstance(_out, (list, tuple)) and isinstance(_exp, (list, tuple)):");
      lines.push("            _ok = list(_out) == list(_exp)");
      lines.push("        else:");
      lines.push("            _ok = _out == _exp");
    }
    lines.push("        _results.append({'ok': bool(_ok), 'got': repr(_out)[:160], 'expected': repr(_exp)[:160]})");
    lines.push("    except Exception as _e:");
    lines.push("        _results.append({'ok': False, 'got': '报错: ' + str(_e)[:160], 'expected': repr(_t['expected'])[:160]})");
    lines.push("json.dumps(_results)");
    return lines.join("\n");
  }

  function runTests(problem, code) {
    return ensure().then(function (p) {
      var harness = buildHarness(problem, code);
      var out;
      try {
        out = p.runPython(harness);
      } catch (e) {
        /* 顶层语法错误等 */
        return problem.tests.map(function (t) {
          return { ok: false, got: "报错: " + String(e && e.message || e).slice(0, 160),
                   expected: JSON.stringify(t.expected).slice(0, 160) };
        });
      }
      try {
        return JSON.parse(out);
      } catch (e) {
        return [{ ok: false, got: "判定脚本异常", expected: "" }];
      }
    });
  }

  return { ensure: ensure, runTests: runTests };
})();

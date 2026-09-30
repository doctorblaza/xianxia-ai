/* ============ 《码修》算法题库：按剧本位置固定出题，Python 作答 ============
 * 每题：id / title / diff / theme(算法主题) / flavor(剧情包装) / desc /
 *       func / template / tests / kind / normalize
 * tests: [{args:[...], expected:...}]
 * 判定：func(*args) 的返回值与 expected 相等（list/tuple 互通）
 * kind="linkedlist"：测试参数中的 list 会自动转为 ListNode 再传入，
 *   返回的 ListNode 会转回 list 再比较。
 * normalize="sort"：比较时先对结果排序（适用于顺序无关的题目）
 * ============================================================ */
"use strict";

var PROBLEMS = [
{
  id: "two-sum", title: "两仪剑气", diff: "★ 入门", theme: "hash",
  flavor: "晨课第一式。两道剑气相合，方能破敌——找出和为目标的两道剑气。",
  desc: "给定整数数组 nums 和目标值 target，请找出和为 target 的两个数的下标。\n假设每组输入只对应一种答案，且同一个元素不能使用两次。\n\n示例：nums = [2,7,11,15], target = 9 → 返回 [0,1]",
  func: "two_sum",
  template: "def two_sum(nums, target):\n    # 在此写下你的剑诀，返回两个下标组成的列表\n    pass\n",
  tests: [
    { args: [[2,7,11,15], 9], expected: [0,1] },
    { args: [[3,2,4], 6],     expected: [1,2] },
    { args: [[3,3], 6],       expected: [0,1] },
    { args: [[-1,-2,-3,-4,-5], -8], expected: [2,4] }
  ]
},
{
  id: "palindrome", title: "心魔回文", diff: "★ 入门", theme: "string",
  flavor: "心魔作祟，幻象正读反读皆是一样。看破回文，方能守住心神。",
  desc: "给定一个整数 x，判断它是否为回文数（正读反读都一样）。\n负数不是回文数。\n\n示例：x = 121 → 返回 True；x = -121 → 返回 False",
  func: "is_palindrome",
  template: "def is_palindrome(x):\n    # 在此写下你的剑诀，返回 True 或 False\n    pass\n",
  tests: [
    { args: [121],   expected: true },
    { args: [-121],  expected: false },
    { args: [10],    expected: false },
    { args: [12321], expected: true },
    { args: [0],     expected: true }
  ]
},
{
  id: "parens", title: "符箓配对", diff: "★ 入门", theme: "stack",
  flavor: "小满画的符箓，括号必须成双成对。配错一处，符箓自焚。",
  desc: "给定只含 '(', ')', '{', '}', '[', ']' 的字符串 s，判断括号是否有效。\n有效条件：左括号必须由同类型右括号闭合，且顺序正确。\n\n示例：s = \"()[]{}\" → 返回 True；s = \"(]\" → 返回 False",
  func: "is_valid",
  template: "def is_valid(s):\n    # 在此写下你的剑诀，返回 True 或 False\n    pass\n",
  tests: [
    { args: ["()"],      expected: true },
    { args: ["()[]{}"],  expected: true },
    { args: ["(]"],      expected: false },
    { args: ["([)]"],    expected: false },
    { args: ["{[]}"],    expected: true },
    { args: [""],        expected: true }
  ]
},
{
  id: "stairs", title: "登云梯", diff: "★★ 进阶", theme: "dp",
  flavor: "断网崖的云梯，每次可踏一阶或两阶。算出登顶之法，方能上崖修炼。",
  desc: "假设你正在爬楼梯，需要 n 阶才能到达崖顶。\n每次可以爬 1 或 2 阶，有多少种不同的方法可以爬到顶？\n\n示例：n = 3 → 返回 3（1+1+1 / 1+2 / 2+1）",
  func: "climb_stairs",
  template: "def climb_stairs(n):\n    # 在此写下你的剑诀，返回方法总数\n    pass\n",
  tests: [
    { args: [2],  expected: 2 },
    { args: [3],  expected: 3 },
    { args: [5],  expected: 8 },
    { args: [10], expected: 89 },
    { args: [1],  expected: 1 }
  ]
},
{
  id: "maxsub", title: "剑气连斩", diff: "★★ 进阶", theme: "dp",
  flavor: "剑气连绵不绝，找出最强的一段连斩——连续子数组的最大和。",
  desc: "给定整数数组 nums，找出和最大的连续子数组，返回其最大和。\n\n示例：nums = [-2,1,-3,4,-1,2,1,-5,4] → 返回 6（子数组 [4,-1,2,1]）",
  func: "max_subarray",
  template: "def max_subarray(nums):\n    # 在此写下你的剑诀，返回最大和\n    pass\n",
  tests: [
    { args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
    { args: [[1]],    expected: 1 },
    { args: [[-1]],   expected: -1 },
    { args: [[5,4,-1,7,8]], expected: 23 }
  ]
},
{
  id: "merge", title: "灵脉归一", diff: "★★ 进阶", theme: "sort",
  flavor: "散落的灵脉碎片彼此重叠，以码修之法将其合并归一。",
  desc: "给定区间数组 intervals（[start, end]），合并所有重叠的区间，\n返回合并后的区间数组（按 start 排序）。\n\n示例：[[1,3],[2,6],[8,10],[15,18]] → 返回 [[1,6],[8,10],[15,18]]",
  func: "merge",
  template: "def merge(intervals):\n    # 在此写下你的剑诀，返回合并后的区间列表\n    pass\n",
  tests: [
    { args: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
    { args: [[[1,4],[4,5]]],               expected: [[1,5]] },
    { args: [[[1,4],[0,4]]],               expected: [[0,4]] },
    { args: [[[1,4],[2,3]]],               expected: [[1,4]] }
  ]
},
{
  id: "substr", title: "无垢心境", diff: "★★★ 精深", theme: "sliding-window",
  flavor: "心魔丛生，唯有心境无垢、念头不重复，方能入定。",
  desc: "给定字符串 s，找出其中不含有重复字符的最长子串的长度。\n\n示例：s = \"abcabcbb\" → 返回 3（\"abc\"）；s = \"bbbbb\" → 返回 1",
  func: "length_of_longest_substring",
  template: "def length_of_longest_substring(s):\n    # 在此写下你的剑诀，返回最长长度\n    pass\n",
  tests: [
    { args: ["abcabcbb"], expected: 3 },
    { args: ["bbbbb"],    expected: 1 },
    { args: ["pwwkew"],   expected: 3 },
    { args: [""],         expected: 0 },
    { args: ["abcdef"],   expected: 6 }
  ]
},
{
  id: "rain", title: "聚灵成渊", diff: "★★★ 精深", theme: "two-pointers",
  flavor: "群山如柱，雨落成渊。以阵法聚拢灵雨，能蓄多少灵液？",
  desc: "给定 n 个非负整数表示柱子的高度（宽度为 1），\n计算按此排列的柱子在下雨之后能接住多少雨水。\n\n示例：height = [0,1,0,2,1,0,1,3,2,1,2,1] → 返回 6",
  func: "trap",
  template: "def trap(height):\n    # 在此写下你的剑诀，返回能接住的雨水总量\n    pass\n",
  tests: [
    { args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
    { args: [[4,2,0,3,2,5]],             expected: 9 },
    { args: [[0,0,0]],                  expected: 0 },
    { args: [[5,4,3,2,1]],              expected: 0 }
  ]
},
{
  id: "islands", title: "岛屿剑阵", diff: "★★ 进阶", theme: "graph",
  flavor: "崩塌的大阵碎成无数孤岛，唯有 BFS 的灵识能数清生路。",
  desc: "给定 m x n 的二进制网格 grid（1 为灵岛，0 为灵海），\n上下左右相连的 1 组成一座岛屿。返回岛屿的数量。\n\n示例：grid = [[1,1,0],[1,0,0],[0,0,1]] → 返回 2",
  func: "num_islands",
  template: "from collections import deque\ndef num_islands(grid):\n    # 在此写下你的剑诀（BFS/DFS 皆可），返回岛屿数量\n    pass\n",
  tests: [
    { args: [[[1,1,0],[1,0,0],[0,0,1]]], expected: 2 },
    { args: [[[1,1,1],[1,0,1],[1,1,1]]], expected: 1 },
    { args: [[[0,0,0],[0,0,0]]],         expected: 0 },
    { args: [[[1,0,1],[0,1,0],[1,0,1]]], expected: 5 }
  ]
},
{
  id: "flood-fill", title: "灵墨渲染", diff: "★ 入门", theme: "graph",
  flavor: "一滴灵墨落入阵图，沿经脉蔓延——DFS 所至，皆染我色。",
  desc: "给定图像 image（m x n 整数矩阵）、起点 (sr, sc) 和新颜色 color，\n从起点开始，将上下左右相连的相同颜色区域全部染成 color。\n返回染色后的图像。\n\n示例：image=[[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2\n→ 返回 [[2,2,2],[2,2,0],[2,0,1]]",
  func: "flood_fill",
  template: "def flood_fill(image, sr, sc, color):\n    # 在此写下你的剑诀，返回染色后的图像\n    pass\n",
  tests: [
    { args: [[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2], expected: [[2,2,2],[2,2,0],[2,0,1]] },
    { args: [[[0,0,0],[0,0,0]], 0, 0, 2],         expected: [[2,2,2],[2,2,2]] },
    { args: [[[1,2,3]], 0, 1, 9],                expected: [[1,9,3]] },
    { args: [[[5]], 0, 0, 5],                    expected: [[5]] }
  ]
},
{
  id: "permutations", title: "剑招全排列", diff: "★★ 进阶", theme: "backtrack",
  normalize: "sort",
  flavor: "心魔化作无穷剑招，唯有回溯能穷举一切变化——写下终止条件！",
  desc: "给定不含重复数字的数组 nums，返回其所有可能的全排列。\n返回顺序不限。\n\n示例：nums = [1,2,3] → 返回 6 种排列",
  func: "permute",
  template: "def permute(nums):\n    # 在此写下你的剑诀（回溯），返回所有排列组成的列表\n    pass\n",
  tests: [
    { args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
    { args: [[0,1]],   expected: [[0,1],[1,0]] },
    { args: [[1]],     expected: [[1]] }
  ]
},
{
  id: "gen-parens", title: "符箓生成", diff: "★★★ 精深", theme: "backtrack",
  normalize: "sort",
  flavor: "小满的符箓要一次画对 n 对括号——回溯生成，不多不少。",
  desc: "给定 n（括号对数），生成所有有效的括号组合。\n返回顺序不限。\n\n示例：n = 3 → 返回 [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
  func: "generate_parenthesis",
  template: "def generate_parenthesis(n):\n    # 在此写下你的剑诀（回溯），返回所有有效组合\n    pass\n",
  tests: [
    { args: [3], expected: ["((()))","(()())","(())()","()(())","()()()"] },
    { args: [2], expected: ["(())","()()"] },
    { args: [1], expected: ["()"] }
  ]
},
{
  id: "rob", title: "劫灵脉", diff: "★★ 进阶", theme: "dp",
  flavor: "七宗的灵脉据点连成一排，相邻两处不能同劫——DP 取最优。",
  desc: "给定数组 nums（每处灵脉的储量），不能同时打劫相邻的两处，\n求在不触动警报的情况下能打劫到的最大储量。\n\n示例：nums = [2,7,9,3,1] → 返回 12",
  func: "rob",
  template: "def rob(nums):\n    # 在此写下你的剑诀，返回最大储量\n    pass\n",
  tests: [
    { args: [[1,2,3,1]],  expected: 4 },
    { args: [[2,7,9,3,1]], expected: 12 },
    { args: [[5]],        expected: 5 },
    { args: [[2,1]],      expected: 2 }
  ]
},
{
  id: "two-sum-ii", title: "两仪归位", diff: "★ 入门", theme: "two-pointers",
  flavor: "Musk 的快剑毫无章法——左右双指针夹逼，封死所有退路！",
  desc: "给定已按升序排列的数组 numbers 和目标值 target，\n请用双指针找出和为 target 的两个数，返回它们的下标（从 1 开始）。\n\n示例：numbers = [2,7,11,15], target = 9 → 返回 [1,2]",
  func: "two_sum_sorted",
  template: "def two_sum_sorted(numbers, target):\n    # 在此写下你的剑诀（双指针），返回 [i, j]（下标从 1 开始）\n    pass\n",
  tests: [
    { args: [[2,7,11,15], 9], expected: [1,2] },
    { args: [[2,3,4], 6],     expected: [1,3] },
    { args: [[-1,0], -1],     expected: [1,2] },
    { args: [[1,2,3,4,5], 9], expected: [4,5] }
  ]
},
{
  id: "can-jump", title: "御剑飞行", diff: "★★ 进阶", theme: "greedy",
  flavor: "Altman 的归一神功贪多求全——以贪心之剑，每一步都拿最优！",
  desc: "给定数组 nums，每个元素代表在该位置最多可跳的步数。\n判断是否能从下标 0 跳到最后一个下标。\n\n示例：nums = [2,3,1,1,4] → 返回 True；nums = [3,2,1,0,4] → 返回 False",
  func: "can_jump",
  template: "def can_jump(nums):\n    # 在此写下你的剑诀（贪心），返回 True 或 False\n    pass\n",
  tests: [
    { args: [[2,3,1,1,4]], expected: true },
    { args: [[3,2,1,0,4]], expected: false },
    { args: [[0]],         expected: true },
    { args: [[2,0,0]],     expected: true }
  ]
},
{
  id: "max-profit2", title: "灵石倒卖", diff: "★ 入门", theme: "greedy",
  flavor: "灵石价格每日涨跌，贪心低买高卖——积少成多也是道。",
  desc: "给定数组 prices（第 i 天的灵石价格），\n你可以多次买卖（但同一时间只能持有一块），求最大利润。\n\n示例：prices = [7,1,5,3,6,4] → 返回 7",
  func: "max_profit",
  template: "def max_profit(prices):\n    # 在此写下你的剑诀（贪心），返回最大利润\n    pass\n",
  tests: [
    { args: [[7,1,5,3,6,4]], expected: 7 },
    { args: [[1,2,3,4,5]],   expected: 4 },
    { args: [[7,6,4,3,1]],   expected: 0 },
    { args: [[3]],           expected: 0 }
  ]
},
{
  id: "bsearch", title: "书海定位", diff: "★ 入门", theme: "binary-search",
  flavor: "书山再大，也有中点——二分查找，一剑中的！",
  desc: "给定升序数组 nums 和目标值 target，用二分查找返回 target 的下标，\n不存在则返回 -1。\n\n示例：nums = [-1,0,3,5,9,12], target = 9 → 返回 4",
  func: "binary_search",
  template: "def binary_search(nums, target):\n    # 在此写下你的剑诀（二分查找），返回下标或 -1\n    pass\n",
  tests: [
    { args: [[-1,0,3,5,9,12], 9],  expected: 4 },
    { args: [[-1,0,3,5,9,12], 2],  expected: -1 },
    { args: [[5], 5],              expected: 0 },
    { args: [[1,2], 3],            expected: -1 }
  ]
},
{
  id: "search-insert", title: "剑入鞘位", diff: "★ 入门", theme: "binary-search",
  flavor: "剑有千柄，鞘位有序——新剑归鞘，二分定其位。",
  desc: "给定升序数组 nums 和目标值 target，\n返回 target 应插入的位置下标（保持有序）。\n\n示例：nums = [1,3,5,6], target = 2 → 返回 1",
  func: "search_insert",
  template: "def search_insert(nums, target):\n    # 在此写下你的剑诀（二分查找），返回插入位置\n    pass\n",
  tests: [
    { args: [[1,3,5,6], 5], expected: 2 },
    { args: [[1,3,5,6], 2], expected: 1 },
    { args: [[1,3,5,6], 7], expected: 4 },
    { args: [[1,3,5,6], 0], expected: 0 }
  ]
},
{
  id: "min-subarray-len", title: "心猿意马", diff: "★★ 进阶", theme: "sliding-window",
  flavor: "信息流无穷无尽——滑动窗口框住当下，不被吞没！",
  desc: "给定正整数数组 nums 和目标值 target，\n找出和 ≥ target 的最短连续子数组的长度，不存在返回 0。\n\n示例：target = 7, nums = [2,3,1,2,4,3] → 返回 2",
  func: "min_subarray_len",
  template: "def min_subarray_len(target, nums):\n    # 在此写下你的剑诀（滑动窗口），返回最短长度\n    pass\n",
  tests: [
    { args: [7, [2,3,1,2,4,3]],          expected: 2 },
    { args: [4, [1,4,4]],                expected: 1 },
    { args: [11, [1,1,1,1,1,1,1,1]],     expected: 0 },
    { args: [15, [5,1,3,5,10,7,4,9,2,8]], expected: 2 }
  ]
},
{
  id: "daily-temp", title: "丹炉火候", diff: "★★ 进阶", theme: "stack",
  flavor: "Dario 的宪法剑心层层设防——以栈观火候，每日温度皆有定数。",
  desc: "给定数组 T（每日温度），返回数组 ans，\n其中 ans[i] 表示第 i 天之后第几天会更暖和，不存在则为 0。\n\n示例：T = [73,74,75,71,69,72,76,73] → 返回 [1,1,4,2,1,1,0,0]",
  func: "daily_temperatures",
  template: "def daily_temperatures(T):\n    # 在此写下你的剑诀（单调栈），返回等待天数数组\n    pass\n",
  tests: [
    { args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
    { args: [[30,40,50,60]],             expected: [1,1,1,0] },
    { args: [[30,60,90]],                expected: [1,1,0] },
    { args: [[90,80,70]],                expected: [0,0,0] }
  ]
},
{
  id: "reverse-ll", title: "逆转灵链", diff: "★ 入门", theme: "linked-list",
  kind: "linkedlist",
  flavor: "供应链大阵环环相扣——逆转灵链，断其尾！",
  desc: "给定单链表的头节点 head（ListNode，有 val / next），\n反转链表并返回新的头节点。\n\n说明：测试用例以数组形式给出，会自动转为链表传入；\n你的返回值（ListNode）会自动转回数组比较。\n\n示例：head = [1,2,3,4,5] → 返回 [5,4,3,2,1]",
  func: "reverse_list",
  template: "# head 是 ListNode（val/next），返回反转后的头节点\ndef reverse_list(head):\n    # 在此写下你的剑诀\n    pass\n",
  tests: [
    { args: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
    { args: [[1,2]],       expected: [2,1] },
    { args: [[1]],         expected: [1] },
    { args: [[]],          expected: [] }
  ]
},
{
  id: "merge-two-ll", title: "双链归一", diff: "★ 入门", theme: "linked-list",
  kind: "linkedlist",
  flavor: "两条灵脉支链皆已归顺——合二为一，仍保有序。",
  desc: "给定两条升序链表的头节点 l1、l2（ListNode），\n合并为一条升序链表并返回头节点。\n\n说明：测试用例以数组形式给出，会自动转为链表传入。\n\n示例：l1 = [1,2,4], l2 = [1,3,4] → 返回 [1,1,2,3,4,4]",
  func: "merge_two_lists",
  template: "# l1、l2 是 ListNode（val/next），返回合并后的头节点\ndef merge_two_lists(l1, l2):\n    # 在此写下你的剑诀\n    pass\n",
  tests: [
    { args: [[1,2,4],[1,3,4]], expected: [1,1,2,3,4,4] },
    { args: [[],[]],           expected: [] },
    { args: [[],[0]],          expected: [0] },
    { args: [[5],[1,2]],       expected: [1,2,5] }
  ]
},
{
  id: "network-delay", title: "幻阵传讯", diff: "★★★ 精深", theme: "graph-advanced",
  flavor: "阵有千重，路只有一条——Dijkstra，开！",
  desc: "有 n 个阵眼（编号 1..n），times[i] = [u, v, w] 表示灵讯从 u 到 v 耗时 w。\n从阵眼 k 发出灵讯，求灵讯传遍所有阵眼的最短总耗时；\n若有阵眼无法到达，返回 -1。\n\n示例：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2 → 返回 2",
  func: "network_delay_time",
  template: "import heapq\ndef network_delay_time(times, n, k):\n    # 在此写下你的剑诀（Dijkstra），返回最短总耗时\n    pass\n",
  tests: [
    { args: [[[2,1,1],[2,3,1],[3,4,1]], 4, 2], expected: 2 },
    { args: [[[1,2,1]], 2, 1],                 expected: 1 },
    { args: [[[1,2,1]], 2, 2],                 expected: -1 },
    { args: [[[1,2,1],[2,3,2],[1,3,2]], 3, 1], expected: 2 }
  ]
},
{
  id: "min-path-sum", title: "幻阵最短路", diff: "★★ 进阶", theme: "graph-advanced",
  flavor: "重重幻阵，真假难辨——DP 铺路，算出唯一的真实通路。",
  desc: "给定 m x n 网格 grid（非负整数），每次只能向下或向右走，\n求从左上角到右下角的路径中，数字总和最小的一条。\n\n示例：grid = [[1,3,1],[1,5,1],[4,2,1]] → 返回 7",
  func: "min_path_sum",
  template: "def min_path_sum(grid):\n    # 在此写下你的剑诀（动态规划），返回最小路径和\n    pass\n",
  tests: [
    { args: [[[1,3,1],[1,5,1],[4,2,1]]], expected: 7 },
    { args: [[[1,2,3],[4,5,6]]],       expected: 12 },
    { args: [[[5]]],                   expected: 5 },
    { args: [[[1,2],[1,1]]],           expected: 3 }
  ]
},
{
  id: "path-exists", title: "生路推演", diff: "★ 入门", theme: "graph",
  flavor: "大阵经脉寸断，唯有算出两处阵眼之间是否还有通路，方能找到生路。",
  desc: "护山大阵有 n 个阵眼（编号 0 到 n-1），edges[i] = [a, b] 表示阵眼 a 与 b 之间有双向经脉相连。\n请判断从阵眼 source 出发，能否到达阵眼 destination。\n\n示例：n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2 → 返回 True",
  func: "valid_path",
  template: "from collections import deque\ndef valid_path(n, edges, source, destination):\n    # 在此写下你的剑诀（BFS/DFS 皆可），返回 True 或 False\n    pass\n",
  tests: [{"args": [3, [[0, 1], [1, 2], [2, 0]], 0, 2], "expected": true}, {"args": [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], "expected": false}, {"args": [1, [], 0, 0], "expected": true}, {"args": [4, [[0, 1], [2, 3]], 1, 3], "expected": false}]
},
{
  id: "town-judge", title: "镇阵之眼", diff: "★ 入门", theme: "graph",
  flavor: "万千阵眼互相呼应——找到那个被所有阵眼呼应、自己却不呼应任何阵眼的镇阵之眼。",
  desc: "大阵有 n 个阵眼（编号 1 到 n），trust[i] = [a, b] 表示阵眼 a 呼应阵眼 b。\n镇阵之眼需满足：被其余 n-1 个阵眼呼应，且自己不呼应任何阵眼。\n请返回镇阵之眼的编号，不存在返回 -1。\n\n示例：n = 2, trust = [[1,2]] → 返回 2",
  func: "find_judge",
  template: "def find_judge(n, trust):\n    # 在此写下你的剑诀，返回镇阵之眼的编号或 -1\n    pass\n",
  tests: [{"args": [2, [[1, 2]]], "expected": 2}, {"args": [3, [[1, 3], [2, 3]]], "expected": 3}, {"args": [3, [[1, 3], [2, 3], [3, 1]]], "expected": -1}, {"args": [1, []], "expected": 1}]
},
{
  id: "subsets", title: "心魔分形", diff: "★★ 进阶", theme: "backtrack", normalize: "sort",
  flavor: "心魔一化为二，二化为四……穷举它所有的分形变化，方能看破虚妄。",
  desc: "给定不含重复数字的数组 nums，返回它的所有子集（幂集）。\n返回顺序不限。\n\n示例：nums = [1,2,3] → 返回 [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
  func: "subsets",
  template: "def subsets(nums):\n    # 在此写下你的剑诀（回溯），返回所有子集组成的列表\n    pass\n",
  tests: [{"args": [[1, 2, 3]], "expected": [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]}, {"args": [[0]], "expected": [[], [0]]}, {"args": [[]], "expected": [[]]}]
},
{
  id: "phone-comb", title: "传讯符组合", diff: "★★ 进阶", theme: "backtrack", normalize: "sort",
  flavor: "小满的传讯符上数字成串——2 到 9 每个数字都对应几种笔画，全部列出来，一封都不能漏。",
  desc: "给定只含数字 2-9 的字符串 digits，返回它能表示的所有字母组合。\n数字字母映射：2→abc, 3→def, 4→ghi, 5→jkl, 6→mno, 7→pqrs, 8→tuv, 9→wxyz。\n返回顺序不限。\n\n示例：digits = \"23\" → 返回 [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
  func: "letter_combinations",
  template: "def letter_combinations(digits):\n    # 在此写下你的剑诀（回溯），返回所有字母组合\n    pass\n",
  tests: [{"args": ["23"], "expected": ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]}, {"args": [""], "expected": []}, {"args": ["2"], "expected": ["a", "b", "c"]}]
},
{
  id: "container-water", title: "剑气蓄渊", diff: "★★ 进阶", theme: "two-pointers",
  flavor: "两道剑气如柱，左右夹逼——双指针合围之间，能蓄下多少剑意？",
  desc: "给定数组 height（每根剑气柱的高度，宽度为 1），\n请用双指针找出两根柱子，使它们与地面围成的容器能蓄下最多的剑气，返回最大蓄量。\n\n示例：height = [1,8,6,2,5,4,8,3,7] → 返回 49",
  func: "max_area",
  template: "def max_area(height):\n    # 在此写下你的剑诀（双指针），返回最大蓄量\n    pass\n",
  tests: [{"args": [[1, 8, 6, 2, 5, 4, 8, 3, 7]], "expected": 49}, {"args": [[1, 1]], "expected": 1}, {"args": [[4, 3, 2, 1, 4]], "expected": 16}]
},
{
  id: "three-sum", title: "三才锁剑", diff: "★★ 进阶", theme: "two-pointers", normalize: "sort",
  flavor: "三才剑阵——唯有三道剑气相抵为零，方能锁住 Musk 的快剑！",
  desc: "给定整数数组 nums，找出所有和为 0 的不重复三元组。\n返回顺序不限。\n\n示例：nums = [-1,0,1,2,-1,-4] → 返回 [[-1,-1,2],[-1,0,1]]",
  func: "three_sum",
  template: "def three_sum(nums):\n    # 在此写下你的剑诀（排序+双指针），返回所有三元组\n    pass\n",
  tests: [{"args": [[-1, 0, 1, 2, -1, -4]], "expected": [[-1, -1, 2], [-1, 0, 1]]}, {"args": [[0, 1, 1]], "expected": []}, {"args": [[0, 0, 0]], "expected": [[0, 0, 0]]}]
},
{
  id: "sort-colors", title: "三色归位", diff: "★★ 进阶", theme: "two-pointers",
  flavor: "红白青三色剑气混杂——双指针拨乱反正，各归其位。",
  desc: "给定数组 nums，只含 0（赤）、1（白）、2（青），\n请用双指针将其原地排成 [0…0, 1…1, 2…2]，并返回排序后的数组。\n\n示例：nums = [2,0,2,1,1,0] → 返回 [0,0,1,1,2,2]",
  func: "sort_colors",
  template: "def sort_colors(nums):\n    # 在此写下你的剑诀（双指针），返回排序后的数组\n    pass\n",
  tests: [{"args": [[2, 0, 2, 1, 1, 0]], "expected": [0, 0, 1, 1, 2, 2]}, {"args": [[2, 0, 1]], "expected": [0, 1, 2]}, {"args": [[0]], "expected": [0]}]
},
{
  id: "gas-station", title: "灵脉补给", diff: "★★ 进阶", theme: "greedy",
  flavor: "追击 Altman 的路上灵脉据点星罗棋布——贪心算好每一站的补给，一口气追到底！",
  desc: "有 n 个灵脉据点，gas[i] 是第 i 处可补充的灵气，cost[i] 是从第 i 处到下一处消耗的灵气。\n从某处出发（初始灵气为 0）绕行一圈回到起点，求可行的出发点下标；\n若无解返回 -1（题目保证至多一个解）。\n\n示例：gas = [1,2,3,4,5], cost = [3,4,5,1,2] → 返回 3",
  func: "can_complete_circuit",
  template: "def can_complete_circuit(gas, cost):\n    # 在此写下你的剑诀（贪心），返回出发点下标或 -1\n    pass\n",
  tests: [{"args": [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], "expected": 3}, {"args": [[2, 3, 4], [3, 4, 3]], "expected": -1}, {"args": [[5], [4]], "expected": 0}]
},
{
  id: "partition-labels", title: "丹火分区", diff: "★★ 进阶", theme: "greedy",
  flavor: "丹炉烈焰中不同火种交织——把同种火种圈在同一炉膛，方能开炉炼丹。",
  desc: "给定字符串 s（每种字母是一种火种），请将其划分成尽可能多的片段，\n使每种火种至多出现在一个片段中。返回各片段的长度。\n\n示例：s = \"ababcbacadefegdehijhklij\" → 返回 [9,7,8]",
  func: "partition_labels",
  template: "def partition_labels(s):\n    # 在此写下你的剑诀（贪心），返回各片段长度\n    pass\n",
  tests: [{"args": ["ababcbacadefegdehijhklij"], "expected": [9, 7, 8]}, {"args": ["eccbbbbdec"], "expected": [10]}, {"args": ["abc"], "expected": [1, 1, 1]}]
},
{
  id: "search-rotated", title: "乱卷寻剑", diff: "★★ 进阶", theme: "binary-search",
  flavor: "经卷被狂风吹乱了顺序——唯有在旋转的书山中二分，方能定位那柄剑。",
  desc: "给定旋转过的升序数组 nums（无重复）和目标值 target，\n请用二分查找返回 target 的下标，不存在返回 -1。\n\n示例：nums = [4,5,6,7,0,1,2], target = 0 → 返回 4",
  func: "search_rotated",
  template: "def search_rotated(nums, target):\n    # 在此写下你的剑诀（二分查找），返回下标或 -1\n    pass\n",
  tests: [{"args": [[4, 5, 6, 7, 0, 1, 2], 0], "expected": 4}, {"args": [[4, 5, 6, 7, 0, 1, 2], 3], "expected": -1}, {"args": [[1], 0], "expected": -1}, {"args": [[1, 3], 3], "expected": 1}]
},
{
  id: "find-min-rotated", title: "书脊寻源", diff: "★★ 进阶", theme: "binary-search",
  flavor: "书山虽乱，脊有最低处——找到它，便是找到了书山的源头。",
  desc: "给定旋转过的升序数组 nums（无重复），请用二分查找返回其中的最小值。\n\n示例：nums = [3,4,5,1,2] → 返回 1",
  func: "find_min_rotated",
  template: "def find_min_rotated(nums):\n    # 在此写下你的剑诀（二分查找），返回最小值\n    pass\n",
  tests: [{"args": [[3, 4, 5, 1, 2]], "expected": 1}, {"args": [[4, 5, 6, 7, 0, 1, 2]], "expected": 0}, {"args": [[11, 13, 15, 17]], "expected": 11}]
},
{
  id: "search-2d-matrix", title: "经卷矩阵", diff: "★★ 进阶", theme: "binary-search",
  flavor: "经卷排成矩阵，行列皆有序——二分两次，直取目标！",
  desc: "给定 m x n 矩阵 matrix，每行升序，且每行首个元素大于上一行末尾元素。\n请用二分查找判断 target 是否在矩阵中，返回 True 或 False。\n\n示例：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3 → 返回 True",
  func: "search_matrix",
  template: "def search_matrix(matrix, target):\n    # 在此写下你的剑诀（二分查找），返回 True 或 False\n    pass\n",
  tests: [{"args": [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], "expected": true}, {"args": [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], "expected": false}, {"args": [[[1]], 1], "expected": true}]
},
{
  id: "fruit-baskets", title: "双篮采灵果", diff: "★★ 进阶", theme: "sliding-window",
  flavor: "信息流如灵果无穷，篮子只有两只——滑动窗口框住当下，采下最多的果子。",
  desc: "给定数组 fruits（每棵树一种灵果），你只有两只篮子（每只篮子只能装一种灵果），\n从某棵树开始连续采摘，求最多能采多少颗。\n\n示例：fruits = [1,2,1] → 返回 3",
  func: "total_fruit",
  template: "def total_fruit(fruits):\n    # 在此写下你的剑诀（滑动窗口），返回最多颗数\n    pass\n",
  tests: [{"args": [[1, 2, 1]], "expected": 3}, {"args": [[0, 1, 2, 2]], "expected": 3}, {"args": [[1, 2, 3, 2, 2]], "expected": 4}]
},
{
  id: "max-consec-ones-iii", title: "定心猿", diff: "★★ 进阶", theme: "sliding-window",
  flavor: "心猿意马，至多 k 次走神——滑动窗口守住最长的一段清明。",
  desc: "给定 01 数组 nums，你至多可以将 k 个 0 翻转为 1，\n求翻转后最长连续 1 的长度。\n\n示例：nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2 → 返回 6",
  func: "longest_ones",
  template: "def longest_ones(nums, k):\n    # 在此写下你的剑诀（滑动窗口），返回最长长度\n    pass\n",
  tests: [{"args": [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2], "expected": 6}, {"args": [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3], "expected": 10}, {"args": [[0, 0, 0], 1], "expected": 1}]
},
{
  id: "largest-rectangle", title: "剑心柱阵", diff: "★★★ 精深", theme: "stack",
  flavor: "宪法剑心如柱林立——以单调栈量出其中能容下的一招的最大矩形剑气。",
  desc: "给定数组 heights（每根柱子的高度，宽度为 1），\n求其中能勾勒出的最大矩形面积。\n\n示例：heights = [2,1,5,6,2,3] → 返回 10",
  func: "largest_rectangle_area",
  template: "def largest_rectangle_area(heights):\n    # 在此写下你的剑诀（单调栈），返回最大面积\n    pass\n",
  tests: [{"args": [[2, 1, 5, 6, 2, 3]], "expected": 10}, {"args": [[2, 4]], "expected": 4}, {"args": [[1]], "expected": 1}, {"args": [[2, 1, 2]], "expected": 3}]
},
{
  id: "maximal-rectangle", title: "符阵破绽", diff: "★★★ 精深", theme: "stack",
  flavor: "符箓排成大阵，\"1\" 为虚符 \"0\" 为实符——以栈为尺，量出全由虚符组成的最大矩形破绽。",
  desc: "给定 01 矩阵 matrix（元素为字符串 \"0\"/\"1\"），\n求其中全由 \"1\" 组成的最大矩形面积。\n\n示例：matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]] → 返回 6",
  func: "maximal_rectangle",
  template: "def maximal_rectangle(matrix):\n    # 在此写下你的剑诀（单调栈），返回最大面积\n    pass\n",
  tests: [{"args": [[["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]], "expected": 6}, {"args": [[["0"]]], "expected": 0}, {"args": [[["1"]]], "expected": 1}]
},
{
  id: "basic-calculator", title: "心算剑诀", diff: "★★★ 精深", theme: "stack",
  flavor: "Dario 的剑招全是算式，括号层层嵌套——以栈心算出来，方能预判！",
  desc: "给定字符串 s 表示的算式（只含数字、+、-、括号和空格），\n请计算它的结果。\n\n示例：s = \"(1+(4+5+2)-3)+(6+8)\" → 返回 23",
  func: "calculate",
  template: "def calculate(s):\n    # 在此写下你的剑诀（栈），返回计算结果\n    pass\n",
  tests: [{"args": ["1 + 1"], "expected": 2}, {"args": [" 2-1 + 2 "], "expected": 3}, {"args": ["(1+(4+5+2)-3)+(6+8)"], "expected": 23}, {"args": ["1-(5-6)"], "expected": 2}]
},
{
  id: "reverse-k-group", title: "链节逆转", diff: "★★★ 精深", theme: "linked-list", kind: "linkedlist",
  flavor: "供应链大阵每 k 节一环——逆转每一环，阵法自乱！",
  desc: "给定单链表头节点 head（ListNode，有 val / next）和整数 k，\n将链表每 k 个节点一组进行反转，不足 k 个的一组保持原样，返回新的头节点。\n\n说明：测试用例以数组形式给出，会自动转为链表传入；\n你的返回值（ListNode）会自动转回数组比较。\n\n示例：head = [1,2,3,4,5], k = 2 → 返回 [2,1,4,3,5]",
  func: "reverse_k_group",
  template: "# head 是 ListNode（val/next），k 为每组长度，返回反转后的头节点\ndef reverse_k_group(head, k):\n    # 在此写下你的剑诀\n    pass\n",
  tests: [{"args": [[1, 2, 3, 4, 5], 2], "expected": [2, 1, 4, 3, 5]}, {"args": [[1, 2, 3, 4, 5], 3], "expected": [3, 2, 1, 4, 5]}, {"args": [[1, 2], 2], "expected": [2, 1]}, {"args": [[1], 1], "expected": [1]}]
},
{
  id: "merge-k-lists", title: "万链归一", diff: "★★★ 精深", theme: "linked-list", kind: "linkedlist",
  flavor: "k 条灵脉支链皆已归顺——合而为一，仍保灵气有序。",
  desc: "给定一个升序链表数组 lists（每个元素是 ListNode 或 None），\n将其合并为一条升序链表并返回头节点。\n\n说明：测试用例以二维数组形式给出，内层数组会自动转为链表传入；\n你的返回值（ListNode）会自动转回数组比较。\n\n示例：lists = [[1,4,5],[1,3,4],[2,6]] → 返回 [1,1,2,3,4,4,5,6]",
  func: "merge_k_lists",
  template: "# lists 是 ListNode 组成的列表（元素可能为 None），返回合并后的头节点\nimport heapq\ndef merge_k_lists(lists):\n    # 在此写下你的剑诀\n    pass\n",
  tests: [{"args": [[[1, 4, 5], [1, 3, 4], [2, 6]]], "expected": [1, 1, 2, 3, 4, 4, 5, 6]}, {"args": [[[], []]], "expected": []}, {"args": [[[1], [2]]], "expected": [1, 2]}]
},
{
  id: "swim-rising-water", title: "水涨阵高", diff: "★★★ 精深", theme: "graph-advanced",
  flavor: "幻阵水位不断上涨——以 Dijkstra 算出到达彼岸的最短耗时，先水一步！",
  desc: "给定 n x n 网格 grid，grid[i][j] 是该处幻阵被水淹没的时间。\n在时间 t，你可以进入所有高度 ≤ t 的格子（上下左右移动）。\n求从左上角到右下角的最短耗时。\n\n示例：grid = [[0,2],[1,3]] → 返回 3",
  func: "swim_in_water",
  template: "import heapq\ndef swim_in_water(grid):\n    # 在此写下你的剑诀（Dijkstra），返回最短耗时\n    pass\n",
  tests: [{"args": [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], "expected": 16}, {"args": [[[0, 2], [1, 3]]], "expected": 3}, {"args": [[[0]]], "expected": 0}]
},
{
  id: "word-ladder", title: "幻象词梯", diff: "★★★ 精深", theme: "graph-advanced",
  flavor: "幻象层层变幻，每次只变一字——以 BFS 找出从现实到真相的最短词梯。",
  desc: "给定 beginWord、endWord 和词典 wordList，每次只能改变一个字母，\n且每次变换后的词必须在词典中。求从 beginWord 到 endWord 的最短变换序列长度；\n若无法变换返回 0。\n\n示例：beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"] → 返回 5",
  func: "ladder_length",
  template: "from collections import deque\ndef ladder_length(beginWord, endWord, wordList):\n    # 在此写下你的剑诀（BFS），返回最短长度\n    pass\n",
  tests: [{"args": ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], "expected": 5}, {"args": ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], "expected": 0}, {"args": ["a", "c", ["a", "b", "c"]], "expected": 2}]
},
];

/* ============ 算法战阵容：剧本位置 -> 候选题目 ============
 * 键为剧本中〖算法战·X〗的战斗名（即剧情位置），值是该战斗的备选题 id。
 * 每场战斗 2~3 道备选：同主题、同难度；选题按该战斗已通关次数轮换，
 * 完全确定性，不随机、不跨难度。剧本顺序即难度递增：
 *   ★(突围) → ★★(心魔/顿悟/快剑/金丹/书山/沉浸) → ★★★(对齐/守御/幻阵)
 * ============================================================ */
var BATTLE_PROBLEMS = {
  "突围": ["flood-fill", "path-exists", "town-judge"],
  "心魔": ["permutations", "subsets", "phone-comb"],
  "顿悟": ["stairs", "maxsub", "rob"],
  "快剑": ["container-water", "three-sum", "sort-colors"],
  "金丹": ["can-jump", "gas-station", "partition-labels"],
  "书山": ["search-rotated", "find-min-rotated", "search-2d-matrix"],
  "沉浸": ["min-subarray-len", "fruit-baskets", "max-consec-ones-iii"],
  "对齐": ["largest-rectangle", "maximal-rectangle", "basic-calculator"],
  "守御": ["reverse-k-group", "merge-k-lists"],
  "幻阵": ["network-delay", "swim-rising-water", "word-ladder"]
};

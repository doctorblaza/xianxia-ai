/* ============ 《码修》算法题库：随机出题，Python 作答 ============
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
}
];

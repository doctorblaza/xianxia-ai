# -*- coding: utf-8 -*-
"""新题数据 + 参考正解/错解；先用 py.js 等价判定逻辑验证，再生成 JS。"""
import json

LL_DEF = "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val=val; self.next=next\n"

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

def _to_ll(lst):
    d = ListNode(); c = d
    for v in (lst or []):
        c.next = ListNode(v); c = c.next
    return d.next

def _to_list(node):
    if isinstance(node, list): return list(node)
    o = []
    while node:
        o.append(node.val); node = node.next
    return o

def _to_ll_arg(a):
    # 与 py.js 新版 _to_ll_arg 等价：支持 list of lists
    if isinstance(a, list) and len(a) > 0 and isinstance(a[0], list):
        return [_to_ll(x) for x in a]
    return _to_ll(a) if isinstance(a, list) else a

def run_tests(problem, code):
    """与 py.js buildHarness 等价的判定。"""
    import copy
    g = {}
    exec(LL_DEF + code, g)
    func = g[problem["func"]]
    out = []
    for t in problem["tests"]:
        exp = t["expected"]
        args = copy.deepcopy(t["args"])  # py.js 每次从 JSON 重解析，此处等价
        try:
            if problem.get("kind") == "linkedlist":
                args = [_to_ll_arg(a) for a in args]
                res = _to_list(func(*args))
            else:
                res = func(*args)
            if problem.get("normalize") == "sort":
                key = lambda x: json.dumps(x, sort_keys=True)
                ok = sorted(map(key, res)) == sorted(map(key, exp))
            else:
                if isinstance(res, (list, tuple)) and isinstance(exp, (list, tuple)):
                    ok = list(res) == list(exp)
                else:
                    ok = res == exp
            out.append(bool(ok))
        except Exception as e:
            out.append(False)
    return out

NEW_PROBLEMS = [
# ================= B1 突围 graph ★ =================
dict(id="path-exists", title="生路推演", diff="★ 入门", theme="graph",
  flavor="大阵经脉寸断，唯有算出两处阵眼之间是否还有通路，方能找到生路。",
  desc="护山大阵有 n 个阵眼（编号 0 到 n-1），edges[i] = [a, b] 表示阵眼 a 与 b 之间有双向经脉相连。\n请判断从阵眼 source 出发，能否到达阵眼 destination。\n\n示例：n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2 → 返回 True",
  func="valid_path",
  template="from collections import deque\ndef valid_path(n, edges, source, destination):\n    # 在此写下你的剑诀（BFS/DFS 皆可），返回 True 或 False\n    pass\n",
  tests=[
    {"args": [3, [[0,1],[1,2],[2,0]], 0, 2], "expected": True},
    {"args": [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], "expected": False},
    {"args": [1, [], 0, 0], "expected": True},
    {"args": [4, [[0,1],[2,3]], 1, 3], "expected": False},
  ],
  solution="""from collections import deque
def valid_path(n, edges, source, destination):
    g = [[] for _ in range(n)]
    for a, b in edges:
        g[a].append(b); g[b].append(a)
    seen = {source}
    dq = deque([source])
    while dq:
        u = dq.popleft()
        if u == destination: return True
        for v in g[u]:
            if v not in seen:
                seen.add(v); dq.append(v)
    return False
""",
  wrong="def valid_path(n, edges, source, destination):\n    return source == destination\n",
),
dict(id="town-judge", title="镇阵之眼", diff="★ 入门", theme="graph",
  flavor="万千阵眼互相呼应——找到那个被所有阵眼呼应、自己却不呼应任何阵眼的镇阵之眼。",
  desc="大阵有 n 个阵眼（编号 1 到 n），trust[i] = [a, b] 表示阵眼 a 呼应阵眼 b。\n镇阵之眼需满足：被其余 n-1 个阵眼呼应，且自己不呼应任何阵眼。\n请返回镇阵之眼的编号，不存在返回 -1。\n\n示例：n = 2, trust = [[1,2]] → 返回 2",
  func="find_judge",
  template="def find_judge(n, trust):\n    # 在此写下你的剑诀，返回镇阵之眼的编号或 -1\n    pass\n",
  tests=[
    {"args": [2, [[1,2]]], "expected": 2},
    {"args": [3, [[1,3],[2,3]]], "expected": 3},
    {"args": [3, [[1,3],[2,3],[3,1]]], "expected": -1},
    {"args": [1, []], "expected": 1},
  ],
  solution="""def find_judge(n, trust):
    cnt = [0]*(n+1); out = [0]*(n+1)
    for a, b in trust:
        out[a] += 1; cnt[b] += 1
    for i in range(1, n+1):
        if cnt[i] == n-1 and out[i] == 0: return i
    return -1
""",
  wrong="def find_judge(n, trust):\n    return 1\n",
),
# ================= B2 心魔 backtrack ★★ =================
dict(id="subsets", title="心魔分形", diff="★★ 进阶", theme="backtrack", normalize="sort",
  flavor="心魔一化为二，二化为四……穷举它所有的分形变化，方能看破虚妄。",
  desc="给定不含重复数字的数组 nums，返回它的所有子集（幂集）。\n返回顺序不限。\n\n示例：nums = [1,2,3] → 返回 [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
  func="subsets",
  template="def subsets(nums):\n    # 在此写下你的剑诀（回溯），返回所有子集组成的列表\n    pass\n",
  tests=[
    {"args": [[1,2,3]], "expected": [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]},
    {"args": [[0]], "expected": [[],[0]]},
    {"args": [[]], "expected": [[]]},
  ],
  solution="""def subsets(nums):
    res = []
    def bt(i, path):
        res.append(list(path))
        for j in range(i, len(nums)):
            path.append(nums[j]); bt(j+1, path); path.pop()
    bt(0, []); return res
""",
  wrong="def subsets(nums):\n    return [nums]\n",
),
dict(id="phone-comb", title="传讯符组合", diff="★★ 进阶", theme="backtrack", normalize="sort",
  flavor="小满的传讯符上数字成串——2 到 9 每个数字都对应几种笔画，全部列出来，一封都不能漏。",
  desc="给定只含数字 2-9 的字符串 digits，返回它能表示的所有字母组合。\n数字字母映射：2→abc, 3→def, 4→ghi, 5→jkl, 6→mno, 7→pqrs, 8→tuv, 9→wxyz。\n返回顺序不限。\n\n示例：digits = \"23\" → 返回 [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
  func="letter_combinations",
  template="def letter_combinations(digits):\n    # 在此写下你的剑诀（回溯），返回所有字母组合\n    pass\n",
  tests=[
    {"args": ["23"], "expected": ["ad","ae","af","bd","be","bf","cd","ce","cf"]},
    {"args": [""], "expected": []},
    {"args": ["2"], "expected": ["a","b","c"]},
  ],
  solution="""def letter_combinations(digits):
    if not digits: return []
    mp = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    res = []
    def bt(i, path):
        if i == len(digits):
            res.append(''.join(path)); return
        for ch in mp[digits[i]]:
            path.append(ch); bt(i+1, path); path.pop()
    bt(0, []); return res
""",
  wrong="def letter_combinations(digits):\n    return [digits] if digits else []\n",
),
# ================= B4 快剑 two-pointers ★★ =================
dict(id="container-water", title="剑气蓄渊", diff="★★ 进阶", theme="two-pointers",
  flavor="两道剑气如柱，左右夹逼——双指针合围之间，能蓄下多少剑意？",
  desc="给定数组 height（每根剑气柱的高度，宽度为 1），\n请用双指针找出两根柱子，使它们与地面围成的容器能蓄下最多的剑气，返回最大蓄量。\n\n示例：height = [1,8,6,2,5,4,8,3,7] → 返回 49",
  func="max_area",
  template="def max_area(height):\n    # 在此写下你的剑诀（双指针），返回最大蓄量\n    pass\n",
  tests=[
    {"args": [[1,8,6,2,5,4,8,3,7]], "expected": 49},
    {"args": [[1,1]], "expected": 1},
    {"args": [[4,3,2,1,4]], "expected": 16},
  ],
  solution="""def max_area(height):
    l, r, best = 0, len(height)-1, 0
    while l < r:
        best = max(best, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return best
""",
  wrong="def max_area(height):\n    return 0\n",
),
dict(id="three-sum", title="三才锁剑", diff="★★ 进阶", theme="two-pointers", normalize="sort",
  flavor="三才剑阵——唯有三道剑气相抵为零，方能锁住 Musk 的快剑！",
  desc="给定整数数组 nums，找出所有和为 0 的不重复三元组。\n返回顺序不限。\n\n示例：nums = [-1,0,1,2,-1,-4] → 返回 [[-1,-1,2],[-1,0,1]]",
  func="three_sum",
  template="def three_sum(nums):\n    # 在此写下你的剑诀（排序+双指针），返回所有三元组\n    pass\n",
  tests=[
    {"args": [[-1,0,1,2,-1,-4]], "expected": [[-1,-1,2],[-1,0,1]]},
    {"args": [[0,1,1]], "expected": []},
    {"args": [[0,0,0]], "expected": [[0,0,0]]},
  ],
  solution="""def three_sum(nums):
    nums.sort(); res = []
    for i in range(len(nums)-2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i+1, len(nums)-1
        while l < r:
            s = nums[i]+nums[l]+nums[r]
            if s == 0:
                res.append([nums[i],nums[l],nums[r]])
                l += 1; r -= 1
                while l < r and nums[l] == nums[l-1]: l += 1
                while l < r and nums[r] == nums[r+1]: r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return res
""",
  wrong="def three_sum(nums):\n    return []\n",
),
dict(id="sort-colors", title="三色归位", diff="★★ 进阶", theme="two-pointers",
  flavor="红白青三色剑气混杂——双指针拨乱反正，各归其位。",
  desc="给定数组 nums，只含 0（赤）、1（白）、2（青），\n请用双指针将其原地排成 [0…0, 1…1, 2…2]，并返回排序后的数组。\n\n示例：nums = [2,0,2,1,1,0] → 返回 [0,0,1,1,2,2]",
  func="sort_colors",
  template="def sort_colors(nums):\n    # 在此写下你的剑诀（双指针），返回排序后的数组\n    pass\n",
  tests=[
    {"args": [[2,0,2,1,1,0]], "expected": [0,0,1,1,2,2]},
    {"args": [[2,0,1]], "expected": [0,1,2]},
    {"args": [[0]], "expected": [0]},
  ],
  solution="""def sort_colors(nums):
    l, i, r = 0, 0, len(nums)-1
    while i <= r:
        if nums[i] == 0:
            nums[l], nums[i] = nums[i], nums[l]; l += 1; i += 1
        elif nums[i] == 2:
            nums[i], nums[r] = nums[r], nums[i]; r -= 1
        else: i += 1
    return nums
""",
  wrong="def sort_colors(nums):\n    return nums\n",
),
# ================= B5 金丹 greedy ★★ =================
dict(id="gas-station", title="灵脉补给", diff="★★ 进阶", theme="greedy",
  flavor="追击 Altman 的路上灵脉据点星罗棋布——贪心算好每一站的补给，一口气追到底！",
  desc="有 n 个灵脉据点，gas[i] 是第 i 处可补充的灵气，cost[i] 是从第 i 处到下一处消耗的灵气。\n从某处出发（初始灵气为 0）绕行一圈回到起点，求可行的出发点下标；\n若无解返回 -1（题目保证至多一个解）。\n\n示例：gas = [1,2,3,4,5], cost = [3,4,5,1,2] → 返回 3",
  func="can_complete_circuit",
  template="def can_complete_circuit(gas, cost):\n    # 在此写下你的剑诀（贪心），返回出发点下标或 -1\n    pass\n",
  tests=[
    {"args": [[1,2,3,4,5],[3,4,5,1,2]], "expected": 3},
    {"args": [[2,3,4],[3,4,3]], "expected": -1},
    {"args": [[5],[4]], "expected": 0},
  ],
  solution="""def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost): return -1
    tank = start = 0
    for i in range(len(gas)):
        tank += gas[i]-cost[i]
        if tank < 0: tank = 0; start = i+1
    return start
""",
  wrong="def can_complete_circuit(gas, cost):\n    return 0\n",
),
dict(id="partition-labels", title="丹火分区", diff="★★ 进阶", theme="greedy",
  flavor="丹炉烈焰中不同火种交织——把同种火种圈在同一炉膛，方能开炉炼丹。",
  desc="给定字符串 s（每种字母是一种火种），请将其划分成尽可能多的片段，\n使每种火种至多出现在一个片段中。返回各片段的长度。\n\n示例：s = \"ababcbacadefegdehijhklij\" → 返回 [9,7,8]",
  func="partition_labels",
  template="def partition_labels(s):\n    # 在此写下你的剑诀（贪心），返回各片段长度\n    pass\n",
  tests=[
    {"args": ["ababcbacadefegdehijhklij"], "expected": [9,7,8]},
    {"args": ["eccbbbbdec"], "expected": [10]},
    {"args": ["abc"], "expected": [1,1,1]},
  ],
  solution="""def partition_labels(s):
    last = {c:i for i, c in enumerate(s)}
    res = []; start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end-start+1); start = i+1
    return res
""",
  wrong="def partition_labels(s):\n    return [len(s)]\n",
),
# ================= B6 书山 binary-search ★★ =================
dict(id="search-rotated", title="乱卷寻剑", diff="★★ 进阶", theme="binary-search",
  flavor="经卷被狂风吹乱了顺序——唯有在旋转的书山中二分，方能定位那柄剑。",
  desc="给定旋转过的升序数组 nums（无重复）和目标值 target，\n请用二分查找返回 target 的下标，不存在返回 -1。\n\n示例：nums = [4,5,6,7,0,1,2], target = 0 → 返回 4",
  func="search_rotated",
  template="def search_rotated(nums, target):\n    # 在此写下你的剑诀（二分查找），返回下标或 -1\n    pass\n",
  tests=[
    {"args": [[4,5,6,7,0,1,2], 0], "expected": 4},
    {"args": [[4,5,6,7,0,1,2], 3], "expected": -1},
    {"args": [[1], 0], "expected": -1},
    {"args": [[1,3], 3], "expected": 1},
  ],
  solution="""def search_rotated(nums, target):
    l, r = 0, len(nums)-1
    while l <= r:
        m = (l+r)//2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]: r = m-1
            else: l = m+1
        else:
            if nums[m] < target <= nums[r]: l = m+1
            else: r = m-1
    return -1
""",
  wrong="def search_rotated(nums, target):\n    return -1\n",
),
dict(id="find-min-rotated", title="书脊寻源", diff="★★ 进阶", theme="binary-search",
  flavor="书山虽乱，脊有最低处——找到它，便是找到了书山的源头。",
  desc="给定旋转过的升序数组 nums（无重复），请用二分查找返回其中的最小值。\n\n示例：nums = [3,4,5,1,2] → 返回 1",
  func="find_min_rotated",
  template="def find_min_rotated(nums):\n    # 在此写下你的剑诀（二分查找），返回最小值\n    pass\n",
  tests=[
    {"args": [[3,4,5,1,2]], "expected": 1},
    {"args": [[4,5,6,7,0,1,2]], "expected": 0},
    {"args": [[11,13,15,17]], "expected": 11},
  ],
  solution="""def find_min_rotated(nums):
    l, r = 0, len(nums)-1
    while l < r:
        m = (l+r)//2
        if nums[m] > nums[r]: l = m+1
        else: r = m
    return nums[l]
""",
  wrong="def find_min_rotated(nums):\n    return nums[0]\n",
),
dict(id="search-2d-matrix", title="经卷矩阵", diff="★★ 进阶", theme="binary-search",
  flavor="经卷排成矩阵，行列皆有序——二分两次，直取目标！",
  desc="给定 m x n 矩阵 matrix，每行升序，且每行首个元素大于上一行末尾元素。\n请用二分查找判断 target 是否在矩阵中，返回 True 或 False。\n\n示例：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3 → 返回 True",
  func="search_matrix",
  template="def search_matrix(matrix, target):\n    # 在此写下你的剑诀（二分查找），返回 True 或 False\n    pass\n",
  tests=[
    {"args": [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], "expected": True},
    {"args": [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13], "expected": False},
    {"args": [[[1]], 1], "expected": True},
  ],
  solution="""def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    l, r = 0, m*n-1
    while l <= r:
        mid = (l+r)//2
        v = matrix[mid//n][mid%n]
        if v == target: return True
        elif v < target: l = mid+1
        else: r = mid-1
    return False
""",
  wrong="def search_matrix(matrix, target):\n    return False\n",
),
# ================= B7 沉浸 sliding-window ★★ =================
dict(id="fruit-baskets", title="双篮采灵果", diff="★★ 进阶", theme="sliding-window",
  flavor="信息流如灵果无穷，篮子只有两只——滑动窗口框住当下，采下最多的果子。",
  desc="给定数组 fruits（每棵树一种灵果），你只有两只篮子（每只篮子只能装一种灵果），\n从某棵树开始连续采摘，求最多能采多少颗。\n\n示例：fruits = [1,2,1] → 返回 3",
  func="total_fruit",
  template="def total_fruit(fruits):\n    # 在此写下你的剑诀（滑动窗口），返回最多颗数\n    pass\n",
  tests=[
    {"args": [[1,2,1]], "expected": 3},
    {"args": [[0,1,2,2]], "expected": 3},
    {"args": [[1,2,3,2,2]], "expected": 4},
  ],
  solution="""def total_fruit(fruits):
    from collections import defaultdict
    cnt = defaultdict(int); l = 0; best = 0
    for r, f in enumerate(fruits):
        cnt[f] += 1
        while len(cnt) > 2:
            cnt[fruits[l]] -= 1
            if cnt[fruits[l]] == 0: del cnt[fruits[l]]
            l += 1
        best = max(best, r-l+1)
    return best
""",
  wrong="def total_fruit(fruits):\n    return len(fruits)\n",
),
dict(id="max-consec-ones-iii", title="定心猿", diff="★★ 进阶", theme="sliding-window",
  flavor="心猿意马，至多 k 次走神——滑动窗口守住最长的一段清明。",
  desc="给定 01 数组 nums，你至多可以将 k 个 0 翻转为 1，\n求翻转后最长连续 1 的长度。\n\n示例：nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2 → 返回 6",
  func="longest_ones",
  template="def longest_ones(nums, k):\n    # 在此写下你的剑诀（滑动窗口），返回最长长度\n    pass\n",
  tests=[
    {"args": [[1,1,1,0,0,0,1,1,1,1,0], 2], "expected": 6},
    {"args": [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3], "expected": 10},
    {"args": [[0,0,0], 1], "expected": 1},
  ],
  solution="""def longest_ones(nums, k):
    l = 0; zeros = 0; best = 0
    for r, v in enumerate(nums):
        if v == 0: zeros += 1
        while zeros > k:
            if nums[l] == 0: zeros -= 1
            l += 1
        best = max(best, r-l+1)
    return best
""",
  wrong="def longest_ones(nums, k):\n    return k\n",
),
# ================= B8 对齐 stack ★★★ =================
dict(id="largest-rectangle", title="剑心柱阵", diff="★★★ 精深", theme="stack",
  flavor="宪法剑心如柱林立——以单调栈量出其中能容下的一招的最大矩形剑气。",
  desc="给定数组 heights（每根柱子的高度，宽度为 1），\n求其中能勾勒出的最大矩形面积。\n\n示例：heights = [2,1,5,6,2,3] → 返回 10",
  func="largest_rectangle_area",
  template="def largest_rectangle_area(heights):\n    # 在此写下你的剑诀（单调栈），返回最大面积\n    pass\n",
  tests=[
    {"args": [[2,1,5,6,2,3]], "expected": 10},
    {"args": [[2,4]], "expected": 4},
    {"args": [[1]], "expected": 1},
    {"args": [[2,1,2]], "expected": 3},
  ],
  solution="""def largest_rectangle_area(heights):
    st = []; best = 0
    hs = heights + [0]
    for i, h in enumerate(hs):
        while st and hs[st[-1]] > h:
            hh = hs[st.pop()]
            w = i if not st else i - st[-1] - 1
            best = max(best, hh * w)
        st.append(i)
    return best
""",
  wrong="def largest_rectangle_area(heights):\n    return max(heights)\n",
),
dict(id="maximal-rectangle", title="符阵破绽", diff="★★★ 精深", theme="stack",
  flavor="符箓排成大阵，\"1\" 为虚符 \"0\" 为实符——以栈为尺，量出全由虚符组成的最大矩形破绽。",
  desc="给定 01 矩阵 matrix（元素为字符串 \"0\"/\"1\"），\n求其中全由 \"1\" 组成的最大矩形面积。\n\n示例：matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]] → 返回 6",
  func="maximal_rectangle",
  template="def maximal_rectangle(matrix):\n    # 在此写下你的剑诀（单调栈），返回最大面积\n    pass\n",
  tests=[
    {"args": [[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]], "expected": 6},
    {"args": [[["0"]]], "expected": 0},
    {"args": [[["1"]]], "expected": 1},
  ],
  solution="""def maximal_rectangle(matrix):
    if not matrix or not matrix[0]: return 0
    n = len(matrix[0]); hs = [0]*n; best = 0
    for row in matrix:
        for j in range(n):
            hs[j] = hs[j]+1 if row[j] == "1" else 0
        st = []; ext = hs + [0]
        for i, h in enumerate(ext):
            while st and ext[st[-1]] > h:
                hh = ext[st.pop()]
                w = i if not st else i - st[-1] - 1
                best = max(best, hh*w)
            st.append(i)
    return best
""",
  wrong="def maximal_rectangle(matrix):\n    return 0\n",
),
dict(id="basic-calculator", title="心算剑诀", diff="★★★ 精深", theme="stack",
  flavor="Dario 的剑招全是算式，括号层层嵌套——以栈心算出来，方能预判！",
  desc="给定字符串 s 表示的算式（只含数字、+、-、括号和空格），\n请计算它的结果。\n\n示例：s = \"(1+(4+5+2)-3)+(6+8)\" → 返回 23",
  func="calculate",
  template="def calculate(s):\n    # 在此写下你的剑诀（栈），返回计算结果\n    pass\n",
  tests=[
    {"args": ["1 + 1"], "expected": 2},
    {"args": [" 2-1 + 2 "], "expected": 3},
    {"args": ["(1+(4+5+2)-3)+(6+8)"], "expected": 23},
    {"args": ["1-(5-6)"], "expected": 2},
  ],
  solution="""def calculate(s):
    stack = []; num = 0; sign = 1; res = 0
    for ch in s:
        if ch.isdigit(): num = num*10 + int(ch)
        elif ch in '+-':
            res += sign*num; num = 0; sign = 1 if ch == '+' else -1
        elif ch == '(':
            stack.append(res); stack.append(sign); res = 0; sign = 1
        elif ch == ')':
            res += sign*num; num = 0
            res *= stack.pop(); res += stack.pop()
    return res + sign*num
""",
  wrong="def calculate(s):\n    return 0\n",
),
# ================= B9 守御 linked-list ★★★ =================
dict(id="reverse-k-group", title="链节逆转", diff="★★★ 精深", theme="linked-list", kind="linkedlist",
  flavor="供应链大阵每 k 节一环——逆转每一环，阵法自乱！",
  desc="给定单链表头节点 head（ListNode，有 val / next）和整数 k，\n将链表每 k 个节点一组进行反转，不足 k 个的一组保持原样，返回新的头节点。\n\n说明：测试用例以数组形式给出，会自动转为链表传入；\n你的返回值（ListNode）会自动转回数组比较。\n\n示例：head = [1,2,3,4,5], k = 2 → 返回 [2,1,4,3,5]",
  func="reverse_k_group",
  template="# head 是 ListNode（val/next），k 为每组长度，返回反转后的头节点\ndef reverse_k_group(head, k):\n    # 在此写下你的剑诀\n    pass\n",
  tests=[
    {"args": [[1,2,3,4,5], 2], "expected": [2,1,4,3,5]},
    {"args": [[1,2,3,4,5], 3], "expected": [3,2,1,4,5]},
    {"args": [[1,2], 2], "expected": [2,1]},
    {"args": [[1], 1], "expected": [1]},
  ],
  solution="""def reverse_k_group(head, k):
    dummy = ListNode(0); dummy.next = head
    group_prev = dummy
    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if not kth: return dummy.next
        group_next = kth.next
        prev, cur = group_next, group_prev.next
        while cur is not group_next:
            tmp = cur.next; cur.next = prev; prev = cur; cur = tmp
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp
""",
  wrong="def reverse_k_group(head, k):\n    return head\n",
),
dict(id="merge-k-lists", title="万链归一", diff="★★★ 精深", theme="linked-list", kind="linkedlist",
  flavor="k 条灵脉支链皆已归顺——合而为一，仍保灵气有序。",
  desc="给定一个升序链表数组 lists（每个元素是 ListNode 或 None），\n将其合并为一条升序链表并返回头节点。\n\n说明：测试用例以二维数组形式给出，内层数组会自动转为链表传入；\n你的返回值（ListNode）会自动转回数组比较。\n\n示例：lists = [[1,4,5],[1,3,4],[2,6]] → 返回 [1,1,2,3,4,4,5,6]",
  func="merge_k_lists",
  template="# lists 是 ListNode 组成的列表（元素可能为 None），返回合并后的头节点\nimport heapq\ndef merge_k_lists(lists):\n    # 在此写下你的剑诀\n    pass\n",
  tests=[
    {"args": [[[1,4,5],[1,3,4],[2,6]]], "expected": [1,1,2,3,4,4,5,6]},
    {"args": [[[],[]]], "expected": []},
    {"args": [[[1],[2]]], "expected": [1,2]},
  ],
  solution="""import heapq
def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node: heapq.heappush(heap, (node.val, i, node))
    dummy = ListNode(0); cur = dummy
    while heap:
        _, i, node = heapq.heappop(heap)
        cur.next = node; cur = cur.next
        if node.next: heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
""",
  wrong="def merge_k_lists(lists):\n    return lists[0] if lists else None\n",
),
# ================= B10 幻阵 graph-advanced ★★★ =================
dict(id="swim-rising-water", title="水涨阵高", diff="★★★ 精深", theme="graph-advanced",
  flavor="幻阵水位不断上涨——以 Dijkstra 算出到达彼岸的最短耗时，先水一步！",
  desc="给定 n x n 网格 grid，grid[i][j] 是该处幻阵被水淹没的时间。\n在时间 t，你可以进入所有高度 ≤ t 的格子（上下左右移动）。\n求从左上角到右下角的最短耗时。\n\n示例：grid = [[0,2],[1,3]] → 返回 3",
  func="swim_in_water",
  template="import heapq\ndef swim_in_water(grid):\n    # 在此写下你的剑诀（Dijkstra），返回最短耗时\n    pass\n",
  tests=[
    {"args": [[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]], "expected": 16},
    {"args": [[[0,2],[1,3]]], "expected": 3},
    {"args": [[[0]]], "expected": 0},
  ],
  solution="""import heapq
def swim_in_water(grid):
    n = len(grid)
    seen = {(0,0)}
    heap = [(grid[0][0], 0, 0)]
    while heap:
        t, x, y = heapq.heappop(heap)
        if x == n-1 and y == n-1: return t
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < n and 0 <= ny < n and (nx,ny) not in seen:
                seen.add((nx,ny))
                heapq.heappush(heap, (max(t, grid[nx][ny]), nx, ny))
""",
  wrong="def swim_in_water(grid):\n    return grid[-1][-1]\n",
),
dict(id="word-ladder", title="幻象词梯", diff="★★★ 精深", theme="graph-advanced",
  flavor="幻象层层变幻，每次只变一字——以 BFS 找出从现实到真相的最短词梯。",
  desc="给定 beginWord、endWord 和词典 wordList，每次只能改变一个字母，\n且每次变换后的词必须在词典中。求从 beginWord 到 endWord 的最短变换序列长度；\n若无法变换返回 0。\n\n示例：beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"] → 返回 5",
  func="ladder_length",
  template="from collections import deque\ndef ladder_length(beginWord, endWord, wordList):\n    # 在此写下你的剑诀（BFS），返回最短长度\n    pass\n",
  tests=[
    {"args": ["hit","cog",["hot","dot","dog","lot","log","cog"]], "expected": 5},
    {"args": ["hit","cog",["hot","dot","dog","lot","log"]], "expected": 0},
    {"args": ["a","c",["a","b","c"]], "expected": 2},
  ],
  solution="""from collections import deque
def ladder_length(beginWord, endWord, wordList):
    words = set(wordList)
    if endWord not in words: return 0
    from collections import defaultdict
    pat = defaultdict(list)
    for w in words:
        for i in range(len(w)):
            pat[w[:i]+"*"+w[i+1:]].append(w)
    dq = deque([(beginWord, 1)]); seen = {beginWord}
    while dq:
        w, d = dq.popleft()
        if w == endWord: return d
        for i in range(len(w)):
            for nb in pat[w[:i]+"*"+w[i+1:]]:
                if nb not in seen:
                    seen.add(nb); dq.append((nb, d+1))
    return 0
""",
  wrong="def ladder_length(beginWord, endWord, wordList):\n    return 1\n",
),
]

BATTLE_LINEUP = {
  # 剧本顺序即难度递增：★(突围) → ★★(心魔/顿悟/快剑/金丹/书山/沉浸) → ★★★(对齐/守御/幻阵)
  "突围": ["flood-fill", "path-exists", "town-judge"],
  "心魔": ["permutations", "subsets", "phone-comb"],
  "顿悟": ["stairs", "maxsub", "rob"],
  "快剑": ["container-water", "three-sum", "sort-colors"],
  "金丹": ["can-jump", "gas-station", "partition-labels"],
  "书山": ["search-rotated", "find-min-rotated", "search-2d-matrix"],
  "沉浸": ["min-subarray-len", "fruit-baskets", "max-consec-ones-iii"],
  "对齐": ["largest-rectangle", "maximal-rectangle", "basic-calculator"],
  "守御": ["reverse-k-group", "merge-k-lists"],
  "幻阵": ["network-delay", "swim-rising-water", "word-ladder"],
}

def js_entry(p):
    lines = ["{"]
    first = ("  id: %s, title: %s, diff: %s, theme: %s," % (
        json.dumps(p["id"]), json.dumps(p["title"], ensure_ascii=False),
        json.dumps(p["diff"], ensure_ascii=False), json.dumps(p["theme"])))
    if p.get("normalize"): first += " normalize: %s," % json.dumps(p["normalize"])
    if p.get("kind"): first = first.rstrip(",") + ", kind: %s," % json.dumps(p["kind"])
    # 保持与现有文件一致的字段顺序：kind/normalize 紧跟 theme
    lines.append(first)
    lines.append("  flavor: %s," % json.dumps(p["flavor"], ensure_ascii=False))
    lines.append("  desc: %s," % json.dumps(p["desc"], ensure_ascii=False))
    lines.append("  func: %s," % json.dumps(p["func"]))
    lines.append("  template: %s," % json.dumps(p["template"], ensure_ascii=False))
    lines.append("  tests: %s" % json.dumps(p["tests"], ensure_ascii=False))
    lines.append("},")
    return "\n".join(lines)

if __name__ == "__main__":
    import sys
    mode = sys.argv[1] if len(sys.argv) > 1 else "validate"
    if mode == "validate":
        allok = True
        for p in NEW_PROBLEMS:
            r1 = run_tests(p, p["solution"])
            r2 = run_tests(p, p["wrong"])
            ok1 = all(r1)
            ok2 = not all(r2)  # 错解至少挂一个用例
            flag = "OK " if (ok1 and ok2) else "FAIL"
            if not (ok1 and ok2): allok = False
            print(f"{flag} {p['id']:22s} 正解:{r1} 错解被拦:{ok2} {r2}")
        print("ALL OK" if allok else "SOME FAILED")
    elif mode == "emit":
        print("\n".join(js_entry(p) for p in NEW_PROBLEMS))

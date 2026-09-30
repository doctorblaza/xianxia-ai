#!/usr/bin/env python3
"""expr_finish.py: 表情差分收尾 — 白底转透明 + 白边检查 + 备份旧版 + 覆盖写入.
用法: python3 expr_finish.py <白底生成图> <char> <expr>
"""
import sys, os, shutil
sys.path.insert(0, "/home/hatch/workspace/xianxia-ai-game/tools")
from white_to_alpha import convert
from PIL import Image
import numpy as np

def main():
    white_src, char, expr = sys.argv[1], sys.argv[2], sys.argv[3]
    exprdir = "/home/hatch/workspace/xianxia-ai-game/assets/sprites/expr"
    tmpdir = "/tmp/expr_conv"
    os.makedirs(tmpdir, exist_ok=True)
    tmp = f"{tmpdir}/{char}_{expr}.png"
    convert(white_src, tmp)

    im = Image.open(tmp).convert("RGBA")
    a = np.array(im)
    alpha = a[..., 3]
    h, w = alpha.shape
    border = np.zeros_like(alpha, dtype=bool)
    border[:5, :] = True; border[-5:, :] = True
    border[:, :5] = True; border[:, -5:] = True
    vis = border & (alpha > 10)
    white = (a[..., :3].min(axis=2) >= 235) & vis
    center = alpha[h//4:3*h//4, w//4:3*w//4]
    print(f"[QC] edge_visible_px={int(vis.sum())} near_white_edge_px={int(white.sum())} center_alpha_mean={center.mean():.1f}")
    if int(white.sum()) > 200:
        print("[QC] WARN: possible white edge residue")
    if center.mean() < 30:
        print("[QC] WARN: figure may be hollowed out")

    target = f"{exprdir}/{char}_{expr}.png"
    if os.path.exists(target):
        ver = 1
        while os.path.exists(f"{exprdir}/{char}_{expr}_v{ver}_backup.png"):
            ver += 1
        bk = f"{exprdir}/{char}_{expr}_v{ver}_backup.png"
        shutil.copy2(target, bk)
        print(f"[BK] {os.path.basename(bk)}")
    shutil.copy2(tmp, target)
    print(f"[OK] {target}")

main()

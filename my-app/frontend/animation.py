#補足：稼働させたVScodeのバージョンは3.10.9です
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# ゲージの設定
fig, ax = plt.subplots()
ax.set_ylim(0, 1)  # Y軸の範囲を0から1に設定
gauge = ax.barh(0.2, 10, height=0.1, color='skyblue')  # ゲージの初期設定

#ax.axis('off')

# 更新関数
def update(frame):
    gauge[0].set_width(frame / 25)  # ゲージの幅を更新
    return gauge

# アニメーションの作成
ani = FuncAnimation(fig, update, frames=np.arange(0, 101, 1), blit=True)

# 表示
plt.show()
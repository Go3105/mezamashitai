import tkinter as tk
import time
import datetime
from threading import *

#表示の大きさ
root = tk.Tk()
root.title("アラームについて")
root.geometry("500x700")
root.resizable(False,False)



# アラーム設定のボタン
hour = 1
minute = 1
def on_click_h_plus():
    hour = hour + 1
    if hour>24:
        hour=0
    
def on_click_h_plus():
    hour = hour - 1
    if hour<0:
        hour=23

    

button_h_plus = tk.Button(root,text="時間+",command=on_click_h_plus)
button_h_plus.pack(pady=20)

button_h_minus = tk.Button(root,text="時間-",command=on_click_h_minus)
button_h_minus.pack(pady=20)
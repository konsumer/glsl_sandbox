# setup:
# pip3 install --break-system-packages tkdial customtkinter python-osc pillow tk

# run:
# python3 emulator.py

from pythonosc.udp_client import SimpleUDPClient
import customtkinter
from tkdial import Dial
import sys

try:
  client = SimpleUDPClient("127.0.0.1", sys.argv[1]) 
except IndexError:
  client = SimpleUDPClient("127.0.0.1", 8000) 

customtkinter.set_appearance_mode("Dark") 
app = customtkinter.CTk()
app.title("K̴̛̘̊͒̽̊̐̊̇͝ǹ̷̢̤̠̗̤͊ö̷̢̢̢̱͙̖̗̲̲́̑̽̈́̕͘b̴̠̗͇̳̩̐̎̋̈́̉̈́͑͒͝ͅṣ̶̞̮͒͌̅")

dials = [
  Dial(app, radius=40, text_color="white", text="0:", color_gradient=("blue", "red")),
  Dial(app, radius=40, text_color="white", text="1:", color_gradient=("blue", "red")),
  Dial(app, radius=40, text_color="white", text="2:", color_gradient=("blue", "red")),
  Dial(app, radius=40, text_color="white", text="3:", color_gradient=("blue", "red")),
]

values = [0,0,0,0]

for i,dial in enumerate(dials):
  dial.grid(padx=10, pady=10, row=0, column=i)

def readvals():
  for i,dial in enumerate(dials):
    v = dial.get()
    if v != values[i]:
      values[i] = v
      client.send_message(f"/u_x{i}", [v/100.0])
  app.after(1, readvals)

readvals()
app.mainloop()

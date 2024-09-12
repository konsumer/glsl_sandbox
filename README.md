## setup

You will need python3 & [glslviewer](https://github.com/patriciogonzalezvivo/glslViewer/releases) installed. I also needed to do this on linux:

```
apt install python-pillow python-tk
pip3 install --break-system-packages tkdial customtkinter python-osc
```

It should work on other OS's, but I haven't really tested. `playground` will definitely not work on windows (unless you use a shell-terminal, like bash) but you can run knobs.py and glslviewer, and it will do the same thing.


## usage

Shaders are categorized like [recur](https://github.com/cyberboy666/r_e_c_u_r/tree/master/Shaders).

```
# no input, just make cool screen (turn knobs to adjust colors)
./playground shaders/0-input/hypnotic_rings.frag

# start shader with video on u_tex0
./playground shaders/1-input/kaleidoscope.frag britney.mp4

# start shader with video on u_tex0 and hypnocat on u_tex1
./playground shaders/2-input/chromakey.frag britney.mp4 hypnocat.png
```

See [template.frag](shaders/template.frag) for an explanation of the input/output for a shader. It will live-reload when you edit the shader, and you can see how the knobs effect things. The knobs are scaled 0-100, which you should think about as percentage (they are divided by 100 before being sent to shader.)

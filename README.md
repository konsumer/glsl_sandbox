https://github.com/user-attachments/assets/57cbcfd0-749f-4656-b19f-32c5ba13e649


```
# no input, just make cool screen, control on port 8000
glslViewer shaders/0-input/hypnotic_rings.frag -p 8000

# start shader with video on u_tex0, control on port 8000
glslViewer shaders/1-input/kaleidoscope.frag britney.mp4 -p 8000

# in another terminal start the knobs to control the shader
./knobs.py 8000
```

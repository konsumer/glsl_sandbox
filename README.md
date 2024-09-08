```
# start shader with video on u_tex0, on port 8000
glslViewer wobble.frag britney.mp4 -p 8000

# in another terminal start the knobs
python3 knobs.py 8000
```
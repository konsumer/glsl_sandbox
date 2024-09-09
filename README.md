https://github.com/user-attachments/assets/57cbcfd0-749f-4656-b19f-32c5ba13e649


```
# no input, just make cool screen (turn knobs to adjust colors)
./playground shaders/0-input/hypnotic_rings.frag

# start shader with video on u_tex0
./playground shaders/1-input/kaleidoscope.frag britney.mp4

# start shader with video on u_tex0 and hypnocat on u_tex1
./playground shaders/2-input/chromakey.frag britney.mp4 hypnocat.png
```

See [template.frag](shaders/template.frag) for an explanation of the input/output for a shader.
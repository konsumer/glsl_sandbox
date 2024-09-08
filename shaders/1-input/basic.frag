#ifdef GL_ES
precision mediump float;
#endif

// 1st texture
uniform sampler2D   u_tex0;

// 1st knob
uniform float u_x0;

// 2nd knob
uniform float u_x1;

// current pixel-position
varying vec2        v_texcoord;

void main (void) {
    // set current color to same location in 1st texture, with offset set by knob 1/2
    gl_FragColor = texture2D(u_tex0, v_texcoord + vec2(u_x0, u_x1));
}

#ifdef GL_ES
precision mediump float;
#endif

// 1st texture
uniform sampler2D   u_tex0;

// current pixel-position
varying vec2        v_texcoord;

void main (void) {
    // set current color to same location in 1st texture
    gl_FragColor = texture2D(u_tex0, v_texcoord);
}

// Author: David Konsumer
// Title: Basic
// Textures: 1

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

// 1st texture
uniform sampler2D   u_tex0;

// 1st knob
uniform float u_x0;

// 2nd knob
uniform float u_x1;

void main (void) {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // set current color to same location in 1st texture, with offset set by knob 1/2
  gl_FragColor = texture2D(u_tex0, uv + vec2(u_x0, u_x1));
}

// Author: Unknown
// Title: Blend Add
// Textures: 2

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;

vec4 mixBlend(vec4 texColour0, vec4 texColour1) {
  vec4 colour;    
  colour = texColour0;
  colour.xyz = (1.0 - u_x0) * texColour0.xyz + u_x0 * texColour1.xyz;
  return colour;
}

void main() {
  vec2 pos =  gl_FragCoord.xy/u_resolution.xy;
  vec4 texColour0 = texture2D(u_tex0, pos);
  vec4 texColour1 = texture2D(u_tex1, pos);
  gl_FragColor = mixBlend(texColour0, texColour1); 
}

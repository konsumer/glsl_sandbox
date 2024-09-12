// Author: Unknown
// Title: Wipe
// Textures: 2

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_resolution;
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;

void main(){
  vec2 pos =  gl_FragCoord.xy / u_resolution;
  vec4 texColour0 = texture2D(u_tex0, pos);
  vec4 texColour1 = texture2D(u_tex1, pos);
  vec4 colour;    
  if (pos.x > u_x0 && pos.y > u_x1){
    colour = texColour0;
  } else {
    colour = texColour1;
  }
  gl_FragColor = colour;
}

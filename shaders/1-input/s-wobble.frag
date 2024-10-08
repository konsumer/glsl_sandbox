// Author: Tim Caldwell
// Title: S Wobble
// Textures: 1

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;

void main(){
  vec2 pos = gl_FragCoord.xy;
  vec2 centre = u_resolution / 2.0;
  vec2 norm = pos - centre;
  float r = length(norm);
  float theta = atan(pos.y / pos.x);
  theta += u_time*u_x0;
  pos.y = 4.0*u_x1*r*sin(theta) + centre.y;
  pos.x = 4.0*(1.0-u_x2)*r*cos(theta) + centre.x;
  vec4 color = texture2D(u_tex0, pos / u_resolution);
  gl_FragColor = color;
}
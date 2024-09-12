// Author: Patricio Gonzalez
// Title: Matrix
// Textures: 0

// based on https://thebookofshaders.com/edit.php#08/matrix.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){
  return fract(sin(x) * 43758.5453);
}

float random(in vec2 st){
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

float rchar(in vec2 outer,in vec2 inner){
  float grid = 5.;
  vec2 margin = vec2(.2,.05);
  float seed = 28.;
  vec2 borders = step(margin, inner) * step(margin, 1.-inner);
  return step(.5, random(outer * seed + floor(inner * grid))) * borders.x * borders.y;
}

vec3 matrix(in vec2 st){
  float rows = 80.0;
  vec2 ipos = floor(st * rows);
  ipos += vec2(.0, floor(u_time * 20. * random(ipos.x)));
  vec2 fpos = fract(st * rows);
  vec2 center = (.5 - fpos);
  float pct = random(ipos);
  float glow = (1. - dot(center, center) * 3.) * 2.0;
  return vec3(rchar(ipos, fpos) * pct * glow);
}

void main(){
  vec2 st = gl_FragCoord.st / u_resolution.xy;
  st.y *= u_resolution.y / u_resolution.x;
  vec3 color = vec3(0);
  color = matrix(st);
  gl_FragColor = vec4(color * vec3(0, 1, 0), 1.0);
}
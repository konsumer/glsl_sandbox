// Author: Unknown
// Title: Luma Key
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

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 mixLuma0(vec4 texcolor0, vec4 texcolor1) {
  vec4 color;    
  vec3 hsvTexcolor0 = rgb2hsv(texcolor0.rgb);

  if(hsvTexcolor0.z < u_x0){color = texcolor0;}
  else {color = texcolor1;}
  return color;
}

vec4 mixLuma1(vec4 texcolor0, vec4 texcolor1) {
  vec4 color;    
  vec3 hsvTexcolor1 = rgb2hsv(texcolor1.rgb);
  if(hsvTexcolor1.z < u_x0){color = texcolor1;}
  else {color = texcolor0;}
  return color;
}

void main() {
  vec2 pos = gl_FragCoord.xy / u_resolution;
  vec4 texcolor0 = texture2D(u_tex0, pos);
  vec4 texcolor1 = texture2D(u_tex1, pos);
  vec4 color;
  if (u_x1 > 0.5){
    color = mixLuma0(texcolor0, texcolor1);
  } else{
    color = mixLuma1(texcolor0, texcolor1);
  }
  gl_FragColor = color; 
}

// Author: Patricio Gonzalez Vivo
// Title: Datastream
// Textures: 1

// based on https://player.thebookofshaders.com/?log=160302102102

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// 1st texture
uniform sampler2D u_tex0;

// 1st knob
uniform float u_x0;

// 2nd knob
uniform float u_x1;

// current pixel-position
varying vec2 v_texcoord;

float random (in float x) {
  return fract(sin(x)*1e4);
}

float random (in vec2 st) { 
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float noise (in float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(random(i), random(i + 1.0), u);
}

float pattern(vec2 st, vec2 v, float t) {
  vec2 p = floor(st+v);
  return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
}

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  vec2 st = uv;
  if (u_resolution.y > u_resolution.x ) {
    st.y *= u_resolution.y/u_resolution.x;
  } else {
    st.x *= u_resolution.x/u_resolution.y;
  }
  
  float t = 1.0 + u_time*1.0;
  vec2 grid = vec2(50.0,70.);
  st *= grid;
  
  vec2 ipos = floor(st);  // integer
  vec2 fpos = fract(st);  // fraction
  
  vec2 vel = vec2(t*150.); // Speed 
  vel *= vec2(-1.,0.0) * random(1.0+ipos.y) - vec2(0.1,0.); // Acceleration

  float amount = noise(t*0.5);    // Croudness
  
  vec3 color = vec3(0.);
  color = vec3(pattern(st,vel,amount));
  
  // Margins
  color *= step(0.4,fpos.y);

  gl_FragColor = vec4(color,1.0) * texture2D(u_tex0, uv + vec2(u_x0, u_x1));
}
// Author: Patricio Gonzalez Vivo
// Title: Noise Pulse
// Textures: 1

// based on https://player.thebookofshaders.com/?log=160313020334

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;

float ripples(vec2 st, float t) {
  vec2 cnt = st-.5;
  float d = dot(cnt,cnt)*2.;
  return max(sin(t-d*10.),0.0);
}

vec2 skew (vec2 st) {
  vec2 r = vec2(1.1547*st.x);
  r.y = st.y+0.5*r.x;
  return r;
}

vec2 unskew (vec2 st) {
  vec2 r = vec2(st.x/1.1547);
  r.y = st.y-0.5*(r.x*1.1547);
  return r;
}


vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st = (st-.5)*1.0+.5;
  
  if (u_resolution.y > u_resolution.x ) {
    st.y *= u_resolution.y/u_resolution.x;
    st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
  } else {
    st.x *= u_resolution.x/u_resolution.y;
    st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
  }

  float t = u_time*0.25;
  float grid = 20.;
  vec3 color = vec3(0.);
  
  st *= grid;    
  vec2 s = skew(st);
  vec2 s_i = floor(s);
  vec2 s_f = fract(s);
  float td = step(s_f.x,s_f.y);

  color += ripples(unskew(s_i+td)/grid,t*3.)-snoise(floor(s+td*5.)+t);
  
  gl_FragColor = vec4(color,1.0) * texture2D(u_tex0, gl_FragCoord.xy/u_resolution.xy);
}
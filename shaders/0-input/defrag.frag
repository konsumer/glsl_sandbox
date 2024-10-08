// Author: Patricio Gonzalez Viv
// Title: Defrag
// Textures: 0

// based on https://player.thebookofshaders.com/?log=160302022724

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

float noise (in float x) { 
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(random(i), random(i + 1.0), u);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  if (u_resolution.y > u_resolution.x ) {
    st.y *= u_resolution.y/u_resolution.x;
  } else {
    st.x *= u_resolution.x/u_resolution.y;
  }

  // Grid
  vec2 grid = vec2(90.0,50.);
  st *= grid;

  vec2 ipos = floor(st);  // integer
  
  vec2 vel = vec2(0.0); // time
  vel *= random(ipos.y); // random speed
  vel = floor(vel);
  
  // 100%
  float totalCells = grid.x*grid.y;
  float t = mod(u_time*max(grid.x,grid.y),totalCells);
  vec2 head = vec2(mod(t,grid.x), floor(t/grid.x));

  vec3 color = vec3(1.0);
  color *= step(grid.y-head.y,ipos.y);                                // Y
  color += (1.0-step(head.x,ipos.x))*step(grid.y-head.y,ipos.y+1.);   // X
  color = clamp(color,vec3(0.),vec3(1.));

  // Assign a random value base on the integer coord
  color *= random(floor(st+vel));

  float amount = noise(u_time+ipos.y);
  color = step(amount,color); // threshold

  //  Margin
  color *= step(.2,fract(st.y+vel.y));

  gl_FragColor = vec4(color,1.0);
}
// based on https://www.shadertoy.com/view/MdXGDH

const float PI = 3.14159265;

uniform float u_time;

// these are input-knobs (0.0 - 1.0)
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;

void main() {
  float time = u_time *0.2;
  float color1 = (sin(dot(gl_FragCoord.xy,vec2(sin(time*3.0),cos(time*3.0)))*0.02+time*3.0)+1.0)/2.0;
  vec2 center = vec2(640.0/2.0, 360.0/2.0) + vec2(640.0/2.0*sin(-time*3.0),360.0/2.0*cos(-time*3.0)) * u_x3;
  float color2 = (cos(length(gl_FragCoord.xy - center)*0.03)+1.0)/2.0;
  float color = (color1+ color2)/2.0;
  float red = (cos(PI*color/0.5+time*3.0)+1.0)/2.0 + u_x0;
  float green = (sin(PI*color/0.5+time*3.0)+1.0)/2.0 + u_x1;
  float blue  = (sin(+time*3.0)+1.0)/2.0 + u_x2;
  gl_FragColor = vec4(red, green, blue, 1.0);
}
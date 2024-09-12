// Author: Unknown
// Title: Rotate (fine)
// Textures: 1

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;

vec4 rotate(sampler2D tex, vec2 pos) {
  vec4 texColourRotate;
  vec2 center;
  center = vec2(0.45 + 0.1*u_x1,0.45 + 0.1*u_x2);

  pos.x = (pos.x - center.x)*(0.5 / (0.45 + 0.1*u_x3)) + center.x;
  pos.y = (pos.y - center.y)*(0.5 / (0.45 + 0.1*u_x3)) + center.y;

  float r = distance(center, pos);
  float a = atan(pos.x - center.x, pos.y - center.y);

  pos.x = r * cos(a + 2.0 * 3.141592 * (0.2 + 0.1*u_x0)) + 0.5;
  pos.y = r * sin(a + 2.0 * 3.141592 * (0.2 + 0.1*u_x0)) + 0.5;
  pos.x = 1.0 - pos.x;
  if ((pos.x < 0.0)||(pos.y < 0.0)||(pos.x > 1.0)||(pos.y > 1.0)) {
    texColourRotate = vec4(0.0);
  } else {
    texColourRotate = texture2D(tex, pos);
  }
  return texColourRotate;
}

void main(){
  gl_FragColor = rotate(u_tex0, gl_FragCoord.xy / u_resolution.xy); 
}

// Author: Unknown
// Title: Zoom
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

vec4 zoom(sampler2D tex, vec2 pos) {
  vec4 texColourZoom;
  vec2 center = vec2(u_x2, u_x3);
  pos.x = (pos.x - center.x)*(0.5 / u_x0) + center.x;
  pos.y = (pos.y - center.y)*(0.5 / u_x0) + center.y;
  if ((pos.x < 0.0)||(pos.y < 0.0)||(pos.x > 1.0)||(pos.y > 1.0)){
    texColourZoom = vec4(0.0);
  } else{
    texColourZoom = texture2D(tex, pos);
  }
  return texColourZoom;
}

void main(){
  gl_FragColor = zoom(u_tex0,  gl_FragCoord.xy / u_resolution); 
}

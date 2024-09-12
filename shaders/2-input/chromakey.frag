// Author: CoyHot 
// Title: Chroma Key
// Textures: 2

// port of https://www.shadertoy.com/view/Mdj3Wy

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform sampler2D   u_tex0;
uniform sampler2D   u_tex1;

const int samples = 10;
const float desplillValue = 0.1;

void main() {  
  float rad = 0.02;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec4 fg = texture2D(u_tex0, uv);
  vec4 bg = texture2D(u_tex1, uv);
  vec3 blurredImage = vec3(0.0);
  for (int i = -samples; i < samples; i++) {
    for (int j = -samples; j < samples; j++) {
      blurredImage += texture2D(u_tex0, uv + vec2(i, j) * (rad/float(samples))).xyz / pow(float(samples) * 2.0, 2.0);
    }
  }
  vec4 rawKey = vec4 (vec3(blurredImage[1]-blurredImage[0]),1.0);
  vec4 normalizeKey = clamp((1.0-(rawKey*10.0)),0.0,1.0);
  fg.g = clamp (fg.g, 0.0, fg.r-desplillValue);
  gl_FragColor = (normalizeKey * fg)+((1.0-normalizeKey) * bg);
}
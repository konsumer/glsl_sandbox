//2-input

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texcoord;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_resolution;

uniform float u_x0;
uniform float u_x1;
uniform float u_x2;



void main(){
  vec4 color0 = texture2D(u_tex0, v_texcoord);
  vec4 color1 = texture2D(u_tex1, v_texcoord);

  // bad green-screen
  gl_FragColor = color0.g > 0.4 && color0.r < 0.5 && color0.b < 0.5 ? color1 : color0;
}

/*
// this should be better, but does a blacked-out look
vec2 RGBtoUV(vec3 rgb) {
  return vec2(
    rgb.r * -0.169 + rgb.g * -0.331 + rgb.b *  0.5    + 0.5,
    rgb.r *  0.5   + rgb.g * -0.419 + rgb.b * -0.081  + 0.5
  );
}

void main() {
  vec2 texCoord = gl_FragCoord.xy / u_resolution;

  vec4 rgba = texture(u_tex0, texCoord);
  float chromaDist = distance(RGBtoUV(texture(u_tex0, texCoord).rgb), RGBtoUV(vec3(0.0, 1.0, 0.0)));

  // For similarity
  float baseMask = chromaDist - 0.46;

  // For smoothness
  rgba.a = pow(clamp(baseMask / 0.08, 0., 1.), 1.5);

  // For spill
  float spillVal = pow(clamp(baseMask / 0.1, 0., 1.), 1.5);
  float desat = clamp(rgba.r * 0.2126 + rgba.g * 0.7152 + rgba.b * 0.0722, 0., 1.);
  rgba.rgb = mix(vec3(desat, desat, desat), rgba.rgb, spillVal);
  gl_FragColor = rgba;
}
*/
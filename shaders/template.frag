// this is a template for making new shaders

// go read https://thebookofshaders.com/ to learn how to make these

#ifdef GL_ES
precision mediump float;
#endif

// current pixel-position
// in vec4 gl_FragCoord;

// output color for current pixel-position
// out vec4 gl_FragColor;

// current time since start, same as iTime on shadertoy
uniform float u_time;

// surface resolution, same as iResolution on shadertoy
uniform vec2 u_resolution;

uniform sampler2D u_tex0; // same as iChannel0 on shadertoy
uniform sampler2D u_tex1; // same as iChannel1 on shadertoy

// these are input-knobs (0.0 - 1.0)
uniform float u_x0;
uniform float u_x1;
uniform float u_x2;
uniform float u_x3;

void main() {
	// get current pixel-position (scaled to screen)
	vec2 st = gl_FragCoord.xy / u_resolution;

	// breathing pulse, 0.0 - 1.0
	float t = abs(sin(u_time));
	gl_FragColor = vec4(t * u_x0, t * u_x1, t * u_x2, 1.0);

	// you can read texture like this
	// gl_FragColor = texture2D(u_tex0, st);
}

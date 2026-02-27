/**
 * Background noise field shader — layered simplex noise
 * Creates a living, breathing background that responds to scroll and mouse.
 */

export const backgroundVertex = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

export const backgroundFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScrollY;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Simplex noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Scroll shifts the noise field
    float scrollOffset = uScrollY * 0.0003;
    float timeOffset = uTime * 0.05;

    // Layer 1: Large scale noise
    float n1 = snoise(uv * 2.0 + vec2(timeOffset, scrollOffset)) * 0.5 + 0.5;

    // Layer 2: Medium scale noise (faster movement)
    float n2 = snoise(uv * 4.0 + vec2(timeOffset * 1.5, scrollOffset * 0.8)) * 0.5 + 0.5;

    // Layer 3: Fine detail noise
    float n3 = snoise(uv * 8.0 + vec2(timeOffset * 0.7, scrollOffset * 1.2)) * 0.5 + 0.5;

    // Mouse influence — subtle warp near cursor
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    float mouseDist = distance(uv, mouseUV);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.03;

    // Combine noise layers
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2 + mouseInfluence;

    // Color: blue (top) → purple (middle) → gold-warm (bottom)
    // Hue shifts subtly with scroll
    vec3 colorTop = vec3(0.02, 0.02, 0.06);      // Deep blue-black
    vec3 colorMid = vec3(0.04, 0.02, 0.06);      // Purple-black
    vec3 colorBot = vec3(0.04, 0.03, 0.02);      // Warm-black

    // Mix colors based on vertical position + scroll
    float verticalPos = uv.y + scrollOffset * 2.0;
    vec3 baseColor = mix(colorBot, mix(colorMid, colorTop, smoothstep(0.0, 1.0, verticalPos)), smoothstep(0.0, 1.0, verticalPos));

    // Apply noise as subtle luminance variation
    vec3 color = baseColor + noise * 0.015;

    // Vignette — darker edges
    vec2 vignetteUV = uv * (1.0 - uv);
    float vignette = vignetteUV.x * vignetteUV.y * 15.0;
    vignette = pow(vignette, 0.15);
    color *= vignette;

    // Very subtle color accent from noise
    color += vec3(0.0, 0.0, noise * 0.008); // Slight blue tint in bright areas

    gl_FragColor = vec4(color, 1.0);
  }
`

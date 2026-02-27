/**
 * Custom GLSL shaders for hero particle morphing system.
 * All morph interpolation happens on the GPU via the vertex shader.
 */

export const heroParticleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorphProgress;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute vec3 positionA;  // Morph target A (current shape)
  attribute vec3 positionB;  // Morph target B (next shape)
  attribute float aRandom;   // Per-particle random seed

  varying float vAlpha;
  varying float vDistance;
  varying vec3 vColor;

  // Simplex-like noise for organic movement
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    // Morph between two target positions
    vec3 morphedPosition = mix(positionA, positionB, uMorphProgress);

    // Add organic floating motion
    float noiseX = sin(uTime * 0.5 + aRandom * 6.28) * 0.15;
    float noiseY = cos(uTime * 0.3 + aRandom * 12.56) * 0.1;
    float noiseZ = sin(uTime * 0.4 + aRandom * 3.14) * 0.08;
    morphedPosition += vec3(noiseX, noiseY, noiseZ);

    // Mouse repulsion (subtle)
    vec2 mouseOffset = uMouse * 3.0;
    float mouseDistXY = distance(morphedPosition.xy, mouseOffset);
    if (mouseDistXY < 2.0) {
      vec2 dir = normalize(morphedPosition.xy - mouseOffset);
      float force = (1.0 - mouseDistXY / 2.0) * 0.5;
      morphedPosition.xy += dir * force;
    }

    // Scroll progress: spread particles outward as user scrolls
    float scrollSpread = uScrollProgress * 0.5;
    morphedPosition *= 1.0 + scrollSpread;

    vec4 mvPosition = modelViewMatrix * vec4(morphedPosition, 1.0);

    // Distance-based alpha (far particles are dimmer)
    vDistance = -mvPosition.z;
    vAlpha = smoothstep(12.0, 2.0, vDistance) * (0.6 + aRandom * 0.4);

    // Scroll fade out
    vAlpha *= 1.0 - uScrollProgress * 0.8;

    // Color variation based on position and morph
    float colorMix = (morphedPosition.y + 3.0) / 6.0; // normalized Y
    vec3 colorBlue = vec3(0.16, 0.38, 1.0);     // #2962FF
    vec3 colorPurple = vec3(0.49, 0.23, 0.93);   // #7C3AED
    vec3 colorGold = vec3(0.83, 0.69, 0.22);     // #D4AF37
    vColor = mix(colorBlue, mix(colorPurple, colorGold, uMorphProgress), colorMix);

    // Point size: varies by distance and random seed
    float baseSize = 2.5 + aRandom * 2.0;
    gl_PointSize = baseSize * uPixelRatio * (6.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
  }
`

export const heroParticleFragment = /* glsl */ `
  varying float vAlpha;
  varying float vDistance;
  varying vec3 vColor;

  void main() {
    // Circular point with soft edge
    float distFromCenter = length(gl_PointCoord - vec2(0.5));
    if (distFromCenter > 0.5) discard;

    // Soft glow falloff
    float alpha = vAlpha * smoothstep(0.5, 0.1, distFromCenter);

    // Additive bloom-like effect
    vec3 color = vColor * (1.0 + smoothstep(0.3, 0.0, distFromCenter) * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`

/**
 * Connection line shaders — for drawing lines between nearby particles.
 */
export const connectionLineVertex = /* glsl */ `
  attribute vec3 instanceStart;
  attribute vec3 instanceEnd;
  attribute float instanceAlpha;

  varying float vLineAlpha;

  void main() {
    vLineAlpha = instanceAlpha;

    // Determine which end of the line this vertex represents
    vec3 pos = position.x < 0.5 ? instanceStart : instanceEnd;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const connectionLineFragment = /* glsl */ `
  varying float vLineAlpha;

  void main() {
    gl_FragColor = vec4(0.16, 0.38, 1.0, vLineAlpha * 0.12);
  }
`

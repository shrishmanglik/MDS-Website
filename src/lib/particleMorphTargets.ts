/**
 * Pre-computed morph target positions for hero particle morphing.
 * Three shapes: neural network, data stream, crystal structure.
 * All positions are normalized to roughly fill a 10x6x4 bounding box.
 */

/**
 * Generate positions for a neural network / graph layout.
 * Nodes in clusters (layers) with some randomness.
 */
export function generateNeuralNetworkPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const layers = 5
  const nodesPerLayer = Math.ceil(count / layers)

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(i / nodesPerLayer)
    const indexInLayer = i % nodesPerLayer

    // X: spread across layers
    const layerX = ((layer / (layers - 1)) - 0.5) * 8

    // Y: distribute within layer with some jitter
    const layerSpread = 4
    const y = ((indexInLayer / nodesPerLayer) - 0.5) * layerSpread + (Math.random() - 0.5) * 0.8

    // Z: slight depth variation
    const z = (Math.random() - 0.5) * 2

    positions[i * 3] = layerX + (Math.random() - 0.5) * 0.5
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  return positions
}

/**
 * Generate positions for a data stream / flowing river of particles.
 * Particles follow sinusoidal paths.
 */
export function generateDataStreamPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const t = i / count

    // Main flow direction: left to right
    const x = (t - 0.5) * 10

    // Y: sinusoidal wave with multiple frequencies
    const y = Math.sin(t * Math.PI * 4) * 1.5 +
              Math.sin(t * Math.PI * 7) * 0.5 +
              (Math.random() - 0.5) * 0.3

    // Z: spiral component
    const z = Math.cos(t * Math.PI * 3) * 1.2 +
              (Math.random() - 0.5) * 0.2

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  return positions
}

/**
 * Generate positions for a crystal / geometric structure.
 * Points on faces of an icosahedron with perturbation.
 */
export function generateCrystalPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)

  // Golden ratio
  const phi = (1 + Math.sqrt(5)) / 2
  const scale = 2.5

  // Icosahedron vertices (12)
  const vertices = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ]

  // Icosahedron faces (20 triangles)
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  for (let i = 0; i < count; i++) {
    // Pick a random face
    const face = faces[i % faces.length]
    const v0 = vertices[face[0]]
    const v1 = vertices[face[1]]
    const v2 = vertices[face[2]]

    // Random barycentric coordinates
    let r1 = Math.random()
    let r2 = Math.random()
    if (r1 + r2 > 1) {
      r1 = 1 - r1
      r2 = 1 - r2
    }
    const r3 = 1 - r1 - r2

    // Point on face + small perturbation
    const px = (v0[0] * r1 + v1[0] * r2 + v2[0] * r3) * scale
    const py = (v0[1] * r1 + v1[1] * r2 + v2[1] * r3) * scale
    const pz = (v0[2] * r1 + v1[2] * r2 + v2[2] * r3) * scale

    positions[i * 3] = px + (Math.random() - 0.5) * 0.15
    positions[i * 3 + 1] = py + (Math.random() - 0.5) * 0.15
    positions[i * 3 + 2] = pz + (Math.random() - 0.5) * 0.15
  }

  return positions
}

/**
 * Generate all three morph targets for a given particle count.
 */
export function generateAllMorphTargets(count: number) {
  return {
    neural: generateNeuralNetworkPositions(count),
    stream: generateDataStreamPositions(count),
    crystal: generateCrystalPositions(count),
  }
}

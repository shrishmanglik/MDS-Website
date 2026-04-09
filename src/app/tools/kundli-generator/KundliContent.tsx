'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowRight, RotateCcw, Info } from 'lucide-react'
import { SplitText } from '@/components/ui/SplitText'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedInput } from '@/components/ui/AnimatedInput'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

// ---------------------------------------------------------------------------
// Zodiac & Nakshatra data
// ---------------------------------------------------------------------------

const ZODIAC_SIGNS = [
  { en: 'Aries', sa: 'Mesha', symbol: '\u2648' },
  { en: 'Taurus', sa: 'Vrishabha', symbol: '\u2649' },
  { en: 'Gemini', sa: 'Mithuna', symbol: '\u264A' },
  { en: 'Cancer', sa: 'Karka', symbol: '\u264B' },
  { en: 'Leo', sa: 'Simha', symbol: '\u264C' },
  { en: 'Virgo', sa: 'Kanya', symbol: '\u264D' },
  { en: 'Libra', sa: 'Tula', symbol: '\u264E' },
  { en: 'Scorpio', sa: 'Vrishchika', symbol: '\u264F' },
  { en: 'Sagittarius', sa: 'Dhanu', symbol: '\u2650' },
  { en: 'Capricorn', sa: 'Makara', symbol: '\u2651' },
  { en: 'Aquarius', sa: 'Kumbha', symbol: '\u2652' },
  { en: 'Pisces', sa: 'Meena', symbol: '\u2653' },
] as const

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
] as const

const NAKSHATRA_LORDS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun',
  'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury',
] as const

// Planet abbreviations for chart display
const PLANET_ABBR: Record<string, string> = {
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
  Ascendant: 'As',
}

// ---------------------------------------------------------------------------
// Simplified astronomical calculations (approximate, no Swiss Ephemeris)
// ---------------------------------------------------------------------------

/** Julian Day Number from date */
function dateToJD(year: number, month: number, day: number, hour: number = 0): number {
  if (month <= 2) { year -= 1; month += 12 }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5
}

/** Normalize degrees to 0-360 */
function normDeg(d: number): number {
  d = d % 360
  return d < 0 ? d + 360 : d
}

/** Mean longitude of Sun (approximate) */
function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T
  const Mrad = M * Math.PI / 180
  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad)
    + 0.019993 * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad)
  // Sidereal correction (Lahiri ayanamsa approx)
  const ayanamsa = 23.85 + 0.0137 * (jd - 2451545.0) / 365.25
  return normDeg(L0 + C - ayanamsa)
}

/** Mean longitude of Moon (approximate) */
function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L = 218.3165 + 481267.8813 * T
  const D = 297.8502 + 445267.1115 * T
  const M = 357.5291 + 35999.0503 * T
  const Mp = 134.9634 + 477198.8676 * T
  const F = 93.2720 + 483202.0175 * T

  const Drad = D * Math.PI / 180
  const Mrad = M * Math.PI / 180
  const Mprad = Mp * Math.PI / 180
  const Frad = F * Math.PI / 180

  let lon = L
    + 6.289 * Math.sin(Mprad)
    - 1.274 * Math.sin(2 * Drad - Mprad)
    + 0.658 * Math.sin(2 * Drad)
    + 0.214 * Math.sin(2 * Mprad)
    - 0.186 * Math.sin(Mrad)
    - 0.114 * Math.sin(2 * Frad)

  const ayanamsa = 23.85 + 0.0137 * (jd - 2451545.0) / 365.25
  return normDeg(lon - ayanamsa)
}

/** Mean planet longitude (simplified mean motion) */
function meanPlanetLongitude(jd: number, planet: string): number {
  const T = (jd - 2451545.0) / 36525
  const ayanamsa = 23.85 + 0.0137 * (jd - 2451545.0) / 365.25

  // Mean tropical longitudes at J2000.0 + mean daily motion
  const params: Record<string, [number, number]> = {
    Mercury: [252.2509, 149472.6746],
    Venus:   [181.9798,  58517.8157],
    Mars:    [355.4330,  19140.2993],
    Jupiter: [ 34.3515,   3034.9057],
    Saturn:  [ 49.9429,   1222.1138],
  }

  const [L0, rate] = params[planet]
  return normDeg(L0 + rate * T - ayanamsa)
}

/** Rahu mean longitude (retrograde) */
function rahuLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const ayanamsa = 23.85 + 0.0137 * (jd - 2451545.0) / 365.25
  const L = 125.0445 - 1934.1363 * T
  return normDeg(L - ayanamsa)
}

/** Approximate sidereal ascendant */
function ascendant(jd: number, latitude: number): number {
  const T = (jd - 2451545.0) / 36525
  // Greenwich Mean Sidereal Time in degrees
  let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T
  GMST = normDeg(GMST)
  // Local sidereal time (using ~77.1 as approximate Indian longitude if no better data)
  const LST = normDeg(GMST + 77.1)
  const LSTrad = LST * Math.PI / 180
  const latRad = latitude * Math.PI / 180
  const eps = 23.4393 * Math.PI / 180

  const y = -Math.cos(LSTrad)
  const x = Math.sin(eps) * Math.tan(latRad) + Math.cos(eps) * Math.sin(LSTrad)
  let asc = Math.atan2(y, x) * 180 / Math.PI
  asc = normDeg(asc)
  const ayanamsa = 23.85 + 0.0137 * (jd - 2451545.0) / 365.25
  return normDeg(asc - ayanamsa)
}

// ---------------------------------------------------------------------------
// Chart computation
// ---------------------------------------------------------------------------

interface PlanetPosition {
  name: string
  longitude: number
  signIndex: number
  sign: string
  signSanskrit: string
  degree: number
  house: number
  nakshatra: string
  nakshatraLord: string
  nakshatraPada: number
}

interface ChartData {
  planets: PlanetPosition[]
  houses: string[][] // planets in each house (0-11)
  ascSign: number
}

function getNakshatra(lon: number): { name: string; lord: string; pada: number } {
  const nakshatraSpan = 360 / 27
  const idx = Math.floor(lon / nakshatraSpan) % 27
  const padaInNakshatra = ((lon % nakshatraSpan) / nakshatraSpan) * 4
  return {
    name: NAKSHATRAS[idx],
    lord: NAKSHATRA_LORDS[idx],
    pada: Math.floor(padaInNakshatra) + 1,
  }
}

function computeChart(
  year: number, month: number, day: number,
  hour: number, minute: number,
  latitude: number
): ChartData {
  const decimalHour = hour + minute / 60
  const jd = dateToJD(year, month, day, decimalHour)

  const ascLon = ascendant(jd, latitude)
  const ascSignIndex = Math.floor(ascLon / 30) % 12

  const rawPlanets: { name: string; longitude: number }[] = [
    { name: 'Ascendant', longitude: ascLon },
    { name: 'Sun', longitude: sunLongitude(jd) },
    { name: 'Moon', longitude: moonLongitude(jd) },
    { name: 'Mars', longitude: meanPlanetLongitude(jd, 'Mars') },
    { name: 'Mercury', longitude: meanPlanetLongitude(jd, 'Mercury') },
    { name: 'Jupiter', longitude: meanPlanetLongitude(jd, 'Jupiter') },
    { name: 'Venus', longitude: meanPlanetLongitude(jd, 'Venus') },
    { name: 'Saturn', longitude: meanPlanetLongitude(jd, 'Saturn') },
    { name: 'Rahu', longitude: rahuLongitude(jd) },
    { name: 'Ketu', longitude: normDeg(rahuLongitude(jd) + 180) },
  ]

  const houses: string[][] = Array.from({ length: 12 }, () => [])

  const planets: PlanetPosition[] = rawPlanets.map((p) => {
    const signIndex = Math.floor(p.longitude / 30) % 12
    const degree = p.longitude % 30
    // House = sign position relative to ascendant sign
    const house = ((signIndex - ascSignIndex + 12) % 12) + 1
    const nak = getNakshatra(p.longitude)

    houses[(house - 1) % 12].push(PLANET_ABBR[p.name])

    return {
      name: p.name,
      longitude: p.longitude,
      signIndex,
      sign: ZODIAC_SIGNS[signIndex].en,
      signSanskrit: ZODIAC_SIGNS[signIndex].sa,
      degree,
      house,
      nakshatra: nak.name,
      nakshatraLord: nak.lord,
      nakshatraPada: nak.pada,
    }
  })

  return { planets, houses, ascSign: ascSignIndex }
}

// ---------------------------------------------------------------------------
// North Indian Diamond Chart SVG
// ---------------------------------------------------------------------------

function NorthIndianChart({ houses, ascSign }: { houses: string[][]; ascSign: number }) {
  const size = 360
  const mid = size / 2

  // North Indian chart house positions (diamond layout)
  // House numbering: the ascendant sign is always house 1 in the top diamond.
  // The 12 houses map to fixed visual positions in the North Indian layout.
  // Position index 0 = top center (house 1), going clockwise.

  // Polygons for each house in a North Indian diamond chart
  // The outer square is (0,0)-(size,size). Inner diamond connects midpoints.
  const housePolygons: string[] = [
    // House 1 (top center diamond)
    `${mid},0 ${size},0 ${mid},${mid}`,
    // House 2 (top-right triangle)
    `${size},0 ${size},${mid} ${mid},${mid}`,
    // House 3 (right-top triangle)
    `${size},0 ${size},${mid} ${mid + mid / 2},${mid / 2}`,
    // House 4 (right center diamond)
    `${size},${mid} ${size},${size} ${mid},${mid}`,
    // House 5 (right-bottom triangle)
    `${size},${size} ${mid},${mid} ${size},${mid}`,
    // House 6 (bottom-right triangle)
    `${size},${size} ${mid},${size} ${mid},${mid}`,
    // House 7 (bottom center diamond)
    `${mid},${size} 0,${size} ${mid},${mid}`,
    // House 8 (bottom-left triangle)
    `0,${size} 0,${mid} ${mid},${mid}`,
    // House 9 (left-bottom triangle)
    `0,${size} 0,${mid} ${mid / 2},${mid + mid / 2}`,
    // House 10 (left center diamond)
    `0,${mid} 0,0 ${mid},${mid}`,
    // House 11 (left-top triangle)
    `0,0 ${mid},${mid} 0,${mid}`,
    // House 12 (top-left triangle)
    `0,0 ${mid},0 ${mid},${mid}`,
  ]

  // Corrected: standard North Indian chart positions
  // Outer square with inner diamond, 12 triangular houses
  // Text label positions for each house (approximate centers)
  const houseCenters: [number, number][] = [
    [mid, mid * 0.35],           // H1 - top center
    [mid + mid * 0.55, mid * 0.35], // H2 - top right
    [mid + mid * 0.65, mid * 0.65], // H3 - right top  (not used in standard)
    [mid + mid * 0.55, mid],        // H4 - right center
    [mid + mid * 0.55, mid + mid * 0.35], // H5 - right bottom (not used)
    [mid + mid * 0.55, mid + mid * 0.65], // H6 - bottom right
    [mid, mid + mid * 0.65],        // H7 - bottom center
    [mid - mid * 0.55, mid + mid * 0.65], // H8 - bottom left
    [mid - mid * 0.55, mid + mid * 0.35], // H9 - left bottom (not used)
    [mid - mid * 0.55, mid],        // H10 - left center
    [mid - mid * 0.55, mid * 0.35], // H11 - left top (not used)
    [mid - mid * 0.55, mid * 0.65], // H12 - top left
  ]

  // Standard North Indian chart: outer square + inner diamond = 12 triangles
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[400px] mx-auto"
      role="img"
      aria-label="North Indian Vedic Birth Chart (Rashi Chart)"
    >
      {/* Background */}
      <rect x="0" y="0" width={size} height={size} fill="rgba(10, 10, 20, 0.8)" rx="8" />

      {/* Outer square */}
      <rect
        x="4" y="4" width={size - 8} height={size - 8}
        fill="none" stroke="#D4AF37" strokeWidth="2" rx="4"
      />

      {/* Inner diamond */}
      <polygon
        points={`${mid},4 ${size - 4},${mid} ${mid},${size - 4} 4,${mid}`}
        fill="none" stroke="#D4AF37" strokeWidth="1.5"
      />

      {/* Diagonal lines from corners to diamond midpoints for the 4 corner houses */}
      {/* Top-left to center */}
      <line x1="4" y1="4" x2={mid} y2={mid} stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
      {/* Top-right to center */}
      <line x1={size - 4} y1="4" x2={mid} y2={mid} stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
      {/* Bottom-right to center */}
      <line x1={size - 4} y1={size - 4} x2={mid} y2={mid} stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
      {/* Bottom-left to center */}
      <line x1="4" y1={size - 4} x2={mid} y2={mid} stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />

      {/* House numbers and planet placements */}
      {houses.map((planetsInHouse, i) => {
        const [cx, cy] = houseCenters[i]
        const signNum = ((ascSign + i) % 12) + 1
        return (
          <g key={i}>
            {/* House/Sign number */}
            <text
              x={cx}
              y={cy - 14}
              textAnchor="middle"
              fill="#2962FF"
              fontSize="11"
              fontWeight="600"
              fontFamily="monospace"
            >
              {signNum}
            </text>
            {/* Planets */}
            {planetsInHouse.map((abbr, j) => (
              <text
                key={abbr}
                x={cx + (j % 2 === 0 ? -12 : 12)}
                y={cy + 4 + Math.floor(j / 2) * 14}
                textAnchor="middle"
                fill={abbr === 'As' ? '#D4AF37' : '#E0E0E0'}
                fontSize={abbr === 'As' ? '12' : '11'}
                fontWeight={abbr === 'As' ? '700' : '500'}
                fontFamily="monospace"
              >
                {abbr}
              </text>
            ))}
          </g>
        )
      })}

      {/* "Rashi Chart" label */}
      <text
        x={mid}
        y={mid + 4}
        textAnchor="middle"
        fill="#D4AF37"
        fontSize="10"
        fontWeight="400"
        opacity="0.5"
      >
        Rashi
      </text>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function KundliContent() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [generated, setGenerated] = useState(false)

  const canGenerate = birthDate.length > 0 && birthTime.length > 0

  function handleGenerate() {
    if (!canGenerate) return

    const [year, month, day] = birthDate.split('-').map(Number)
    const [hour, minute] = birthTime.split(':').map(Number)
    // Default latitude: ~28.6 (Delhi) if no specific place parsing
    const latitude = 28.6139

    const data = computeChart(year, month, day, hour, minute, latitude)
    setChartData(data)
    setGenerated(true)
  }

  function handleReset() {
    setName('')
    setBirthDate('')
    setBirthTime('')
    setBirthPlace('')
    setChartData(null)
    setGenerated(false)
  }

  const moonData = useMemo(() => {
    if (!chartData) return null
    return chartData.planets.find((p) => p.name === 'Moon')
  }, [chartData])

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Kundli Generator' },
          ]}
        />

        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUpVariant}>
            <SplitText as="h1" preset="blur-in" className="text-text-primary mb-4">
              Free Kundli Generator
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
          >
            Generate your Vedic birth chart (Kundli) instantly. North Indian style Rashi chart
            with planetary positions, nakshatras, and house placements.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-3">
            <Badge variant="offline">Free</Badge>
            <Badge variant="default">No Signup</Badge>
            <Badge variant="premium">Vedic Astrology</Badge>
          </motion.div>
        </motion.section>

        <SectionDivider className="mb-12" />

        {/* Form + Results */}
        {!generated ? (
          <ScrollReveal>
            <GlassCard padding="lg" className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Star size={20} className="text-amber-400" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Enter Birth Details
                </h2>
              </div>

              <div className="space-y-5">
                <AnimatedInput
                  label="Name (optional)"
                  name="name"
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="birth-date"
                      className="block text-sm font-medium text-text-tertiary mb-2"
                    >
                      Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="birth-date"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                      className="w-full bg-transparent border border-border-visible rounded-xl px-4 py-3 text-text-primary outline-none transition-all duration-200 hover:border-border-visible/80 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birth-time"
                      className="block text-sm font-medium text-text-tertiary mb-2"
                    >
                      Time of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="birth-time"
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      required
                      className="w-full bg-transparent border border-border-visible rounded-xl px-4 py-3 text-text-primary outline-none transition-all duration-200 hover:border-border-visible/80 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
                    />
                  </div>
                </div>

                <AnimatedInput
                  label="Place of Birth (optional)"
                  name="birthPlace"
                  value={birthPlace}
                  onChange={setBirthPlace}
                  autoComplete="address-level2"
                />

                <p className="text-text-tertiary text-xs flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Place of birth is used for Ascendant accuracy. Without it, Delhi coordinates
                  are used as default.
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full"
                >
                  Generate Kundli
                  <ArrowRight size={16} />
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        ) : chartData ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Name header */}
            {name && (
              <motion.div variants={fadeUpVariant} className="text-center mb-8">
                <h2 className="font-heading text-2xl font-semibold text-text-primary">
                  Kundli for {name}
                </h2>
                <p className="text-text-tertiary text-sm mt-1">
                  {new Date(birthDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  at {birthTime}
                </p>
              </motion.div>
            )}

            {/* Chart + Planets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Rashi Chart */}
              <motion.div variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-4 text-center">
                    Rashi Chart (D1)
                  </h3>
                  <NorthIndianChart houses={chartData.houses} ascSign={chartData.ascSign} />
                  <p className="text-text-tertiary text-xs text-center mt-3">
                    North Indian style. Numbers indicate zodiac signs. Gold = Ascendant.
                  </p>
                </GlassCard>
              </motion.div>

              {/* Planetary Positions Table */}
              <motion.div variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
                    Planetary Positions
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-visible">
                          <th className="text-left py-2 px-2 text-text-tertiary font-medium">Planet</th>
                          <th className="text-left py-2 px-2 text-text-tertiary font-medium">Sign</th>
                          <th className="text-right py-2 px-2 text-text-tertiary font-medium">Degree</th>
                          <th className="text-right py-2 px-2 text-text-tertiary font-medium">House</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.planets.map((p) => (
                          <tr
                            key={p.name}
                            className="border-b border-border-visible/50 hover:bg-bg-hover transition-colors"
                          >
                            <td className="py-2 px-2">
                              <span
                                className={
                                  p.name === 'Ascendant'
                                    ? 'text-amber-400 font-semibold'
                                    : 'text-text-primary'
                                }
                              >
                                {p.name}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-text-secondary">
                              {ZODIAC_SIGNS[p.signIndex].symbol}{' '}
                              {p.sign}
                              <span className="text-text-tertiary text-xs ml-1">
                                ({p.signSanskrit})
                              </span>
                            </td>
                            <td className="py-2 px-2 text-right text-text-secondary font-mono">
                              {p.degree.toFixed(2)}&deg;
                            </td>
                            <td className="py-2 px-2 text-right text-accent-blue font-semibold">
                              {p.house}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Nakshatra Information */}
            {moonData && (
              <motion.div variants={fadeUpVariant}>
                <GlassCard padding="lg" className="mb-10">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
                    Nakshatra Details
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-text-tertiary text-xs mb-1">Moon Nakshatra</p>
                      <p className="text-text-primary font-semibold">{moonData.nakshatra}</p>
                    </div>
                    <div>
                      <p className="text-text-tertiary text-xs mb-1">Pada</p>
                      <p className="text-text-primary font-semibold">{moonData.nakshatraPada}</p>
                    </div>
                    <div>
                      <p className="text-text-tertiary text-xs mb-1">Nakshatra Lord</p>
                      <p className="text-text-primary font-semibold">{moonData.nakshatraLord}</p>
                    </div>
                    <div>
                      <p className="text-text-tertiary text-xs mb-1">Moon Sign (Rashi)</p>
                      <p className="text-text-primary font-semibold">
                        {moonData.sign} ({moonData.signSanskrit})
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Disclaimer */}
            <motion.div variants={fadeUpVariant}>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 mb-10">
                <p className="text-amber-300/80 text-sm leading-relaxed">
                  <strong>Approximate Chart:</strong> This is a simplified calculation using
                  mean planetary motions. For professional-grade charts with Swiss Ephemeris
                  precision, Vimshottari Dasha, 50+ yoga calculations, and divisional charts,
                  try Astro AI Studio Desktop.
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button variant="secondary" size="md" onClick={handleReset}>
                <RotateCcw size={14} />
                Generate Another
              </Button>
            </motion.div>

            <SectionDivider className="mb-12" />

            {/* Cross-sell */}
            <ScrollReveal>
              <GlassCard padding="lg" className="border-amber-500/20 text-center">
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
                  Want Professional-Grade Charts?
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Astro AI Studio Desktop uses Swiss Ephemeris for arc-second precision, calculates
                  50+ yogas, Vimshottari Dasha, Shadbala strength, Ashtakoot compatibility,
                  and all 16 divisional charts. Runs 100% offline.
                </p>
                <Button href="/waitlist/astroai" variant="cta" size="md">
                  Join the Astro AI Studio Waitlist
                  <ArrowRight size={14} />
                </Button>
              </GlassCard>
            </ScrollReveal>
          </motion.div>
        ) : null}

        {/* SEO Content */}
        <SectionDivider className="my-12" />
        <ScrollReveal>
          <section className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
              What is a Kundli?
            </h2>
            <div className="text-text-secondary text-sm leading-relaxed space-y-3">
              <p>
                A Kundli (also called Janam Kundali or birth chart) is a map of the sky at the
                exact moment and place of your birth in Vedic astrology. It shows the positions
                of the Sun, Moon, and planets across the 12 zodiac signs and 27 nakshatras.
              </p>
              <p>
                The Rashi chart (D1) is the primary chart used for personality analysis, career
                predictions, relationship compatibility, and timing of life events through
                planetary dasha periods. The Ascendant (Lagna) sets the foundation for house
                placements that determine which areas of life each planet influences.
              </p>
              <p>
                This free tool provides an approximate Kundli using simplified mean-motion
                calculations. For precision astrology requiring Swiss Ephemeris calculations
                accurate to arc-seconds, divisional charts (D2-D60), and yoga analysis,
                professional software like Astro AI Studio is recommended.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}

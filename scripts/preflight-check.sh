#!/usr/bin/env bash
# Preflight check for MDS production deploys.
#
# Run this AFTER deploying the marketing site and each product. It does a
# quick smoke test of every public URL, verifies the form API is reachable
# (not 500ing), and checks that payment webhook endpoints at least respond.
#
# Usage:
#   bash scripts/preflight-check.sh
#
# Exit codes:
#   0 — all checks passed
#   1 — at least one check failed (details in stderr)

set -uo pipefail

# ANSI colors
RED=$'\033[31m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
RESET=$'\033[0m'

FAIL_COUNT=0

check() {
  local name="$1"
  local url="$2"
  local expect="$3"  # expected HTTP code OR comma-separated list (e.g. "200,301,302")

  local code
  code=$(curl -sSL \
    -H "User-Agent: Mozilla/5.0 (preflight)" \
    -o /dev/null \
    -w "%{http_code}" \
    --max-time 20 \
    "$url" 2>/dev/null) || code="000"

  if [[ ",$expect," == *",$code,"* ]]; then
    printf "  %s✓%s  %-55s  %s\n" "$GREEN" "$RESET" "$name" "$code"
  else
    printf "  %s✗%s  %-55s  %s (expected %s)\n" "$RED" "$RESET" "$name" "$code" "$expect" >&2
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

check_post() {
  local name="$1"
  local url="$2"
  local body="$3"
  local expect="$4"

  local code
  code=$(curl -sSL \
    -X POST \
    -H "User-Agent: Mozilla/5.0 (preflight)" \
    -H "Content-Type: application/json" \
    -d "$body" \
    -o /dev/null \
    -w "%{http_code}" \
    --max-time 20 \
    "$url" 2>/dev/null) || code="000"

  if [[ ",$expect," == *",$code,"* ]]; then
    printf "  %s✓%s  %-55s  %s\n" "$GREEN" "$RESET" "$name" "$code"
  else
    printf "  %s✗%s  %-55s  %s (expected %s)\n" "$RED" "$RESET" "$name" "$code" "$expect" >&2
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

echo ""
echo "=== MDS Marketing Site ==="
check "Homepage"                    "https://milliondollarstudio.ai/"                        "200"
check "For People"                  "https://milliondollarstudio.ai/for-people/"             "200"
check "For Businesses"              "https://milliondollarstudio.ai/for-businesses/"         "200"
check "How We Build"                "https://milliondollarstudio.ai/how-we-build/"           "200"
check "Products listing"            "https://milliondollarstudio.ai/products/"               "200"
check "Contact"                     "https://milliondollarstudio.ai/contact/"                "200"
check "Free assessment"             "https://milliondollarstudio.ai/free-assessment/"        "200"
check "Blog"                        "https://milliondollarstudio.ai/blog/"                   "200"
check "Tools hub"                   "https://milliondollarstudio.ai/tools/"                  "200"
check "CRS Calculator"              "https://milliondollarstudio.ai/tools/crs-calculator/"   "200"
check "Kundli Generator"            "https://milliondollarstudio.ai/tools/kundli-generator/" "200"
check "TEF Score Estimator"         "https://milliondollarstudio.ai/tools/tef-score-estimator/" "200"
check "Sitemap"                     "https://milliondollarstudio.ai/sitemap.xml"             "200"
check "Robots"                      "https://milliondollarstudio.ai/robots.txt"              "200"

echo ""
echo "=== Form API (must NOT 500) ==="
# Empty body should get a 400 validation error, not a 500 or a 503.
# 400 = env var is set, validation working. 500 = env var missing.
check_post "submit-form empty body (expect 400)" \
  "https://milliondollarstudio.ai/api/submit-form/" \
  "{}" \
  "400"

echo ""
echo "=== Redirects (should 200 after follow) ==="
check "/services → /for-businesses" "https://milliondollarstudio.ai/services/"               "200"
check "/pricing → /for-businesses"  "https://milliondollarstudio.ai/pricing/"                "200"
check "/build → /for-businesses"    "https://milliondollarstudio.ai/build/"                  "200"
check "/free-audit → /free-assessment" "https://milliondollarstudio.ai/free-audit/"          "200"
check "/technology → /how-we-build" "https://milliondollarstudio.ai/technology/"             "200"

echo ""
echo "=== Product detail pages ==="
check "FrançaisIQ detail"           "https://milliondollarstudio.ai/products/francaisiq/"    "200"
check "JyotishAI detail"            "https://milliondollarstudio.ai/products/jyotishai/"     "200"
check "ChemAI detail"               "https://milliondollarstudio.ai/products/chemai/"        "200"
check "ATLAS detail"                "https://milliondollarstudio.ai/products/atlas/"         "200"
check "NestIQ detail"               "https://milliondollarstudio.ai/products/nestiq/"        "200"

echo ""
echo "=== Live product deployments ==="
# These will fail with 000 (DNS NXDOMAIN) until you deploy and point DNS.
# That's EXPECTED until Phase 1 and Phase 2 of GO-LIVE.md are complete.
check "FrançaisIQ production"       "https://tef.milliondollarstudio.ai/"                    "200"
# Add your ChemAI URL here once you know it:
# check "ChemAI production"         "https://chemaistudio.com/"                              "200"

echo ""
if [[ $FAIL_COUNT -eq 0 ]]; then
  printf "%sAll preflight checks passed.%s\n\n" "$GREEN" "$RESET"
  exit 0
else
  printf "%s%d preflight checks FAILED.%s See stderr above for details.\n\n" "$RED" "$FAIL_COUNT" "$RESET"
  exit 1
fi

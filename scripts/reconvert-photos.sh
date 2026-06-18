#!/bin/bash
# Re-convert HEIC photos from media/ to public/hotel/ with correct EXIF orientation.
# Uses ImageMagick -auto-orient. Does NOT touch videos or posters.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA="$ROOT/media"
OUT="$ROOT/public/hotel"

convert_folder() {
  local src_dir="$1"
  local dest_category="$2"
  local dest_slug="$3"
  local dest_dir="$OUT/$dest_category/$dest_slug"

  mkdir -p "$dest_dir"

  local counter=1
  find "$src_dir" -type f ! -name '.DS_Store' | sort | while read -r src; do
    local num=$(printf "%02d" "$counter")
    local dest_full="$dest_dir/${dest_slug}-${num}.webp"
    local dest_thumb="$dest_dir/${dest_slug}-${num}-thumb.webp"

    magick "$src" -auto-orient -resize '1920x1920>' -quality 82 "$dest_full"
    magick "$src" -auto-orient -resize '480x480>' -quality 75 "$dest_thumb"

    echo "  ✓ ${dest_slug}-${num}.webp ($(magick identify -format '%wx%h' "$dest_full"))"
    counter=$((counter + 1))
  done
}

echo "=== Reconverting photos with correct orientation ==="
echo ""

echo "— Amenities —"
convert_folder "$MEDIA/AMENITIES/HOME/FOTOS"      "amenities" "home"
convert_folder "$MEDIA/AMENITIES/SALON/FOTOS"      "amenities" "salon"
convert_folder "$MEDIA/AMENITIES/FACHADA/FOTOS"    "amenities" "fachada"
convert_folder "$MEDIA/AMENITIES/DESAYUNO/FOTOS"   "amenities" "desayuno"

echo ""
echo "— Habitaciones —"
convert_folder "$MEDIA/HABITACIONES/DOBLE SINGLE /FOTO"          "habitaciones" "doble-single"
convert_folder "$MEDIA/HABITACIONES/DOBLE STANDARD/FOTO"         "habitaciones" "doble-standard"
convert_folder "$MEDIA/HABITACIONES/DOBLE SUIT - SILLAS/FOTO"    "habitaciones" "doble-suite-sillas"
convert_folder "$MEDIA/HABITACIONES/DOBLE SUIT - SILLONES/FOTOS" "habitaciones" "doble-suite-sillones"
convert_folder "$MEDIA/HABITACIONES/SINGLE STANDARD/FOTOS"       "habitaciones" "single-standard"
convert_folder "$MEDIA/HABITACIONES/TRIPLE - M+S/FOTOS"          "habitaciones" "triple-ms"
convert_folder "$MEDIA/HABITACIONES/TRIPLE - x3 SIMPLE /FOTOS"   "habitaciones" "triple-simple"

echo ""
echo "=== Done! ==="
echo "Total photos: $(find "$OUT" -name '*.webp' ! -name '*-thumb*' ! -name '*-poster*' | wc -l | tr -d ' ')"

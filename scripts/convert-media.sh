#!/bin/bash
# Convert HEIC images to JPG and MOV videos to MP4 for web use
set -e

MEDIA_DIR="$(cd "$(dirname "$0")/.." && pwd)/media"
CONVERTED_DIR="$(cd "$(dirname "$0")/.." && pwd)/media-converted"

rm -rf "$CONVERTED_DIR"

echo "Converting HEIC → JPG..."
find "$MEDIA_DIR" -type f ! -name '.DS_Store' ! -name '*.mov' | while read -r src; do
  rel="${src#$MEDIA_DIR/}"
  dir="$(dirname "$rel")"
  base="$(basename "$rel")"
  
  dest_dir="$CONVERTED_DIR/$dir"
  mkdir -p "$dest_dir"
  
  dest="$dest_dir/${base}.jpg"
  sips -s format jpeg -s formatOptions 85 "$src" --out "$dest" > /dev/null 2>&1
  echo "  ✓ $rel → ${rel}.jpg"
done

echo ""
echo "Converting MOV → MP4..."
find "$MEDIA_DIR" -type f -name '*.mov' | while read -r src; do
  rel="${src#$MEDIA_DIR/}"
  dir="$(dirname "$rel")"
  base="${rel%.mov}"
  
  dest_dir="$CONVERTED_DIR/$dir"
  mkdir -p "$dest_dir"
  
  dest="$dest_dir/${base##*/}.mp4"
  ffmpeg -i "$src" -vcodec h264 -acodec aac -movflags +faststart -vf "scale=-2:1080" -crf 23 -preset medium -y "$dest" 2>/dev/null
  echo "  ✓ $rel → ${base##*/}.mp4"
done

echo ""
echo "Done! Converted files are in: $CONVERTED_DIR"
echo "File count: $(find "$CONVERTED_DIR" -type f | wc -l)"
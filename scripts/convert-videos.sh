#!/bin/bash
# Convert remaining MOV videos to MP4 - continues on errors
CONVERTED_DIR="$(cd "$(dirname "$0")/.." && pwd)/media-converted"

echo "Converting MOV → MP4 (with error recovery)..."
find /Users/147pop/Documents/GitHub/hotelwilson/media -type f -name '*.mov' | sort | while read -r src; do
  rel="${src#/Users/147pop/Documents/GitHub/hotelwilson/media/}"
  dir="$(dirname "$rel")"
  base="$(basename "$rel" .mov)"
  
  dest_dir="$CONVERTED_DIR/$dir"
  mkdir -p "$dest_dir"
  
  dest="$dest_dir/${base}.mp4"
  
  if [ -f "$dest" ]; then
    echo "  ⊘ SKIP (already exists): $rel"
    continue
  fi
  
  echo -n "  ⏳ Converting: $rel ... "
  if ffmpeg -i "$src" -vcodec h264 -acodec aac -movflags +faststart -vf "scale=-2:1080" -crf 23 -preset medium -y "$dest" 2>/dev/null; then
    size=$(du -h "$dest" | cut -f1)
    echo "✓ ($size)"
  else
    echo "✗ FAILED"
    rm -f "$dest"
  fi
done

echo ""
echo "Total MP4 files: $(find "$CONVERTED_DIR" -name '*.mp4' -type f | wc -l)"
echo "Total JPG files: $(find "$CONVERTED_DIR" -name '*.jpg' -type f | wc -l)"
#!/bin/bash
# Robust MOV → MP4 conversion with proper path handling
set +e

MEDIA_DIR="/Users/147pop/Documents/GitHub/hotelwilson/media"
CONVERTED_DIR="/Users/147pop/Documents/GitHub/hotelwilson/media-converted"

find "$MEDIA_DIR" -type f -name '*.mov' -print0 | sort -z | while IFS= read -r -d '' src; do
  rel="${src#$MEDIA_DIR/}"
  dir="$(dirname "$rel")"
  base="$(basename "$rel" .mov)"
  
  dest_dir="$CONVERTED_DIR/$dir"
  mkdir -p "$dest_dir"
  
  dest="$dest_dir/${base}.mp4"
  
  if [ -f "$dest" ] && [ "$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null)" -gt 1000 ]; then
    echo "  SKIP: $rel"
    continue
  fi
  
  echo -n "  Converting: $rel ... "
  ffmpeg -i "$src" -vcodec h264 -acodec aac -movflags +faststart -vf "scale=-2:1080" -crf 23 -preset medium -y "$dest" 2>/dev/null
  
  if [ $? -eq 0 ] && [ -f "$dest" ] && [ "$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null)" -gt 1000 ]; then
    size=$(du -h "$dest" | cut -f1)
    echo "OK ($size)"
  else
    echo "FAILED"
    rm -f "$dest"
  fi
done

echo ""
echo "Total MP4 files: $(find "$CONVERTED_DIR" -name '*.mp4' -type f | wc -l)"
echo "Total JPG files: $(find "$CONVERTED_DIR" -name '*.jpg' -type f | wc -l)"
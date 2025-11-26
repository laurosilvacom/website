#!/bin/bash

# Image Optimization Script for Next.js
# Converts and compresses images to WebP format for faster loading

set -e

echo "🖼️  Image Optimization Script"
echo "================================"

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp is not installed."
    echo "Install it with: brew install webp (macOS) or apt-get install webp (Linux)"
    exit 1
fi

# Directories
INPUT_DIR="public/photos"
OUTPUT_DIR="public/photos/optimized"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Counter
count=0
total_original=0
total_optimized=0

echo ""
echo "📁 Processing images in $INPUT_DIR..."
echo ""

# Process each JPG file
for img in "$INPUT_DIR"/*.jpg; do
    if [ ! -f "$img" ]; then
        continue
    fi

    filename=$(basename "$img" .jpg)
    output_webp="$OUTPUT_DIR/${filename}.webp"
    output_jpg="$OUTPUT_DIR/${filename}.jpg"

    # Get original size
    original_size=$(du -h "$img" | cut -f1)

    # Convert to WebP with high quality
    cwebp -q 85 -m 6 "$img" -o "$output_webp" > /dev/null 2>&1

    # Optimize JPG as well (using ImageMagick if available)
    if command -v convert &> /dev/null; then
        convert "$img" -strip -interlace Plane -gaussian-blur 0.05 -quality 85 "$output_jpg" > /dev/null 2>&1
    else
        cp "$img" "$output_jpg"
    fi

    # Get optimized sizes
    webp_size=$(du -h "$output_webp" | cut -f1)
    jpg_size=$(du -h "$output_jpg" | cut -f1)

    echo "✅ $filename"
    echo "   Original: $original_size → WebP: $webp_size | JPG: $jpg_size"

    count=$((count + 1))
done

echo ""
echo "================================"
echo "✨ Optimization complete!"
echo "   Processed: $count images"
echo "   Output: $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "1. Review optimized images in $OUTPUT_DIR"
echo "2. Replace originals if satisfied with quality"
echo "3. Update image paths in components to use .webp format"
echo ""
echo "💡 Tip: Next.js Image component automatically serves WebP when available!"

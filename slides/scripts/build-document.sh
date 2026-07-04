#!/bin/bash

###############################################################################
# Markdown to Continuous Document Build Script (using Pandoc)
#
# Usage: Run this script from within a content folder (e.g., slides/20251128)
#        Example: cd slides/20251128 && ../scripts/build-document.sh
#
# What it does:
#   1. Merges all numbered .md files (01_*.md, 02_*.md, etc.) into document.md.
#      - It specifically ignores 00_meta.md and slide separators (---).
#   2. Generates a continuous PDF document using Pandoc.
#
# Requirements:
#   - Pandoc installed: https://pandoc.org/installing.html
###############################################################################

set -e # Exit on error

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

###############################################################################
# Pre-flight Checks
###############################################################################

print_info "Starting document build process..."

# Check if Pandoc is installed
if ! command -v pandoc &> /dev/null; then
    print_error "Pandoc is not installed!"
    echo "Please install it from: https://pandoc.org/installing.html"
    exit 1
fi

# Check for content files
if [[ -z $(find . -maxdepth 1 -name "[0-9][0-9]*_*.md" | grep -v "00_meta.md") ]]; then
    print_error "No numbered content .md files found (e.g., 01_cover.md)!"
    exit 1
fi

###############################################################################
# Merge Markdown Files for Document Format
###############################################################################

print_info "Merging markdown files into a single document..."

# Output file for merged content
DOC_MD="document.md"

# Remove old merged file if it exists
if [[ -f "$DOC_MD" ]]; then
    rm "$DOC_MD"
fi

# Find all numbered .md files, EXCLUDING 00_meta.md, and sort them
MD_FILES=$(find . -maxdepth 1 -name "[0-9][0-9]*_*.md" | grep -v "00_meta.md" | sort)

if [[ -z "$MD_FILES" ]]; then
    print_error "No content files to merge (format: NN_name.md, excluding 00_meta.md)"
    exit 1
fi

print_info "Found content files to merge:"
echo "$MD_FILES" | while read -r file; do
    echo "  - $(basename "$file")"
done

# Merge files into a single document.md
# We add two newlines between files to ensure proper paragraph spacing.
for file in $MD_FILES; do
    cat "$file" >> "$DOC_MD"
    echo -e "\n\n" >> "$DOC_MD"
done

print_success "Merged content into $DOC_MD"

###############################################################################
# Generate PDF with Pandoc
###############################################################################

print_info "Generating continuous PDF document with Pandoc..."
OUTPUT_PDF="document.pdf"

# Run Pandoc
# -f markdown: input format
# -s: standalone document (with header/footer)
# --toc: create a table of contents
# -o: output file
if pandoc "$DOC_MD" \
    -f markdown \
    -s \
    --pdf-engine=xelatex \
    -V mainfont="LiHei Pro" \
    -o "$OUTPUT_PDF"; then
    print_success "PDF document generated: $OUTPUT_PDF"
else
    print_error "Pandoc PDF generation failed!"
    exit 1
fi

###############################################################################
# Summary
###############################################################################

echo ""
print_success "Build complete!"
echo ""
echo "Output files:"
echo "  - $DOC_MD (intermediate merged file)"
echo "  - $OUTPUT_PDF (final document)"
echo ""

exit 0

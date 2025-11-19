#!/bin/bash

###############################################################################
# Marp Slides Merge and Build Script
#
# Usage: Run this script from within a date-based slides folder
#        Example: cd slides/2025-11-19 && ../scripts/merge-and-build.sh
#
# What it does:
#   1. Merges all numbered .md files (00_*.md, 01_*.md, etc.) into merged.md
#   2. Generates output.pdf using Marp CLI
#   3. Optionally generates output.pptx if requested
#
# Requirements:
#   - Marp CLI installed: npm install -g @marp-team/marp-cli
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

###############################################################################
# Pre-flight Checks
###############################################################################

print_info "Starting Marp slides build process..."

# Check if Marp is installed
if ! command -v marp &> /dev/null; then
    print_error "Marp CLI is not installed!"
    echo ""
    echo "Please install it with:"
    echo "  npm install -g @marp-team/marp-cli"
    echo ""
    exit 1
fi

# Check if we're in a slides subfolder
if [[ ! -f "00_meta.md" && ! -f *_*.md ]]; then
    print_error "No numbered .md files found in current directory!"
    echo ""
    echo "Usage: Run this script from within a date-based slides folder"
    echo "  Example: cd slides/2025-11-19 && ../scripts/merge-and-build.sh"
    echo ""
    echo "Expected files: 00_meta.md, 01_intro.md, etc."
    exit 1
fi

###############################################################################
# Merge Markdown Files
###############################################################################

print_info "Merging markdown files..."

# Remove old merged file if exists
if [[ -f "merged.md" ]]; then
    print_warning "Removing old merged.md"
    rm merged.md
fi

# Find all numbered .md files and sort them
# Pattern matches: 00_*.md, 01_*.md, 03a_*.md, etc.
MD_FILES=$(find . -maxdepth 1 -name "[0-9][0-9]*_*.md" | sort)

if [[ -z "$MD_FILES" ]]; then
    print_error "No numbered markdown files found (format: NN_name.md)"
    exit 1
fi

print_info "Found files:"
echo "$MD_FILES" | while read -r file; do
    echo "  - $(basename "$file")"
done

# Merge files
echo "---" > merged.md  # Start with separator

for file in $MD_FILES; do
    print_info "Merging: $(basename "$file")"

    # For 00_meta.md, extract frontmatter only
    if [[ $(basename "$file") == "00_meta.md" ]]; then
        # Extract content between first --- and second ---
        awk '/^---$/{f=!f;next}f' "$file" > /tmp/frontmatter.tmp
        if [[ -s /tmp/frontmatter.tmp ]]; then
            cat /tmp/frontmatter.tmp >> merged.md
            echo "---" >> merged.md
        fi
        rm -f /tmp/frontmatter.tmp
    else
        # For other files, append content directly
        cat "$file" >> merged.md
        echo "" >> merged.md  # Add blank line between files
        echo "---" >> merged.md  # Add slide separator
    fi
done

print_success "Merged $(echo "$MD_FILES" | wc -l | tr -d ' ') files into merged.md"

###############################################################################
# Generate PDF with Marp
###############################################################################

print_info "Generating PDF with Marp..."

# Run Marp
if marp merged.md --pdf --allow-local-files -o output.pdf; then
    print_success "PDF generated: output.pdf"
else
    print_error "Marp PDF generation failed!"
    exit 1
fi

###############################################################################
# Optional: Generate PPTX
###############################################################################

if [[ "$1" == "--pptx" || "$1" == "-p" ]]; then
    print_info "Generating PPTX with Marp..."

    if marp merged.md --pptx --allow-local-files -o output.pptx; then
        print_success "PPTX generated: output.pptx"
    else
        print_warning "PPTX generation failed (this is optional)"
    fi
fi

###############################################################################
# Summary
###############################################################################

echo ""
print_success "Build complete!"
echo ""
echo "Output files:"
echo "  - merged.md   (auto-generated, DO NOT edit)"
echo "  - output.pdf  (final presentation)"

if [[ -f "output.pptx" ]]; then
    echo "  - output.pptx (PowerPoint format)"
fi

echo ""
print_info "Next steps:"
echo "  1. Review: Open output.pdf"
echo "  2. Edit: Modify individual NN_*.md files"
echo "  3. Rebuild: Run this script again"
echo ""

# Show file sizes
print_info "File sizes:"
du -h merged.md output.pdf 2>/dev/null || true

exit 0

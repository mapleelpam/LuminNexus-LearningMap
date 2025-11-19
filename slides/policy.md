# Slides Management Policy

**Version**: 1.0
**Last Updated**: 2025-11-19

## Purpose

This document describes the organization and workflow for managing presentation slides using Marp (Markdown Presentation Ecosystem) in the LuminNexus Learning Map project.

## Directory Structure

```
slides/
├── policy.md                    # This file - usage guidelines
├── scripts/
│   └── merge-and-build.sh       # Script to merge and build slides
├── YYYY-MM-DD/                  # Date-based folders for each presentation
│   ├── 00_meta.md               # Marp configuration (theme, style, etc.)
│   ├── 01_intro.md              # Introduction slides
│   ├── 02_topic-a.md            # Main topic A
│   ├── 03_topic-b.md            # Main topic B
│   ├── 99_conclusion.md         # Conclusion slides
│   ├── merged.md                # Auto-generated (DO NOT edit manually)
│   └── output.pdf               # Final PDF output (DO NOT commit)
└── .gitignore                   # Ignore temporary files
```

## File Naming Convention

### Date Folders
- **Format**: `YYYY-MM-DD` (ISO 8601)
- **Example**: `2025-11-19`, `2025-12-01`
- **Reason**: Sortable, internationally recognized

### Markdown Files
- **Format**: `NN_descriptive-name.md`
- **Numbering**:
  - `00` - Configuration and metadata
  - `01-98` - Content sections (in presentation order)
  - `99` - Conclusion/closing
- **Example**: `01_intro.md`, `02_product-overview.md`, `99_conclusion.md`

## Workflow

### 1. Create New Presentation

```bash
# Create date folder
mkdir slides/2025-11-19

# Create configuration file
cat > slides/2025-11-19/00_meta.md << 'EOF'
---
marp: true
theme: default
paginate: true
backgroundColor: #fff
---
EOF
```

### 2. Write Content in Separate Files

Each `.md` file represents a logical section of your presentation:

**Example: 01_intro.md**
```markdown
# Welcome to Knowledge Sharing

---

## Today's Agenda

1. Topic A
2. Topic B
3. Q&A
```

**Example: 02_main-topic.md**
```markdown
## Main Topic

Content here...

---

## Key Points

- Point 1
- Point 2
```

### 3. Build Presentation

```bash
# Navigate to date folder
cd slides/2025-11-19

# Run build script (relative path)
../scripts/merge-and-build.sh
```

This will:
1. Merge all `.md` files into `merged.md`
2. Generate `output.pdf` using Marp

### 4. Review and Share

- Preview: Open `merged.md` in VS Code with Marp extension
- Share: Use `output.pdf` for distribution

## Marp Configuration

### Global Settings (00_meta.md)

```yaml
---
marp: true
theme: default          # or gaia, uncover, custom
paginate: true          # Show page numbers
backgroundColor: #fff   # Background color
color: #333            # Text color
---
```

### Per-Slide Settings

```markdown
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _backgroundColor: #123 -->

# Special Slide
```

## Slide Separator

Use `---` (three dashes) to separate slides:

```markdown
# Slide 1

Content here

---

# Slide 2

More content
```

## Best Practices

### Content Organization

1. **One Topic Per File**: Keep each `.md` focused on a single topic
2. **Logical Ordering**: Use numbering to maintain presentation flow
3. **Reusable Sections**: Common intro/conclusion can be copied between presentations

### Version Control

**DO commit**:
- `*.md` files (except `merged.md`)
- Configuration files
- Custom themes

**DO NOT commit**:
- `merged.md` (auto-generated)
- `output.pdf` (binary, large)
- `*.pptx` (if generated)

### Collaboration

- **Modular Editing**: Multiple people can edit different sections simultaneously
- **Clear Naming**: Descriptive filenames help identify content
- **Comments**: Use HTML comments for speaker notes
  ```markdown
  <!-- Speaker note: Remember to demo this -->
  ```

## Advanced Features

### Mermaid Diagrams

```markdown
```mermaid
graph LR
    A[Start] --> B[Process]
    B --> C[End]
```
```

### Code Highlighting

```markdown
```python
def hello():
    print("Hello, World!")
```
```

### Two-Column Layout

```markdown
<div style="display: flex;">
<div style="flex: 1;">

Left column

</div>
<div style="flex: 1;">

Right column

</div>
</div>
```

## Troubleshooting

### Marp Not Installed

```bash
npm install -g @marp-team/marp-cli
```

### Script Permission Denied

```bash
chmod +x slides/scripts/merge-and-build.sh
```

### PDF Generation Failed

- Check Marp syntax errors in individual `.md` files
- Ensure frontmatter is in `00_meta.md` only
- Verify all files are UTF-8 encoded

## References

- [Marp Official Documentation](https://marp.app/)
- [Marp CLI Documentation](https://github.com/marp-team/marp-cli)
- [Marpit Markdown](https://marpit.marp.app/markdown)

## Changelog

| Version | Date       | Changes                              |
|---------|------------|--------------------------------------|
| 1.0     | 2025-11-19 | Initial policy document              |

---

**Maintained by**: LuminNexus Team

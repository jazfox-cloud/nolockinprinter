# NoLockInPrinter image license audit

- Audit date: 2026-07-22
- Scope: all first-party image files and image references in the local repository
- Evidence rule: a file being present in `public/` or Git history is not proof of ownership or a commercial license

## Removed asset family

| File | Use before remediation | Earliest repository evidence | Author | License / commercial terms | Attribution | Evidence state | Action |
|---|---|---|---|---|---|---|---|
| `public/images/hero-printer.png` | Homepage hero source image | Added in `afb50ac729a0e8bb771b0170c637413d6a1c67da` on 2026-07-08; Git blob `b758bfb2461c04c9a42acc8c85a982ae134633d7` | Unknown | Unknown | Unknown | `HUMAN_REVIEW_REQUIRED`; no source declaration, author record, license file, prompt, or commercial-use evidence found in the repository | Deleted |
| `public/images/hero-printer-960.avif` | Responsive hero derivative | Added in `17ebd152032c604581f27c77021a4912ed1033fc` on 2026-07-20; Git blob `b7688ca3a5ec0f5aec42fd3853d268ed5edd7c98` | Derivative author unknown; underlying source unresolved | Follows unresolved source rights | Unknown | Inherits unresolved status from `hero-printer.png` | Deleted |
| `public/images/hero-printer-1754.avif` | Responsive hero derivative | Added in `17ebd152032c604581f27c77021a4912ed1033fc`; Git blob `45904848e32c7b294db74d5fc1520b6a86677da6` | Derivative author unknown; underlying source unresolved | Follows unresolved source rights | Unknown | Inherits unresolved status from `hero-printer.png` | Deleted |
| `public/images/hero-printer-960.webp` | Responsive hero derivative | Added in `17ebd152032c604581f27c77021a4912ed1033fc`; Git blob `3aba5c67f5288557d8da2b3944cfcde456246750` | Derivative author unknown; underlying source unresolved | Follows unresolved source rights | Unknown | Inherits unresolved status from `hero-printer.png` | Deleted |
| `public/images/hero-printer-1754.webp` | Responsive hero derivative | Added in `17ebd152032c604581f27c77021a4912ed1033fc`; Git blob `515046dde46dad1585edd345f5384aff4aa28783` | Derivative author unknown; underlying source unresolved | Follows unresolved source rights | Unknown | Inherits unresolved status from `hero-printer.png` | Deleted |
| `public/images/og-printer.jpg` | Hero fallback and site-wide Open Graph/Twitter image | Added in `17ebd152032c604581f27c77021a4912ed1033fc`; Git blob `b5edd5918205ed50747ce88c8a247ee9af7963b9` | Derivative author unknown; underlying source unresolved | Follows unresolved source rights | Unknown | Inherits unresolved status from `hero-printer.png` | Deleted |

The repository history shows when these files were added and transformed, but it does not identify their original external source, creator, permission grant, or commercial license. The audit therefore does not assign ownership or licensed status.

## Replacement asset

| File | Use | Creation basis | Third-party material | Brand / trademark content | License evidence | Attribution | Evidence state |
|---|---|---|---|---|---|---|---|
| `public/images/printer-workflow.svg` | Homepage hero and site-wide Open Graph/Twitter image | Created as repository-native SVG code during the 2026-07-22 remediation | None; only basic SVG geometry, gradients, and project colors | No logos, model names, distinctive brand marks, or copied product silhouette | Repository diff and source code; SHA-256 `2b0d0d13a673f7f35b76352cfae3766a6988eb91f718480e4b59d8500f1ef3fa` | Not required for a project-authored asset | `PROJECT_AUTHORED_CODE_ASSET` |

The replacement is an abstract printer-workflow diagram, not a depiction of a specific manufacturer's product. Its accessible title, description, and homepage `alt` text describe the subject without implying a photographed product or third-party endorsement.

## Reference closure

- Homepage hero: changed to `/images/printer-workflow.svg`.
- Open Graph image: changed to `/images/printer-workflow.svg`.
- Twitter card image: changed to `/images/printer-workflow.svg`.
- JSON-LD image references: none found.
- Image preload references: none found.
- Remaining references to the removed filenames: must be zero in the final repository search and production build.

## Limitation

This is an internal provenance record based on repository evidence, not a legal opinion or trademark clearance. The removed files remain recoverable from Git history but are no longer part of the working tree or build input.

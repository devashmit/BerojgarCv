# Requirements Document

## Introduction

This document covers the full visual and layout rebuild of the BerojgarCV web application — a Next.js CV/resume generator with Clerk auth, Prisma, and PDF download. The rebuild targets three layers: (1) template thumbnail rendering, (2) builder UI layout, and (3) resume template output quality. All seven templates (T1–T7) must be redesigned to match their documented specifications. No changes to routing, form state management, data schema, or PDF download logic are permitted.

## Glossary

- **Builder**: The `/builder` page containing the two-panel form + live preview interface.
- **FormPanel**: The left panel of the Builder containing section tabs and input forms.
- **PreviewPanel**: The right panel of the Builder containing the scaled live resume preview.
- **Thumbnail**: The miniature visual representation of a template shown in the template picker cards.
- **Template**: A React component (`T1`–`T7`) that renders a full A4 resume from `CVData`.
- **PDF_Renderer**: The `@react-pdf/renderer`-based components in `cv-pdf/` that produce downloadable PDFs.
- **ATS_Score**: The numeric score (0–100) indicating how well a template parses in Applicant Tracking Systems.
- **T1**: Dhaka Heritage template — Nepal & Gulf market, ATS 72.
- **T2**: Himalaya Modern template — Nepal & Creative market, ATS 65.
- **T3**: Jake's Resume template — International ATS, ATS 98.
- **T4**: Zürich Executive template — International ATS, ATS 92.
- **T5**: Nova Sidebar template — Creative & Startups, ATS 58.
- **T6**: Paris Élégante template — Creative & Design, ATS 55.
- **T7**: Rirekisho (JIS) template — Japan market, ATS 100.
- **A4_Page**: A page 210mm × 297mm rendered at 96dpi (794px × 1123px).
- **SectionTabs**: The tab navigation component inside FormPanel for switching between form sections.
- **TemplateSwitcherModal**: The modal overlay for selecting a template from within the Builder.
- **TemplatesContent**: The public `/templates` page listing all templates with thumbnails and ATS scores.

---

## Requirements

### Requirement 1: Template Thumbnail Readability

**User Story:** As a user browsing templates, I want each template card to show a crisp, readable miniature of the actual resume layout, so that I can make an informed choice before selecting a template.

#### Acceptance Criteria

1. THE Thumbnail SHALL render as a correctly proportioned, scaled-down representation of the corresponding Template's actual layout structure, not as abstract colored blocks.
2. THE Thumbnail SHALL be implemented as a CSS `transform: scale()` miniature of the real Template component rendered with representative placeholder data, OR as a hand-crafted SVG/HTML faithful reproduction of the template's visual structure.
3. THE Thumbnail SHALL display at a fixed height of 168px within its card container without overflow or clipping of critical layout elements.
4. WHEN a Thumbnail is rendered in the TemplatesContent page, THE Thumbnail SHALL be legible at the scale used (approximately 0.22× of A4_Page width).
5. WHEN a Thumbnail is rendered in the TemplateSwitcherModal, THE Thumbnail SHALL be legible at the scale used within the modal grid.
6. THE Thumbnail for T3 (Jake's Resume) SHALL show a single-column black-and-white layout with visible section heading lines and bullet rows.
7. THE Thumbnail for T4 (Zürich Executive) SHALL show a single-column layout with a visible bold name block and horizontal rule separators.
8. THE Thumbnail for T1 (Dhaka Heritage) SHALL show a single-column layout with a dark header band and body section rows — no large colored sidebar.
9. THE Thumbnail for T2 (Himalaya Modern) SHALL show a two-column layout with a narrow left sidebar and wider main content area.
10. THE Thumbnail for T5 (Nova Sidebar) SHALL show a two-column layout with a narrow dark sidebar and main content column — no geometric avatar shape.
11. THE Thumbnail for T6 (Paris Élégante) SHALL show a single-column layout on an off-white background with centered name and decorative separator lines.
12. THE Thumbnail for T7 (Rirekisho) SHALL show a grid/table-based layout with visible bordered cells.
13. THE ATS_Score badge on each template card in TemplatesContent SHALL display the correct score: T1=72, T2=65, T3=98, T4=92, T5=58, T6=55, T7=100.
14. THE ATS_Score badge on each template card in TemplateSwitcherModal SHALL display the correct score per the values in Requirement 1 criterion 13.

---

### Requirement 2: Builder Two-Panel Layout

**User Story:** As a user building my CV, I want a clean two-panel layout with a scrollable form on the left and a full-height live preview on the right, so that I can edit and see changes without any overflow or clipping.

#### Acceptance Criteria

1. THE Builder SHALL render a two-panel layout where FormPanel occupies approximately 40% of the viewport width and PreviewPanel occupies approximately 60% of the viewport width on desktop (≥768px).
2. THE FormPanel SHALL be independently scrollable vertically without affecting the PreviewPanel scroll position.
3. THE PreviewPanel SHALL display the live resume preview scaled to fit the available panel height without vertical overflow on initial load.
4. WHEN the viewport height changes, THE PreviewPanel SHALL recalculate the CSS `transform: scale()` value so the A4_Page preview fits within the panel without clipping.
5. THE PreviewPanel SHALL apply `transform-origin: top center` so the scaled A4_Page aligns to the top of the panel.
6. THE SectionTabs SHALL be fully accessible — all tabs SHALL be reachable by scrolling or wrapping within the FormPanel without horizontal overflow.
7. WHEN the viewport width is less than 768px, THE Builder SHALL render a single-panel view with a toggle between FormPanel and PreviewPanel.
8. THE Builder toolbar SHALL remain fixed at the top of the viewport and SHALL NOT scroll with the FormPanel content.
9. IF the FormPanel content overflows its container, THEN THE FormPanel SHALL scroll internally and SHALL NOT push or overlap the PreviewPanel.
10. THE PreviewPanel background SHALL use a dark neutral color (e.g., `#161616`) to visually frame the white A4_Page preview.

---

### Requirement 3: Jake's Resume (T3) Template Output

**User Story:** As a job seeker targeting international ATS systems, I want Jake's Resume to produce a strictly ATS-compliant, print-ready single-column resume, so that my application parses correctly in every major tracking system.

#### Acceptance Criteria

1. THE T3 Template SHALL render a strict single-column layout with no sidebars, no tables, and no CSS columns.
2. THE T3 Template SHALL render the applicant name centered at the top in bold at approximately 18–20pt.
3. THE T3 Template SHALL render contact details (phone, email, LinkedIn, GitHub) on a single line below the name, separated by pipe characters (`|`), with no icon elements.
4. THE T3 Template SHALL render section headings in bold uppercase or small-caps, left-aligned, followed immediately by a full-width 1px solid black horizontal rule.
5. THE T3 Template SHALL render experience bullet points using a filled triangle character (`▸`) or a plain dash (`–`) — no graphical bullet icons or custom SVG elements.
6. THE T3 Template SHALL use a serif or neutral sans-serif font at 10.5–11pt for body text.
7. THE T3 Template SHALL render all text in black (`#000000`) on a white (`#ffffff`) background with no color accents.
8. THE T3 Template SHALL render sections in the order: Education → Experience → Projects → Technical Skills.
9. THE T3 Template SHALL render dates right-aligned on the same line as the company name and role title.
10. THE T3 Template SHALL contain no `<img>` elements, no SVG graphics, and no CSS background images anywhere in its output.
11. THE T3 Template SHALL apply page margins of 0.5–0.75 inch (approximately 36–54px at 96dpi) on all sides.

---

### Requirement 4: Zürich Executive (T4) Template Output

**User Story:** As a professional targeting international corporate roles, I want the Zürich Executive template to produce a clean, conservative, highly legible single-column resume, so that it reads well both on screen and in print.

#### Acceptance Criteria

1. THE T4 Template SHALL render a single-column layout with no sidebars and no CSS columns.
2. THE T4 Template SHALL render the applicant name in bold at approximately 16pt at the top, followed by the job title in a lighter font weight on the next line.
3. THE T4 Template SHALL render contact details on a single line in plain text with no icon elements.
4. THE T4 Template SHALL render thin horizontal separator lines (0.5pt) between sections.
5. THE T4 Template SHALL render section headings at approximately 12pt bold with generous spacing (at least 12px) above each heading.
6. THE T4 Template SHALL use a sans-serif font (Helvetica, Arial, or Inter) at 11pt for body text.
7. THE T4 Template SHALL render secondary information (dates, locations) in dark gray (`#333333`) and primary content (names, titles) in black (`#000000`).
8. THE T4 Template SHALL include sections for: personal summary, experience, education, skills, languages, and a "References available on request" note.
9. THE T4 Template SHALL contain no colored sidebars, no background fills, and no graphical elements.
10. THE T4 Template SHALL apply page margins of 0.5–0.75 inch on all sides.

---

### Requirement 5: Dhaka Heritage (T1) Template Output

**User Story:** As a job seeker targeting Nepal and Gulf markets, I want the Dhaka Heritage template to produce a professional single-column resume with Gulf-specific fields, so that it meets regional employer expectations.

#### Acceptance Criteria

1. THE T1 Template SHALL render a single-column layout with no sidebars and no CSS columns.
2. THE T1 Template SHALL render the applicant name in bold at approximately 16pt, followed by the job title below it.
3. THE T1 Template SHALL render a single thin accent line in deep navy (`#1A2744`) or dark charcoal under the header — no large colored background blocks in the header.
4. THE T1 Template SHALL render all body text in black or dark gray (`#1a1a1a` to `#333333`) — no colored body text.
5. THE T1 Template SHALL render section headings in bold, left-aligned, with a thin left border accent of maximum 2px solid dark navy.
6. THE T1 Template SHALL display the following Gulf/Nepal-specific fields when present in `CVData.personal`: Nationality, Date of Birth, Visa Status / Passport Number label, Expected Salary (NPR/AED), and a photo placeholder in the top-right of the header area.
7. THE T1 Template SHALL use Times New Roman or Georgia at 11pt for body text.
8. THE T1 Template SHALL contain no color fill blocks, no icon bars, and no graphical skill rating elements.
9. THE T1 Template SHALL apply page margins of 0.5–0.75 inch on all sides.

---

### Requirement 6: Himalaya Modern (T2) Template Output

**User Story:** As a creative professional in Nepal, I want the Himalaya Modern template to produce a clean two-column resume with a minimal sidebar, so that it looks modern while remaining readable.

#### Acceptance Criteria

1. THE T2 Template SHALL render a two-column layout where the left sidebar contains only: photo placeholder, contact information, and skills as plain text — no progress bars, no dot ratings, no graphical skill indicators.
2. THE T2 Template SHALL render skills in the sidebar as plain comma-separated text or simple tag-style text elements.
3. THE T2 Template SHALL render contact information in the sidebar using plain Unicode symbols (✉ ☎) or plain text labels — no custom icon font elements that may not parse in ATS.
4. THE T2 Template SHALL apply a single accent color — `#2B6CB0` (soft blue) — used only for section heading text.
5. THE T2 Template SHALL use Inter or Lato at 10.5pt for body text.
6. THE T2 Template SHALL render sections in the order: Summary, Experience, Education, Skills, Languages.
7. THE T2 Template SHALL render all sidebar text as HTML text nodes, not as images or SVG text.
8. THE T2 Template SHALL apply page margins of 0.5–0.75 inch on all sides.

---

### Requirement 7: Nova Sidebar (T5) Template Output

**User Story:** As a creative professional targeting startups and agencies, I want the Nova Sidebar template to produce a clean two-column resume with a narrow sidebar, so that it looks distinctive while remaining parseable.

#### Acceptance Criteria

1. THE T5 Template SHALL render a two-column layout where the sidebar width does not exceed 28% of the total page width.
2. THE T5 Template SHALL render the sidebar containing only: name, title, contact information as plain text, and skills as plain text — no geometric avatar, no graphical elements.
3. THE T5 Template SHALL render the main column containing: experience, education, and projects in reverse chronological order as plain text.
4. THE T5 Template SHALL apply a single accent color — forest green `#2D6A4F` — used only for section heading text and a thin top border on the header.
5. THE T5 Template SHALL contain no filled sidebar background colors that span the full sidebar height — the sidebar background SHALL be white or a very light neutral.
6. THE T5 Template SHALL use Roboto or Source Sans Pro at 10pt for body text.
7. THE T5 Template SHALL display a visible ATS warning note in the template description (in TemplatesContent and TemplateSwitcherModal): "May face issues with older corporate ATS — recommended for startups and agencies."
8. THE T5 Template SHALL apply page margins of 0.5–0.75 inch on all sides.

---

### Requirement 8: Paris Élégante (T6) Template Output

**User Story:** As a design or hospitality professional, I want the Paris Élégante template to produce an elegant single-column resume with sophisticated typography, so that it stands out in creative industries.

#### Acceptance Criteria

1. THE T6 Template SHALL render a single-column layout on an off-white background (`#FAFAF8`).
2. THE T6 Template SHALL render the applicant name centered at the top in an elegant serif font (Playfair Display or Georgia) at approximately 20pt.
3. THE T6 Template SHALL render thin decorative separator lines between sections using CSS borders at 0.5pt in warm gold-tan (`#C9B99A`) — no image-based decorators.
4. THE T6 Template SHALL render section headings in small caps using a serif font, centered or left-aligned.
5. THE T6 Template SHALL render body text in a complementary sans-serif font (Lato or Raleway) at 10.5pt.
6. THE T6 Template SHALL apply a line height of 1.5 for body text.
7. THE T6 Template SHALL contain no photos, no icon elements, and no skill bar graphics — typographic elegance only.
8. THE T6 Template SHALL apply page margins of 0.75 inch on all sides.

---

### Requirement 9: Rirekisho JIS (T7) Template Output

**User Story:** As a job seeker applying to Japanese companies, I want the Rirekisho template to produce a JIS-standard grid-based resume, so that it meets Japanese employer expectations exactly.

#### Acceptance Criteria

1. THE T7 Template SHALL render a grid-based table layout where the entire form is composed of bordered cells with 0.5pt black borders.
2. THE T7 Template SHALL render on A4_Page paper size.
3. THE T7 Template SHALL render the top section containing: submission date (right-aligned), full name with furigana above, date of birth, age, gender field, and a headshot photo box (top-right, approximately 3cm × 4cm).
4. THE T7 Template SHALL render an address and contact section below the top section.
5. THE T7 Template SHALL render a combined Education & Work History section listing entries chronologically from oldest to newest, each on its own row.
6. THE T7 Template SHALL render education entries with institution entry and graduation on separate rows.
7. THE T7 Template SHALL render work history entries with company name and start/end dates — no bullet point descriptions.
8. THE T7 Template SHALL render a Licenses & Qualifications section.
9. THE T7 Template SHALL render a Self-PR / Reason for Applying (志望動機) free-text box.
10. THE T7 Template SHALL render commute time and dependents fields.
11. THE T7 Template SHALL use Gothic (Noto Sans JP or Yu Gothic) for UI labels and Mincho (Noto Serif JP) for content text.
12. THE T7 Template SHALL render all cell borders in black on a white background with no color fills.
13. THE T7 Template SHALL render section header cells with centered, bold text.
14. THE T7 Template SHALL render Japanese labels as primary text with English labels as secondary hints where applicable.

---

### Requirement 10: Global Resume Output Quality

**User Story:** As a user downloading or printing any resume, I want all templates to produce clean, print-ready output with consistent spacing and typography, so that the result looks professional.

#### Acceptance Criteria

1. THE Template SHALL apply consistent page margins of 0.5–0.75 inch (36–54px at 96dpi) on all sides for T1–T6, and standard JIS margins for T7.
2. THE Template SHALL render body text at 10–11pt to ensure readability when printed on A4_Page.
3. THE Template SHALL apply consistent line heights — minimum 1.4 for body text across all templates.
4. THE Template SHALL render section headings with clear visual hierarchy — section headings SHALL be visually distinct from body text through font weight, size, or decoration.
5. THE Template SHALL render section breaks with consistent vertical spacing — minimum 12px gap between sections.
6. WHEN a section contains no data, THE Template SHALL omit that section entirely rather than rendering an empty heading.
7. THE Template SHALL render the A4_Page at exactly `w-[210mm] min-h-[297mm]` in the live preview to maintain correct proportions.
8. THE Template SHALL not use any CSS properties that cause content to overflow the A4_Page width in the live preview.

---

### Requirement 11: Non-Regression Constraint

**User Story:** As a developer, I want the rebuild to only touch visual and styling layers, so that existing routing, state management, data schema, and PDF download functionality continue to work without modification.

#### Acceptance Criteria

1. THE Builder SHALL preserve all existing Zustand store actions and state shape defined in `cvStore.ts` without modification.
2. THE Builder SHALL preserve all existing API routes under `/api/cv/`, `/api/pdf/`, and `/api/upload/` without modification.
3. THE Builder SHALL preserve all existing routing — `/builder`, `/dashboard`, `/templates`, `/preview/[shareId]` — without modification.
4. THE PDF_Renderer components in `cv-pdf/` SHALL remain functionally compatible with the updated template visual designs.
5. THE Builder SHALL preserve the existing `CVData` TypeScript type definition in `types/cv.ts` without modification.
6. WHEN the PDF download is triggered, THE PDF_Renderer SHALL produce a downloadable PDF using the same data schema as the live preview template.

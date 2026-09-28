# Design My Nivas — Design System & UI Instructions

## 1. Visual Identity & Color Palette
- **Brand Primary**: `#29ABE2` (Sky Blue / Cyan, derived from official logo)
- **Brand Primary Hover**: `#1FA0D6`
- **Brand Dark Blue**: `#1793C9`
- **Brand Light Tint / Active State**: `#EFF6FF` (Soft blue surface tint)
- **Primary Text**: `#181818` / `#0F172A` (Deep architectural charcoal)
- **Muted Text**: `#64748B` / `#66625D` (Neutral slate grey)
- **Surfaces**: `#FFFFFF` (Pure white cards)
- **Canvas / Background**: `#F8FAFC` / `#F7F5F0` (Crisp light architectural neutral)
- **Borders**: `#E2E8F0` / `#E5E7EB` (Subtle 1px architectural dividers)

### STRICT PROHIBITIONS:
1. **NO DARK THEMES on Admin/Login**: The entire website and admin portal MUST be in the **Light and Blue theme**. Never create dark/obsidian login pages.
2. **NO ARBITRARY ORANGE / RANDOM ACCENTS**: The brand color is `#29ABE2` (Blue). Do not use orange or other brand colors.
3. **NO RAW CODE BLOCKS ON USER DASHBOARDS**: Never dump raw SQL scripts or developer prompts inside the user-facing admin dashboard.

---

## 2. Admin UI — Notion-Style Design System
All admin pages must follow Notion's clean, minimalist layout principles:

### A. Solid Left Sidebar (Desktop):
- Width: `250px` fixed on the left, `#FFFFFF` background with `1px solid #E5E7EB` border.
- **Brand Header**: Top section with circular avatar containing official logo (`/logo/DMN Logo.png`) + "Design My Nivas" + "ADMIN PANEL".
- **Navigation Items**:
  - Must ALWAYS be strictly **horizontal rows** (`flex-direction: row`, `align-items: center`, `white-space: nowrap`).
  - Icon on the left (18px × 18px, `flex-shrink: 0`), text label immediately to the right (`gap: 10px`).
  - **The text must NEVER wrap or sit below the icon.**
  - Height: `36px` to `40px` per item.
  - Hover: `#F1F5F9`.
  - Active: `#EFF6FF` background with `#29ABE2` brand blue text and icon.
- **Bottom Section**:
  - `Connection Status`
  - `View Live Site`
  - `Logout` (subtle red hover)

### B. Mobile Responsive Navigation:
- Mobile header with brand logo, title, and hamburger icon (`Menu`).
- Clicking hamburger opens a solid white slide-out drawer from the left with dark backdrop blur overlay.
- Tapping any link or backdrop closes the drawer.

---

## 3. Cards & Media Architecture
- **Portrait Orientation Only**: All project and testimonial cards must use portrait aspect ratios (`aspect-ratio: 4 / 5`), never landscape/rectangular.
- **Video Items**: Always show a centered, glowing brand play button overlay that opens the video in a modal player.
- **Admin Forms**: Strictly 3 to 4 details max:
  - Projects: Title, Location, Service, Media (1 Portrait Photo OR 1 YouTube URL).
  - Testimonials: Client Name, Location, Quote, YouTube URL.

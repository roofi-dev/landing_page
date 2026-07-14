# Design System: Ladang Lima CMS Backend

## 1. Visual Theme & Atmosphere
A refined, modern, and trustworthy content management interface that reflects Ladang Lima's organic heritage. The atmosphere is **"Sustainable Professional"** — clean white surfaces, deep forest greens, and warm amber accents. It feels organized, premium, and focused on storytelling.

## 2. Color Palette & Roles
- **Organic Canvas** (#FBFDFB) — Primary background surface, slight green tint
- **Pure Surface** (#FFFFFF) — Main content cards and panels
- **Deep Forest** (#052e16) — Sidebar background, primary brand identity
- **Moss Text** (#112415) — Primary text color, almost black with green depth
- **Slate Leaf** (#64748B) — Secondary text, metadata, descriptions
- **Ladang Amber** (#D97706) — Accent color for active states, CTA buttons, focus rings
- **Whisper Border** (#E2E8F0) — Structural lines and subtle card borders

## 3. Typography Rules
- **Display/Headlines:** Plus Jakarta Sans — Track-tight, semi-bold for hierarchy, moss text color
- **Body:** Plus Jakarta Sans — Relaxed leading (1.6), moss text at 0.875rem (14px) for dashboards
- **Mono:** JetBrains Mono — For technical keys, slug paths, and code snippets

## 4. Component Stylings
- **Sidebar:** Deep Forest background. Active items use Ladang Amber left-border or background tint. Text is white/80 by default.
- **Cards:** Subtle rounded corners (0.75rem / 12px). 1px Whisper Border. Very soft shadow (shadow-sm) that deepens on hover.
- **Tabs:** Underlined style with Ladang Amber active state. Generous padding for touch targets.
- **Buttons:** Tactile feedback. Primary uses Deep Forest or Ladang Amber. Secondary uses white with Whisper Border.
- **Badges:** Soft background tints (e.g., light green for 'published') with bold text.

## 5. Layout Principles
- **Sidebar Containment:** Fixed 260px width.
- **Content Gaps:** Consistent 2rem (32px) padding for main sections.
- **Grid:** Responsive grid for card listings, collapsing gracefully.

## 6. Motion & Interaction
- **Spring Physics:** All hover states and transitions use `stiffness: 100, damping: 20`.
- **Active States:** Subtle scale-down (0.98) on click.
- **Staggered Entrance:** Cards fade in with a 50ms stagger.

## 7. Anti-Patterns (Banned)
- No pure black (#000000).
- No generic Inter font.
- No purple/neon AI glows.
- No harsh box shadows.
- No tiny buttons (< 36px).
- No generic "Learn more" text.

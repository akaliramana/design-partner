# Page Manifest Schema

The page manifest (`.ui-skill/manifest.json`) tracks all pages, their relationships, and navigation structure.

## Full Schema

```json
{
  "version": "1.0",
  "project": {
    "name": "string — project name",
    "type": "string — project type (saas-dashboard, landing-page, e-commerce, etc.)",
    "stack": "string — tech stack (react-tailwind-shadcn, nextjs-tailwind, html-tailwind, etc.)"
  },
  "pages": {
    "<page-id>": {
      "file": "string — relative path to page file",
      "title": "string — display name for navigation",
      "layout": "string — layout type used",
      "sharedComponents": ["array of component names from registry"],
      "designOverride": "string|null — path to page-specific design override",
      "navOrder": "number — position in navigation (1-based)",
      "navIcon": "string — Lucide icon name for navigation"
    }
  },
  "navigation": {
    "primary": "sidebar | top-nav | bottom-nav",
    "items": [
      {
        "page": "string — page ID",
        "label": "string — nav display text",
        "icon": "string — Lucide icon name",
        "position": "top | bottom (default: top)"
      }
    ]
  },
  "relationships": {
    "<page-id>": {
      "linksTo": ["page IDs this page links to"],
      "parentOf": ["child page IDs"],
      "childOf": "string|null — parent page ID"
    }
  }
}
```

## Layout Types

| Layout | Description |
|--------|-------------|
| `sidebar-content` | Sidebar navigation + main content area |
| `topnav-content` | Top navigation bar + main content area |
| `full-width` | No sidebar, content spans full width |
| `split-panel` | Two-panel layout (list + detail) |
| `centered` | Centered content with max-width (auth pages, settings) |
| `dashboard-grid` | Grid layout for metric cards + charts |

## Page Types and Navigation Rules

| Page type | Added to primary nav? | Breadcrumb? | Example |
|-----------|----------------------|-------------|---------|
| Top-level | Yes | No (it IS the top) | Dashboard, Settings, Team |
| Child page | No | Yes (Parent > Child) | Team > Member Profile |
| Modal/overlay | No | No | Edit Profile Modal |
| Wizard step | No | Step indicator instead | Onboarding Step 2 |

## Example

```json
{
  "version": "1.0",
  "project": {
    "name": "Analytics Dashboard",
    "type": "saas-dashboard",
    "stack": "nextjs-tailwind-shadcn"
  },
  "pages": {
    "dashboard": {
      "file": "src/app/dashboard/page.tsx",
      "title": "Dashboard",
      "layout": "sidebar-content",
      "sharedComponents": ["sidebar", "header"],
      "designOverride": null,
      "navOrder": 1,
      "navIcon": "LayoutDashboard"
    },
    "analytics": {
      "file": "src/app/analytics/page.tsx",
      "title": "Analytics",
      "layout": "sidebar-content",
      "sharedComponents": ["sidebar", "header", "data-card"],
      "designOverride": null,
      "navOrder": 2,
      "navIcon": "BarChart3"
    },
    "analytics/campaign": {
      "file": "src/app/analytics/[id]/page.tsx",
      "title": "Campaign Detail",
      "layout": "sidebar-content",
      "sharedComponents": ["sidebar", "header", "breadcrumb"],
      "designOverride": null,
      "navOrder": 0,
      "navIcon": ""
    },
    "settings": {
      "file": "src/app/settings/page.tsx",
      "title": "Settings",
      "layout": "sidebar-content",
      "sharedComponents": ["sidebar", "header"],
      "designOverride": "design-system/pages/settings.md",
      "navOrder": 5,
      "navIcon": "Settings"
    }
  },
  "navigation": {
    "primary": "sidebar",
    "items": [
      { "page": "dashboard", "label": "Dashboard", "icon": "LayoutDashboard" },
      { "page": "analytics", "label": "Analytics", "icon": "BarChart3" },
      { "page": "settings", "label": "Settings", "icon": "Settings", "position": "bottom" }
    ]
  },
  "relationships": {
    "dashboard": { "linksTo": ["analytics"], "parentOf": [], "childOf": null },
    "analytics": { "linksTo": ["dashboard"], "parentOf": ["analytics/campaign"], "childOf": null },
    "analytics/campaign": { "linksTo": [], "parentOf": [], "childOf": "analytics" },
    "settings": { "linksTo": [], "parentOf": [], "childOf": null }
  }
}
```

Note: `analytics/campaign` does NOT appear in `navigation.items` — it's a child page accessed via the analytics list, not via primary navigation.

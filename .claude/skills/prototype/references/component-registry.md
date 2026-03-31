# Component Registry Schema

The component registry (`.ui-skill/registry.json`) tracks all shared components across the project.

## Full Schema

```json
{
  "version": "1.0",
  "components": {
    "<component-name>": {
      "id": "string — unique identifier",
      "type": "layout | display | navigation | form | feedback",
      "file": "string — relative path to component file",
      "usedIn": ["array of page IDs that use this component"],
      "props": {
        "<prop-name>": "<type: string | boolean | number | enum-values>"
      },
      "description": "string — what this component does",
      "lastUpdated": "ISO-8601 timestamp"
    }
  }
}
```

## Component Types

| Type | Description | Examples |
|------|-------------|---------|
| `layout` | Structural components that define page layout | Sidebar, Header, Footer, PageShell |
| `display` | Data display components reused across pages | DataCard, MetricWidget, StatusBadge |
| `navigation` | Navigation-specific components | Breadcrumb, TabNav, Pagination |
| `form` | Shared form components | SearchBar, FilterPanel, SettingsForm |
| `feedback` | User feedback components | Toast, EmptyState, LoadingSkeleton |

## Rules

1. **Register all shared components.** If it appears on more than one page, it goes in the registry.
2. **Single-page components are NOT registered.** A chart that only appears on the dashboard page is not shared.
3. **Layout components are always registered.** Sidebar, header, footer — even if only one page exists now (more will come).
4. **Keep `usedIn` accurate.** When adding/removing a page, update every component's `usedIn` array.
5. **Update `lastUpdated`** when the component file is structurally modified (not for content changes).

## Example

```json
{
  "version": "1.0",
  "components": {
    "sidebar": {
      "id": "sidebar-main",
      "type": "layout",
      "file": "src/components/shared/sidebar.tsx",
      "usedIn": ["dashboard", "analytics", "settings", "team"],
      "props": {
        "collapsed": "boolean",
        "activeItem": "string"
      },
      "description": "Primary navigation sidebar with collapsible state",
      "lastUpdated": "2025-01-15T10:30:00Z"
    },
    "header": {
      "id": "header-main",
      "type": "layout",
      "file": "src/components/shared/header.tsx",
      "usedIn": ["dashboard", "analytics", "settings", "team"],
      "props": {
        "title": "string",
        "showSearch": "boolean",
        "showBreadcrumb": "boolean"
      },
      "description": "Page header with title, optional search, and breadcrumb",
      "lastUpdated": "2025-01-15T10:30:00Z"
    }
  }
}
```

# Manifest Schema Template

Use this as the starting point when creating a new `.ui-skill/manifest.json`:

```json
{
  "version": "1.0",
  "project": {
    "name": "",
    "type": "",
    "stack": ""
  },
  "pages": {},
  "navigation": {
    "primary": "sidebar",
    "items": []
  },
  "relationships": {}
}
```

Fill in project details during first build. Add pages as they are created. See `references/page-manifest.md` for the full schema.

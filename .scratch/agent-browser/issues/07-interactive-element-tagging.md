# 07: Interactive element tagging and action IDs

**What to build:** An in-DOM script that scans interactive elements (button, a, input, select, textarea, ARIA button roles), assigns sequential stable integer Action IDs (#1, #2, ...), and extracts their labels, types, and current values.

**Blocked by:** #3

**Status:** ready-for-agent

- [ ] Interactive elements are identified and tagged with unique sequential integer IDs
- [ ] Elements with disabled, aria-hidden="true", or display: none are filtered or marked inactive
- [ ] Extracted metadata includes element role/tag, text label/placeholder, input type, and current value
- [ ] Unit test verifies accurate indexing and metadata extraction on test fixtures containing inputs, buttons, and links

# 11: Basic action dispatcher (click and fill)

**What to build:** Implement act_click(action_id) and act_fill(action_id, text) in Rust. Resolves the target element by action ID, triggers native DOM events (click, focus, input, change), and verifies DOM mutation.

**Blocked by:** #7

**Status:** ready-for-agent

- [ ] Engine::act_click(action_id) triggers click event listeners on buttons, links, and checkboxes
- [ ] Engine::act_fill(action_id, text) updates input/textarea value and dispatches input and change events
- [ ] Invalid or out-of-range action IDs return descriptive error types
- [ ] Unit tests verify DOM state changes (e.g., counter increments, form field values update)

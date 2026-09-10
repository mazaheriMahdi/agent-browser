# 12: Advanced actions (select, press_key, evaluate_js)

**What to build:** Implement act_select(action_id, value) for dropdowns, press_key(key) (e.g. Enter for form submission), and evaluate_js(code) as an escape hatch for arbitrary script execution.

**Blocked by:** #11

**Status:** ready-for-agent

- [ ] Engine::act_select(action_id, value) changes selected option and dispatches change event
- [ ] Engine::press_key(key) dispatches keydown, keypress, and keyup events to the active element
- [ ] Engine::evaluate_js(code) evaluates arbitrary JavaScript and returns the JSON-serialized result
- [ ] Unit tests verify select dropdown updates, Enter-key form submissions, and script evaluation

# 10: Semantic tree formatter (indented text and JSON)

**What to build:** Rust data structures (SemanticTree, Container, ActionItem) and formatters that serialize the component hierarchy into both a token-efficient indented text format (for LLM context windows) and structured JSON.

**Blocked by:** #9

**Status:** ready-for-agent

- [ ] Indented text output cleanly highlights the primary focus container (e.g., [Card: Login (Primary Focus)])
- [ ] Action items are rendered with action IDs and labels (e.g., [#1 Input "Email" (type=email)], [#2 Button "Sign In"])
- [ ] Token-efficient: outputs 80%+ fewer tokens than raw HTML
- [ ] Full JSON serialization matches a defined serde schema
- [ ] Unit tests verify both text formatting and JSON deserialization against golden fixtures

# 03: In-memory HTML loading and basic DOM querying

**What to build:** Implement Engine::load_html(html) to populate the Happy DOM document from a raw HTML string. Expose Rust methods to query the page title, extract sanitized text content, and count or locate elements matching CSS selectors.

**Blocked by:** #2

**Status:** ready-for-agent

- [ ] Engine::load_html(&mut self, html: &str) -> Result<()> parses HTML strings into the active DOM document
- [ ] Engine::title(&mut self) -> Result<String> extracts the <title> text
- [ ] Engine::query_selector_all(&mut self, selector: &str) -> Result<Vec<ElementSummary>> returns matching element tags and attributes
- [ ] Unit tests verify parsing and querying against complex HTML snippets (forms, tables, lists)

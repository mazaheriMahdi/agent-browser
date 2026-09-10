# 06: Page navigation and cookie persistence pipeline

**What to build:** Implement Engine::navigate(url) in Rust. Fetches the page using the filtered network client, sets document location/base URL, injects the HTML response into the Happy DOM instance, and persists cookies across requests and HTTP redirects.

**Blocked by:** #5

**Status:** ready-for-agent

- [ ] Engine::navigate(&mut self, url: &str) -> Result<()> loads remote web pages over HTTP/HTTPS
- [ ] Document window.location and base URL reflect the final resolved URL after redirects
- [ ] Per-session cookie jar stores Set-Cookie headers and includes cookies in subsequent requests
- [ ] Integration tests verify navigation against a local mock server with redirects and cookies

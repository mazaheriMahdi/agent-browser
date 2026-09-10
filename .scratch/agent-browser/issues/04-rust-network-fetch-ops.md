# 04: Rust network fetch ops and JavaScript interception

**What to build:** Implement custom deno_core #[op2] bindings in Rust connecting JavaScript fetch() and XMLHttpRequest calls in Happy DOM to Rust asynchronous reqwest client.

**Blocked by:** #3

**Status:** ready-for-agent

- [ ] Custom #[op2(async)] op implemented in Rust to handle network HTTP requests via reqwest
- [ ] JS global fetch in Happy DOM is polyfilled or wired to delegate to the Rust network op
- [ ] Response status, headers, and response body are passed back cleanly into JavaScript promises
- [ ] Integration test verifies that a script calling fetch() against a local mock server receives the response

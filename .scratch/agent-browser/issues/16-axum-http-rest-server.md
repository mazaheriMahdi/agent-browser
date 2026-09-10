# 16: Axum HTTP REST server (agent-browser-server)

**What to build:** A standalone web service exposing REST endpoints (POST /session, POST /session/:id/navigate, POST /session/:id/action, GET /session/:id/snapshot, DELETE /session/:id).

**Blocked by:** #15

**Status:** ready-for-agent

- [ ] agent-browser-server crate created with Axum web framework
- [ ] Endpoints support session creation, navigation, actions, and snapshots with JSON payloads
- [ ] Errors (session not found, action failed, timeout) return appropriate HTTP status codes and structured error bodies
- [ ] End-to-end integration test drives a browsing session via HTTP requests

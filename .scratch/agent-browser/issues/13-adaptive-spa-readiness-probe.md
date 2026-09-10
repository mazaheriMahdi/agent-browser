# 13: Adaptive SPA readiness probe

**What to build:** An in-isolate probe that monitors V8 microtask queue drainage, zero in-flight network requests, and DOM MutationObserver stability (e.g. 50-100ms quiet window), ensuring SPAs (React/Next.js) have finished rendering before returning snapshots.

**Blocked by:** #6, #11

**Status:** ready-for-agent

- [ ] Readiness probe tracks pending promises/microtasks and active Rust network ops
- [ ] Monitors DOM mutations and waits for a quiet window (e.g., 50ms without mutations)
- [ ] Supports an optional wait_for_selector condition and hard timeout fallback
- [ ] Integration test verifies waiting for a delayed DOM update (simulating React hydration) succeeds without premature return

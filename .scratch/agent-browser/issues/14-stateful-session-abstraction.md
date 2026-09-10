# 14: Stateful session abstraction

**What to build:** A unified Session struct holding an isolated V8 runtime, cookie store, navigation history, and current semantic snapshot, with methods navigate() and act() that return the updated component tree.

**Blocked by:** #10, #13

**Status:** ready-for-agent

- [ ] Session::new(id) creates a dedicated browsing session with isolated V8 isolate and cookie jar
- [ ] session.navigate(url) fetches, waits for readiness, and returns the distilled SemanticTree
- [ ] session.act(action) executes an action, waits for readiness, and returns the updated SemanticTree
- [ ] Multi-step integration test confirms session state is maintained across sequential actions

# 15: Thread-safe SessionPool with idle eviction

**What to build:** An in-memory SessionPool managing multiple sessions concurrently with a global concurrency cap, UUID lookups, and a background Tokio reaper task that evicts idle sessions after a configured TTL to prevent memory leaks.

**Blocked by:** #14

**Status:** ready-for-agent

- [ ] SessionPool creates, retrieves, and terminates sessions safely across multiple Tokio tasks
- [ ] Enforces maximum active session limit with queue backpressure
- [ ] Background reaper task evicts sessions inactive beyond the configured idle timeout
- [ ] Stress test spins up 20+ concurrent sessions, verifying thread safety, resource cleanup, and zero deadlocks

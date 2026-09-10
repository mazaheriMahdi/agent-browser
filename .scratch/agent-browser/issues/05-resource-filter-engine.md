# 05: Rule-based resource filter engine

**What to build:** A Rust-level resource filtering engine that inspects requested URLs, extensions, and headers to block non-essential subresources (images, web fonts, audio/video, analytics/trackers) before any network bytes are transmitted.

**Blocked by:** #4

**Status:** ready-for-agent

- [ ] Filter rules reject requests for image extensions (.png, .jpg, .svg, etc.), media (.mp4, .mp3), and web fonts (.woff2, .ttf)
- [ ] Filter rules reject known tracking, telemetry, and advertising hostnames
- [ ] Allowed requests (HTML, JSON, scripts, APIs) pass through unimpeded
- [ ] Unit tests prove blocked resources immediately return empty 204 or abort without opening socket connections

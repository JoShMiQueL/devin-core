# Changelog

## [0.0.4](https://github.com/JoShMiQueL/devin-core/compare/v0.0.3...v0.0.4) (2026-11-25)


### Features

* **core:** trigger release-please accumulation ([#2](https://github.com/JoShMiQueL/devin-core/issues/2)) ([f6f3ef9](https://github.com/JoShMiQueL/devin-core/commit/f6f3ef965ddfbb7a1ed419faa3a3df2deb3bf075))

## [0.0.3] — 2026-11-24

### Fixed
- Emit `.js` extensions on all relative imports — Node ESM resolves
  `dist/` directly now (`node dist/index.js` works, not just bundlers).

## [0.0.2] — 2026-11-24

### Fixed
- Same `.js` fix applied to `src/` imports (first pass missed `../`).

## [0.0.1] — 2026-11-24

### Added
- Initial release: Connect-RPC wire codec, auth (`credentials.toml`,
  PKCE login via `loginAuto`/`openBrowser`, JWT cache), model catalog
  (`GetCascadeModelConfigs`), chat stream (`streamChatEvents`),
  `DevinApiError` with AI-SDK-compatible marker for duck-typing.

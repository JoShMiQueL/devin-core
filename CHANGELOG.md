# Changelog

## [0.0.7](https://github.com/JoShMiQueL/devin-core/compare/v0.0.6...v0.0.7) (2026-11-25)


### Bug Fixes

* relax resolveModelUid input to the three fields it reads (ResolvableEntry) ([c2c9081](https://github.com/JoShMiQueL/devin-core/commit/c2c9081d025a7fe8c781fd201a418e8713674c89))

## [0.0.6](https://github.com/JoShMiQueL/devin-core/compare/v0.0.5...v0.0.6) (2026-11-25)


### Features

* catalog-driven resolveModelUid ([#8](https://github.com/JoShMiQueL/devin-core/issues/8)) ([952be57](https://github.com/JoShMiQueL/devin-core/commit/952be57d52ac3b0cb1a331af8fe72ee739a4d6f7))

## [0.0.5](https://github.com/JoShMiQueL/devin-core/compare/v0.0.4...v0.0.5) (2026-11-25)


### Bug Fixes

* **catalog:** bare uid drops its capability effort only when it collides with a suffixed sibling — swe-2-1 merges into variants again, while glm-5-2 keeps its legitimate high effort ([#6](https://github.com/JoShMiQueL/devin-core/issues/6)) ([2c242d3](https://github.com/JoShMiQueL/devin-core/commit/2c242d30b43979dea6290dab803e0e2ed5f064b5))

## [0.0.4](https://github.com/JoShMiQueL/devin-core/compare/v0.0.3...v0.0.4) (2026-11-25)


### Features

* **core:** trigger release-please accumulation ([#2](https://github.com/JoShMiQueL/devin-core/issues/2)) ([f6f3ef9](https://github.com/JoShMiQueL/devin-core/commit/f6f3ef965ddfbb7a1ed419faa3a3df2deb3bf075))


### Bug Fixes

* **catalog:** never derive effort from capability on the bare uid — it is the server-side default, not a selectable effort, and it collides with the real suffixed member (bare swe-2-1 reporting Low duplicated swe-2-1-low, breaking the family merge into variants) ([#4](https://github.com/JoShMiQueL/devin-core/issues/4)) ([eb7dacb](https://github.com/JoShMiQueL/devin-core/commit/eb7dacbb866aab6ff588a7b3d04a49da4bc90c0f))

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

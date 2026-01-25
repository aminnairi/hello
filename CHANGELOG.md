# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-25

### Added
- New responsive design for applications and cryptocurrencies lists, taking full advantage of large screens.
- Redesigned top bar that changes style upon scrolling and aligns titles to the left.
- Weather integration as a dedicated icon button in the top bar with a detailed modal view.
- Connectivity status icon.
- Quality of Life (QoL) keyboard shortcuts.
- Haptic feedback (vibration) for common actions like copying, sharing, and interacting with modals.
- Action buttons for applications: copy link, share, and open directly.
- Zoom animations for weather loading and smooth transitions for loading skeletons.

### Changed
- Refined the `settings.json` configuration schema with updated top-level property names for better clarity.
- Improved overall card design with raised effects and better interactivity.
- Enhanced skeleton loading states to match the new responsive layout.
- Moved time and weather components from the home screen to the top bar for a cleaner interface.
- Refactored internal architecture for better maintainability (exported components, states, and hooks).

### Fixed
- Prevented global shortcuts from triggering when the sign-in modal is active.
- Corrected logout icon color and fixed various settings-related property access issues.
- Improved sign-in form with autofocus and better loading states.

## [0.1.0] - 2026-01-22

### Added
- Initial release of the application.
- Basic support for listing applications and tracking cryptocurrency prices.
- Optional authentication system with a dedicated sign-in modal.
- Configuration system via `settings.json`.
- Integrated React Signals for state management.

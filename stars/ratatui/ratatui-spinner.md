---
repo: ratatui/ratatui-spinner
url: 'https://github.com/ratatui/ratatui-spinner'
homepage: 'https://ratatui.rs'
starredAt: '2026-09-19T20:33:47Z'
createdAt: '2026-09-08T23:25:14Z'
updatedAt: '2026-09-19T23:42:15Z'
language: Rust
license: MIT
branch: main
stars: 81
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2026-09-20T00:11:00.194Z'
description: 'Customizable, stateless spinner widgets for Ratatui applications'
tags:
  - library
  - ratatui
  - spinner
  - terminal
  - terminal-spinne
  - tui
  - widget
---

# ratatui-spinner

[![MIT License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Customizable, stateless spinner widgets for
[Ratatui](https://github.com/ratatui/ratatui) applications.

![Overview of the ratatui-spinner widgets](examples/vhs/generated/overview.gif)

## Widgets

All six spinner types take an application-owned animation tick. They differ in layout, motion, and
size:

### [`LinearSpinner`][linear]

Scrolling rows and bouncing columns for inline activity or narrow side columns, with configurable
[`Direction`][linear-direction], [`Flow`][flow], [`LinearStyle`][linear-style], length, colours, and
animation speed.

![Horizontal LinearSpinner styles and directions][linear-h]

![Vertical LinearSpinner styles and directions][linear-v]

### [`BarSpinner`][bar]

Moving arcs across a horizontal or vertical track. Four [`BarMotion`][bar-motion] modes and sixteen
[`BarStyle`][bar-style] symbol pairs control its motion and appearance. [`BarTrack`][bar-track],
[thickness][bar-thickness], and fixed or area-filling dimensions adjust the track geometry. The
[`zed`][bar-zed], [`claude`][bar-claude], [`minimal`][bar-minimal], and [`solid`][bar-solid]
constructors set named configurations.

![Horizontal BarSpinner styles and options][bar-h]

![Vertical BarSpinner styles and options][bar-v]

### [`FluxSpinner`][flux]

An animated glyph sequence in one cell or a phase-shifted wave across a field.
[`FluxFrames`][flux-frames] defines the built-in sequences; [`frames()`][flux-custom] accepts a
custom static slice.

![FluxSpinner frame presets and configuration](examples/vhs/generated/flux.gif)

### [`CircleSpinner`][circle]

A rotating braille-dot arc around a circular ring, sized by radius with an automatic or explicit
arc length. [`char_size()`][circle-size] returns the exact terminal dimensions.

![CircleSpinner radii, arc lengths, and directions](examples/vhs/generated/circle.gif)

### [`SquareSpinner`][square]

A rotating braille-dot arc around a square, with filled and empty centre treatments.
`SquareSpinner` has its own renderer and dimensions; [`char_size()`][square-size] reports the exact
size.

![SquareSpinner sizes, centres, and directions](examples/vhs/generated/square.gif)

### [`RectSpinner`][rect]

A configurable braille-ring spinner with filled and empty centres and clockwise or
counter-clockwise motion. [`RectShape::Square`][rect-shape] is the only shape.

![RectSpinner shapes, centres, and directions](examples/vhs/generated/rect.gif)

## Installation

The fork from `tui-spinner` to `ratatui-spinner` is currently unpublished. Use the Git repository
while the API is under development:

```toml
[dependencies]
ratatui-spinner = { git = "https://github.com/ratatui/ratatui-spinner" }
```

For a local checkout, use a path dependency instead:

```toml
[dependencies]
ratatui-spinner = { path = "../ratatui-spinner" }
```

## First spinner

Construct the spinner with an application-owned `tick: u64`, then pass it to
`Frame::render_widget`:

```rust
use ratatui::layout::Rect;
use ratatui::style::Color;
use ratatui::Frame;
use ratatui_spinner::FluxSpinner;

fn render(frame: &mut Frame, area: Rect, tick: u64) {
    let spinner = FluxSpinner::new(tick).color(Color::Cyan);
    frame.render_widget(spinner, area);
}
```

Advance `tick` and request a redraw on the application's animation timer. The [crate guide][guide]
covers animation timing, sizing, widget selection, and text conversion.

## Embedding in text widgets

Spinner frames can also appear in table cells and other text widgets. The
[text embedding guide][text-guide] covers direct conversions and the explicit dimensions needed
by `BarSpinner`.

![Spinners converted to text and embedded in table cells](examples/vhs/generated/text.gif)

## Documentation and examples

- [Crate guide][guide]: animation lifecycle, first integration, sizing, and text embedding.
- [API index][api]: spinner types, option enums, builders, defaults, and presets.
- [Spinner comparison example][spinner-example]: every family side by side.
- [Table embedding example][table-example]: spinner frames inside table cells.
- [Detailed integration examples][examples]: focused runnable examples for each family.
- [Gallery source and recording guide][gallery-guide]: previewing and regenerating these images.

Run an integration example with Cargo:

```sh
cargo run --example spinner
cargo run --example table_embed
cargo run --example readme -- --help
```

## Provenance

This project is a fork of Sorin Albu-Irimies's
[`tui-spinner`](https://github.com/sorinirimies/tui-spinner), maintained by the Ratatui project.
The original code remains MIT-licensed, with its authorship and commit history preserved.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, checks, examples, visual recording
guidance, and package and changelog previews.

## License

MIT — see [LICENSE](LICENSE).

[api]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/all.html
[bar]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html
[bar-h]: examples/vhs/generated/bar-horizontal.gif
[bar-claude]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html#method.claude
[bar-minimal]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html#method.minimal
[bar-motion]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.BarMotion.html
[bar-solid]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html#method.solid
[bar-style]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.BarStyle.html
[bar-thickness]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html#method.thickness
[bar-track]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.BarTrack.html
[bar-v]: examples/vhs/generated/bar-vertical.gif
[bar-zed]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.BarSpinner.html#method.zed
[circle]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.CircleSpinner.html
[circle-size]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.CircleSpinner.html#method.char_size
[examples]: examples/
[flux]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.FluxSpinner.html
[flux-custom]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.FluxSpinner.html#method.frames
[flux-frames]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.FluxFrames.html
[flow]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.Flow.html
[gallery-guide]: examples/readme/README.md
[guide]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/
[linear]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.LinearSpinner.html
[linear-direction]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.Direction.html
[linear-h]: examples/vhs/generated/linear-horizontal.gif
[linear-style]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.LinearStyle.html
[linear-v]: examples/vhs/generated/linear-vertical.gif
[rect]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.RectSpinner.html
[rect-shape]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/enum.RectShape.html#variant.Square
[spinner-example]: examples/spinner.rs
[square]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.SquareSpinner.html
[square-size]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/struct.SquareSpinner.html#method.char_size
[table-example]: examples/table_embed.rs
[text-guide]: https://docs.rs/ratatui-spinner/latest/ratatui_spinner/#embedding-frames-in-text-widgets

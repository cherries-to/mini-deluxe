# mini-deluxe

Minimal web server for Bun.js.
mini-deluxe extends `Bun.serve()` and creates a simple wrapper with useful features such as handlers, handler modes, ~~websocket support,~~ and more.

The library will always strive to be small

## Specification

- Custom Handlers
- Host from a directory (similar to how http.server from Python does it)
- Very easy to understand configuration
- Ease of use handler builders
- Handlers recieve input from PHP-like arguments
- ~~WebSockets~~ (Not currently supported...yet)

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Authors

- @tux7k <tux@nuk3.org>
- @datkat21 <kat@cherries.to>
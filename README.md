# mini-deluxe

Minimal web server for Bun.js.
mini-deluxe extends `Bun.serve()` and creates a simple wrapper with useful features such as handlers, handler modes, websocket support, and more.

This whole library is under 1000 lines and will always be.

## Specification

- Custom Handlers
- File-only mode
- ~~WebSockets~~ (Not currently supported...yet)
- Very easy to understand configuration
- Ease of use handler builders
- Handlers recieve input from PHP-like arguments

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


This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

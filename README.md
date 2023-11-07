# Mini-deluxe

Mini-web server for Bun.js.
This minimal server thing extends `Bun.serve()` and creates a simple wrapper with useful features such as a public directory, websocket support built-in, etc.

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

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

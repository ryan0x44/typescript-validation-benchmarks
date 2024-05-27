# typescript-validation-benchmarks

This repository contains some simple benchmarks around

* [Zod](https://zod.dev/)
* [Arktype v2](https://arktype.io/)
* [Typebox with TypeCompiler](https://github.com/sinclairzx81/typebox)
* [Typebox with AJV](https://ajv.js.org/)

Results of `bun run all` on M3 Pro Mac:

```
Running benchmark for arktype..........
Slowest: 0.53ms
Fastest: 0.43ms
Average: .48ms
Filesize: 178.19 KB

Running benchmark for ajv-with-typebox..........
Slowest: 0.41ms
Fastest: 0.34ms
Average: .36ms
Filesize: 358.93 KB

Running benchmark for typebox..........
Slowest: 0.35ms
Fastest: 0.30ms
Average: .32ms
Filesize: 199.41 KB

Running benchmark for zod..........
Slowest: 0.53ms
Fastest: 0.40ms
Average: .44ms
Filesize: 111.94 KB
```

## Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run all
```

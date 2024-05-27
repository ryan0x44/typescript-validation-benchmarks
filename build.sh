#!/bin/bash -e

bun build --outfile dist/ajv-with-typebox.js --target=browser ajv-with-typebox.ts
bun build --outfile dist/typebox.js --target=browser typebox.ts
bun build --outfile dist/zod.js --target=browser zod.ts

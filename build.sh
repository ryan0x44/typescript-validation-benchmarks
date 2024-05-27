#!/bin/bash -e

scripts=(arktype ajv-with-typebox typebox zod)

for script in "${scripts[@]}"; do
    bun build --outfile "dist/${script}.js" --target=browser "${script}.ts"
done

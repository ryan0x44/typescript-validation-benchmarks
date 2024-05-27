#!/bin/bash

# Check if required tools are installed
for tool in bc awk sed; do
  if ! command -v $tool &> /dev/null; then
    echo "$tool could not be found. Please install it to run this script."
    exit 1
  fi
done

options=(ajv-with-typebox typebox zod)

for option in "${options[@]}"; do
  echo -n "Running benchmark for ${option}"
  durations=()
  for i in {1..10}; do
    output=$(bun run "dist/${option}.js" 1000 2>&1)
    echo -n "."
    duration=$(echo "$output" | awk -F'[][]' '/duration/ {print $2}' | awk '{print $1}')
    # echo "Parsed duration: $duration"
    durations+=($(echo "$duration" | sed 's/ms//'))
  done
  echo ""

  # Debugging: Print captured durations
  # echo "Captured durations: ${durations[@]}"

  # Calculate slowest, fastest, and average durations
  slowest=$(printf '%s\n' "${durations[@]}" | sort -nr | head -n1)
  fastest=$(printf '%s\n' "${durations[@]}" | sort -n | head -n1)
  total=0
  for duration in "${durations[@]}"; do
    total=$(echo "$total + $duration" | bc -l)
  done
  average=$(echo "scale=2; $total / ${#durations[@]}" | bc -l)

  echo "Slowest: ${slowest}ms"
  echo "Fastest: ${fastest}ms"
  echo "Average: ${average}ms"
  echo ""
done

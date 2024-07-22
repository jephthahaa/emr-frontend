#!/bin/bash

# Check if the required number of arguments is provided
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <icon1> [icon2 icon3 ...]"
  exit 1
fi

# Command to be run
command="npx hugeicons-pro@latest get --outdir=src/hugeicons --variant=stroke"

# Loop through the provided icons and append them to the command
for icon in "$@"; do
  command+=" --icon=$icon"
done

command+=" --language=react-tsx"

echo "Running command: $command"
# Run the final command
eval "$command"


#!/bin/sh
set -e

# Install dependencies using npm in CI-friendly way
# If a prepacked node_modules tarball is present, use it instead of npm ci

TARBALL="node_modules.tar.gz"

if [ -f "$TARBALL" ]; then
  echo "Using prebuilt dependencies from $TARBALL"
  rm -rf node_modules
  mkdir -p node_modules
  tar -xzf "$TARBALL" -C node_modules --strip-components=1
else
  npm ci
fi


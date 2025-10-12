#!/usr/bin/env bash
set -euo pipefail

# Clean and prepare dist directory
rm -rf dist
mkdir -p dist

# Prefer rsync if available for robust copying/excludes
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    --exclude 'dist' \
    --exclude 'netlify' \
    --exclude '.git' \
    --exclude '.gitignore' \
    --exclude '.gitattributes' \
    --exclude 'node_modules' \
    --exclude '.netlify' \
    --exclude 'build.sh' \
    --exclude 'package.json' \
    --exclude 'package-lock.json' \
    --exclude 'pnpm-lock.yaml' \
    --exclude 'yarn.lock' \
    --exclude 'netlify.toml' \
    ./ dist/
else
  # Fallback to bash cp -a loop
  shopt -s dotglob
  for path in *; do
    case "$path" in
      dist|netlify|node_modules|.git|.netlify) continue ;;
      build.sh|package.json|package-lock.json|pnpm-lock.yaml|yarn.lock|netlify.toml) continue ;;
    esac
    cp -a "$path" dist/
  done
fi

echo "Build complete. Output in ./dist"


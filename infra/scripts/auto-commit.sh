#!/usr/bin/env bash
set -e

# Auto-commit script for generated assets
# Usage: ./auto-commit.sh "commit message"

branch=$(git rev-parse --abbrev-ref HEAD)
msg=${1:-"chore: auto-commit generated assets"}

echo "📝 Adding changes to git..."
git add -A

echo "💾 Committing with message: $msg"
git commit -m "$msg" || echo "✅ Nothing to commit (working tree clean)"

echo "🚀 Pushing to origin/$branch..."
git push origin "$branch" || echo "⚠️  Push failed or no remote configured"

echo "✅ Auto-commit completed!"

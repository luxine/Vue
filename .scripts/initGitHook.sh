#!/bin/sh

HOOK_PATH="../.git/hooks/pre-commit"

if [ -e "$HOOK_PATH" ]; then
  echo "Pre-commit hook already exists at $HOOK_PATH, skipping installation."
  exit 0
fi

cat > "$HOOK_PATH" << 'EOF'
#!/bin/sh

cd code/base || {
  echo "Error: Failed to enter directory code/base"
  exit 1
}

if ! yarn lint-staged; then
  echo "Commit aborted due to lint-staged errors."
  exit 1
fi

exit 0
EOF

chmod +x "$HOOK_PATH"

echo "Git pre-commit hook installed successfully at $HOOK_PATH."

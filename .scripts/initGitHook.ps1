$HookPath = "../.git/hooks/pre-commit"

if (Test-Path $HookPath) {
    Write-Host "Pre-commit hook already exists at $HookPath, skipping installation."
    exit 0
}

$hookContent = @'
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
'@

$hookContent | Out-File -FilePath $HookPath -Encoding ASCII

git update-index --add --chmod=+x $HookPath

Write-Host "Git pre-commit hook installed successfully at $HookPath."

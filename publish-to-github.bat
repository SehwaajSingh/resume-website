@echo off
cd /d "%~dp0"

where gh >nul 2>nul
if errorlevel 1 (
  echo GitHub CLI was not found.
  echo Install it from: https://cli.github.com/
  echo Then run this file again.
  pause
  exit /b 1
)

gh auth status >nul 2>nul
if errorlevel 1 (
  gh auth login
)

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  gh repo create SehwaajSingh/resume-website --public --source . --remote origin --push
) else (
  git push -u origin HEAD
)

echo.
echo After pushing, open GitHub repo Settings ^> Pages and choose GitHub Actions.
pause

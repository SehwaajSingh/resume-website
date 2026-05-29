@echo off
echo Closing local Next.js preview servers on ports 3000 and 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 :3001"') do (
  taskkill /PID %%a /F >nul 2>nul
)
echo Done. You can now run open-website.bat again.
pause

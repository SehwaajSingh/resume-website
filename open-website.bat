@echo off
cd /d "%~dp0"
echo Starting SehwaajOS preview on http://localhost:3000
echo Keep the server window open while using the website.
start "SehwaajOS Server" cmd /k "cd /d "%~dp0" && npm.cmd run dev -- --port 3000"
timeout /t 6 /nobreak >nul
start http://localhost:3000

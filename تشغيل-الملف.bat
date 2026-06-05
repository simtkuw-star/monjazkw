@echo off
cd /d "%~dp0"
start "" powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
timeout /t 2 > nul
start "" "http://127.0.0.1:5501/index.html"

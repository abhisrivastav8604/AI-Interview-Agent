@echo off
title AI INTERVIEW AGENT Server
echo ==========================================
echo Starting AI INTERVIEW AGENT (1-Click Fix)
echo ==========================================
echo.
echo Please DO NOT close this window! A web server must stay open.
echo.
cd /d "%~dp0"

tasklist /FI "IMAGENAME eq mongod.exe" | find /I "mongod.exe" >nul
if errorlevel 1 (
  echo [-] Starting Local Database quietly...
  start /B .\local-mongo\extracted\mongodb-win32-x86_64-windows-7.0.5\bin\mongod.exe --dbpath "%~dp0local-mongo\data" --logpath "%~dp0local-mongo\log\mongo.log" --bind_ip 127.0.0.1 2>nul
  echo [+] Local Database started!
) else (
  echo [+] Local Database is already running.
)

echo.
echo [+] Launching Backend and Frontend (this takes a few seconds)...
echo.
start "AI Backend" /D "%~dp0backend" cmd /k "npm.cmd run dev"
start "AI Frontend" /D "%~dp0frontend" cmd /k "npm.cmd run dev"

echo [+] Backend and frontend launched in separate windows.

echo.
pause

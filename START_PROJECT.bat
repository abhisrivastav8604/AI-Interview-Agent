@echo off
title Prepvox Server
echo ==========================================
echo   Starting Prepvox AI Interview Agent
echo ==========================================
echo.

cd /d "%~dp0"

REM ── Kill any old processes on port 5000 to avoid conflicts ──
echo [*] Clearing port 5000 if busy...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000 " 2^>nul') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo [+] Starting Backend (port 5000)...
start "Prepvox Backend" /D "%~dp0backend" cmd /k "echo Backend starting... && npm run dev"

echo [*] Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo [+] Starting Frontend...
start "Prepvox Frontend" /D "%~dp0frontend" cmd /k "echo Frontend starting... && npm run dev"

echo.
echo ==========================================
echo  [+] Both servers are launching!
echo  [+] Backend  → http://localhost:5000
echo  [+] Frontend → http://localhost:5173
echo.
echo  IMPORTANT: Keep both terminal windows open!
echo  If you see "Cannot connect to localhost":
echo    1. Make sure the Backend window shows
echo       "Server started on port 5000"
echo    2. Then refresh your browser
echo ==========================================
echo.
pause

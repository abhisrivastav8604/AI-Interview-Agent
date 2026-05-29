@echo off
title Prepvox Dev Server
echo ========================================
echo   Starting Prepvox Development Server
echo ========================================
echo.
echo [1/2] Checking Node.js...
node --version
echo.
echo [2/2] Starting Backend + Frontend...
echo        Backend  -^>  http://localhost:5000
echo        Frontend -^>  http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers.
echo ========================================
echo.
npm run dev
pause

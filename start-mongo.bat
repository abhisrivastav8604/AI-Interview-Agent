@echo off
tasklist /FI "IMAGENAME eq mongod.exe" | find /I "mongod.exe" >nul
if errorlevel 1 (
  echo Starting Local MongoDB...
  start /B .\local-mongo\extracted\mongodb-win32-x86_64-windows-7.0.5\bin\mongod.exe --dbpath "%~dp0local-mongo\data" --logpath "%~dp0local-mongo\log\mongo.log" --bind_ip 127.0.0.1
  echo MongoDB is running in the background!
) else (
  echo MongoDB is already running.
)

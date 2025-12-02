@echo off
taskkill /f /im node.exe >nul 2>&1
timeout /t 1 /nobreak >nul
if exist "specs\main\generated\mock-server" (
    rmdir /s /q "specs\main\generated\mock-server" >nul 2>&1
)
echo Done
@echo off
cd /d "%~dp0"
echo ============================================
echo   Locking site folder and starting server...
echo   Do NOT close this window while testing.
echo ============================================
echo.
where python >nul 2>nul
if %errorlevel%==0 (
    echo Site will be available at: http://localhost:8080/
    python -m http.server 8080
) else (
    where py >nul 2>nul
    if %errorlevel%==0 (
        echo Site will be available at: http://localhost:8080/
        py -m http.server 8080
    ) else (
        echo Python not found. Install Python from https://python.org and try again.
        pause
    )
)

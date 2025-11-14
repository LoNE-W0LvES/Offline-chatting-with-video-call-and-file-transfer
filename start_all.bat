@echo off

:: Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: Change to the script's directory (important when running as admin)
cd /d "%~dp0"

echo ========================================
echo  LAN Collaboration Suite Launcher
echo  [Running as Administrator]
echo ========================================
echo.
echo Current directory: %CD%
echo.

:: Get local IP address
echo Detecting local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    goto :found
)

:found
:: Trim leading spaces
for /f "tokens=* delims= " %%a in ("%IP%") do set IP=%%a

if "%IP%"=="" (
    echo ERROR: Could not detect IP address!
    echo Please check your network connection.
    pause
    exit /b 1
)

echo.
echo [OK] Detected IP Address: %IP%
echo.

:: Create/Update .env file
echo VITE_API_URL=https://%IP%:3001 > .env
echo [OK] Created .env file with API URL: https://%IP%:3001
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
)

echo ========================================
echo  Starting All Services...
echo ========================================
echo.
echo  Running all servers concurrently in ONE window:
echo    - Backend:   https://%IP%:3001
echo    - Frontend:  https://%IP%:5173
echo    - HTTP Redirect: http://%IP% (port 80)
echo.
echo IMPORTANT: HTTP redirect uses port 80 which requires
echo            administrator privileges. This script will
echo            start with admin rights automatically.
echo.
echo Press Ctrl+C in the server window to stop all services
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak > nul

:: Start all servers in one window using concurrently
start "LAN Collab Suite - All Services" cmd /K "npm run dev"

:: Wait for services to start
echo.
echo Waiting 8 seconds for all services to initialize...
timeout /t 8 /nobreak > nul

echo.
echo ========================================
echo [OK] All services started in ONE window!
echo ========================================
echo.
echo  Window Title: "LAN Collab Suite - All Services"
echo.
echo  Services running:
echo    [FRONTEND]  Vite Dev Server (port 5173)
echo    [BACKEND]   Express API Server (port 3001)
echo    [REDIRECT]  HTTP to HTTPS Redirect (port 80)
echo.
echo  Access from this PC:
echo    https://localhost:5173
echo.
echo  Access from other devices on LAN:
echo    Option 1 (HTTPS): https://%IP%:5173
echo    Option 2 (HTTP - auto redirects): http://%IP%
echo.
echo  Note: Users must accept the security warning for
echo        self-signed certificate on first visit.
echo.
echo To stop: Close the server window or press Ctrl+C in it
echo.
echo You can close THIS launcher window now.
echo The services will continue running in the other window.
echo.
pause
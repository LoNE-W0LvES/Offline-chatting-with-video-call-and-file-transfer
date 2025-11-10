@echo off
echo ========================================
echo  LAN Collaboration Suite Launcher
echo ========================================
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
echo  Backend:   https://%IP%:3001
echo  Frontend:  https://%IP%:5173
echo  HTTP Redirect:
echo    - http://%IP% (port 80) redirects to https://%IP%:5173
echo.
echo Three windows will open:
echo  1. Server (Backend) - Keep this window open
echo  2. Client (Frontend) - Keep this window open
echo  3. HTTP Redirect - Keep this window open
echo.
echo IMPORTANT: HTTP redirect uses port 80 which may require
echo            administrator privileges. If it fails, right-click
echo            start_all.bat and choose "Run as administrator"
echo.
echo Press Ctrl+C in each window to stop them
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak > nul

:: Start server in new window
start "LAN Collab Server - Port 3001" cmd /K "npm run server"

:: Wait for server to start
echo.
echo Waiting 8 seconds for server to initialize...
timeout /t 8 /nobreak > nul

:: Start client in new window
start "LAN Collab Client - Port 5173 HTTPS" cmd /K "npm run dev"

:: Wait a moment before starting redirect
timeout /t 2 /nobreak > nul

:: Start HTTP redirect server
start "LAN Collab HTTP Redirect - Port 5174" cmd /K "npm run redirect"

echo.
echo ========================================
echo [OK] All services started!
echo ========================================
echo.
echo  Server Window: LAN Collab Server - Port 3001
echo  Client Window: LAN Collab Client - Port 5173 HTTPS
echo  Redirect Window: LAN Collab HTTP Redirect - Port 80
echo.
echo  Access from this PC:
echo    https://localhost:5173
echo.
echo  Access from other devices:
echo    Option 1 (HTTPS): https://%IP%:5173
echo    Option 2 (HTTP - simpler!): http://%IP%
echo.
echo  Note: Users must accept the security warning for
echo        self-signed certificate on first visit.
echo.
echo To stop: Close all three windows or press Ctrl+C in them
echo.
echo You can close THIS window now.
echo.
pause
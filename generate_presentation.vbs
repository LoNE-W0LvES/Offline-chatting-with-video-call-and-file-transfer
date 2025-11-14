' ============================================================================
' LAN Collaboration Suite - Educational Presentation Generator
' For Telemetry Medicine Course
' Copyright © 2025 LoNE WoLvES
' ============================================================================

Option Explicit

Dim objPPT, objPresentation, objSlide, objTextbox, objShape
Dim slideIndex

' Create PowerPoint Application
Set objPPT = CreateObject("PowerPoint.Application")
objPPT.Visible = True

' Create new presentation
Set objPresentation = objPPT.Presentations.Add

' Set presentation properties
objPresentation.PageSetup.SlideWidth = 720  ' 10 inches
objPresentation.PageSetup.SlideHeight = 540 ' 7.5 inches

slideIndex = 1

' ============================================================================
' SLIDE 1: Title Slide
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11) ' ppLayoutTitleOnly
objSlide.Shapes(1).TextFrame.TextRange.Text = "LAN Collaboration Suite"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 54
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True
objSlide.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(37, 99, 235)

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 200, 620, 100)
objTextbox.TextFrame.TextRange.Text = "Telemetry Medicine Course" & vbCrLf & _
    "Real-time Collaboration & IoT Device Monitoring" & vbCrLf & vbCrLf & _
    "Copyright © 2025 LoNE WoLvES"
objTextbox.TextFrame.TextRange.Font.Size = 24
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2 ' ppAlignCenter

AddNote objSlide, "[IMAGE: Add screenshot of home page with all feature cards]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 2: Course Overview
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "What You'll Learn Today"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 120, 620, 400)
objTextbox.TextFrame.TextRange.Text = "1. Software Installation & Setup" & vbCrLf & vbCrLf & _
    "2. Network Configuration (LAN & Online)" & vbCrLf & vbCrLf & _
    "3. Router Configuration & Port Forwarding" & vbCrLf & vbCrLf & _
    "4. All Features & Pages Overview" & vbCrLf & vbCrLf & _
    "5. IoT Device Monitoring for Medical Telemetry" & vbCrLf & vbCrLf & _
    "6. Practical Usage Examples"
objTextbox.TextFrame.TextRange.Font.Size = 20
objTextbox.TextFrame.TextRange.ParagraphFormat.Bullet.Visible = False

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 3: System Requirements
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "System Requirements"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 120, 300, 350)
objTextbox.TextFrame.TextRange.Text = "Software Required:" & vbCrLf & _
    "- Node.js 18.0+" & vbCrLf & _
    "- npm 8.0+" & vbCrLf & _
    "- Git" & vbCrLf & _
    "- Modern web browser" & vbCrLf & vbCrLf & _
    "Network:" & vbCrLf & _
    "- Local network (WiFi/Ethernet)" & vbCrLf & _
    "- Administrator access" & vbCrLf & vbCrLf & _
    "Ports Used:" & vbCrLf & _
    "- Port 80 (HTTP redirect)" & vbCrLf & _
    "- Port 3001 (Backend API)" & vbCrLf & _
    "- Port 5173 (Frontend)"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 120, 300, 350)
objTextbox.TextFrame.TextRange.Text = "Supported Platforms:" & vbCrLf & vbCrLf & _
    "Desktop (Full Features):" & vbCrLf & _
    "[OK] Windows 10/11" & vbCrLf & _
    "[OK] macOS 10.15+" & vbCrLf & _
    "[OK] Linux (Ubuntu, Debian)" & vbCrLf & vbCrLf & _
    "Mobile (Limited):" & vbCrLf & _
    "[OK] iOS 14+ (no screen share)" & vbCrLf & _
    "[OK] Android 9+ (no screen share)" & vbCrLf & vbCrLf & _
    "Browsers:" & vbCrLf & _
    "- Chrome 90+" & vbCrLf & _
    "- Firefox 88+" & vbCrLf & _
    "- Edge 90+" & vbCrLf & _
    "- Safari 14+"
objTextbox.TextFrame.TextRange.Font.Size = 16

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 4: Installation Steps
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Installation Steps"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 120, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Step 1: Clone the Repository" & vbCrLf & _
    "  git clone <repository-url>" & vbCrLf & _
    "  cd Offline-chatting-with-video-call-and-file-transfer" & vbCrLf & vbCrLf & _
    "Step 2: Install Dependencies" & vbCrLf & _
    "  npm install" & vbCrLf & vbCrLf & _
    "Step 3: Generate SSL Certificates (Required for HTTPS)" & vbCrLf & _
    "  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes" & vbCrLf & vbCrLf & _
    "Step 4: Run the Application" & vbCrLf & _
    "  Windows: Right-click start_all.bat -> Run as Administrator" & vbCrLf & _
    "  Or manually: npm run dev (requires admin for port 80)"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Name = "Consolas"

AddNote objSlide, "[IMAGE: Screenshot of command prompt showing successful npm install]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 5: Network Architecture
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Network Architecture"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 120, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Three-Server Architecture:" & vbCrLf & vbCrLf & _
    "1. Frontend Server (Port 5173)" & vbCrLf & _
    "   - Vite development server" & vbCrLf & _
    "   - Serves React application" & vbCrLf & _
    "   - Hot-reload for development" & vbCrLf & vbCrLf & _
    "2. Backend Server (Port 3001)" & vbCrLf & _
    "   - Express.js API server" & vbCrLf & _
    "   - Handles authentication, files, IoT polling" & vbCrLf & _
    "   - WebRTC signaling server" & vbCrLf & vbCrLf & _
    "3. HTTP Redirect Server (Port 80)" & vbCrLf & _
    "   - Automatically redirects HTTP -> HTTPS" & vbCrLf & _
    "   - Easier access for users (no port number needed)" & vbCrLf & _
    "   - Requires administrator privileges"
objTextbox.TextFrame.TextRange.Font.Size = 18

AddNote objSlide, "[IMAGE: Network diagram showing the three servers and their connections]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 6: Finding Your IP Address
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Finding Your Local IP Address"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 120, 300, 350)
objTextbox.TextFrame.TextRange.Text = "Windows:" & vbCrLf & vbCrLf & _
    "1. Open Command Prompt" & vbCrLf & vbCrLf & _
    "2. Type: ipconfig" & vbCrLf & vbCrLf & _
    "3. Look for IPv4 Address" & vbCrLf & _
    "   under your network adapter" & vbCrLf & vbCrLf & _
    "Example:" & vbCrLf & _
    "IPv4 Address: 192.168.1.100" & vbCrLf & vbCrLf & _
    "Also find MAC Address:" & vbCrLf & _
    "Physical Address:" & vbCrLf & _
    "00-1A-2B-3C-4D-5E"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 120, 300, 350)
objTextbox.TextFrame.TextRange.Text = "Linux/Mac:" & vbCrLf & vbCrLf & _
    "1. Open Terminal" & vbCrLf & vbCrLf & _
    "2. Type: ifconfig" & vbCrLf & _
    "   or: ip addr" & vbCrLf & vbCrLf & _
    "3. Look for inet address" & vbCrLf & vbCrLf & _
    "Important:" & vbCrLf & _
    "- Use this IP in .env file" & vbCrLf & _
    "- Share with other users" & vbCrLf & _
    "- Required for router setup"
objTextbox.TextFrame.TextRange.Font.Size = 18

AddNote objSlide, "[IMAGE: Screenshot of ipconfig command output highlighting IPv4 and MAC address]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 7: Static IP Reservation
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Static IP Address Reservation"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Why Reserve IP Address?" & vbCrLf & _
    "- Ensures server always gets same IP address" & vbCrLf & _
    "- Prevents connection issues after router restart" & vbCrLf & _
    "- Required for port forwarding to work consistently" & vbCrLf & vbCrLf & _
    "Steps:" & vbCrLf & _
    "1. Access router admin panel (usually 192.168.1.1 or 192.168.0.1)" & vbCrLf & _
    "2. Find DHCP Reservation / Address Reservation / Static DHCP" & vbCrLf & _
    "3. Add new reservation:" & vbCrLf & _
    "   - Device Name: LAN-Collab-Server" & vbCrLf & _
    "   - MAC Address: Your computer's MAC (from ipconfig)" & vbCrLf & _
    "   - IP Address: Choose static IP (e.g., 192.168.1.100)" & vbCrLf & _
    "4. Save and restart router if needed" & vbCrLf & vbCrLf & _
    "Router Brand Locations:" & vbCrLf & _
    "- TP-Link: Advanced -> Network -> DHCP Server -> Address Reservation" & vbCrLf & _
    "- Netgear: Advanced -> Setup -> LAN Setup -> Address Reservation" & vbCrLf & _
    "- ASUS: LAN -> DHCP Server -> Manually Assigned IP"
objTextbox.TextFrame.TextRange.Font.Size = 16

AddNote objSlide, "[IMAGE: Router admin panel showing DHCP reservation page]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 8: Port Forwarding Configuration
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Port Forwarding for Online Access"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Port Forwarding Rules to Create:" & vbCrLf & vbCrLf & _
    "Rule 1: HTTPS Frontend" & vbCrLf & _
    "  - External Port: 5173  ->  Internal IP: 192.168.1.100  ->  Internal Port: 5173" & vbCrLf & _
    "  - Protocol: TCP" & vbCrLf & vbCrLf & _
    "Rule 2: HTTPS Backend API" & vbCrLf & _
    "  - External Port: 3001  ->  Internal IP: 192.168.1.100  ->  Internal Port: 3001" & vbCrLf & _
    "  - Protocol: TCP" & vbCrLf & vbCrLf & _
    "Rule 3: HTTP Redirect" & vbCrLf & _
    "  - External Port: 80  ->  Internal IP: 192.168.1.100  ->  Internal Port: 80" & vbCrLf & _
    "  - Protocol: TCP" & vbCrLf & vbCrLf & _
    "Where to Find:" & vbCrLf & _
    "  Router Admin -> Advanced -> Port Forwarding / Virtual Server / NAT Forwarding" & vbCrLf & vbCrLf & _
    "Test Port Forwarding:" & vbCrLf & _
    "  Visit: https://www.yougetsignal.com/tools/open-ports/"
objTextbox.TextFrame.TextRange.Font.Size = 16

AddNote objSlide, "[IMAGE: Router port forwarding configuration page with the three rules added]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 9: Firewall Configuration
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Windows Firewall Configuration"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 620, 380)
objTextbox.TextFrame.TextRange.Text = "PowerShell Commands (Run as Administrator):" & vbCrLf & vbCrLf & _
    "New-NetFirewallRule -DisplayName ""LAN Collab Frontend"" `" & vbCrLf & _
    "  -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow" & vbCrLf & vbCrLf & _
    "New-NetFirewallRule -DisplayName ""LAN Collab Backend"" `" & vbCrLf & _
    "  -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow" & vbCrLf & vbCrLf & _
    "New-NetFirewallRule -DisplayName ""LAN Collab HTTP"" `" & vbCrLf & _
    "  -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow" & vbCrLf & vbCrLf & _
    "OR use GUI:" & vbCrLf & _
    "1. Open Windows Defender Firewall" & vbCrLf & _
    "2. Click 'Advanced settings'" & vbCrLf & _
    "3. Click 'Inbound Rules' -> 'New Rule'" & vbCrLf & _
    "4. Select 'Port' -> 'TCP' -> Enter port numbers" & vbCrLf & _
    "5. Allow the connection -> Apply to all profiles"
objTextbox.TextFrame.TextRange.Font.Size = 15
objTextbox.TextFrame.TextRange.Font.Name = "Consolas"

AddNote objSlide, "[IMAGE: Windows Firewall with Advanced Security showing the three inbound rules]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 10: Theory - LAN vs Online Access
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Understanding LAN vs Online Access"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "LAN (Local Area Network):" & vbCrLf & vbCrLf & _
    "[OK] All devices on same network" & vbCrLf & _
    "[OK] No internet required" & vbCrLf & _
    "[OK] Faster speeds" & vbCrLf & _
    "[OK] More secure" & vbCrLf & _
    "[OK] ALL features work" & vbCrLf & vbCrLf & _
    "Access via:" & vbCrLf & _
    "- http://192.168.1.100" & vbCrLf & _
    "- https://192.168.1.100:5173" & vbCrLf & vbCrLf & _
    "Perfect for:" & vbCrLf & _
    "- Hospital/clinic networks" & vbCrLf & _
    "- Educational labs" & vbCrLf & _
    "- Private networks"
objTextbox.TextFrame.TextRange.Font.Size = 16

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Online (Internet Access):" & vbCrLf & vbCrLf & _
    "[OK] Access from anywhere" & vbCrLf & _
    "[OK] Requires port forwarding" & vbCrLf & _
    "(!) Security concerns" & vbCrLf & _
    "(!) WebRTC limitations" & vbCrLf & vbCrLf & _
    "What Works:" & vbCrLf & _
    "[OK] Chat & messaging" & vbCrLf & _
    "[OK] File sharing" & vbCrLf & _
    "[OK] IoT monitoring" & vbCrLf & vbCrLf & _
    "What May NOT Work:" & vbCrLf & _
    "[X] Video calls (needs TURN)" & vbCrLf & _
    "[X] P2P file transfer" & vbCrLf & vbCrLf & _
    "Recommended:" & vbCrLf & _
    "- Use VPN instead" & vbCrLf & _
    "- More secure" & vbCrLf & _
    "- All features work"
objTextbox.TextFrame.TextRange.Font.Size = 15

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 11: Application Overview
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Application Features Overview"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Communication:" & vbCrLf & _
    "- Video/Audio Calls" & vbCrLf & _
    "- Screen Sharing (Desktop)" & vbCrLf & _
    "- Direct Messages" & vbCrLf & _
    "- Global Chat Room" & vbCrLf & _
    "- Meeting Rooms" & vbCrLf & vbCrLf & _
    "File Management:" & vbCrLf & _
    "- Public File Server" & vbCrLf & _
    "- Private File Sharing" & vbCrLf & _
    "- Meeting File Sharing" & vbCrLf & _
    "- P2P File Transfer" & vbCrLf & vbCrLf & _
    "User Management:" & vbCrLf & _
    "- User Registration" & vbCrLf & _
    "- Secure Login" & vbCrLf & _
    "- User Directory"
objTextbox.TextFrame.TextRange.Font.Size = 17

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "IoT & Telemetry:" & vbCrLf & _
    "- Device Management" & vbCrLf & _
    "- Automatic Polling" & vbCrLf & _
    "- Real-time Data Display" & vbCrLf & _
    "- Status Monitoring" & vbCrLf & _
    "- Error Reporting" & vbCrLf & vbCrLf & _
    "Notifications:" & vbCrLf & _
    "- Call Notifications" & vbCrLf & _
    "- Message Alerts" & vbCrLf & _
    "- Desktop Notifications" & vbCrLf & _
    "- Notification Center" & vbCrLf & vbCrLf & _
    "User Interface:" & vbCrLf & _
    "- Modern Design" & vbCrLf & _
    "- Responsive Layout" & vbCrLf & _
    "- Easy Navigation"
objTextbox.TextFrame.TextRange.Font.Size = 17

AddNote objSlide, "[IMAGE: Home page dashboard showing all 8 feature cards]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 12: Login Page
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 1: Login Page"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "What it is:" & vbCrLf & _
    "Authentication entry point" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- Username input" & vbCrLf & _
    "- Password input" & vbCrLf & _
    "- Login button" & vbCrLf & _
    "- Link to signup page" & vbCrLf & _
    "- Session persistence" & vbCrLf & _
    "- Copyright notice" & vbCrLf & vbCrLf & _
    "How to use:" & vbCrLf & _
    "1. Enter username" & vbCrLf & _
    "2. Enter password" & vbCrLf & _
    "3. Click ""Login""" & vbCrLf & _
    "4. Redirects to home page"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "Login page showing:" & vbCrLf & _
    "- Username field" & vbCrLf & _
    "- Password field" & vbCrLf & _
    "- Login button" & vbCrLf & _
    "- Sign up link" & vbCrLf & _
    "- LoNE WoLvES copyright"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 13: Signup Page
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 2: Signup Page"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "What it is:" & vbCrLf & _
    "User registration page" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- Full name input" & vbCrLf & _
    "- Username selection" & vbCrLf & _
    "- Password creation" & vbCrLf & _
    "- Unique username check" & vbCrLf & _
    "- Auto-login after signup" & vbCrLf & vbCrLf & _
    "How to use:" & vbCrLf & _
    "1. Enter full name" & vbCrLf & _
    "2. Choose username" & vbCrLf & _
    "3. Create password" & vbCrLf & _
    "4. Click ""Sign Up""" & vbCrLf & _
    "5. Auto redirects to home"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "Signup page showing:" & vbCrLf & _
    "- Full name field" & vbCrLf & _
    "- Username field" & vbCrLf & _
    "- Password field" & vbCrLf & _
    "- Sign Up button" & vbCrLf & _
    "- Link back to login"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 14: Home Page
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 3: Home Page (Dashboard)"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "Main dashboard with 8 cards:" & vbCrLf & vbCrLf & _
    "1. Start Meeting" & vbCrLf & _
    "   Create new video conference" & vbCrLf & vbCrLf & _
    "2. Join Meeting" & vbCrLf & _
    "   Enter existing room ID" & vbCrLf & vbCrLf & _
    "3. View Users" & vbCrLf & _
    "   Browse all registered users" & vbCrLf & vbCrLf & _
    "4. Global Chat" & vbCrLf & _
    "   Public chatroom" & vbCrLf & vbCrLf & _
    "5. Shared with Me" & vbCrLf & _
    "   Private file inbox"
objTextbox.TextFrame.TextRange.Font.Size = 16

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "6. File Server" & vbCrLf & _
    "   Public file repository" & vbCrLf & vbCrLf & _
    "7. My Messages" & vbCrLf & _
    "   Direct message inbox" & vbCrLf & vbCrLf & _
    "8. IoT Monitor" & vbCrLf & _
    "   Device monitoring" & vbCrLf & vbCrLf & _
    "Header Features:" & vbCrLf & _
    "- Welcome message" & vbCrLf & _
    "- Notification bell" & vbCrLf & _
    "- Logout button" & vbCrLf & vbCrLf & _
    "Footer:" & vbCrLf & _
    "- LoNE WoLvES copyright"
objTextbox.TextFrame.TextRange.Font.Size = 16

AddNote objSlide, "[IMAGE: Home page with all 8 gradient feature cards displayed]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 15: Users Page
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 4: Users Directory"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "What it is:" & vbCrLf & _
    "Directory of all users" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- List of all registered users" & vbCrLf & _
    "- Full name display" & vbCrLf & _
    "- Username display" & vbCrLf & _
    "- Online/offline status" & vbCrLf & _
    "- Call button" & vbCrLf & _
    "- Message button" & vbCrLf & vbCrLf & _
    "How to use:" & vbCrLf & _
    "1. Browse user list" & vbCrLf & _
    "2. Click ""Call"" to video call" & vbCrLf & _
    "3. Click ""Message"" for DM" & vbCrLf & _
    "4. Click ""Back"" to return"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "Users page showing:" & vbCrLf & _
    "- List of 3-4 users" & vbCrLf & _
    "- User names" & vbCrLf & _
    "- Online status indicators" & vbCrLf & _
    "- Call buttons" & vbCrLf & _
    "- Message buttons"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 16: Meeting Room
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 5: Meeting Room"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "Video conferencing interface" & vbCrLf & vbCrLf & _
    "Main Area:" & vbCrLf & _
    "- Video grid (all participants)" & vbCrLf & _
    "- Self-view camera" & vbCrLf & vbCrLf & _
    "Controls:" & vbCrLf & _
    "- Microphone (mute/unmute)" & vbCrLf & _
    "- Camera (on/off)" & vbCrLf & _
    "- Screen share (desktop only)" & vbCrLf & _
    "- Leave meeting" & vbCrLf & vbCrLf & _
    "Sidebar - 3 Tabs:" & vbCrLf & _
    "- Chat (group messaging)" & vbCrLf & _
    "- Participants (user list)" & vbCrLf & _
    "- Files (share in meeting)"
objTextbox.TextFrame.TextRange.Font.Size = 17

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "How to use:" & vbCrLf & _
    "1. Allow camera/mic access" & vbCrLf & _
    "2. See all participants" & vbCrLf & _
    "3. Toggle audio/video" & vbCrLf & _
    "4. Share screen (PC only)" & vbCrLf & _
    "5. Chat with participants" & vbCrLf & _
    "6. Share files" & vbCrLf & _
    "7. Copy room ID to invite" & vbCrLf & vbCrLf & _
    "Platform Support:" & vbCrLf & _
    "[OK] Desktop: Full features" & vbCrLf & _
    "[OK] Mobile: Video/audio only" & vbCrLf & _
    "[X] Mobile: No screen share"
objTextbox.TextFrame.TextRange.Font.Size = 17

AddNote objSlide, "[IMAGE: Meeting room with video grid, controls, and sidebar visible]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 17: Global Chat
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 6: Global Chat Room"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "What it is:" & vbCrLf & _
    "Public chatroom for all users" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- Real-time messages" & vbCrLf & _
    "- Message history" & vbCrLf & _
    "- Sender's name display" & vbCrLf & _
    "- Timestamps" & vbCrLf & _
    "- Auto-scroll to latest" & vbCrLf & _
    "- 1-second refresh rate" & vbCrLf & vbCrLf & _
    "How to use:" & vbCrLf & _
    "1. Type message in field" & vbCrLf & _
    "2. Click ""Send"" or Enter" & vbCrLf & _
    "3. Messages visible to all" & vbCrLf & _
    "4. Scroll to see history"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "Global chat showing:" & vbCrLf & _
    "- Multiple messages" & vbCrLf & _
    "- Different senders" & vbCrLf & _
    "- Timestamps" & vbCrLf & _
    "- Message input field" & vbCrLf & _
    "- Send button"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 18: IoT Data Page (MAIN FEATURE)
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 7: IoT Device Monitoring"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True
objSlide.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(220, 38, 38) ' Red for emphasis

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "Telemetry Dashboard" & vbCrLf & vbCrLf & _
    "Add Device Fields:" & vbCrLf & _
    "- Device Local IP" & vbCrLf & _
    "- Endpoint (API path)" & vbCrLf & _
    "- Ping interval (seconds)" & vbCrLf & vbCrLf & _
    "Device Display:" & vbCrLf & _
    "- IP address" & vbCrLf & _
    "- Endpoint" & vbCrLf & _
    "- Polling frequency" & vbCrLf & _
    "- Status (Active/Error)" & vbCrLf & _
    "- Last update time" & vbCrLf & _
    "- JSON data response" & vbCrLf & _
    "- Edit/Delete buttons"
objTextbox.TextFrame.TextRange.Font.Size = 17

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "How Server Polling Works:" & vbCrLf & _
    "1. User adds device config" & vbCrLf & _
    "2. Server polls device URL" & vbCrLf & _
    "   every X seconds" & vbCrLf & _
    "3. Fetches JSON data" & vbCrLf & _
    "4. Saves to file" & vbCrLf & _
    "5. UI refreshes every 2 sec" & vbCrLf & vbCrLf & _
    "Medical Use Cases:" & vbCrLf & _
    "- Patient vital signs" & vbCrLf & _
    "- ECG monitors" & vbCrLf & _
    "- Pulse oximeters" & vbCrLf & _
    "- Temperature sensors" & vbCrLf & _
    "- Blood pressure monitors"
objTextbox.TextFrame.TextRange.Font.Size = 16

AddNote objSlide, "[IMAGE: IoT page showing 2-3 devices with live JSON data, status indicators]"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 19: IoT Device Example
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "IoT Device Configuration Example"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Example: Patient Monitor Configuration" & vbCrLf & vbCrLf & _
    "Device Local IP: 192.168.1.55" & vbCrLf & _
    "Endpoint: /vitals" & vbCrLf & _
    "Ping Every: 5 seconds" & vbCrLf & vbCrLf & _
    "Server will fetch: http://192.168.1.55/vitals every 5 seconds" & vbCrLf & vbCrLf & _
    "Expected JSON Response:" & vbCrLf & _
    "{" & vbCrLf & _
    "  ""patient_id"": ""P001""," & vbCrLf & _
    "  ""heart_rate"": 72," & vbCrLf & _
    "  ""blood_pressure"": ""120/80""," & vbCrLf & _
    "  ""oxygen_saturation"": 98," & vbCrLf & _
    "  ""temperature"": 36.8," & vbCrLf & _
    "  ""timestamp"": ""2025-11-14T10:30:45Z""" & vbCrLf & _
    "}" & vbCrLf & vbCrLf & _
    "This data will update automatically in the UI every 5 seconds!"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Name = "Consolas"

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 20: File Server
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Page 8: File Server"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Public file repository" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- Upload files" & vbCrLf & _
    "- Download files" & vbCrLf & _
    "- Delete own files" & vbCrLf & _
    "- View all uploaded files" & vbCrLf & vbCrLf & _
    "File Information:" & vbCrLf & _
    "- File name" & vbCrLf & _
    "- Uploader name" & vbCrLf & _
    "- Upload date" & vbCrLf & _
    "- File size" & vbCrLf & vbCrLf & _
    "How to use:" & vbCrLf & _
    "1. Click ""Choose File""" & vbCrLf & _
    "2. Select file" & vbCrLf & _
    "3. Click ""Upload""" & vbCrLf & _
    "4. File visible to all"
objTextbox.TextFrame.TextRange.Font.Size = 17

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "File server showing:" & vbCrLf & _
    "- Upload interface" & vbCrLf & _
    "- List of uploaded files" & vbCrLf & _
    "- File details" & vbCrLf & _
    "- Download buttons" & vbCrLf & _
    "- Delete buttons"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 21: Notification Center
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Notification Center"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Accessible from all pages" & vbCrLf & vbCrLf & _
    "Features:" & vbCrLf & _
    "- Bell icon in header" & vbCrLf & _
    "- Unread count badge" & vbCrLf & _
    "- Dropdown panel" & vbCrLf & vbCrLf & _
    "Notification Types:" & vbCrLf & _
    "- Incoming calls" & vbCrLf & _
    "- New messages" & vbCrLf & _
    "- System notifications" & vbCrLf & vbCrLf & _
    "Actions:" & vbCrLf & _
    "- Mark as read" & vbCrLf & _
    "- Delete individual" & vbCrLf & _
    "- Clear all" & vbCrLf & _
    "- Real-time updates"
objTextbox.TextFrame.TextRange.Font.Size = 18

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 150, 300, 320)
objTextbox.TextFrame.TextRange.Text = "[IMAGE PLACEHOLDER]" & vbCrLf & vbCrLf & _
    "Add screenshot of:" & vbCrLf & _
    "Notification dropdown:" & vbCrLf & _
    "- Bell icon with badge" & vbCrLf & _
    "- Open dropdown panel" & vbCrLf & _
    "- List of notifications" & vbCrLf & _
    "- Clear all button"
objTextbox.TextFrame.TextRange.Font.Size = 16
objTextbox.TextFrame.TextRange.Font.Italic = True
objTextbox.Fill.ForeColor.RGB = RGB(240, 240, 240)
objTextbox.Line.ForeColor.RGB = RGB(200, 200, 200)
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 22: Security Considerations
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Security Considerations"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Current Limitations:" & vbCrLf & vbCrLf & _
    "(!) Passwords in plaintext" & vbCrLf & _
    "(!) Self-signed SSL cert" & vbCrLf & _
    "(!) No TURN server" & vbCrLf & _
    "(!) Basic authentication" & vbCrLf & vbCrLf & _
    "Recommendations:" & vbCrLf & _
    "- Use on trusted networks" & vbCrLf & _
    "- Educational purposes" & vbCrLf & _
    "- Controlled environment" & vbCrLf & vbCrLf & _
    "For Production:" & vbCrLf & _
    "- Implement password hashing" & vbCrLf & _
    "- Use real SSL certificates" & vbCrLf & _
    "- Add TURN servers" & vbCrLf & _
    "- Rate limiting" & vbCrLf & _
    "- Use VPN instead of port forwarding"
objTextbox.TextFrame.TextRange.Font.Size = 16

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Best Practices:" & vbCrLf & vbCrLf & _
    "[OK] Keep software updated" & vbCrLf & _
    "[OK] Use strong passwords" & vbCrLf & _
    "[OK] Limit user access" & vbCrLf & _
    "[OK] Monitor network traffic" & vbCrLf & _
    "[OK] Regular backups" & vbCrLf & vbCrLf & _
    "VPN Alternative:" & vbCrLf & _
    "- More secure than port forwarding" & vbCrLf & _
    "- All features work" & vbCrLf & _
    "- No exposed ports" & vbCrLf & _
    "- Encrypted traffic" & vbCrLf & vbCrLf & _
    "Options:" & vbCrLf & _
    "- OpenVPN" & vbCrLf & _
    "- WireGuard" & vbCrLf & _
    "- Windows built-in VPN"
objTextbox.TextFrame.TextRange.Font.Size = 16

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 23: Troubleshooting Common Issues
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Troubleshooting Common Issues"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 40
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "Can't connect from other devices:" & vbCrLf & _
    "- Check firewall settings" & vbCrLf & _
    "- Verify same network" & vbCrLf & _
    "- Confirm IP address" & vbCrLf & _
    "- Accept SSL warning" & vbCrLf & vbCrLf & _
    "Camera/Mic not working:" & vbCrLf & _
    "- Must use HTTPS" & vbCrLf & _
    "- Check browser permissions" & vbCrLf & _
    "- Try different browser" & vbCrLf & vbCrLf & _
    "Screen share not available:" & vbCrLf & _
    "- Desktop only (not mobile)" & vbCrLf & _
    "- Requires HTTPS" & vbCrLf & _
    "- Modern browser needed"
objTextbox.TextFrame.TextRange.Font.Size = 16

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 100, 300, 390)
objTextbox.TextFrame.TextRange.Text = "IoT device not responding:" & vbCrLf & _
    "- Verify IP address" & vbCrLf & _
    "- Check same network" & vbCrLf & _
    "- Test endpoint in browser" & vbCrLf & _
    "- Verify JSON format" & vbCrLf & vbCrLf & _
    "Port 80 access denied:" & vbCrLf & _
    "- Run as administrator" & vbCrLf & _
    "- Check if port in use" & vbCrLf & _
    "- Disable other web servers" & vbCrLf & vbCrLf & _
    "Can't access online:" & vbCrLf & _
    "- Verify port forwarding" & vbCrLf & _
    "- Check ISP blocks ports" & vbCrLf & _
    "- Test with port checker" & vbCrLf & _
    "- Ensure server running"
objTextbox.TextFrame.TextRange.Font.Size = 16

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 24: Practical Exercise
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Practical Exercise"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 620, 380)
objTextbox.TextFrame.TextRange.Text = "Exercise: Set Up IoT Device Monitoring for Telemetry" & vbCrLf & vbCrLf & _
    "Objective: Monitor a simulated patient vital signs device" & vbCrLf & vbCrLf & _
    "Steps:" & vbCrLf & _
    "1. Install and start the application" & vbCrLf & _
    "2. Create a user account and login" & vbCrLf & _
    "3. Navigate to IoT Monitor page" & vbCrLf & _
    "4. Add a new device:" & vbCrLf & _
    "   - Device IP: [Your IoT device IP or simulation]" & vbCrLf & _
    "   - Endpoint: /vitals" & vbCrLf & _
    "   - Polling: 10 seconds" & vbCrLf & _
    "5. Observe data updates" & vbCrLf & _
    "6. Edit polling interval to 5 seconds" & vbCrLf & _
    "7. Test error handling (disconnect device)" & vbCrLf & vbCrLf & _
    "Discussion Points:" & vbCrLf & _
    "- How could this be used in a real hospital?" & vbCrLf & _
    "- What other medical devices could be monitored?" & vbCrLf & _
    "- What improvements would you suggest?"
objTextbox.TextFrame.TextRange.Font.Size = 16

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 25: Summary & Resources
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Summary & Resources"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 44
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "What We Covered:" & vbCrLf & vbCrLf & _
    "[OK] Installation & Setup" & vbCrLf & _
    "[OK] Network Configuration" & vbCrLf & _
    "[OK] Router Setup" & vbCrLf & _
    "[OK] All Application Features" & vbCrLf & _
    "[OK] IoT Device Monitoring" & vbCrLf & _
    "[OK] Security Considerations" & vbCrLf & _
    "[OK] Troubleshooting" & vbCrLf & vbCrLf & _
    "Key Takeaways:" & vbCrLf & _
    "- LAN collaboration tool" & vbCrLf & _
    "- WebRTC technology" & vbCrLf & _
    "- Medical telemetry use" & vbCrLf & _
    "- Real-time monitoring" & vbCrLf & _
    "- Network fundamentals"
objTextbox.TextFrame.TextRange.Font.Size = 17

Set objTextbox = objSlide.Shapes.AddTextbox(1, 370, 110, 300, 380)
objTextbox.TextFrame.TextRange.Text = "Resources:" & vbCrLf & vbCrLf & _
    "Documentation:" & vbCrLf & _
    "- README.md (complete guide)" & vbCrLf & _
    "- All pages documented" & vbCrLf & _
    "- Troubleshooting section" & vbCrLf & vbCrLf & _
    "Further Learning:" & vbCrLf & _
    "- WebRTC technology" & vbCrLf & _
    "- Network protocols" & vbCrLf & _
    "- IoT fundamentals" & vbCrLf & _
    "- Medical telemetry" & vbCrLf & vbCrLf & _
    "Support:" & vbCrLf & _
    "- Check README.md" & vbCrLf & _
    "- Review browser console" & vbCrLf & _
    "- Test on local network first"
objTextbox.TextFrame.TextRange.Font.Size = 16

slideIndex = slideIndex + 1

' ============================================================================
' SLIDE 26: Q&A
' ============================================================================
Set objSlide = objPresentation.Slides.Add(slideIndex, 11)
objSlide.Shapes(1).TextFrame.TextRange.Text = "Questions & Discussion"
objSlide.Shapes(1).TextFrame.TextRange.Font.Size = 54
objSlide.Shapes(1).TextFrame.TextRange.Font.Bold = True
objSlide.Shapes(1).TextFrame.TextRange.Font.Color.RGB = RGB(37, 99, 235)

Set objTextbox = objSlide.Shapes.AddTextbox(1, 50, 200, 620, 200)
objTextbox.TextFrame.TextRange.Text = "Thank you for attending!" & vbCrLf & vbCrLf & _
    "Questions?" & vbCrLf & vbCrLf & _
    "© 2025 LoNE WoLvES. All rights reserved."
objTextbox.TextFrame.TextRange.Font.Size = 28
objTextbox.TextFrame.TextRange.ParagraphFormat.Alignment = 2 ' ppAlignCenter

slideIndex = slideIndex + 1

' ============================================================================
' Save the presentation
' ============================================================================
Dim savePath
savePath = CreateObject("WScript.Shell").CurrentDirectory & "\LAN_Collaboration_Suite_Telemetry_Medicine_Course.pptx"

objPresentation.SaveAs savePath

MsgBox "Presentation created successfully!" & vbCrLf & vbCrLf & _
       "File saved as:" & vbCrLf & savePath & vbCrLf & vbCrLf & _
       "Total slides: " & (slideIndex - 1) & vbCrLf & vbCrLf & _
       "Please add screenshots to the image placeholders.", vbInformation, "Success"

' ============================================================================
' Helper Functions
' ============================================================================
Sub AddNote(slide, noteText)
    On Error Resume Next
    slide.NotesPage.Shapes.Placeholders(2).TextFrame.TextRange.Text = noteText
    On Error GoTo 0
End Sub

' Cleanup
Set objSlide = Nothing
Set objPresentation = Nothing
Set objPPT = Nothing

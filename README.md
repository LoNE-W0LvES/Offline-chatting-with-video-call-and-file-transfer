# 🌐 LAN Collaboration Suite

A comprehensive real-time collaboration platform designed for local network communication. Built with React, TypeScript, and WebRTC for peer-to-peer video calls, messaging, and file sharing - all without requiring internet connectivity.

**Perfect for teaching telemetry medicine courses** with built-in IoT device monitoring capabilities for tracking medical sensors and patient monitors on your local network.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Router Configuration for Online Access](#-router-configuration-for-online-access)
- [Usage Guide](#-usage-guide)
- [All Pages and Features Explained](#-all-pages-and-features-explained)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)
- [Technology Stack](#-technology-stack)

---

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration**: Create accounts with username, password, and full name
- **Secure Login**: Persistent authentication with local storage
- **User Directory**: Browse all registered users on the network

### 📞 Real-Time Communication
- **Video Calls**: High-quality peer-to-peer video calls using WebRTC
- **Audio Controls**: Mute/unmute microphone during calls
- **Video Controls**: Toggle camera on/off
- **Call Notifications**: Desktop notifications for incoming calls
- **Ringtone System**: Audio alerts for incoming calls

### 🎥 Meeting Rooms
- **Instant Meetings**: Create meeting rooms with unique IDs
- **Group Meetings**: Invite multiple users to a single meeting
- **Meeting Invitations**: Send meeting invites to specific users
- **Screen Sharing**: Share your screen with meeting participants (desktop only)
- **Room-based File Sharing**: Share files within meeting contexts
- **Persistent Room IDs**: Share room IDs to let others join

### 💬 Messaging System
- **Direct Messages**: One-on-one private messaging
- **Global Chatroom**: Public chat visible to all users (accessible from home page)
- **Real-time Updates**: Messages appear instantly (1-second polling)
- **Message History**: Persistent message storage
- **Read Receipts**: Track message read status

### 📁 File Management
- **File Server**: Central repository for public file sharing
- **Meeting File Sharing**: Share files within specific meetings
- **P2P File Transfer**: WebRTC-based direct file transfers
- **Private Sharing**: Send files directly to specific users
- **File Organization**: Separate folders for meeting rooms
- **Download Management**: Easy file download interface

### 🏥 IoT Device Monitoring (Telemetry)
- **Device Management**: Add, edit, and remove IoT devices (medical sensors, monitors)
- **Automatic Polling**: Server automatically fetches data from devices at configured intervals
- **Real-time Data Display**: View JSON responses from devices (vital signs, measurements)
- **Device Configuration**: Set device IP, endpoint, and polling frequency
- **Status Monitoring**: Track device connectivity and last update times
- **Error Reporting**: Display connection errors and troubleshooting information
- **Medical Use Case**: Perfect for monitoring patient telemetry devices on a local network

### 🔔 Notification System
- **Real-time Notifications**: Instant alerts for messages and calls
- **Notification Center**: Centralized notification management
- **Desktop Notifications**: Browser notifications (with permission)
- **Unread Count Badge**: Visual indicator for unread notifications
- **Clear All**: Batch notification management

### 🎨 User Interface
- **Modern Design**: Clean, gradient-based UI with Tailwind CSS
- **Responsive Layout**: Works on desktop and mobile devices
- **Dark Mode Ready**: Modern color scheme
- **Loading States**: Visual feedback for all operations
- **Error Handling**: User-friendly error messages

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
  - [Download Node.js](https://nodejs.org/)
  - Verify: `node --version`

- **npm**: Version 8.0.0 or higher (comes with Node.js)
  - Verify: `npm --version`

- **Git**: For cloning the repository
  - [Download Git](https://git-scm.com/)
  - Verify: `git --version`

- **Web Browser**: Modern browser with WebRTC support
  - Chrome 90+, Firefox 88+, Edge 90+, or Safari 14+

- **Administrator Access**: Required for HTTP redirect server (port 80)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd lan-collaboration-suite
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- Express (backend server)
- Multer (file uploads)
- CORS (cross-origin requests)
- Concurrently (run multiple servers simultaneously)

### 3. Generate SSL Certificates (For HTTPS)

WebRTC requires HTTPS for camera/microphone access. Generate self-signed certificates:

#### Windows:
```bash
# Using OpenSSL (install via Git Bash or Chocolatey)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

#### Linux/Mac:
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

When prompted, you can press Enter to skip all fields or fill them as desired.

---

## ⚙️ Configuration

### 1. PowerShell Execution Policy (Windows Only)

If you encounter script execution errors on Windows, run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

This allows running the `start_all.bat` script without security warnings.

### 2. Environment Setup

The `.env` file is automatically created by `start_all.bat`, but you can manually create it:

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://YOUR_LOCAL_IP:3001
```

Replace `YOUR_LOCAL_IP` with your computer's local IP address:
- **Windows**: Run `ipconfig` and look for "IPv4 Address"
- **Linux/Mac**: Run `ifconfig` or `ip addr`

Example:
```env
VITE_API_URL=https://192.168.1.100:3001
```

### 3. Firewall Configuration

Ensure these ports are open on your firewall:
- **Port 80**: HTTP redirect server (requires admin privileges)
- **Port 3001**: Backend API server (HTTPS)
- **Port 5173**: Frontend development server (HTTPS)

#### Windows Firewall:
1. Open "Windows Defender Firewall"
2. Click "Advanced settings"
3. Add inbound rules for ports 80, 3001, and 5173

#### Linux (UFW):
```bash
sudo ufw allow 80
sudo ufw allow 3001
sudo ufw allow 5173
```

---

## 🎬 Running the Application

### Option 1: Automated Startup (Windows - Recommended)

**Right-click** `start_all.bat` and select **"Run as administrator"** or simply double-click it:

```bash
start_all.bat
```

This will:
- Request administrator privileges (needed for port 80)
- Detect your local IP address automatically
- Create/update the `.env` file
- Install dependencies (if needed)
- Start all three servers in a single window using `npm run dev`
- Color-coded console output (Frontend: cyan, Backend: green, Redirect: yellow)

**Note**: Administrator privileges are required because the HTTP redirect server uses port 80, which is a privileged port on Windows.

### Option 2: Manual Startup with Single Command

Run all three servers simultaneously with one command:

```bash
npm run dev
```

This will start:
- **Frontend** (cyan) - Vite dev server on `https://localhost:5173`
- **Backend** (green) - Express API server on `https://localhost:3001`
- **Redirect** (yellow) - HTTP to HTTPS redirect on `http://localhost:80`

**Note**: On Windows, you need to run this command as administrator for port 80 access.

### Option 3: Manual Startup (Individual Commands)

If you need to run servers separately in different terminals:

#### Terminal 1 - Frontend Development:
```bash
npm run dev:frontend
```

#### Terminal 2 - Backend Server:
```bash
npm run dev:backend
```

#### Terminal 3 - HTTP Redirect Server (requires admin):
```bash
npm run dev:redirect
```

### Accessing the Application

#### From the Same Computer:
- **HTTPS (direct)**: `https://localhost:5173`
- **HTTP (redirects to HTTPS)**: `http://localhost`

#### From Other Devices on the Network:
- **HTTPS (direct)**: `https://YOUR_LOCAL_IP:5173`
  - Example: `https://192.168.1.100:5173`
- **HTTP (easier, redirects)**: `http://YOUR_LOCAL_IP`
  - Example: `http://192.168.1.100`
  - This is the recommended option for other users - no port number needed!

**⚠️ Important**: You'll see a security warning because of self-signed certificates. Click "Advanced" → "Proceed anyway" (this is safe on your local network).

### Understanding the Three Servers

1. **Backend Server (port 3001)**: Handles API requests, file storage, user management
2. **Frontend Server (port 5173)**: Serves the React application with hot-reload
3. **HTTP Redirect Server (port 80)**: Automatically redirects HTTP traffic to HTTPS for convenience

---

## 🌐 Router Configuration for Online Access

This section explains how to configure your router to access the application from outside your local network (over the internet). This is useful for telemetry medicine applications where medical staff need remote access.

### ⚠️ Important Security Considerations

**WARNING**: The current application has some security limitations for internet deployment:
- Passwords are stored in plaintext (not hashed)
- Uses self-signed SSL certificates (not trusted by browsers)
- No TURN server for WebRTC across different networks
- Basic authentication without advanced security features

**Recommendations before deploying online**:
- Use for trusted networks and authorized users only
- Implement proper authentication and password hashing
- Consider using a reverse proxy (nginx, Apache) with real SSL certificates
- Add rate limiting and DDoS protection
- Use a VPN as an alternative for secure remote access

### Step 1: Static IP Address Reservation

To ensure your server computer always gets the same local IP address:

#### For Most Routers:
1. **Find Your MAC Address**:
   - Windows: Open Command Prompt and run `ipconfig /all`
   - Look for "Physical Address" under your network adapter
   - Example: `00-1A-2B-3C-4D-5E`

2. **Access Router Admin Panel**:
   - Open your browser and go to your router's IP address
   - Common addresses: `192.168.1.1`, `192.168.0.1`, `192.168.2.1`, or `10.0.0.1`
   - Login with admin credentials (check router label or manual)

3. **Find DHCP Reservation Settings**:
   - Look for: "DHCP Reservation", "Address Reservation", "Static DHCP", or "IP Binding"
   - Usually found under: Advanced → LAN → DHCP Settings

4. **Create Reservation**:
   - Click "Add" or "New Reservation"
   - Enter device name: `LAN-Collab-Server`
   - Enter MAC address: Your computer's MAC address
   - Enter IP address: Choose an IP outside DHCP pool (e.g., `192.168.1.100`)
   - Save and restart router if required

#### Common Router Brands:

**TP-Link**:
- Advanced → Network → DHCP Server → Address Reservation

**Netgear**:
- Advanced → Setup → LAN Setup → Address Reservation

**Linksys**:
- Connectivity → Local Network → DHCP Reservations

**ASUS**:
- LAN → DHCP Server → Manually Assigned IP

**D-Link**:
- Setup → Network Settings → Add DHCP Reservation

### Step 2: Port Forwarding Configuration

Forward external traffic to your server computer:

1. **Access Port Forwarding Settings**:
   - In router admin panel, find: "Port Forwarding", "Virtual Server", or "NAT Forwarding"
   - Usually under: Advanced → NAT Forwarding → Port Forwarding

2. **Create Port Forwarding Rules**:

   **Rule 1 - HTTPS Frontend**:
   - Service Name: `LAN-Collab-Frontend`
   - External Port: `5173` (or `443` if you prefer standard HTTPS)
   - Internal IP: `192.168.1.100` (your reserved IP)
   - Internal Port: `5173`
   - Protocol: `TCP`
   - Enable: ✓

   **Rule 2 - HTTPS Backend**:
   - Service Name: `LAN-Collab-Backend`
   - External Port: `3001`
   - Internal IP: `192.168.1.100`
   - Internal Port: `3001`
   - Protocol: `TCP`
   - Enable: ✓

   **Rule 3 - HTTP Redirect**:
   - Service Name: `LAN-Collab-HTTP`
   - External Port: `80`
   - Internal IP: `192.168.1.100`
   - Internal Port: `80`
   - Protocol: `TCP`
   - Enable: ✓

3. **Save and Apply**:
   - Click "Save" or "Apply"
   - Router may restart

### Step 3: Find Your Public IP Address

1. **Get Public IP**:
   - Visit: https://whatismyipaddress.com/
   - Or run: `curl ifconfig.me` in terminal
   - Note your public IP (e.g., `203.0.113.45`)

2. **Optional - Dynamic DNS (Recommended)**:
   - If your ISP assigns dynamic IPs (changes periodically), use DDNS
   - Free services: No-IP, DuckDNS, Dynu
   - Create a domain like: `myserver.ddns.net`
   - Configure in router's DDNS settings
   - Update `.env` to use your DDNS domain

### Step 4: Update Configuration for Online Access

1. **Update `.env` file**:
   ```env
   # For local network access
   VITE_API_URL=https://192.168.1.100:3001

   # For internet access, use your public IP or DDNS
   # VITE_API_URL=https://203.0.113.45:3001
   # or
   # VITE_API_URL=https://myserver.ddns.net:3001
   ```

2. **For dual access** (both local and online):
   - Keep local IP in `.env` for LAN users
   - Online users access via: `https://YOUR_PUBLIC_IP:5173`
   - They'll need to configure their browser to accept your API's public IP

### Step 5: Firewall Configuration

#### Windows Firewall:
```powershell
# Run PowerShell as Administrator
New-NetFirewallRule -DisplayName "LAN Collab Frontend" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "LAN Collab Backend" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "LAN Collab HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
```

#### Router Firewall:
- Most home routers don't have additional firewall rules
- If your router has firewall settings, ensure incoming traffic on ports 80, 3001, 5173 is allowed

### Step 6: Testing Online Access

1. **From Outside Network**:
   - Use mobile data (4G/5G) or ask friend on different network
   - Visit: `http://YOUR_PUBLIC_IP` or `https://YOUR_PUBLIC_IP:5173`
   - Accept self-signed certificate warning

2. **Troubleshooting**:
   - Verify port forwarding with: https://www.yougetsignal.com/tools/open-ports/
   - Check if your ISP blocks ports (some ISPs block port 80/443)
   - Ensure server computer is running and not in sleep mode
   - Verify Windows Firewall isn't blocking connections

### Limitations When Using Online

**What Will Work**:
- ✅ User authentication and registration
- ✅ Direct messaging and global chat
- ✅ File uploads and downloads
- ✅ IoT device monitoring (if devices are on same local network as server)
- ✅ Viewing user directory
- ✅ Notifications

**What May NOT Work**:
- ⚠️ **Video/Audio Calls**: WebRTC peer-to-peer connections require STUN/TURN servers for NAT traversal
  - Calls between users on different networks will likely fail
  - Calls between users on the same local network will work
  - Solution: Implement TURN server (coturn, Twilio, etc.)

- ⚠️ **P2P File Transfer**: WebRTC data channels face same NAT issues
  - Use server-based file sharing instead (File Server feature)

### Alternative: VPN Access (More Secure)

Instead of port forwarding, consider using a VPN:

1. **Setup VPN Server**: Use Windows built-in VPN, OpenVPN, or WireGuard
2. **Connect Remotely**: Users connect to VPN first
3. **Access as LAN**: Once connected, access app using local IP
4. **Benefits**: More secure, no port forwarding needed, all features work

---

## 📖 Usage Guide

### First-Time Setup

1. **Create an Account**
   - Click "Sign up" on the login page
   - Enter your full name, username, and password
   - Click "Sign Up"

2. **Allow Permissions**
   - Allow browser notifications (for call alerts)
   - Allow camera/microphone access (when joining meetings)

### Making a Call

1. **Navigate to Users**
   - Click "View Users" on the home page
   - Browse the list of registered users

2. **Initiate a Call**
   - Click the "Call" button next to a user's name
   - Wait for them to answer

3. **During a Call**
   - Use the microphone button to mute/unmute
   - Use the camera button to turn video on/off
   - Chat and share files in the sidebar
   - Click "Leave" to end the call

### Creating a Meeting

1. **Start Meeting**
   - Click "Start Meeting" on the home page
   - Select users to invite
   - Optionally add a meeting title
   - Click "Start Meeting"

2. **Join Meeting**
   - Enter a room ID on the home page
   - Click "Join"

3. **Meeting Features**
   - Video grid shows all participants
   - Chat with all participants
   - Share files visible to all
   - Copy room ID to share with others

### Sending Messages

1. **Direct Messages**
   - Go to "View Users"
   - Click "Message" next to a user
   - Type and send messages

2. **Global Chat**
   - Click "Global Chat" card on the home page
   - Chat is visible to all users on the network
   - Real-time message updates every second
   - Messages persist across sessions

### File Sharing

1. **Public File Server**
   - Click "File Server" on home page
   - Upload files visible to everyone
   - Download files from others

2. **Private File Sharing**
   - Go to "Shared with Me" on home page
   - View files shared privately with you
   - Send files to specific users

3. **Meeting File Sharing**
   - In a meeting room, use the "Files" tab
   - Files are visible to all meeting participants
   - Organized by meeting room ID

### Managing Notifications

- Click the bell icon in the header
- View all notifications
- Click to mark as read
- Delete individual notifications
- Use "Clear All" to remove all notifications

### Using IoT Device Monitoring

**Perfect for telemetry medicine courses and monitoring medical devices on your local network.**

1. **Access IoT Monitor**
   - Click "IoT Monitor" card on the home page
   - You'll see the IoT Data page

2. **Add a Device** (e.g., Medical Sensor, Patient Monitor)
   - Click the "+ Add Device" button
   - Fill in the fields:
     - **Device Local IP**: IP address of the IoT device (e.g., `192.168.1.50`)
     - **Endpoint**: API endpoint path (e.g., `/data` or `/vitals`)
     - **Ping Every (seconds)**: Polling interval (e.g., `5` for every 5 seconds)
   - Click "Save Device"

3. **View Device Data**
   - Once saved, the server automatically polls the device
   - JSON data appears in the "Device Data" section
   - Status shows: "Active" (green) or "Error" (red)
   - Last updated timestamp displayed

4. **Edit a Device**
   - Click "Edit" button on any saved device
   - Modify IP, endpoint, or polling interval
   - Click "Save Device"

5. **Delete a Device**
   - Click "Delete" button to remove device from monitoring
   - Polling stops immediately

**Example IoT Device Setup**:
```
Device Local IP: 192.168.1.50
Endpoint: /data
Ping Every: 10

Server will fetch: http://192.168.1.50/data every 10 seconds
Response example: {"heart_rate": 72, "blood_pressure": "120/80", "temperature": 36.5}
```

**Use Cases for Telemetry Medicine**:
- Monitor patient vital signs from bedside monitors
- Collect data from medical sensors (ECG, pulse oximeters, etc.)
- Track temperature, humidity from environmental sensors
- Aggregate data from multiple medical IoT devices
- Real-time monitoring dashboard for medical staff
- Educational demonstrations of telemetry systems

---

## 📱 All Pages and Features Explained

### 1. Login Page (`/login`)
**What it is**: Authentication entry point for the application.

**Features**:
- Username and password login
- Session persistence using local storage
- Link to signup page for new users
- LoNE WoLvES copyright notice

**How to use**:
- Enter your username and password
- Click "Login" to access the application
- First-time users click "Sign up" link

**[IMAGE PLACEHOLDER: Screenshot of Login Page with username/password fields]**

---

### 2. Signup Page (`/signup`)
**What it is**: User registration page for creating new accounts.

**Features**:
- Full name input
- Username selection (must be unique)
- Password creation
- Account creation and automatic login
- LoNE WoLvES copyright notice

**How to use**:
- Enter your full name
- Choose a unique username
- Create a strong password
- Click "Sign Up"
- Automatically logged in and redirected to home page

**[IMAGE PLACEHOLDER: Screenshot of Signup Page with registration form]**

---

### 3. Home Page (`/home`)
**What it is**: Main dashboard showing all available features.

**Features**:
- Welcome message with user's full name
- 8 feature cards with gradient backgrounds:
  1. **Start Meeting** - Create new video conference
  2. **Join Meeting** - Enter existing meeting by ID
  3. **View Users** - Browse all registered users
  4. **Global Chat** - Public chatroom for all users
  5. **Shared with Me** - Files sent directly to you
  6. **File Server** - Public file repository
  7. **My Messages** - Direct message inbox
  8. **IoT Monitor** - Device monitoring dashboard
- Notification bell icon in header
- Logout button
- LoNE WoLvES copyright footer

**How to use**:
- Click any card to access that feature
- Bell icon shows unread notification count
- Click "Logout" to end session

**[IMAGE PLACEHOLDER: Screenshot of Home Page showing all 8 feature cards]**

---

### 4. Users Page (`/users`)
**What it is**: Directory of all registered users on the network.

**Features**:
- List of all accounts created on the system
- User full names and usernames displayed
- Online/offline status indicator
- Two action buttons per user:
  - **Call** - Initiate video call
  - **Message** - Send direct message

**How to use**:
- Browse the user list
- Click "Call" to start video call with that user
- Click "Message" to send direct message
- Click "Back" to return to home page

**[IMAGE PLACEHOLDER: Screenshot of Users Page showing user list with Call/Message buttons]**

---

### 5. Meeting Room (`/meeting`)
**What it is**: Video conferencing interface for group meetings.

**Features**:
- Video grid showing all participants
- Self-view (your camera)
- Audio/video controls:
  - Microphone toggle (mute/unmute)
  - Camera toggle (on/off)
  - **Screen share button** (desktop only)
  - Leave meeting button
- Sidebar with 3 tabs:
  - **Chat**: Text messaging with all participants
  - **Participants**: List of connected users
  - **Files**: Share files with meeting participants
- Room ID display (for sharing)
- Copy room ID button

**How to use**:
- Allow camera/microphone permissions when prompted
- Use control buttons to manage audio/video
- **Screen sharing**: Click screen share button (monitor icon) to share your screen
  - Select which window/screen to share
  - Click again to stop sharing
  - ⚠️ **Desktop only** - Not supported on mobile browsers
- Type messages in chat tab
- Upload files in files tab
- Share room ID with others to invite them
- Click "Leave" to exit meeting

**Platform Compatibility**:
- ✅ Desktop (Windows/Mac/Linux): Full video, audio, and screen sharing
- ✅ Mobile (iOS/Android): Video and audio calls work
- ❌ Mobile: Screen sharing **NOT supported** (browser limitation)

**[IMAGE PLACEHOLDER: Screenshot of Meeting Room with video grid and sidebar]**

---

### 6. Global Chat Page (`/globalchat`)
**What it is**: Public chatroom visible to all users on the network.

**Features**:
- Real-time message updates (every 1 second)
- Message history showing:
  - Sender's full name
  - Message content
  - Timestamp
- Message input field
- Send button
- Auto-scroll to latest messages

**How to use**:
- Type your message in the text field
- Click "Send" or press Enter
- Messages appear instantly for all users
- Scroll up to view message history
- Click "Back" to return to home page

**[IMAGE PLACEHOLDER: Screenshot of Global Chat with messages from multiple users]**

---

### 7. Messages Page (`/messages`)
**What it is**: Direct messaging interface for one-on-one conversations.

**Features**:
- Conversation list showing:
  - Contact's full name
  - Last message preview
  - Timestamp of last message
  - Unread indicator
- Message thread view
- Real-time message updates
- Send message input

**How to use**:
- Select a conversation from the list
- View message history
- Type and send messages
- Messages sync in real-time
- Click "Back" to return to home page

**[IMAGE PLACEHOLDER: Screenshot of Messages Page with conversation list and chat]**

---

### 8. File Server Page (`/fileserver`)
**What it is**: Public file sharing repository accessible to all users.

**Features**:
- File upload interface
- List of all uploaded files showing:
  - File name
  - Uploader's name
  - Upload date
  - File size
- Download button for each file
- Delete button (for your own files)

**How to use**:
- Click "Choose File" to select a file
- Click "Upload" to share with everyone
- Click download icon to download any file
- Click delete icon to remove your files
- Click "Back" to return to home page

**[IMAGE PLACEHOLDER: Screenshot of File Server showing uploaded files]**

---

### 9. Shared with Me Page (`/sharedwithme`)
**What it is**: Private file inbox for files sent directly to you.

**Features**:
- List of files shared privately with you
- File information:
  - File name
  - Sender's name
  - Date received
  - File size
- Download button for each file
- Send files to specific users
- User selection dropdown

**How to use**:
- View files sent to you by other users
- Click download to save files
- To send a file:
  - Select recipient from dropdown
  - Choose file
  - Click "Send"
- Click "Back" to return to home page

**[IMAGE PLACEHOLDER: Screenshot of Shared with Me showing private files]**

---

### 10. IoT Data Page (`/iotdata`)
**What it is**: IoT device monitoring dashboard for telemetry and medical device management.

**Features**:
- Device list showing:
  - Device Local IP
  - API Endpoint
  - Polling interval
  - Connection status (Active/Error)
  - Last updated timestamp
  - JSON data response
- Add device button
- Edit/Delete buttons for each device
- Server-side automatic polling
- Real-time data updates (every 2 seconds)
- Error reporting for failed connections

**How to use**:
- Click "+ Add Device"
- Enter device details:
  - **Device Local IP**: e.g., `192.168.1.50`
  - **Endpoint**: e.g., `/data` or `/vitals`
  - **Ping Every**: e.g., `10` (seconds)
- Click "Save Device"
- Server automatically polls device at specified interval
- View live JSON data in "Device Data" section
- Click "Edit" to modify device settings
- Click "Delete" to stop monitoring and remove device

**Medical/Educational Use Cases**:
- Monitor patient vital signs
- Collect data from ECG machines
- Track pulse oximeter readings
- Environmental sensors (temperature, humidity)
- Demonstrate telemetry concepts to students
- Real-time medical device integration

**[IMAGE PLACEHOLDER: Screenshot of IoT Data Page showing devices with live data]**

**Example Device Configuration**:
```
Device: Patient Monitor #1
Local IP: 192.168.1.55
Endpoint: /vitals
Ping Every: 5 seconds

Data Retrieved:
{
  "patient_id": "P001",
  "heart_rate": 72,
  "blood_pressure": "120/80",
  "oxygen_saturation": 98,
  "temperature": 36.8,
  "timestamp": "2025-11-14T10:30:45Z"
}
```

---

### 11. Notification Center (Popup)
**What it is**: Centralized notification management accessible from all pages.

**Features**:
- Dropdown panel triggered by bell icon
- List of all notifications:
  - Call notifications
  - Message notifications
  - System notifications
- Unread count badge
- Mark as read functionality
- Delete individual notifications
- "Clear All" button
- Real-time updates

**How to use**:
- Click bell icon in header
- View all notifications
- Click a notification to mark as read
- Click "X" to delete specific notification
- Click "Clear All" to remove all notifications
- Unread count updates automatically

**[IMAGE PLACEHOLDER: Screenshot of Notification Center dropdown]**

---

## 📁 Project Structure

```
lan-collaboration-suite/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Chat.tsx         # Chat interface
│   │   ├── Controls.tsx     # Meeting controls
│   │   ├── FileTransfer.tsx # File sharing UI
│   │   ├── MeetingInvitation.tsx
│   │   ├── NotificationCenter.tsx
│   │   ├── PeerList.tsx     # Connected peers list
│   │   └── VideoGrid.tsx    # Video layout
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Main dashboard
│   │   ├── LoginPage.tsx    # Authentication
│   │   ├── SignupPage.tsx   # Registration
│   │   ├── MeetingRoom.tsx  # Video call interface
│   │   ├── UsersPage.tsx    # User directory
│   │   ├── MessagesPage.tsx # Direct messaging
│   │   ├── GlobalChatPage.tsx # Global chatroom
│   │   ├── FileServerPage.tsx
│   │   ├── SharedWithMePage.tsx
│   │   └── IoTDataPage.tsx  # IoT device monitoring
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useLocalNetwork.ts # WebRTC management
│   │
│   ├── utils/               # Utility functions
│   │   ├── webrtc.ts        # WebRTC logic
│   │   └── signaling.ts     # Signaling server
│   │
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── uploads/                 # User uploads (auto-created)
├── shared_files/            # Public files (auto-created)
├── chat/                    # Message history (auto-created)
├── notifications/           # Notification storage (auto-created)
│
├── server.js                # Express backend server
├── redirect-server.js       # HTTP to HTTPS redirect server
├── accounts.json            # User accounts (auto-created)
├── users.json               # Active users (auto-created)
├── calls.json               # Call records (auto-created)
├── files_meta.json          # File metadata (auto-created)
├── iot_devices.json         # IoT device configurations (auto-created)
│
├── cert.pem                 # SSL certificate
├── key.pem                  # SSL private key
├── start_all.bat            # Startup script (Windows)
├── .env                     # Environment variables
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── tsconfig.json            # TypeScript config
```

---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/accounts` - List all accounts

### Users
- `POST /api/users` - Register/update user session
- `GET /api/users` - Get active users
- `GET /api/users/:id` - Get specific user
- `DELETE /api/users/:id` - Remove user session
- `PUT /api/users/:id/heartbeat` - Keep session alive

### Calls
- `POST /api/calls` - Initiate a call
- `GET /api/calls` - Get incoming calls
- `PATCH /api/calls/:id` - Update call status
- `DELETE /api/calls/:id` - Remove call record

### Messages
- `POST /api/messages` - Send direct message
- `GET /api/messages` - Get message history
- `POST /api/global-chat` - Send global message
- `GET /api/global-chat` - Get global messages

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files` - List files
- `DELETE /api/files/:id` - Delete file
- `GET /uploads/:filename` - Download file
- `GET /shared_files/:filename` - Download shared file

### Notifications
- `POST /api/notifications` - Create notification
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:id` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### IoT Devices (Telemetry)
- `POST /api/iot-devices` - Add new IoT device
- `GET /api/iot-devices` - Get all devices for user
- `PUT /api/iot-devices/:id` - Update device configuration
- `DELETE /api/iot-devices/:id` - Remove device and stop polling

### Signaling (WebRTC)
- `POST /api/signaling` - Send signaling message
- `GET /api/signaling` - Poll for messages

---

## 🔧 Troubleshooting

### HTTP Redirect Server Won't Start

**Issue**: Port 80 access denied or redirect server fails

**Solution**:
1. Run `start_all.bat` as Administrator (right-click → "Run as administrator")
2. Port 80 requires admin privileges on Windows
3. Check if another application is using port 80 (IIS, Apache, etc.)
4. Temporarily disable other web servers running on port 80
5. If still failing, users can access directly via `https://YOUR_IP:5173`

### Camera/Microphone Not Working

**Issue**: Browser doesn't request permissions

**Solution**:
1. Ensure you're using HTTPS (not HTTP)
2. Check browser permissions: Settings → Privacy → Camera/Microphone
3. Try a different browser (Chrome recommended)
4. Accept the self-signed certificate warning first

### Can't Connect from Other Devices

**Issue**: Other computers can't access the app

**Solution**:
1. Verify all devices are on the same network
2. Check firewall settings (ports 80, 3001, 5173)
3. Confirm IP address in `.env` is correct
4. Try disabling Windows Firewall temporarily for testing
5. Use HTTP redirect: `http://YOUR_IP` (easier than HTTPS)

### SSL Certificate Warning

**Issue**: Browser shows security warning

**Solution**:
- This is normal with self-signed certificates
- Click "Advanced" → "Proceed" (safe on local network)
- Alternatively, install the certificate in your system's trust store
- Use HTTP redirect for easier access (it handles the redirect)

### Files Not Uploading

**Issue**: File upload fails

**Solution**:
1. Check `uploads/` folder exists and has write permissions
2. Verify server is running on port 3001
3. Check file size (ensure it's reasonable)
4. Check browser console for error messages

### Calls Not Connecting

**Issue**: Video call fails to establish

**Solution**:
1. Both users must allow camera/microphone access
2. Check if both users are using HTTPS
3. Verify WebRTC signaling is working (check server logs)
4. Try refreshing both browsers
5. Check if any antivirus is blocking WebRTC

### "Can't Connect to Server" Error

**Issue**: Frontend can't reach backend

**Solution**:
1. Ensure all three servers are running (check the three windows)
2. Verify `.env` file has correct API URL
3. Check if port 3001 is blocked
4. Try accessing `https://localhost:3001/api/users` directly
5. Restart all servers using `start_all.bat`

### Global Chat Not Loading

**Issue**: Can't access or send messages in Global Chat

**Solution**:
1. Ensure backend server is running (port 3001)
2. Click the "Global Chat" card on the home page (not sidebar)
3. Check browser console for errors
4. Verify `/chat` directory exists and is writable
5. Try refreshing the page

### Screen Sharing Not Working

**Issue**: Can't share screen or screen share button is missing/disabled

**Solution**:
1. **On Mobile Devices**: Screen sharing is **NOT supported** on mobile browsers
   - This is a browser/OS limitation, not an app issue
   - Use a desktop computer for screen sharing
2. **On Desktop**:
   - Ensure you're using HTTPS (not HTTP)
   - Use a modern browser: Chrome 72+, Firefox 66+, Edge 79+
   - Check browser permissions for screen capture
   - Try refreshing the page and rejoining the meeting
   - On Linux, you may need to grant additional permissions
3. **Supported Platforms**:
   - ✅ Windows (Chrome, Edge, Firefox)
   - ✅ macOS (Chrome, Safari, Firefox)
   - ✅ Linux (Chrome, Firefox)
   - ❌ iOS (not supported by Safari or any mobile browser)
   - ❌ Android (not supported in mobile browsers)

### IoT Device Not Responding

**Issue**: Device shows "Error" status or no data appears

**Solution**:
1. Verify device IP address is correct
2. Ensure device is on the same network
3. Test device endpoint in browser: `http://DEVICE_IP/endpoint`
4. Check if device requires authentication (not currently supported)
5. Verify device returns valid JSON
6. Check device firewall settings
7. Ensure polling interval is reasonable (not too frequent)

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web server framework
- **Multer 1.4.5** - File upload handling
- **CORS 2.8.5** - Cross-origin requests
- **HTTPS/TLS** - Secure connections

### Real-Time Communication
- **WebRTC** - Peer-to-peer video/audio/data
- **RTCPeerConnection** - P2P connections
- **RTCDataChannel** - Chat and file transfer
- **STUN Servers** - NAT traversal

### Storage
- **JSON Files** - Simple file-based database
- **Local Storage** - Browser session persistence
- **File System** - Media storage

### Security
- **HTTPS/TLS** - Encrypted connections
- **Self-signed Certificates** - Local SSL
- **CORS Policy** - API protection

---

## 📜 Available Scripts

```bash
# Start all servers simultaneously (recommended)
npm run dev
# Runs frontend, backend, and redirect server with color-coded output
# Requires admin privileges on Windows for port 80 access

# Start individual servers (if needed)
npm run dev:frontend      # Frontend only (port 5173)
npm run dev:backend       # Backend only (port 3001)
npm run dev:redirect      # Redirect server only (port 80, requires admin)

# Legacy commands (still work)
npm run server           # Same as dev:backend
npm run redirect         # Same as dev:redirect

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Clear active users (maintenance)
npm run clear-users

# Start all servers (Windows batch file - requires admin)
start_all.bat
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with React and TypeScript
- WebRTC implementation inspired by PeerJS
- Icons by Lucide React
- Styling with Tailwind CSS

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review browser console for error messages

---

## 🚀 Future Enhancements

Potential features for future versions:
- Recording meetings (video/audio)
- End-to-end encryption
- Mobile app (React Native) with native screen sharing
- Better NAT traversal (TURN servers for online deployment)
- Database integration (MongoDB/PostgreSQL)
- User profiles with avatars
- Group chat rooms (separate from global)
- File preview before download
- Drag-and-drop file uploads
- Voice-only calls option
- Meeting scheduling
- Password hashing and advanced authentication
- IoT device data visualization (charts/graphs)
- Export IoT data to CSV/Excel

---

## 📝 Copyright & License

**Copyright © 2025 LoNE WoLvES. All rights reserved.**

This project is licensed under the MIT License - see the LICENSE file for details.

### Author
Developed and maintained by **LoNE WoLvES**

---

**Made with ❤️ for local network collaboration by LoNE WoLvES**

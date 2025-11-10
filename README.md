# 🌐 LAN Collaboration Suite

A comprehensive real-time collaboration platform designed for local network communication. Built with React, TypeScript, and WebRTC for peer-to-peer video calls, messaging, and file sharing - all without requiring internet connectivity.

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
- [Usage Guide](#-usage-guide)
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
- **Room-based File Sharing**: Share files within meeting contexts
- **Persistent Room IDs**: Share room IDs to let others join

### 💬 Messaging System
- **Direct Messages**: One-on-one private messaging
- **Global Chatroom**: Public chat visible to all users
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
- **Port 80**: HTTP redirect server (optional, for easy access)
- **Port 3001**: Backend API server
- **Port 5173**: Frontend development server

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

### 4. Router Configuration (Recommended for Stability)

#### Why IP Reservation is Important:

When your computer connects to a router, it typically receives a **dynamic IP address** via DHCP (Dynamic Host Configuration Protocol). This means:

❌ **Without IP Reservation:**
- Your IP address can change when you restart your computer
- The IP might change when the DHCP lease expires (usually 24 hours)
- Other devices might get your IP if they connect first
- Your `.env` file will have the wrong IP after a change
- All devices will need to use the new IP to connect

✅ **With IP Reservation (Static DHCP):**
- Your computer always gets the same IP address
- The `.env` file stays correct permanently
- Other users can bookmark/save your IP address
- More reliable for server hosting
- No need to reconfigure after restarts

#### How to Set Up IP Reservation:

**Step 1: Find Your MAC Address**

Windows:
```bash
ipconfig /all
```
Look for "Physical Address" - Example: `A1-B2-C3-D4-E5-F6`

Linux/Mac:
```bash
ifconfig
# or
ip link show
```
Look for "ether" or "HWaddr" - Example: `a1:b2:c3:d4:e5:f6`

**Step 2: Access Your Router Settings**

1. Open browser and go to your router's IP (usually one of these):
   - `http://192.168.1.1`
   - `http://192.168.0.1`
   - `http://192.168.3.1`
   - `http://10.0.0.1`

2. Login with router admin credentials (check router label or manual)

**Step 3: Configure DHCP Reservation**

Different routers have different interfaces. Look for:
- **"DHCP Reservation"** or **"Static DHCP"**
- **"Address Reservation"** or **"Reserved IP"**
- **"IP & MAC Binding"** or **"MAC Address Filtering"**

Common Router Brands:
- **TP-Link**: Advanced → Network → DHCP Server → Address Reservation
- **Netgear**: Advanced → Setup → LAN Setup → Address Reservation
- **Asus**: LAN → DHCP Server → Manual Assignment
- **Linksys**: Connectivity → Local Network → DHCP Reservation

**Step 4: Add Reservation**

1. Click "Add" or "+" to create a new reservation
2. Enter your computer's MAC address
3. Enter the desired IP address (e.g., `192.168.3.2`)
4. Save and apply settings

**Step 5: Verify**

1. Restart your computer
2. Run `ipconfig` (Windows) or `ifconfig` (Linux/Mac)
3. Confirm you received the reserved IP address

#### Example Router Configuration:

```
Device Name: LAN-Collab-Server
MAC Address: A1:B2:C3:D4:E5:F6
Reserved IP: 192.168.3.2
Status: Enabled
```

Now your computer will **always** have IP `192.168.3.2`, making your collaboration suite permanently accessible at that address!

---

## 🎬 Running the Application

### Option 1: Automated Startup (Windows - Recommended)

Double-click `start_all.bat` or run:

```bash
start_all.bat
```

This will:
- Detect your local IP address
- Create/update the `.env` file
- Install dependencies (if needed)
- Start both backend and frontend servers
- Open two command windows (keep both open)

### Option 2: Manual Startup

#### Terminal 1 - Backend Server:
```bash
npm run server
```

Server will run on `https://localhost:3001`

#### Terminal 2 - Frontend Development:
```bash
npm run dev
```

Frontend will run on `https://localhost:5173`

#### Terminal 3 - HTTP Redirect Server (Optional but Recommended):
```bash
node redirect-server.js
```

**Note for Windows**: Port 80 requires administrator privileges. Run Command Prompt as Administrator:
1. Search "Command Prompt" or "cmd"
2. Right-click → "Run as administrator"
3. Navigate to project folder: `cd path\to\your\project`
4. Run: `node redirect-server.js`

**Note for Linux/Mac**:
```bash
sudo node redirect-server.js
```

This allows users to access the app without typing the port number!

### Accessing the Application

**With HTTP Redirect Server (Recommended):**
- **From any device**: `http://YOUR_LOCAL_IP` (e.g., `http://192.168.3.2`)
- Automatically redirects to `https://YOUR_LOCAL_IP:5173`
- No need to remember port numbers! 🎯

**Without HTTP Redirect Server:**
- **From the same computer**: `https://localhost:5173`
- **From other devices**: `https://YOUR_LOCAL_IP:5173`
  - Example: `https://192.168.3.2:5173`

**⚠️ Important**: You'll see a security warning because of self-signed certificates. Click "Advanced" → "Proceed anyway" (this is safe on your local network).

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
   - Available on the home page sidebar
   - Visible to all online users
   - Real-time message updates

### File Sharing

1. **Public File Server**
   - Click "File Server" on home page
   - Upload files visible to everyone
   - Download files from others

2. **Private File Sharing**
   - Go to "View Users"
   - Click "Send File" next to a user
   - File is shared privately with that user

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

---

## 📁 Project Structure

```
lan-collaboration-suite/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Chat.tsx         # Chat interface
│   │   ├── Controls.tsx     # Meeting controls
│   │   ├── FileTransfer.tsx # File sharing UI
│   │   ├── GlobalChat.tsx   # Global chatroom
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
│   │   ├── FileServerPage.tsx
│   │   └── SharedWithMePage.tsx
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
├── accounts.json            # User accounts (auto-created)
├── users.json               # Active users (auto-created)
├── calls.json               # Call records (auto-created)
├── files_meta.json          # File metadata (auto-created)
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

## 🔌 API Endpoints

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

### Signaling (WebRTC)
- `POST /api/signaling` - Send signaling message
- `GET /api/signaling` - Poll for messages

---

## 🔧 Troubleshooting

### Camera/Microphone Not Working

**Issue**: Browser doesn't request permissions

**Solution**:
1. Ensure you're using HTTPS (not HTTP)
2. Check browser permissions: Settings → Privacy → Camera/Microphone
3. Try a different browser (Chrome recommended)

### Can't Connect from Other Devices

**Issue**: Other computers can't access the app

**Solution**:
1. Verify all devices are on the same network
2. Check firewall settings (ports 80, 3001, 5173)
3. Confirm IP address in `.env` is correct
4. Try disabling Windows Firewall temporarily for testing
5. **Check IP reservation**: If IP changed, update `.env` file

### Port 80 Access Denied

**Issue**: "Permission denied" or "EACCES" error when starting redirect server

**Solution**:
- **Windows**: Run Command Prompt as Administrator
  1. Search "cmd" in Start menu
  2. Right-click → "Run as administrator"
  3. Navigate to project: `cd C:\path\to\project`
  4. Run: `node redirect-server.js`

- **Linux/Mac**: Use sudo
  ```bash
  sudo node redirect-server.js
  ```

### Port 80 Already in Use

**Issue**: Another service is using port 80

**Solution**:
1. Check what's using port 80:
   - **Windows**: `netstat -ano | findstr :80`
   - **Linux/Mac**: `sudo lsof -i :80`
2. Stop the conflicting service (often IIS, Apache, or Nginx)
3. Or skip the redirect server and use port 5173 directly

### IP Address Keeps Changing

**Issue**: The IP address changes and app becomes inaccessible

**Solution**:
- Set up **DHCP Reservation** in your router (see Configuration section)
- This binds your MAC address to a permanent IP
- Your computer will always get the same IP address

### SSL Certificate Warning

**Issue**: Browser shows security warning

**Solution**:
- This is normal with self-signed certificates
- Click "Advanced" → "Proceed" (safe on local network)
- Alternatively, install the certificate in your system's trust store

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
1. Ensure server is running: `npm run server`
2. Verify `.env` file has correct API URL
3. Check if port 3001 is blocked
4. Try accessing `https://localhost:3001/api/users` directly

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

## 📝 Available Scripts

```bash
# Start development server (frontend)
npm run dev

# Start backend server
npm run server

# Start HTTP redirect server (requires admin/sudo)
node redirect-server.js

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

# Start both servers (Windows)
start_all.bat
```

---

## 🌐 HTTP Redirect Server

The `redirect-server.js` allows users to access your app without remembering port numbers!

### What It Does:
- Runs on **Port 80** (standard HTTP port)
- Automatically redirects `http://YOUR_IP` → `https://YOUR_IP:5173`
- Makes sharing easier: Just say "go to http://192.168.3.2" instead of "go to https://192.168.3.2:5173"

### Setup:

**1. Create `redirect-server.js`:**

The file is already included in your project. It contains:
```javascript
import http from 'http';

const HTTP_PORT = 80;
const HTTPS_PORT = 5173;

const server = http.createServer((req, res) => {
    const host = req.headers.host?.split(':')[0] || 'localhost';
    const redirectUrl = `https://${host}:${HTTPS_PORT}${req.url}`;
    
    res.writeHead(301, { 'Location': redirectUrl });
    res.end();
});

server.listen(HTTP_PORT, '0.0.0.0');
```

**2. Run with Admin/Sudo Privileges:**

Windows (Run Command Prompt as Administrator):
```bash
node redirect-server.js
```

Linux/Mac:
```bash
sudo node redirect-server.js
```

**3. Test It:**
- Open browser: `http://YOUR_LOCAL_IP` (no port!)
- Should redirect to: `https://YOUR_LOCAL_IP:5173`

### Benefits:
✅ Easier to share with others
✅ No need to remember port numbers
✅ Professional appearance
✅ Works like a real website

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
- Screen sharing capability
- Recording meetings
- End-to-end encryption
- Mobile app (React Native)
- Better NAT traversal (TURN servers)
- Database integration (MongoDB/PostgreSQL)
- User profiles with avatars
- Group chat rooms
- File preview before download
- Drag-and-drop file uploads

---

**Made with ❤️ for local network collaboration**

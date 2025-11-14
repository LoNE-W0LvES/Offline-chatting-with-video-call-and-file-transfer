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
- Start three servers simultaneously:
  - Backend API server (port 3001)
  - Frontend dev server (port 5173)
  - HTTP redirect server (port 80)
- Open three command windows (keep all open)

**Note**: Administrator privileges are required because the HTTP redirect server uses port 80, which is a privileged port on Windows.

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

#### Terminal 3 - HTTP Redirect Server (requires admin):
```bash
npm run redirect
```

Redirect server will run on `http://localhost:80`

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
├── redirect-server.js       # HTTP to HTTPS redirect server
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
# Start development server (frontend)
npm run dev

# Start backend server
npm run server

# Start HTTP redirect server
npm run redirect

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

# Start all servers (Windows - requires admin)
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
- Screen sharing capability
- Recording meetings
- End-to-end encryption
- Mobile app (React Native)
- Better NAT traversal (TURN servers)
- Database integration (MongoDB/PostgreSQL)
- User profiles with avatars
- Group chat rooms (separate from global)
- File preview before download
- Drag-and-drop file uploads
- Voice-only calls option
- Meeting scheduling

---

## 📝 Copyright & License

**Copyright © 2025 LoNE WoLvES. All rights reserved.**

This project is licensed under the MIT License - see the LICENSE file for details.

### Author
Developed and maintained by **LoNE WoLvES**

---

**Made with ❤️ for local network collaboration by LoNE WoLvES**

# WebRTC Debugging Guide

## Quick Fix Checklist

Your code has been updated with better logging and ICE handling. Follow these steps:

### 1. Check Browser Console Logs

Open DevTools (F12) on BOTH devices and watch for these log messages:

**Expected Successful Connection Flow:**
```
1. "Initializing local media stream..."
2. "Local media stream initialized successfully"
3. "Initiating connection to: [Name]"
4. "Got ICE candidate: host/srflx/relay"
5. "ICE gathering complete for offer"
6. "Sent offer to: [Name]"
7. "Received offer from: [Name]"
8. "Setting remote description (offer)"
9. "Sent answer to: [Name]"
10. "ICE connection state: connected"
11. "Connection state: connected"
12. "Received track from: [Name]"
```

### 2. Check ICE Candidate Types

In the console, look for ICE candidate logs. You should see:

- **host** - Local network candidates (192.168.x.x or similar)
- **srflx** - Server reflexive (your public IP via STUN)
- **relay** - TURN relay candidates (you don't have these currently)

**Problem Signs:**
- Only seeing "host" candidates = NAT/firewall blocking
- "ICE connection state: failed" = Cannot establish connection
- No "srflx" candidates = STUN servers blocked

### 3. Common Issues & Fixes

#### Issue: "ICE connection state: failed"
**Cause:** Cannot establish direct P2P connection
**Fix Options:**
1. Check if UDP ports 49152-65535 are open on both PCs
2. Temporarily disable firewall to test
3. Add a TURN server (see below)

#### Issue: Chat works but video/audio doesn't
**Cause:** Data channel uses TCP, media uses UDP
**Fix:** Open UDP ports in firewall

#### Issue: Works on same PC, fails across network
**Cause:** NAT traversal failure
**Fix:** Add TURN server configuration

### 4. Adding a TURN Server (If Needed)

If the fixes above don't work, you need a TURN server. Edit `src/utils/webrtc.ts`:

```typescript
const config: RTCConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        // Add TURN server here:
        {
            urls: 'turn:YOUR_TURN_SERVER:3478',
            username: 'your-username',
            credential: 'your-password'
        }
    ],
    iceCandidatePoolSize: 10,
};
```

**Free TURN Server Options:**
- Metered.ca (free tier): https://www.metered.ca/tools/openrelay/
- Xirsys (free tier): https://xirsys.com/
- Run your own: https://github.com/coturn/coturn

### 5. Firewall Rules

**Windows Firewall:**
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "WebRTC UDP" -Direction Inbound -Protocol UDP -LocalPort 49152-65535 -Action Allow
New-NetFirewallRule -DisplayName "WebRTC TCP" -Direction Inbound -Protocol TCP -LocalPort 49152-65535 -Action Allow
```

**Linux (UFW):**
```bash
sudo ufw allow 49152:65535/udp
sudo ufw allow 49152:65535/tcp
```

### 6. Network Configuration Test

Run this test on BOTH PCs:

1. Open browser console (F12)
2. Paste this code:

```javascript
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
});

pc.onicecandidate = (e) => {
  if (e.candidate) {
    console.log('ICE Candidate:', e.candidate.type, e.candidate.address);
  } else {
    console.log('ICE Gathering Complete');
  }
};

pc.createOffer().then(offer => pc.setLocalDescription(offer));
```

**Expected Output:**
```
ICE Candidate: host 192.168.x.x
ICE Candidate: srflx YOUR_PUBLIC_IP
ICE Gathering Complete
```

If you don't see "srflx", your network is blocking STUN.

### 7. Test Connection Between Two PCs

1. Make sure both PCs are on the same network
2. Ping from PC1 to PC2: `ping 192.168.x.x`
3. If ping fails, check router/switch configuration
4. If ping works but WebRTC fails, it's a port/protocol issue

### 8. Router Configuration

**Port Forwarding (if crossing networks):**
- Forward ports 49152-65535 UDP to your PC's local IP
- This is usually NOT needed for LAN connections

**UPnP (Universal Plug and Play):**
- Enable UPnP in router settings
- This helps with automatic port mapping

### 9. Quick Network Test

On PC1, run:
```bash
# Windows
netstat -an | findstr :5173
netstat -an | findstr :3001

# Linux/Mac
netstat -an | grep :5173
netstat -an | grep :3001
```

You should see LISTENING on both ports.

### 10. Browser-Specific Issues

**Chrome/Edge:**
- Check `chrome://webrtc-internals/` for detailed connection info
- Look for "ICE candidate pair" that becomes "succeeded"

**Firefox:**
- Check `about:webrtc` for connection details

## Still Not Working?

1. Share the console logs from BOTH devices
2. Check what ICE candidate types you're seeing
3. Try with firewall completely disabled (temporarily)
4. Verify both PCs can ping each other
5. Consider using a TURN server (relay)

## Understanding the Fix

The updated code now:
1. Adds multiple STUN servers for better reliability
2. Properly logs all ICE candidates and connection states
3. Ensures media tracks are added before creating offers
4. Handles ICE candidates correctly (queues them if needed)
5. Uses `offerToReceiveAudio/Video` flags for explicit negotiation

The main issue was likely:
- Missing explicit media negotiation flags
- Timing issues with adding media tracks
- Insufficient logging to diagnose problems

# PowerPoint Presentation Generator Instructions

## How to Generate the Presentation

### On Windows:

1. **Double-click** the `generate_presentation.vbs` file
   - PowerPoint will open automatically
   - The presentation will be created with all slides
   - File will be saved as: `LAN_Collaboration_Suite_Telemetry_Medicine_Course.pptx`

2. **Alternative method** (if double-click doesn't work):
   - Right-click `generate_presentation.vbs`
   - Select "Open with" → "Microsoft Windows Based Script Host"

### What Gets Generated:

**26 comprehensive slides covering:**

1. Title Slide
2. Course Overview
3. System Requirements
4. Installation Steps
5. Network Architecture
6. Finding Your IP Address
7. Static IP Address Reservation
8. Port Forwarding Configuration
9. Windows Firewall Configuration
10. Theory - LAN vs Online Access
11. Application Features Overview
12. Login Page
13. Signup Page
14. Home Page (Dashboard)
15. Users Directory
16. Meeting Room
17. Global Chat Room
18. IoT Device Monitoring ⭐ (Main Feature)
19. IoT Device Example
20. File Server
21. Notification Center
22. Security Considerations
23. Troubleshooting Common Issues
24. Practical Exercise
25. Summary & Resources
26. Q&A

### Image Placeholders:

Each slide that needs a screenshot has:
- **Gray placeholder boxes** with text indicating what screenshot to add
- **Notes section** with detailed instructions on what to capture

### Adding Your Screenshots:

1. Open the generated PPTX file
2. Look for gray boxes with "[IMAGE PLACEHOLDER]" text
3. Delete the placeholder box
4. Insert → Pictures → select your screenshot
5. Resize to fit the space

### Screenshots You Need to Take:

| Slide # | Screenshot Needed |
|---------|-------------------|
| 1 | Home page with all 8 feature cards |
| 4 | Command prompt showing successful npm install |
| 5 | Network diagram (optional - can draw in PowerPoint) |
| 6 | ipconfig output highlighting IPv4 and MAC address |
| 7 | Router DHCP reservation page |
| 8 | Router port forwarding configuration |
| 9 | Windows Firewall with 3 inbound rules |
| 11 | Home page dashboard |
| 12 | Login page |
| 13 | Signup page |
| 14 | Home page with all cards |
| 15 | Users page showing user list |
| 16 | Meeting room with video grid |
| 17 | Global chat with messages |
| 18 | IoT page showing devices with live data ⭐ |
| 20 | File server page |
| 21 | Notification dropdown |

### Tips for Best Results:

1. **Take screenshots at consistent resolution** (1920x1080 recommended)
2. **Use full browser window** for web pages
3. **Capture relevant portions** - don't include unnecessary taskbars
4. **Use Windows Snipping Tool** (Win + Shift + S)
5. **Save screenshots** with descriptive names for easy reference

### Customization:

The VBS script is fully editable. You can:
- Change slide titles
- Modify content text
- Add more slides
- Change colors/fonts
- Adjust layout

### Presentation Duration:

- **Estimated time**: 90-120 minutes
- Includes practical exercises
- Allow time for Q&A

### Troubleshooting:

**Script doesn't run:**
- Make sure PowerPoint is installed
- Check that .vbs files are allowed to run
- Run PowerShell as admin: `Set-ExecutionPolicy RemoteSigned`

**Presentation doesn't save:**
- Check you have write permissions in the folder
- Make sure PowerPoint isn't already running
- Close any existing presentations first

## Teaching Notes:

**Focus Areas:**
1. Installation & setup (15 min)
2. Network configuration (25 min)
3. Router setup for online access (20 min)
4. Feature walkthrough (30 min)
5. **IoT device monitoring** (25 min) ⭐ Main topic
6. Practical exercise (30 min)
7. Q&A (15 min)

**Key Learning Objectives:**
- Understand LAN vs online access
- Configure network infrastructure
- Monitor medical IoT devices
- Apply telemetry concepts
- Troubleshoot common issues

**Practical Exercise:**
Have students:
1. Install the software
2. Connect 2+ computers on LAN
3. Set up an IoT device monitor
4. Observe real-time data updates

---

**Copyright © 2025 LoNE WoLvES. All rights reserved.**

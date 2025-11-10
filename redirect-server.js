import http from 'http';

const HTTP_PORT = 80; // Standard HTTP port (no port number needed in URL!)
const HTTPS_PORT = 5173; // Your Vite HTTPS port

const server = http.createServer((req, res) => {
    const host = req.headers.host?.split(':')[0] || 'localhost';
    const redirectUrl = `https://${host}:${HTTPS_PORT}${req.url}`;

    console.log(`🔀 Redirecting: http://${host}${req.url} -> ${redirectUrl}`);

    res.writeHead(301, {
        'Location': redirectUrl,
        'Content-Type': 'text/html'
    });

    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="refresh" content="0;url=${redirectUrl}">
            <title>Redirecting to HTTPS...</title>
        </head>
        <body>
            <h2>🔒 Redirecting to secure connection...</h2>
            <p>If you are not redirected automatically, <a href="${redirectUrl}">click here</a>.</p>
        </body>
        </html>
    `);
});

server.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log('🔀 HTTP Redirect Server started on PORT 80');
    console.log(`   Users can visit: http://YOUR_IP (no port needed!)`);
    console.log(`   Will redirect to: https://YOUR_IP:${HTTPS_PORT}`);
    console.log('');
    console.log('   NOTE: Port 80 may require administrator privileges');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${HTTP_PORT} is already in use`);
        console.error('   Try stopping other web servers or running as administrator');
    } else if (err.code === 'EACCES') {
        console.error(`❌ Permission denied for port ${HTTP_PORT}`);
        console.error('   Port 80 requires administrator privileges');
        console.error('   Run Command Prompt as Administrator and try again');
    } else {
        console.error('❌ Server error:', err);
    }
    process.exit(1);
});
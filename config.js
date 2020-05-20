const config = {
    // CORE
    port: 3000,                 // Port Server (default is 3000)
    logger: true,               // Server Log (default is true)
    useWorker: true,            // Use CPU as worker (default is true)
    timeout: 30,                // Timeout request to get image (default is 30 seconds)

    // CACHE
    maxage: 3600,               // Max age of cache before expires (default is 3600)

    // FIREWALL
    firewall_request: false,    // Activate firewall (default is false)
    allow_no_referer: true,     // Allow access with no referer policy (default is true)
    allow_domain:[              // Just write the domain or sub domain without scheme and port
        'yourdomain1.com',
        'yourdomain2.com'
    ]
};

module.exports = config;
const os = require('os');

/**
 * Allow this Next.js development server to be used from other devices
 * on the same local network (for example, a phone connected to Wi-Fi).
 *
 * We collect the machine's local interface IPs instead of hard-coding one
 * address, because DHCP can change the computer's LAN IP over time.
 */
function getLocalDevOrigins() {
  const interfaces = os.networkInterfaces();
  const origins = new Set();

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries ?? []) {
      if (!entry || entry.internal) continue;
      if (entry.family === 'IPv4') {
        origins.add(entry.address);
      }
    }
  }

  return [...origins];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: getLocalDevOrigins(),
};

module.exports = nextConfig;

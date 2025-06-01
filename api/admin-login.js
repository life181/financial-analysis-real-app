// /api/admin-login.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  // Access your secret password from environment variable
  const adminPassword = process.env.VERCEL_ADMIN_PASSWORD;

  if (!adminPassword) {
    // Just in case environment variable is missing
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }

  if (password === adminPassword) {
    // You can add session tokens or JWT here for real apps
    return res.status(200).json({ success: true, message: 'Authentication successful.' });
  } else {
    return res.status(401).json({ success: false, error: 'Invalid password.' });
  }
}
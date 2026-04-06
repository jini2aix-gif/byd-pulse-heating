export default function handler(req, res) {
  const { code } = req.body;
  // User requested password "7345477"
  const correctCode = process.env.ENGINEERING_CODE || "7345477";
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Basic security: Timing safe comparison could be added, but a strict string match is sufficient for this scope.
  if (code === correctCode) {
    // Increase security using HTTP-only cookies
    res.setHeader('Set-Cookie', 'auth_session=granted; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure');
    return res.status(200).json({ authorized: true });
  } else {
    // Secure anti-bruteforce delay (rudimentary)
    return setTimeout(() => {
      res.status(401).json({ authorized: false, message: 'Invalid Engineering Code' });
    }, 1000);
  }
}

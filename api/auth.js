export default function handler(req, res) {
  const { code } = req.body;
  const correctCode = process.env.ENGINEERING_CODE || "0406"; // Default code for now, user can change in Vercel
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (code === correctCode) {
    return res.status(200).json({ authorized: true });
  } else {
    return res.status(401).json({ authorized: false, message: 'Invalid Engineering Code' });
  }
}

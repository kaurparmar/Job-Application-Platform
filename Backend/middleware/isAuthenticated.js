import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token; // safer with optional chaining
    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.id = decoded.userId; // attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
}
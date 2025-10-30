import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // Check for Authorization header: "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token using secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attach decoded user info to req object
    next(); // move to next middleware/route
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;

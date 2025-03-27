import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.access_token;
  // Check if token exists
  if (token === undefined || token === null) {
    return res.redirect("/login?message=Unauthorized");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.iat >= decoded.exp) {
      return res.redirect("/login?message=Token%20expired");
    }
    // Attach user information to request
    req.body = decoded;
    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    console.log(error);
    res.status(401).json({
      message: error,
    });
  }
};

export default authMiddleware;

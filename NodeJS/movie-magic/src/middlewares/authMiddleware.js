import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export const authMiddleware = (req, res, next) => {
  //Check if there is a token in the requets
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }
  //Validate token

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const user = {
      _id: decodedToken._id,
      email: decodedToken.email,
    };

    req.user = user;
    res.locals.userId = user._id;
    res.locals.userEmails = user.email;
    res.locals.isAuthenticated = true;

    return next();
  } catch (err) {
    res.clearCookie("auth");

    res.redirect("/auth/login");
  }

  // Add user data to request
};

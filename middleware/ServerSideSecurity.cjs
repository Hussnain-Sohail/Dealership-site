const jwt = require("jsonwebtoken");

async function ServerSideSecurity(req, res, next) {
  try {
    console.log('middleware hit ?');
    const AuthHeader = req.headers["authorization"];
    if (!AuthHeader) {
      {
        console.log('if executed in middleware ?');
        return res.status(403).json({ message: "No token" });
      }
    }

    const AccessToken = AuthHeader.split(" ")[1];
    jwt.verify(
      AccessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = decoded;
        next();
      },
    );
  } catch (error) {
    console.error(error);
  }
}
module.exports = ServerSideSecurity;

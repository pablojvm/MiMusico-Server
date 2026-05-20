const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const tokenText = req.headers.authorization;
    if (!tokenText || !tokenText.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ errorMessage: "Token no proporcionado o formato inválido" });
    }

    const token = tokenText.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);

    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Token no existe o no es válido" });
  }
}

module.exports = verifyToken;

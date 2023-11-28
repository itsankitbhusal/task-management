import jwt from "jsonwebtoken";

const error = (message) => ({
  success: false,
  message
});
const success = data => ({
  success: true,
  data
});

// sign access token
const signAccessToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: '7d'
  });
}

// sign refresh token
const signRefreshToken = username => {
  return jwt.sign({ username }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: '7d'
  });
}

export { error, success, signRefreshToken, signAccessToken };
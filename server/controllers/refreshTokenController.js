const User = require("../data/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const user = decoded.username;
    const phone = foundUser.phone;
    const coords = foundUser.coordinates;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          phone: phone,
          coordinates: coords,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ user, phone, coords, accessToken });
  });
};

module.exports = { handleRefreshToken };

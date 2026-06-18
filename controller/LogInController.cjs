const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserSchema = require("../model/UserSchema.cjs");
const z = require('zod');
const client = require('../server/redis.cjs');
const userData = z.object({
  Name: z.string(),
  password: z.string().min(6),
})

async function LogInController(req, res) {
  try {
    const validData = userData.safeParse(req.body);
    if (!validData.success) {
      return res.status(400).json({ message: validData.error.issues[0].message });
    }

    const key = `user:/${validData.data.Name}`;

    await client.set(key, 0, { NX: true });

    const totalAttempts = Number(await client.get(key));

    if (totalAttempts >= 3) {
      console.log('request blocked ?');
      await client.expire(key, 30);
      return res.status(403).json({ message: 'Request blocked. Please try again in 30 seconds' });
    }

    const FindUser = await UserSchema.findOne({ Name: validData.data.Name });
    if (!FindUser) return res.status(400).json({ message: `Username ${Name} not found` });

    const CheckPassword = await bcrypt.compare(validData.data.password, FindUser.Password);
    if (!CheckPassword) {
      await client.incr(key);
      console.log(`value of key ${await client.get(key)}`);
      return res.status(403).json({ message: "Invalid Password" });
    } else
      await client.del(key);

    const AccessToken = jwt.sign(
      { Name: validData.data.Name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" },
    );
    const RefreshToken = jwt.sign(
      { Name: validData.data.Name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5m" },
    );

    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });
    return res.status(200).json({
      message: `Logged In successfully`,
      AccessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = LogInController;

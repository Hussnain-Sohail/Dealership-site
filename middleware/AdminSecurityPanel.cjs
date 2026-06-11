const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema.cjs');

async function CheckIsAdmin(req, res) {
    try {
        const FindUser = await User.findOne({ Name: req.user.Name });

        if (!FindUser) {
            return res.status(403).json({ isAdmin: false });
        }

        return res.status(200).json({ isAdmin: FindUser.Role === 'admin' ? true : false });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ isAdmin: false });
    }
}
module.exports = CheckIsAdmin;
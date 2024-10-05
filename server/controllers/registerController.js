const User = require('../data/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const { user, pwd, phone, coords } = req.body;
    if (!user || !pwd || !phone || !coords) return res.status(400).json({ 'message': 'Username and password are required.' });
    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({ 
            "username": user,
            "password": hashedPwd,
            "phone": phone,
            "coordinates": coords
        });
        console.log(result);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
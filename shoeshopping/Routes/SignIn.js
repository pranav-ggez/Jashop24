const express = require('express');
const router = express.Router();
const User = require('../Model/User');

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = password==user.password
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    req.session.user = {
      email: user.email,
      name: user.name,
    };
    res.json({ success: true, message: 'Signed in' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 router.post('/logout', (req, res) => {
   req.session.destroy((err) => {
     if (err) {
       console.error(err);
       return res.status(500).json({ error: 'Logout failed' });
     }
     res.clearCookie('connect.sid'); // Clear the session cookie
     res.json({ success: true, message: 'Logged out' });
   });
 });
module.exports = router;
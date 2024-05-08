const express = require('express');
const router = express.Router();
router.post('/user', async(req, res) => {
    console.log("YAyayaya")
    if (req.session.user) {
      const user = req.session.user;
      console.log(user)
      res.json({ email: user.email, name: user.name });
    } else {
      res.json({ error: 'Not signed in' });
    }
  });
module.exports = router;
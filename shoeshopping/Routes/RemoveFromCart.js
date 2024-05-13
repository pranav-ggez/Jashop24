const express = require("express");
const router = express.Router();
const Cart = require("../Model/Cart");
const { body, validationResult } = require("express-validator");
router.post("/RemoveFromCart", async (req, res) => {
  const error = validationResult(req);
  console.log("REmoval", req.body);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.status(400).json({ errors: error.array() });
  }

  try {
    console.log("REmoval                          ", req.body);
    let cart = await Cart.findOne({ email: req.body.email });
    console.log(cart);
    if (cart) {
      let newCart = [];
      // let len=0;
      cart.cartItems.map((item) => {
        if (item.id != req.body.id) {
          newCart.push(item);
        }
      });
      console.log(newCart);
      await Cart.updateOne(
        { name: req.body.name, email: req.body.email },
        { $set: { cartItems: newCart } }
      );
      console.log("User created");
      res.json({ success: true });
    } else {
      res.json({ success: false, error: "No cart exists for user" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

module.exports = router;

const {connectToMongo} = require('./db')
const express = require('express');
const path = require('path');
const app = express();
const mongoose=require('mongoose')
const session = require('express-session');


app.use(session({
  secret: 'ggwp', // Change this to a unique secret key
  resave: false, // Don't resave the session if it hasn't changed
  saveUninitialized: true, // Save the session even if it hasn't been modified
  cookie: {
    httpOnly: true, // Only send over HTTPS in production
    sameSite: 'strict', // Mitigates CSRF attacks
  },
}));

// Body parser middleware to parse JSON bodies
app.use(express.json());
connectToMongo()


app.use(express.static(path.join(__dirname,)));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



connectToMongo()
app.use(express.json());
app.use("/api", require("./Routes/ReturnClothes"));
app.use("/api", require("./Routes/SignIn"));
app.use("/api", require("./Routes/Signup"));
app.use("/api", require("./Routes/AddToCart"));
app.use("/api", require("./Routes/Profile"));
app.use("/api", require("./Routes/FetchCart"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
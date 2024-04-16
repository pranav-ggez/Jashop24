const {connectToMongo} = require('./db')
const express = require('express');
const path = require('path');
const app = express();
const mongoose=require('mongoose')
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
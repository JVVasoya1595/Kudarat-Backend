const mongoose = require('mongoose');
require('dotenv').config();
const Home = require('./models/Home');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const home = await Home.findOne();
    console.log("Current DB mapEmbedUrl:", home.location.info.mapEmbedUrl);
    process.exit();
});

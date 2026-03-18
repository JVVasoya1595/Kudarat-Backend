const mongoose = require('mongoose');
require('dotenv').config();
const Home = require('./models/Home');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        const home = await Home.findOne();
        if(!home) {
            console.log("No home document found.");
            process.exit(1);
        }
        
        home.location.info.mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.7300362742526!2d72.69260267432234!3d23.14354101180485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e819852da1257%3A0x6d71d34041366e31!2sKudarat%20Waterpark!5e0!3m2!1sen!2sin!4v1773832544322!5m2!1sen!2sin";
        
        await home.save();
        console.log("Live DB mapEmbedUrl updated securely!");
        process.exit();
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
});

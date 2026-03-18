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
        
        // Deep clone the arrays to avoid reference issues
        const facilityImages = home.premiumFacilities.cards.map(c => c.imageUrl);
        const galleryImages = [...home.gallery.images];
        
        // Swap the images
        for (let i = 0; i < home.premiumFacilities.cards.length; i++) {
            if(galleryImages[i]) {
                home.premiumFacilities.cards[i].imageUrl = galleryImages[i];
            } else {
                home.premiumFacilities.cards[i].imageUrl = '';
            }
        }
        
        home.gallery.images = facilityImages;
        
        await home.save();
        console.log("Swapped live DB images!");
        process.exit();
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
});

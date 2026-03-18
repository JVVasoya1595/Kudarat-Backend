const mongoose = require('mongoose');

const galleryPageSchema = new mongoose.Schema({
    title: { type: String, default: 'OUR GALLERY' },
    subtitle: { type: String, default: 'Our Gallery — where every image tells a story of fun, splash, and unforgettable moments.' },
    categories: [
        {
            label: { type: String, required: true },
            value: { type: String, required: true },
            images: [{ type: String }]
        }
    ],
    video: {
        title: { type: String, default: 'Gallery Video' },
        url: { type: String, default: '' },
        placeholder: { type: String, default: 'Video placeholder — Watch Now' }
    }
}, { timestamps: true });

module.exports = mongoose.model('GalleryPage', galleryPageSchema);

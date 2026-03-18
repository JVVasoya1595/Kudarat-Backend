const fs = require('fs');
const path = require('path');

const facilitiesDir = path.join(__dirname, 'public/home/facilities');
const galleryDir = path.join(__dirname, 'public/home/gallery');
const tempDir = path.join(__dirname, 'public/home/temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const facilityFiles = fs.readdirSync(facilitiesDir);
facilityFiles.forEach(file => {
    fs.renameSync(path.join(facilitiesDir, file), path.join(tempDir, file));
});

const galleryFiles = fs.readdirSync(galleryDir);
galleryFiles.forEach(file => {
    fs.renameSync(path.join(galleryDir, file), path.join(facilitiesDir, file));
});

const tempFiles = fs.readdirSync(tempDir);
tempFiles.forEach(file => {
    fs.renameSync(path.join(tempDir, file), path.join(galleryDir, file));
});

fs.rmdirSync(tempDir);
console.log("Files moved successfully!");

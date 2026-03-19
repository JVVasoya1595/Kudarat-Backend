const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const imageEncryptMiddleware = require('./middleware/imageEncrypt');
const imageDecryptMiddleware = require('./middleware/imageDecrypt');
const normalizePayloadMiddleware = require('./middleware/normalizePayload');
const ip = require('ip');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Admin panel uses FormData for API requests. express.json() / urlencoded() do not parse FormData.
// So we must parse it manually for DELETE requests (without saving any files) before handlers.
const multer = require('multer');
const deleteUpload = multer().none();
app.use((req, res, next) => {
    if (req.method === 'DELETE') {
        deleteUpload(req, res, (err) => next());
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(normalizePayloadMiddleware);
app.use(imageDecryptMiddleware);
app.use(imageEncryptMiddleware);

// Route files
const homeRoutes = require('./routes/homeRoutes');
const imageRoutes = require('./routes/imageRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const attractionsRoutes = require('./routes/attractionsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const safetyRoutes = require('./routes/safetyRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const globalRoutes = require('./routes/globalRoutes');

// Mount routers (dual mount for backward compatibility and /api compliance)
app.use('/img', imageRoutes);
app.use('/home', homeRoutes);
app.use('/api/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/api/about', aboutRoutes);
app.use('/tickets', ticketRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/attractions', attractionsRoutes);
app.use('/api/attractions', attractionsRoutes);
app.use('/contact', contactRoutes);
app.use('/api/contact', contactRoutes);
app.use('/faq', faqRoutes);
app.use('/api/faq', faqRoutes);
app.use('/safety', safetyRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/gallery', galleryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/all', globalRoutes);
app.use('/api/all', globalRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/upload', uploadRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Kedrat Waterpark API is running...');
});

const { serveImage } = require('./controllers/imageController');
app.use(serveImage);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running at: http://${ip.address()}:${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const imageEncryptMiddleware = require('./middleware/imageEncrypt');
const ip = require('ip');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
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

// Mount routers
app.use('/img', imageRoutes);
app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/tickets', ticketRoutes);
app.use('/attractions', attractionsRoutes);
app.use('/contact', contactRoutes);
app.use('/faq', faqRoutes);
app.use('/safety', safetyRoutes);
app.use('/gallery', galleryRoutes);
app.use('/all', globalRoutes);
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

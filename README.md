# Kudarat Waterpark Backend

This is the backend API for the Kudarat Waterpark website. It provides endpoints for managing home page content, about section, attractions, ticket pricing, and contact inquiries.

## 🚀 Teck Stack

- **Node.js** & **Express** - Backend framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Secure communication (via image encryption/token system)
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables management
- **IP** - For server network details

## 📁 Project Structure

```text
e:\Kudarat-backend
├── config/             # Database configuration
├── controllers/        # Request handlers (Home, About, Attractions, Contact, etc.)
├── middleware/         # Custom middlewares (ErrorHandler, Image Encryption)
├── models/             # Mongoose schemas
├── public/             # Static assets (Images, Icons)
├── routes/             # API route definitions
├── scripts/            # Selection scripts (Database seeding)
├── utils/              # Utility functions
├── server.js           # Entry point
└── .env                # Configuration file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Running locally or on Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Kudarat-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5005
   MONGO_URI=mongodb://localhost:27017/kedrat
   SERVER_URL=http://localhost:5005
   CORS_ORIGIN=http://localhost:5173
   ENCRYPTION_KEY=your_secure_32_character_key
   NODE_ENV=development
   ```

4. Seed the Database:
   ```bash
   npm run seed
   ```

5. Run the Server:
   - For production: `npm start`
   - For development: `npm run dev`

## 🔗 API Endpoints

### 🏠 Home Page
- `GET /home` - Get all home page sections
- `GET /home/hero` - Get hero section data
- `GET /home/facilities` - Get premium facilities
- `GET /home/rides` - Get signature rides
- `GET /home/pricing` - Get pricing section
- `GET /home/gallery` - Get gallery images
- `GET /home/location` - Get location & contact info

### ℹ️ About Page
- `GET /about` - Get about page content

### 🎢 Attractions
- `GET /attractions` - Get all rides, attractions, and safety guidelines

### 🎫 Tickets
- `GET /tickets` - Get ticket booking page data and pricing

### 📞 Contact
- `GET /contact` - Get contact page info
- `POST /contact/inquiry` - Submit a new inquiry (Name, Email, Message)

### 🖼️ Images
- `GET /img/:path` - Access protected/encrypted images

## 🛡️ Special Features

- **Image Encryption Middleware**: Ensures that images are accessed through secure tokens/paths.
- **Global Error Handler**: Unified error response format for all API failures.
- **Seeding Script**: Easily re-initialize the database with default content.

## 📄 License

This project is licensed under the ISC License.

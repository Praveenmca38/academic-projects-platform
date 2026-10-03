# Complete Setup Guide

## Prerequisites

Before you start, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (usually comes with Node.js)
- **Git** (optional, for version control)

## Project Structure

```
academic-projects-platform/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── server/                    # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Step-by-Step Setup

### 1. Extract the Project

Unzip the `academic-projects-platform.zip` file to your desired location:

```bash
unzip academic-projects-platform.zip
cd academic-projects-platform
```

### 2. Setup MongoDB

#### Option A: Local MongoDB Installation

**On Windows:**
- Download and install MongoDB from [here](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  ```bash
  mongod
  ```

**On macOS (using Homebrew):**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**On Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `server/.env` with your connection string

### 3. Setup Backend Server

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and configure your MongoDB connection:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/academic-projects
NODE_ENV=development
```

Seed the database with sample projects:

```bash
npm run seed
```

Start the backend server:

```bash
npm start
```

You should see output like:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### 4. Setup Frontend (in a new terminal)

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

The default configuration should work:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

## Verify Installation

1. **Backend**: Open `http://localhost:5000/api/health` in your browser
   - You should see: `{"status":"Server is running"}`

2. **Frontend**: Open `http://localhost:3000` in your browser
   - You should see the Academic Projects Platform home page

## Initial Data

The seed script adds 10 sample projects to the database. You can:
- View them on the Projects page
- Filter by domain, difficulty, and semester
- Click on any project to see full details

## Common Issues & Solutions

### MongoDB Connection Error

**Problem**: `ERROR: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongodb
   ```

2. Check your connection string in `.env`
3. If using MongoDB Atlas, make sure to whitelist your IP address

### CORS Error

**Problem**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
1. Make sure the backend server is running
2. Check `REACT_APP_API_URL` in client `.env` is correct
3. Restart both servers after changing environment variables

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
1. Change the PORT in server `.env`:
   ```env
   PORT=5001
   ```

2. Or kill the process using the port:
   ```bash
   # On Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # On macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

### Database Not Showing Data

**Problem**: Projects page is empty

**Solution**:
1. Run the seed script again:
   ```bash
   cd server
   npm run seed
   ```

2. Check if MongoDB is running and connected
3. Verify the connection string in `.env`

## Development Commands

### Backend

```bash
cd server

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Run tests
npm test
```

### Frontend

```bash
cd client

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects?domain=AI/ML&difficulty=Beginner` - Filter projects
- `GET /api/projects/search?q=CNN` - Search projects
- `GET /api/projects/domain/AI/ML` - Get projects by domain
- `GET /api/projects/stats` - Get statistics
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check

- `GET /api/health` - Server status

## File Descriptions

### Backend Files

- **server.js** - Main Express server file
- **models/Project.js** - MongoDB project schema
- **controllers/projectController.js** - Business logic for project operations
- **routes/projects.js** - API route definitions
- **seed.js** - Sample data generator

### Frontend Files

- **App.js** - Main React component and routing
- **services/api.js** - API calls configuration
- **pages/** - Page components (Home, Projects, etc.)
- **components/** - Reusable components (Navigation, Footer, ProjectCard)

## Next Steps

1. **Customize**: Modify the sample projects in `server/seed.js`
2. **Add Features**: Implement user authentication, comments, favorites
3. **Deploy**: Push to cloud platforms (Vercel for frontend, Heroku for backend)
4. **Mobile**: Convert to React Native for mobile app
5. **Database**: Add database backups and maintenance routines

## Deployment

### Frontend Deployment (Vercel)

```bash
npm i -g vercel
cd client
vercel
```

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Connect repository to Railway or Render
3. Set environment variables
4. Deploy

## Support & Troubleshooting

- Check MongoDB connection: `mongosh`
- View server logs in console
- Check browser console for frontend errors (F12)
- Verify all ports are not in use
- Ensure Node.js version is v14+

## Getting Help

- Check the README.md for overview
- Review console error messages
- Verify environment variables are set correctly
- Ensure all dependencies are installed

---

**Happy Coding! 🚀**

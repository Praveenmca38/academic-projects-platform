# Academic Projects Platform

A web platform that provides project ideas for B.Tech students studying AI & ML, CSE, and IT.

## Tech Stack
- **Frontend:** React, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Database:** MongoDB

## Project Structure

```
academic-projects-platform/
├── client/           # React frontend
├── server/           # Express backend
└── README.md
```

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## Quick Start

### 1. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/academic-projects
NODE_ENV=development
```

Start MongoDB (if local):
```bash
mongod
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 2. Setup Frontend

```bash
cd client
npm install
```

Create `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React development server:
```bash
npm start
```

The frontend will open on `http://localhost:3000`

## Features

- ✅ Browse project ideas by domain (AI/ML, CSE, IT)
- ✅ Filter projects by difficulty level, tech stack, and semester
- ✅ View detailed project information
- ✅ Search functionality
- ✅ Responsive design
- ✅ Project management (Add, Edit, Delete)

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects?domain=AI&difficulty=intermediate` - Filter projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Database Schema

### Project Model
```javascript
{
  title: String,
  description: String,
  domain: String (AI/ML, CSE, IT),
  difficulty: String (Beginner, Intermediate, Advanced),
  semester: Number (1-8),
  technologies: [String],
  prerequisites: [String],
  estimatedHours: Number,
  resources: [String],
  ideaAuthor: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Sample Data

The project includes a seed script to populate sample project ideas. Run:

```bash
cd server
npm run seed
```

## Development

### Adding New Features

1. **Backend:** Add routes in `server/routes/`, controllers in `server/controllers/`
2. **Frontend:** Add components in `client/src/components/`, pages in `client/src/pages/`
3. **Database:** Update models in `server/models/`

### Testing

```bash
cd server
npm test
```

## Deployment

### Frontend (Vercel)
```bash
npm i -g vercel
cd client
vercel
```

### Backend (Railway, Render, Heroku)
Follow the platform-specific deployment guides.

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP

**CORS Error:**
- Check backend CORS configuration in `server/server.js`
- Ensure frontend URL matches allowed origins

**Port Already in Use:**
- Change PORT in .env file (backend)
- React uses 3000 by default, can be changed with `PORT=3001 npm start`

## Future Enhancements

- User authentication
- Project bookmarking/favorites
- User comments and ratings
- Mobile app (React Native)
- Project submission by students
- Mentor assignment

## License

MIT

## Support

For issues or questions, please open an issue or contact the development team.

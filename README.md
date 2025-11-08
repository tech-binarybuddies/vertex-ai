# Vectorax AI Showcase

A modern, full-stack web application showcasing AI-powered business solutions. Built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Admin Panel**: Complete dashboard for managing clients, messages, prompts, and pricing
- **Authentication**: Secure login/signup with role-based access
- **Responsive Design**: Mobile-first approach with modern UI components
- **Deployment Ready**: Configured for Render.com deployment

## Project Structure

```
vectorax-ai-showcase-main/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   └── ...            # Public pages
│   └── ...
├── server/                # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── api/                   # Serverless functions (legacy)
├── public/                # Static assets
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vectorax-ai-showcase-main
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB URI and other secrets

5. Start the development servers:
   ```bash
   # Frontend (port 8080)
   npm run dev

   # Backend (port 5000 - configure in server/index.js)
   cd server && npm run dev
   ```

## Deployment

### Render.com Deployment

1. Connect your GitHub repository to Render
2. Create two web services:
   - **Backend**: Use `server/` directory, set build command to `npm install`, start command to `npm start`
   - **Frontend**: Use root directory, set build command to `npm install && npm run build`, start command to `npm run preview`
3. Set environment variables in Render dashboard
4. Deploy!

### Environment Variables

**Backend (.env):**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Admin (Protected)
- `GET /api/admin/messages` - Get all messages
- `GET /api/admin/clients` - Get all clients
- `GET /api/admin/prompts` - Get all prompts
- `POST /api/admin/prompts` - Create new prompt
- `PUT /api/admin/prompts/:id` - Update prompt
- `DELETE /api/admin/prompts/:id` - Delete prompt
- `GET /api/admin/pricing` - Get pricing plans
- `POST /api/admin/pricing` - Create pricing plan
- `PUT /api/admin/pricing/:id` - Update pricing plan
- `DELETE /api/admin/pricing/:id` - Delete pricing plan

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or support, please contact the development team.

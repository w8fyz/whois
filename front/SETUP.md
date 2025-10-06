# Frontend Setup Guide

## What's Been Created

A complete dark theme React frontend with authentication for the whois application.

## Features

### Dark Theme
- Modern dark color scheme with GitHub-inspired design
- Smooth transitions and hover effects
- Fully responsive layout
- Custom CSS variables for easy theme customization

### Authentication
- **Login** - Email and password authentication
- **Register** - New user registration with first name, last name, email, and password
- **Token Management** - Automatic Bearer token handling in requests
- **Persistent Sessions** - User stays logged in across page refreshes

### Components

1. **Navbar** - Top navigation with auth status and login/logout buttons
2. **Auth** - Combined login/register form with toggle
3. **Home** - Landing page with search functionality
4. **Contacts** - Protected route showing user's contacts (requires authentication)

### API Integration

All API endpoints from your Postman collection are integrated:
- `/auth/register` - User registration
- `/auth/login` - User login
- `/contacts` - Get all contacts (protected)
- `/contacts/:id` - Get, update, delete contact (protected)

## Configuration

### Environment Variables

The API URL is configured in `.env`:
```
REACT_APP_API_URL=http://localhost:3000
```

You can change this to point to your production API when deploying.

## File Structure

```
src/
├── components/
│   ├── Navbar.js      # Navigation bar with auth status
│   ├── Auth.js        # Login/Register form
│   ├── Home.js        # Landing page
│   └── Contacts.js    # Contacts list (protected)
├── services/
│   └── api.js         # API service with all endpoints
├── App.js             # Main app component with routing
├── App.css            # Dark theme styles
├── index.css          # Global styles and CSS variables
└── index.js           # App entry point
```

## How It Works

### Authentication Flow

1. User clicks "Login / Register" in navbar
2. Auth form appears with login/register toggle
3. On successful auth, token is stored in `localStorage`
4. Token is automatically included in all protected API requests
5. User info is displayed in navbar
6. Logout clears token and returns to home

### Token Storage

- Token is stored in `localStorage` as `auth_token`
- User email is stored as `user_email` for display
- Token is automatically included in Authorization header as `Bearer {token}`

### Protected Routes

The Contacts component requires authentication. If user is not logged in, they see the Home page instead.

## Running the App

```bash
npm start
```

The app will run on `http://localhost:3000` (or another port if 3000 is taken).

Make sure your backend API is running on the configured `REACT_APP_API_URL`.

## Customizing the Theme

All theme colors are defined as CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #0d1117;      /* Main background */
  --bg-secondary: #161b22;    /* Cards, navbar */
  --bg-tertiary: #21262d;     /* Input backgrounds */
  --border-color: #30363d;    /* Borders */
  --text-primary: #c9d1d9;    /* Main text */
  --text-secondary: #8b949e;  /* Secondary text */
  --accent-primary: #58a6ff;  /* Primary accent */
  --accent-hover: #1f6feb;    /* Hover states */
  --success: #3fb950;         /* Success messages */
  --error: #f85149;           /* Error messages */
}
```

Simply change these values to customize the entire theme.

## Next Steps

You can extend this by:
- Adding contact creation/editing forms
- Implementing proper routing with React Router
- Adding user profile management
- Implementing the search functionality
- Adding contact filtering and sorting
- Adding pagination for large contact lists


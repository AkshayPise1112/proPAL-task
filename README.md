# Next.js Authentication Dashboard

A complete authentication and settings dashboard built with Next.js, Tailwind CSS, and React hooks.

## Features

- 🔐 **Authentication System**

  - User registration and login
  - Protected dashboard routes
  - Persistent auth state

- 🌙 **Dark Mode Support**

  - Toggle between light and dark themes
  - Persistent theme selection

- 👤 **Profile Management**

  - View user information
  - Update email and password
  - Form validation and feedback

- 🤖 **Agent Configuration**

  - Speech-to-text provider selection
  - Interdependent dropdown menus
  - Configuration persistence
  - Real-time summary display

- 🎨 **Modern UI/UX**
  - Responsive design
  - Smooth animations and transitions
  - Clean, professional interface
  - Tailwind CSS styling

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** with Hooks
- **Tailwind CSS** for styling
- **localStorage** for data persistence

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── globals.css          # Global styles and Tailwind setup
├── layout.js           # Root layout with auth and theme context
├── page.js             # Landing page
├── login/
│   └── page.js         # Login page
├── signup/
│   └── page.js         # Registration page
└── dashboard/
    ├── layout.js       # Dashboard layout with sidebar
    ├── page.js         # Dashboard redirect
    ├── profile/
    │   └── page.js     # Profile management
    └── agent/
        └── page.js     # Agent configuration

public/
└── stt.json           # STT configuration data
```

## Key Features Explained

### Authentication Flow

- Users can register with username, email, password, and optional phone
- Login validates credentials against stored user data
- Protected routes redirect to login if not authenticated
- Auto-logout functionality available in dashboard

### Profile Management

- Display user information (username, phone, email)
- Allow updating email and password
- Form validation with success/error feedback
- Changes persist to localStorage

### Agent Configuration

- Load STT providers from configuration data
- Three interdependent dropdowns (Provider → Model → Language)
- Real-time configuration summary
- Save settings to localStorage

### Dark Mode

- System-wide dark mode toggle
- Persistent theme selection
- Smooth color transitions
- Accessible color contrast

## Data Storage

The app uses localStorage for data persistence:

- `users`: Array of registered users
- `currentUser`: Currently logged-in user
- `agentConfig`: Selected STT configuration
- `darkMode`: Theme preference

For production, replace localStorage with a proper database solution.

## Styling

The app uses Tailwind CSS with:

- Custom component classes for consistency
- Dark mode variants throughout
- Responsive design patterns
- Modern glassmorphism effects
- Smooth transitions and animations

## Browser Support

- Modern browsers with ES6+ support
- localStorage API required
- CSS Grid and Flexbox support needed

# LearnSphere 🎓

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-green.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.10-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive e-learning platform built with React and Vite. LearnSphere provides an intuitive interface for students and instructors to engage in online learning with features like course browsing, video streaming, progress tracking, and interactive content delivery.

![LearnSphere Homepage](https://github.com/user-attachments/assets/b1fc689d-d0fa-477c-97cf-860b66a6c31d)

## ✨ Features

### 🎯 Core Functionality
- **Course Management**: Browse, search, and filter courses by category and difficulty
- **User Authentication**: Secure login/signup with Google OAuth integration
- **Video Streaming**: High-quality video playback with HLS.js and Plyr
- **Progress Tracking**: Monitor learning progress and course completion
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Advanced Features
- **Real-time Search**: Instant course search with dynamic filtering
- **Interactive UI**: Smooth animations with Framer Motion
- **Course Categories**: Web Development, Data Science, AI, Mobile Dev, Design, Cloud, DevOps, Cybersecurity, Marketing
- **Instructor Profiles**: Detailed educator information with ratings and reviews
- **Settings Management**: Customizable user preferences and account settings

### 🎨 UI/UX Features
- **Modern Design**: Clean, intuitive interface with Tailwind CSS
- **Dark Theme**: Professional dark mode design
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Accessibility**: Screen reader friendly and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay2121js/learnsphere-vite.git
   cd learnsphere-vite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Frontend URL that Google should redirect to after login
   VITE_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
   
   # Your backend base API URL
   VITE_BACKEND_URI=http://localhost:8080/api
   
   # Google OAuth Client ID (used for frontend auth requests)
   VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
learnsphere-vite/
├── public/                 # Static assets
├── src/
│   ├── Pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── VideoStreaming.jsx
│   │   ├── SettingsPage.jsx
│   │   └── AboutUs.jsx
│   ├── components/        # Reusable components
│   │   ├── AuthContext.jsx      # Authentication context
│   │   ├── HeroContext.jsx      # Hero section context
│   │   ├── Layout.jsx           # Main layout wrapper
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Sidebar.jsx          # Side navigation
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Hero.jsx             # Hero section
│   │   ├── CourseCard.jsx       # Course display card
│   │   ├── ErrorBoundary.jsx    # Error handling
│   │   └── HomePageComponent/   # Homepage-specific components
│   ├── Services/          # API services and utilities
│   │   ├── courseService.jsx    # Course-related API calls
│   │   ├── ListCourses.jsx      # Course listing service
│   │   ├── CreateCourse.jsx     # Course creation
│   │   ├── UpdateCourse.jsx     # Course updates
│   │   ├── UploadVideo.jsx      # Video upload functionality
│   │   └── cookieService.js     # Cookie management
│   ├── assets/            # Images, icons, and other assets
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles (Tailwind CSS)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server (localhost:3000)
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint for code quality

## 🔧 Development Guide

### Code Style

The project uses ESLint with React-specific rules for maintaining code quality. Run `npm run lint` to check for issues.

### Component Guidelines

1. **Functional Components**: Use React functional components with hooks
2. **File Naming**: Use PascalCase for component files (e.g., `CourseCard.jsx`)
3. **Props**: Use destructuring for props and provide default values when appropriate
4. **State Management**: Use React Context for global state (Auth, Hero visibility)

### Adding New Features

1. **Pages**: Add new pages in `src/Pages/` and update routing in `App.jsx`
2. **Components**: Create reusable components in `src/components/`
3. **Services**: Add API services in `src/Services/`
4. **Styling**: Use Tailwind CSS classes for consistent styling

### API Integration

The application expects a backend API running on the URL specified in `VITE_BACKEND_URI`. Key endpoints include:

- `GET /Public/course/{id}` - Fetch course details
- `GET /Public/AuthCourseInstructor` - Check course ownership
- `POST /course/enroll/{id}` - Enroll in course
- `GET /courses` - List all courses

## 🎨 Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **React Router DOM 7.6.2** - Client-side routing
- **Tailwind CSS 4.1.10** - Utility-first CSS framework

### UI & Animation
- **Framer Motion 12.18.1** - Animation library
- **Headless UI 2.2.4** - Unstyled, accessible UI components
- **Heroicons 2.2.0** - Beautiful hand-crafted SVG icons
- **Lucide React 0.525.0** - Additional icon library

### Media & Graphics
- **HLS.js 1.6.5** - HTTP Live Streaming
- **Plyr 3.7.8** - Customizable media player
- **React Player 3.0.0** - Media player for React
- **Chart.js 4.5.0** - Data visualization
- **React Confetti 6.4.0** - Celebration effects

### Utilities
- **Axios 1.10.0** - HTTP client
- **js-cookie 3.0.5** - Cookie handling
- **clsx 2.1.1** - Conditional className utility

### Development
- **ESLint 9.25.0** - Code linting
- **PostCSS 8.5.6** - CSS processing

## 🌐 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GOOGLE_REDIRECT_URI` | Google OAuth redirect URL | `http://localhost:3000/auth/callback` |
| `VITE_BACKEND_URI` | Backend API base URL | `http://localhost:8080/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-google-client-id-here` |

### Development vs Production

- **Development**: Uses Vite dev server on port 3000
- **Production**: Build output goes to `dist/` directory

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # Or change port in vite.config.js
   ```

2. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API connection issues**
   - Verify `VITE_BACKEND_URI` in `.env` file
   - Ensure backend server is running
   - Check browser console for CORS errors

4. **Build fails**
   ```bash
   # Clear Vite cache
   npx vite --force
   ```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful, responsive styling
- [Heroicons](https://heroicons.com/) - For the beautiful icons

---

**Built with ❤️ by the LearnSphere team**

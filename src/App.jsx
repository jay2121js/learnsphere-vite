// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { HeroProvider } from './components/HeroContext';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Ensure this is imported to apply Tailwind CSS styles
import Login from './Pages/Login'; // adjust path if needed
import Signup from './Pages/Signup'; // adjust path if needed
import MyLearning from './components/MyLearning'; // adjust path if needed
import ProfilePage from './Pages/ProfilePage'; // adjust path if needed
import CourseDetailPage from './Pages/CourseDetail'; // adjust path if needed
import CoursesPage from './Pages/CoursesPage'; // adjust path if needed
import AboutUsPage from './Pages/AboutUs';
import VideoStreamingPage from './Pages/VideoStreaming';
import SettingsPage from './Pages/SettingsPage';
const App = () => {
  return (
   <AuthProvider>
      <HeroProvider>
        <ErrorBoundary>
          <Routes>
        
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/CoursePage" element={<Layout><CoursesPage /></Layout>} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-learning" element={<Layout><MyLearning /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/courses/:courseId" element={<Layout><CourseDetailPage /></Layout>} />
            <Route path="/about" element={<Layout>  <AboutUsPage /></Layout>  } />
            <Route path="/stream/:courseId" element={<Layout><VideoStreamingPage /></Layout>} />
            <Route path="/settings" element={<Layout><SettingsPage/></Layout>} />
          </Routes>
        </ErrorBoundary>
      </HeroProvider>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

// Pages
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Quiz from './pages/quiz/Quiz';
import Question from './pages/question/Question';
import Results from './pages/results/Results';
import Teacher from './pages/teacher/Teacher';
import About from './pages/about/About';
import Settings from './pages/settings/Settings';
import NotFound from './pages/static/NotFound';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/';
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal */}
      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}

        {/* Content wrapper */}
        <div
          className={`flex-1 flex flex-col ${
            isHome
              ? 'bg-gradient-to-b from-[#0b1020] via-[#0c1226] to-[#0b1020]'
              : 'bg-base-100 p-4'
          }`}
        >
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/question" element={<Question />} />
              <Route path="/results" element={<Results />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </div>
        </div>
      </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;
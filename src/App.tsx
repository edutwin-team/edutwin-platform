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
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        {!hideSidebar && <Sidebar />}

        <div
          className={`flex-1 ${
            isHome ? 'p-0 bg-transparent overflow-y-auto' : 'p-4 bg-base-100 overflow-y-auto'
          }`}
        >
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
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

// Pages
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Quiz from './pages/quiz/Quiz';

import Settings from './pages/settings/Settings';
import NotFound from './pages/static/NotFound';
import Simulation from './pages/simulation/Simulation';
import Twins from './pages/twins/Twins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthProvider';
import { ContextPage } from './pages/contexts/ContextPage';
import { SettingsProvider } from './features/settings/SettingsProvider';
import { useCSRF } from './hooks/csrf/useCSRF';
import { isNotFoundRoute } from './utils/routes/routes';
import ProtectedRoute from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

const Layout: React.FC = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isNotFound = isNotFoundRoute(location.pathname);
  const hideSidebar = isHome || isNotFound;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal */}
      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}

        {/* Content wrapper */}
        <div className={`flex-1 flex flex-col ${isHome ? 'home-layout-bg' : 'right-panel-bg'}`}>
          <div className="flex-1 overflow-y-auto">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              {/* todo : add seperate quiz detail if needed */}

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/twins" element={<Twins />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/quizzes" element={<Quiz />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/simulation" element={<Simulation />} />

                <Route path="/contexts" element={<ContextPage />} />
              </Route>

              {/* 
             Experimental pages disabled:
             These routes are kept temporarily while their future integration is evaluated.
             They may be implemented, modified, or removed depending on project requirements.

              <Route path="/results" element={<Results />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/twin-profile" element={<TwinProfilePage />} />
              <Route path="/about" element={<About />} /> 
              
              */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useCSRF();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

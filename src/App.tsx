import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
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

// Pages statiques
import Contact from './pages/static/Contact';
import Documentation from './pages/static/Documentation';
import FAQ from './pages/static/FAQ';
import Support from './pages/static/Support';

const queryClient = new QueryClient();

const Layout: React.FC = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isNotFound = isNotFoundRoute(location.pathname);

  const staticRoutes = ['/contact', '/documentation', '/faq', '/support', '/api-guide'];
  const isStatic = staticRoutes.includes(location.pathname);

  const hideSidebar = isHome || isNotFound || isStatic;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}

        <div
          className={`flex-1 flex flex-col ${isHome || isStatic ? 'home-layout-bg' : 'right-panel-bg'}`}
        >
          <div className="flex-1 overflow-y-auto">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />

              {/* Pages statiques */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />

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

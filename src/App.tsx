
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

// Pages
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Quiz from "./pages/quiz/Quiz";
import Question from "./pages/question/Question";
import Results from "./pages/results/Results";
import Teacher from "./pages/teacher/Teacher";
import About from "./pages/about/About";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/static/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4 max-w-6xl mx-auto">
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
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

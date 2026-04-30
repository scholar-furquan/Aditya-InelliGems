import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';

// Placeholder Gem Pages (Will be implemented next)
import AcademicsGem from './pages/AcademicsGem';
import ReportsGem from './pages/ReportsGem';
import PlagiarismGem from './pages/PlagiarismGem';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gems/academics" element={<AcademicsGem />} />
          <Route path="/gems/reports" element={<ReportsGem />} />
          <Route path="/gems/plagiarism" element={<PlagiarismGem />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}


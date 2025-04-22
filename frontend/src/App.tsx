import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EntertainersListPage from './pages/EntertainersListPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';

// Main App component - root of the Entertainment Agency app
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route and welcome page */}
        <Route path="/" element={<LandingPage />} />

        {/* List of entertainers */}
        <Route path="/entertainers" element={<EntertainersListPage />} />

        {/* View details, edit, and delete for a specific entertainer */}
        <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

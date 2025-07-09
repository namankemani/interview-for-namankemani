
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchDashboard from './pages/LaunchDashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;


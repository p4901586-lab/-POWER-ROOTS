import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import AdminPage from './pages/AdminPage'
import Thanks from "./pages/Thanks"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/thanks" element={<Thanks />} />

      </Routes>
    </Router>
  )
}

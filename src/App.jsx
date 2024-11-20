import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <Router>
            <h1>Knowledge Base</h1>
            <div>
                <Link to="/login" style={{
                    marginRight: 50
                }}>Login Page</Link>
            </div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}



export default App;

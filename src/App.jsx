import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Course from "./pages/Course.jsx";

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
                <Route path={"/Course"} element={<Course />} />
            </Routes>
        </Router>
    );
}



export default App;

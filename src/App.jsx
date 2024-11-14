import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Router>
            <h1>Knowledge Base</h1>
            <div>
                <Link to="/" style={{
                    marginRight: 50
                }}>To Page 1</Link>
                <Link to="/page2" style={{
                    marginRight: 50
                }}>To Page 2</Link>
                <Link to="/login" style={{
                    marginRight: 50
                }}>Login Page</Link>
            </div>
            <Routes>
                <Route path="/" element={<Page1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}



export default App;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "hacker" && password === "htn2025") {
      setIsLoggedIn(true);
      navigate("/"); // Redirect to homepage
    } else {
      alert("Invalid credentials! Try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <nav className="navbar">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default Login;

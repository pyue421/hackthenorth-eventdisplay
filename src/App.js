import { useEffect, useState } from "react";
import { fetchEvents } from "./api";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import Login from "./Login";
import "./App.css"; 

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      console.log("Fetched Events:", data);
      // Sort events by start_time
      setEvents(data.sort((a, b) => a.start_time - b.start_time));
      setLoading(false);
    };
    getEvents();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home events={events} isLoggedIn={isLoggedIn} loading={loading} />} />
          {/* Event Details Page */}
          <Route path="/event/:id" element={<EventDetails events={events} />} />
          {/* Login Page */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home({ events, isLoggedIn, loading }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on the search query
  const filteredEvents = events.filter((event) => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading events...</p>; // Loading message
  }

  return (
    <div>
      <h1>Hackathon Events 🫧🧩</h1>
      <p className="subtitle">Innovate. Create. Collaborate.</p> 

      {/* Navbar for Home and Login buttons */}
      <nav className="navbar">
        <Link to="/" className="nav-button">
          Home 
        </Link>
        <Link to="/login" className="nav-button">
          {isLoggedIn ? "Logout" : "Login"} 
        </Link>
      </nav>

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search events by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p style={{ textAlign: "center" }}>No events found.</p>
      ) : (
        <ul>
          {filteredEvents
            .filter((event) => isLoggedIn || event.permission === "public")
            .map((event) => (
              <li key={event.id}>
                <h3>
                  <Link to={`/event/${event.id}`}>{event.name}</Link>
                </h3>
                <p>Type: {event.event_type}</p>
                <p>Starts: {new Date(event.start_time).toLocaleString([], { 
                  weekday: 'long', 
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p>{event.description}</p> 
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;

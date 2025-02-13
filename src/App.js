import { useEffect, useState } from "react";
import { fetchEvents } from "./api";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import Login from "./Login";
import "./App.css"; 

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      console.log("Fetched Events:", data);
      // Sort events by start_time
      setEvents(data.sort((a, b) => a.start_time - b.start_time));
    };
    getEvents();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home events={events} isLoggedIn={isLoggedIn}/>} />
          {/* Event Details Page */}
          <Route path="/event/:id" element={<EventDetails events={events} />} />
          {/* Login Page */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home({ events, isLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");

  // Filter events based on search query and event type
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedEventType ? event.event_type === selectedEventType : true;
    return matchesSearch && matchesType;
  });

  // Get event types for dropdown
  const eventTypes = [...new Set(events.map((event) => event.event_type))];

  return (
    <div>
      <h1>Hackathon Events 🫧🧩</h1>
      <p className="subtitle">Innovate. Create. Collaborate.</p> 

      {/* Home and Login buttons */}
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

      {/* Event Type Dropdown */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <select
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
          className="event-type-dropdown"
        >
          <option value="">All Event Types</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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

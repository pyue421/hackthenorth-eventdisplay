import { useParams } from "react-router-dom";
import "./EventDetails.css";

function EventDetails({ events }) {
  const { id } = useParams();
  const event = events.find((e) => e.id.toString() === id);

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>Type: {event.event_type}</p>
      <p>Starts: {new Date(event.start_time).toLocaleString()}</p>
      <p>{event.description}</p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  );
}

export default EventDetails;

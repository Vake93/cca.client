import React from "react";
import moment from "moment";
import { Event } from "../../services/Models/Event";

interface EventItemProps {
  event: Event;
  joinEvent: (e: Event) => void;
  deleteEvent: (e: Event) => void;
}

function EventItem({ event, joinEvent, deleteEvent }: EventItemProps) {
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const joinByPhone = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    window.open(`tel:+19513825731,,,,${event.roomId}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{event.title}</h5>
      </div>
      <p className="mb-1">{`Start Time: ${moment(event.startTime).format(
        "YYYY-MM-DD HH:mm:ss"
      )} `}</p>
      <p className="mb-1">{`End Time: ${moment(event.endTime).format(
        "YYYY-MM-DD HH:mm:ss"
      )} `}</p>
      <p className="mb-1"><a href={`tel:+19513825731,,,,${event.roomId}`} onClick={joinByPhone}>Join my phone</a></p>
      {event.location && (
        <p className="mb-1">{`Location: ${event.location} `}</p>
      )}
      {event.notes && <p className="mb-1">{` Notes: ${event.notes}`}</p>}
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => joinEvent(event)}
        style={{
          width: "100px",
          height: "40px",
        }}
      >
        Join Online
      </button>
      {` `}
      <button
        type="button"
        className="btn btn-outline-warning"
        onClick={() => deleteEvent(event)}
        style={{
          width: "100px",
          height: "40px",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default EventItem;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { EventService } from "../../services/EventService";
import { MeetingService } from "../../services/MeetingService";
import { Event } from "../../services/Models/Event";
import EventItem from "./EventItem";

import "./Events.css";

function Events({ history }: RouteComponentProps) {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>();
  useEffect(() => loadEvents(new Date()), []);

  const updateDate = (days: number) => {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
    loadEvents(newDate);
  };

  const loadEvents = (date: Date) => {
    if (!loading) {
      setLoading(true);
      setEvents([]);
      EventService.listEvents(date)
        .then((events) => setEvents(events))
        .finally(() => setLoading(false));
    }
  };

  const joinEvent = (e: Event) => {
    setLoading(true);
    MeetingService.getMeetingToken(e)
      .then(console.log)
      .finally(() => setLoading(false));
  };

  const deleteEvent = (e: Event) => {
    const newEvents = events?.filter((event) => event !== e);
    setEvents(newEvents);
    EventService.deleteEvent(e);
  };

  return (
    <React.Fragment>
      <div className="col-12 event-card">
        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={loading}
          style={{
            left: "0px",
            position: "absolute",
            width: "100px",
            height: "40px",
          }}
          onClick={() => updateDate(-1)}
        >{`◀`}</button>

        <h3
          style={{ display: "inline-block" }}
        >{`Your events for: ${date.toLocaleDateString()}`}</h3>

        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={loading}
          style={{
            right: "0px",
            position: "absolute",
            width: "100px",
            height: "40px",
          }}
          onClick={() => updateDate(+1)}
        >{`▶`}</button>

        <div className="list-group text-left" style={{ paddingTop: "10px" }}>
          {events &&
            events.length > 0 &&
            events?.map((e) => (
              <EventItem key={e.rowKey} event={e} joinEvent={joinEvent} deleteEvent={deleteEvent} />
            ))}
        </div>
      </div>
      <div className="float" onClick={() => history.push("/new-event")}>
        <h1>+</h1>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Events);

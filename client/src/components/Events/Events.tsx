import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./Events.css";

function Events({ history }: RouteComponentProps) {
  const [date, setDate] = useState(new Date());

  const updateDate = (days: number) => {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  return (
    <div className="col-12 event-card">
      <button
        type="button"
        className="btn btn-outline-primary"
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
        style={{
          right: "0px",
          position: "absolute",
          width: "100px",
          height: "40px",
        }}
        onClick={() => updateDate(+1)}
      >{`▶`}</button>

      <div className="float" onClick={() => history.push("/new-event")}>
        <h1>+</h1>
      </div>
    </div>
  );
}

export default withRouter(Events);

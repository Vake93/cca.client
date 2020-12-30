import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./NewEvent.css";

function NewEvent({ history }: RouteComponentProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);

  const startTime = new Date();
  const endTime = new Date(startTime);
  endTime.setTime(endTime.getTime() + 1800000); // 30 mins

  const [eventData, setEventData] = useState({
    title: "",
    startTime: startTime,
    endTime: endTime,
    eventGuests: [],
    location: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDateChange = (id: string, date: Date | null) => {
    if (date) {
      setEventData((prevState) => ({
        ...prevState,
        [id]: date,
      }));

      if (id === "startTime") {
        const endTime = new Date(date);
        endTime.setTime(endTime.getTime() + 1800000); // 30 mins

        setEventData((prevState) => ({
          ...prevState,
          endTime: endTime,
        }));
      }
    }
  };

  const validateData = (): boolean => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (eventData.title.length === 0) {
      setErrorMessage("Title is required");
      return false;
    }

    if (eventData.startTime >= eventData.endTime) {
      setErrorMessage("Invalid start and end times");
      return false;
    }

    return true;
  };

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (validateData())
    {
      setEditable(false);
    }
  };

  const handleCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className="card col-6 event-card">
      <form>
        <div className="form-group text-left">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Event Title"
            onChange={handleChange}
            value={eventData.title}
            readOnly={!editable}
          />
        </div>
        <div className="form-group text-left">
          <label>Start Time</label>
          <DatePicker
            className="form-control"
            selected={eventData.startTime}
            onChange={(date) => {
              handleDateChange("startTime", date as Date);
            }}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="form-group text-left">
          <label>End Time</label>
          <DatePicker
            className="form-control"
            selected={eventData.endTime}
            onChange={(date) => {
              handleDateChange("endTime", date as Date);
            }}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="form-group text-left">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Event Location"
            onChange={handleChange}
            value={eventData.location}
            readOnly={!editable}
          />
        </div>
        <div className="form-group text-left">
          <label>Notes</label>
          <textarea
            className="form-control"
            id="notes"
            placeholder="Notes"
            onChange={handleChange}
            value={eventData.notes}
            readOnly={!editable}
          />
        </div>

        <div className="hv-center">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "5px", width: "100px" }}
            onClick={handleCancelClick}
            disabled={!editable}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px", width: "100px" }}
            onClick={handleSubmitClick}
            disabled={!editable}
          >
            Save
          </button>
        </div>
      </form>

      <div
        className="alert alert-success mt-2"
        style={{ display: successMessage ? "block" : "none" }}
        role="alert"
      >
        {successMessage}
      </div>

      <div
        className="alert alert-danger mt-2"
        style={{ display: errorMessage ? "block" : "none" }}
        role="alert"
      >
        {errorMessage}
      </div>
    </div>
  );
}

export default withRouter(NewEvent);

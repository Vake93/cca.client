import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { EventService } from "../../services/EventService";
import { Profile } from "../../services/Models/User";
import { Validator } from "../../services/Validator";

import "react-datepicker/dist/react-datepicker.css";
import "./NewEvent.css";
import { CreateEventResult } from "../../services/Models/Event";

interface NewEventProps extends RouteComponentProps {
  user?: Profile;
}

function NewEvent({ history, user }: NewEventProps) {
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
    participants: user?.email ?? "",
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

  const getParticipants = (): string[] =>
    eventData.participants.split(/[\r\n]+/);

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

    const participants = getParticipants();
    if (participants.length === 0) {
      setErrorMessage("Event Requires at least one Participant");
      return false;
    }

    for (let i = 0; i < participants.length; i++) {
      if (!Validator.validateEmail(participants[i].trim())) {
        setErrorMessage("Invalid participant email address");
        return false;
      }
    }

    return true;
  };

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (validateData()) {
      setEditable(false);
      const participants = getParticipants();

      EventService.createEvent({
        rowKey: "",
        title: eventData.title,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        eventGuests: participants,
        location: eventData.location,
        notes: eventData.notes,
        roomId: "",
      })
        .then(createdEvent)
        .finally(() => {
          setEditable(true);
        });
    }
  };

  const createdEvent = (e: CreateEventResult) => {
    if (!e.success && e.errorMessage) {
      setSuccessMessage(null);
      setErrorMessage(e.errorMessage);
      return;
    }

    setSuccessMessage("Event created.");
    history.goBack();
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
            disabled={!editable}
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
            disabled={!editable}
            onChange={(date) => {
              handleDateChange("endTime", date as Date);
            }}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="form-group text-left">
          <label>Participant Emails</label>
          <textarea
            className="form-control"
            id="participants"
            placeholder="Participant Emails"
            rows={5}
            onChange={handleChange}
            value={eventData.participants}
            readOnly={!editable}
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
            rows={7}
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

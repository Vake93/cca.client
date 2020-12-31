import React, { useEffect, useState } from "react";
import Video from "twilio-video";
import { RouteComponentProps, useParams, withRouter } from "react-router-dom";
import { Profile } from "../../services/Models/User";
import { MeetingService } from "../../services/MeetingService";
import Participant from "./Participant";

import "./Meeting.css";

interface MeetingProps extends RouteComponentProps {
  user?: Profile;
}

interface MeetingParams {
  id?: string;
}

function Meeting({ history, user }: MeetingProps) {
  const { id } = useParams<MeetingParams>();
  const [token, setToken] = useState<string>();
  const [room, setRoom] = useState<Video.Room>();
  const [participants, setParticipants] = useState<Video.Participant[]>([]);

  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
        console.log("disconnect");
      }
    };
  });

  useEffect(() => {
    MeetingService.getMeetingToken(id ?? "").then(setToken);
  }, [id]);

  useEffect(() => {
    if (token) {
      Video.connect(token).then((room) => {
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      });
    }
  }, [token]);

  const participantConnected = (p: Video.Participant) => {
    setParticipants((pp) => [...pp, p]);
  };

  const participantDisconnected = (p: Video.Participant) => {
    setParticipants((pp) => pp.filter((op) => op !== p));
  };

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} mute={false} />
  ));

  return (
    <div className="participants">
      <div>
        {room ? (
          <Participant participant={room.localParticipant} mute={true} />
        ) : (
          ""
        )}
      </div>
      <div>
          {remoteParticipants}
      </div>
    </div>
  );
}

export default withRouter(Meeting);

import { Event } from "./Event";

export interface MeetingToken {
  event?: Event;
  meetingRoomToken?: string;
  errors?: string;
}

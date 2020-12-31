import { ApiService } from "./ApiService";
import { MeetingToken } from "./Models/Meeting";

const MeetingServiceUrl = process.env.REACT_APP_MEETING_SERVICE_URL;

export const MeetingService = {
  getMeetingToken: async (eventId: string): Promise<string | undefined> => {
    const token = localStorage.getItem("TOKEN") ?? "";
    var response = await ApiService.post<MeetingToken>(
      `${MeetingServiceUrl}/api/meeting/${eventId}`,
      {},
      {},
      token
    );

    return response?.meetingRoomToken;
  },
};

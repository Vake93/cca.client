import { Event } from "./Models/Event";
import { ApiService } from "./ApiService";
import { MeetingToken } from "./Models/Meeting";

const MeetingServiceUrl = process.env.REACT_APP_MEETING_SERVICE_URL;

export const MeetingService = {
  getMeetingToken: async (e: Event): Promise<string | undefined> => {
    const token = localStorage.getItem("TOKEN") ?? "";
    var response = await ApiService.post<MeetingToken>(
      `${MeetingServiceUrl}/api/meeting/${e.rowKey}`,
      {},
      {},
      token
    );

    return response?.meetingRoomToken;
  },
};

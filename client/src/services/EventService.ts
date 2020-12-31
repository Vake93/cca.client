import { CreateEventResult, Event } from "./Models/Event";
import { ApiService } from "./ApiService";
import { CreatedApiResponse, ListApiResponse } from "./Models/Response";

const EventServiceUrl = process.env.REACT_APP_EVENT_SERVICE_URL;

export const EventService = {
  listEvents: async (e: Date): Promise<Event[] | undefined> => {
    const token = localStorage.getItem("TOKEN") ?? "";
    var response = await ApiService.get<ListApiResponse<Event>>(
      `${EventServiceUrl}/api/events`,
      {
        date: e.toISOString(),
      },
      token
    );

    return response?.items;
  },

  createEvent: async (e: Event): Promise<CreateEventResult> => {
    const token = localStorage.getItem("TOKEN") ?? "";
    var response = await ApiService.post<CreatedApiResponse>(
      `${EventServiceUrl}/api/events`,
      e,
      {},
      token
    );

    return {
      success: response?.id ? true : false,
      errorMessage: response?.errors,
    };
  },

  deleteEvent: (e: Event): Promise<boolean> => {
    const token = localStorage.getItem("TOKEN") ?? "";
    return ApiService.delete(
      `${EventServiceUrl}/api/events/${e.rowKey}`,
      token
    );
  },
};

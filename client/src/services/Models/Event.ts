export interface Event {
  rowKey: string;
  title: string;
  startTime: Date;
  endTime: Date;
  roomId: string;
  eventGuests: string[];
  location?: string;
  notes?: string;
}

export interface CreateEventResult {
  success: boolean;
  errorMessage?: string;
}

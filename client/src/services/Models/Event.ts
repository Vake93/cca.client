export interface Event {
  rowKey: string;
  title: string;
  startTime: Date;
  endTime: Date;
  eventGuests: string[];
  location?: string;
  notes?: string;
}

export interface CreateEventResult {
  success: boolean;
  errorMessage?: string;
}

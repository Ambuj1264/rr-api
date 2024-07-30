export interface SlotInput {
  startDate: string;
  startTime: string;
  endTime: string;
}

export interface UpdateSlotInput extends SlotInput {
    id: string
}
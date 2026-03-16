import { create } from "zustand";
import type { ConsultationDto } from "./consultations.dto";

type ConsultationState = {
  activeConsultation: ConsultationDto | null;
  setActiveConsultation: (c: ConsultationDto | null) => void;
};

export const useConsultationStore = create<ConsultationState>((set) => ({
  activeConsultation: null,
  setActiveConsultation: (c) => set({ activeConsultation: c }),
}));

import { create } from "zustand";
import type { DoctorDto } from "./auth.dto";

type AuthState = {
  accessToken: string | null;
  doctor: DoctorDto | null;
  bootstrapped: boolean;

  setAuth: (payload: { accessToken: string; doctor?: DoctorDto | null }) => void;
  clear: () => void;
  setBootstrapped: (v: boolean) => void;
};

export const authStore = create<AuthState>((set) => ({
  accessToken: null,
  doctor: null,
  bootstrapped: false,

  setAuth: ({ accessToken, doctor }) =>
    set((s) => ({
      accessToken,
      doctor: doctor ?? s.doctor,
    })),

  clear: () => set({ accessToken: null, doctor: null }),
  setBootstrapped: (v) => set({ bootstrapped: v }),
}));

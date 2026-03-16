import { http } from "@/services/api/axios";
import type {
  ConsultationDto,
  CreateConsultationBody,
  ConsultationLinkInfo,
} from "./consultations.dto";

export const consultationsApi = {
  create: async (accessToken: string, body?: CreateConsultationBody) => {
    const res = await http.post<ConsultationDto>("/consultations", body ?? {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },

  getByLinkToken: async (linkToken: string) => {
    const res = await http.get<ConsultationLinkInfo>(`/consultations/link/${linkToken}`);
    return res.data;
  },
};

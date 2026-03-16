export type ConsultationDto = {
  id: string;
  linkToken: string;
  roomName: string;
  status: string;
  expiresAt: string | null;
  url: string;
};

export type CreateConsultationBody = {
  expiresInMinutes?: number;
};

export type ConsultationLinkInfo = {
  consultationId: string;
  roomName: string;
  doctorName: string;
  status: string;
  expiresAt: string | null;
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { consultationsApi } from "./consultations.api";
import type { CreateConsultationBody } from "./consultations.dto";

export function useCreateConsultationMutation(accessToken: string | null) {
  return useMutation({
    mutationFn: (body?: CreateConsultationBody) => {
      if (!accessToken) throw new Error("No access token");
      return consultationsApi.create(accessToken, body);
    },
  });
}

export function useConsultationLinkQuery(linkToken: string) {
  return useQuery({
    queryKey: ["consultation-link", linkToken],
    queryFn: () => consultationsApi.getByLinkToken(linkToken),
    enabled: !!linkToken,
    retry: false,
  });
}

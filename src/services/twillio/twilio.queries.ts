import { useMutation, useQuery } from "@tanstack/react-query";
import { twilioApi } from "./twilio.api";
import type { DoctorTokenBody, GuestTokenBody } from "./twilio.dto";

export function useDoctorTokenMutation(accessToken: string | null) {
  return useMutation({
    mutationFn: (body: DoctorTokenBody) => {
      if (!accessToken) throw new Error("No access token");
      return twilioApi.getDoctorToken(accessToken, body);
    },
  });
}

export function useGuestTokenMutation() {
  return useMutation({
    mutationFn: (body: GuestTokenBody) => twilioApi.getGuestToken(body),
  });
}

export function useEndCallMutation(accessToken: string | null) {
  return useMutation({
    mutationFn: (consultationId: string) => {
      if (!accessToken) throw new Error("No access token");
      return twilioApi.endCall(accessToken, consultationId);
    },
  });
}

export function useCallResultQuery(
  accessToken: string | null,
  consultationId: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["call-result", consultationId],
    queryFn: () => {
      if (!accessToken) throw new Error("No access token");
      return twilioApi.getCallResult(accessToken, consultationId);
    },
    enabled: !!accessToken && !!consultationId && enabled,
    refetchInterval: (query) => {
      const data = query.state.data;
      const status = data?.callSession?.status;

      if (!status) return 5000;
      if (status === "COMPLETED" || status === "FAILED") return false;

      return 5000;
    },
    retry: false,
  });
}
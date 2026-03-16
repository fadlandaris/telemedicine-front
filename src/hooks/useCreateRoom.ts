"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/services/auth/auth.store";
import { consultationsApi } from "@/services/consultations/consultations.api";
import { useConsultationStore } from "@/services/consultations/consultations.store";

export const useCreateRoom = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = useCallback(async () => {
    if (isCreating) return;

    const accessToken = authStore.getState().accessToken;
    if (!accessToken) return;

    setIsCreating(true);
    try {
      const created = await consultationsApi.create(accessToken);
      useConsultationStore.getState().setActiveConsultation(created);
      router.push(`/consultations/${created.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  }, [isCreating, router]);

  return {
    handleCreateRoom,
    isCreating,
  };
};
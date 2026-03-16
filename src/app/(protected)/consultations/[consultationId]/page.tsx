"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Video, { type Room, type RemoteParticipant, type RemoteTrack } from "twilio-video";

import { authStore } from "@/services/auth/auth.store";
import {
  useDoctorTokenMutation,
  useEndCallMutation,
  useCallResultQuery,
} from "@/services/twillio/twilio.queries";
import { useConsultationStore } from "@/services/consultations/consultations.store";

export default function DoctorCallPage() {
  const router = useRouter();
  const params = useParams<{ consultationId: string }>();
  const consultationId = params?.consultationId ? String(params.consultationId) : "";

  const accessToken = authStore((s: any) => s.accessToken);
  const doctorTokenMutation = useDoctorTokenMutation(accessToken);
  const endCallMutation = useEndCallMutation(accessToken);

  const activeConsultation = useConsultationStore((s) => s.activeConsultation);
  const setActiveConsultation = useConsultationStore((s) => s.setActiveConsultation);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const [isEndingCall, setIsEndingCall] = useState(false);
  const [shouldPollResult, setShouldPollResult] = useState(false);
  const [mp4Url, setMp4Url] = useState<string | null>(null);
  const [processingText, setProcessingText] = useState<string | null>(null);

  const roomRef = useRef<Room | null>(null);
  const localRef = useRef<HTMLDivElement | null>(null);
  const remoteRef = useRef<HTMLDivElement | null>(null);

  const audioElsRef = useRef<HTMLElement[]>([]);
  const isCleaningRef = useRef(false);
  const hasStartedRef = useRef(false);

  const patientUrl = useMemo(() => {
    if (!activeConsultation) return null;
    if (String(activeConsultation.id) !== String(consultationId)) return null;
    return activeConsultation.url;
  }, [activeConsultation, consultationId]);

  const callResultQuery = useCallResultQuery(
    accessToken,
    consultationId,
    shouldPollResult && !!consultationId,
  );

  useEffect(() => {
    const result = callResultQuery.data;
    if (!result) return;

    if (result.callSession?.status === "COMPLETED") {
      setProcessingText("Recording ready");
      setMp4Url(result.playableUrl ?? result.callSession.mediaUrl ?? null);
      setShouldPollResult(false);
    }

    if (result.callSession?.status === "FAILED") {
      setErrMsg(result.callSession.errorMessage ?? "Recording/composition failed");
      setProcessingText(null);
      setShouldPollResult(false);
    }
  }, [callResultQuery.data]);

  function clearContainers() {
    if (localRef.current) localRef.current.innerHTML = "";
    if (remoteRef.current) remoteRef.current.innerHTML = "";
  }

  function clearAudioEls() {
    for (const el of audioElsRef.current) {
      try {
        (el as any).remove?.();
      } catch {
        try {
          const p = el.parentNode as HTMLElement | null;
          if (p && p.contains(el)) p.removeChild(el);
        } catch {}
      }
    }
    audioElsRef.current = [];
  }

  function stopLocalTracks(room: Room) {
    room.localParticipant.tracks.forEach((pub) => {
      const track = pub.track as any;
      try {
        track?.stop?.();
      } catch {}
    });
  }

  function cleanupRoom() {
    if (isCleaningRef.current) return;
    isCleaningRef.current = true;

    const room = roomRef.current;
    roomRef.current = null;

    try {
      if (room) {
        try {
          room.removeAllListeners();
        } catch {}

        try {
          room.participants.forEach((p) => {
            try {
              p.removeAllListeners();
            } catch {}
          });
        } catch {}

        try {
          stopLocalTracks(room);
        } catch {}

        try {
          if ((room as any).state !== "disconnected") room.disconnect();
        } catch {}
      }
    } finally {
      clearContainers();
      clearAudioEls();
      setConnected(false);
      isCleaningRef.current = false;
    }
  }

  function attachTrackToContainer(track: any, container: HTMLElement) {
    const el: HTMLElement = track.attach();
    (el as any).style.width = "100%";
    (el as any).style.height = "100%";
    (el as any).style.objectFit = "cover";
    container.appendChild(el);
  }

  function attachLocalVideo(room: Room) {
    if (!localRef.current) return;
    localRef.current.innerHTML = "";

    room.localParticipant.tracks.forEach((pub) => {
      const track: any = pub.track;
      if (track && track.kind === "video") {
        attachTrackToContainer(track, localRef.current!);
      }
    });
  }

  function handleRemoteParticipant(participant: RemoteParticipant) {
    if (isCleaningRef.current) return;

    participant.tracks.forEach((pub: any) => {
      if (isCleaningRef.current) return;
      if (pub.isSubscribed && pub.track) {
        const t: any = pub.track as RemoteTrack;

        if (t.kind === "video") {
          if (!remoteRef.current) return;
          remoteRef.current.innerHTML = "";
          attachTrackToContainer(t, remoteRef.current);
        } else if (t.kind === "audio") {
          const audioEl = t.attach();
          (audioEl as any).style.display = "none";
          document.body.appendChild(audioEl);
          audioElsRef.current.push(audioEl);
        }
      }
    });

    participant.on("trackSubscribed", (track: RemoteTrack) => {
      if (isCleaningRef.current) return;
      const t: any = track;

      if (t.kind === "video") {
        if (!remoteRef.current) return;
        remoteRef.current.innerHTML = "";
        attachTrackToContainer(t, remoteRef.current);
      } else if (t.kind === "audio") {
        const audioEl = (t as any).attach();
        (audioEl as any).style.display = "none";
        document.body.appendChild(audioEl);
        audioElsRef.current.push(audioEl);
      }
    });

    participant.on("trackUnsubscribed", (track: RemoteTrack) => {
      if (isCleaningRef.current) return;
      const t: any = track;
      if (t.kind === "video") {
        if (remoteRef.current) remoteRef.current.innerHTML = "";
      }
    });
  }

  async function connectDoctor() {
    if (!consultationId) return;
    if (isCleaningRef.current) return;
    if (roomRef.current) return;
    if (doctorTokenMutation.isPending) return;

    setErrMsg(null);

    try {
      const tokenData = await doctorTokenMutation.mutateAsync({
        consultationId,
      });

      const room = await Video.connect(tokenData.token, {
        name: tokenData.roomName,
        audio: true,
        video: true,
      });

      roomRef.current = room;
      setConnected(true);
      setMicOn(true);
      setCamOn(true);

      attachLocalVideo(room);

      room.participants.forEach((p) => handleRemoteParticipant(p));
      room.on("participantConnected", (p) => handleRemoteParticipant(p));
      room.on("participantDisconnected", () => {
        if (remoteRef.current) remoteRef.current.innerHTML = "";
      });
      room.on("disconnected", () => cleanupRoom());
    } catch (err: any) {
      setErrMsg(err?.response?.data?.message ?? err?.message ?? "Failed to start call");
      cleanupRoom();
    }
  }

  useEffect(() => {
    if (!consultationId) return;
    if (hasStartedRef.current) return;

    hasStartedRef.current = true;
    cleanupRoom();
    connectDoctor();

    return () => {
      cleanupRoom();
      hasStartedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationId]);

  function toggleMic() {
    const room = roomRef.current;
    if (!room) return;

    const next = !micOn;
    room.localParticipant.audioTracks.forEach((pub: any) => {
      const track: any = pub.track;
      try {
        next ? track.enable() : track.disable();
      } catch {}
    });
    setMicOn(next);
  }

  function toggleCam() {
    const room = roomRef.current;
    if (!room) return;

    const next = !camOn;
    room.localParticipant.videoTracks.forEach((pub: any) => {
      const track: any = pub.track;
      try {
        next ? track.enable() : track.disable();
      } catch {}
    });
    setCamOn(next);
  }

  async function endCall() {
    if (!consultationId || !accessToken || endCallMutation.isPending || isEndingCall) return;

    setErrMsg(null);
    setIsEndingCall(true);
    setProcessingText("Ending call and preparing MP4...");

    try {
      await endCallMutation.mutateAsync(consultationId);

      cleanupRoom();
      hasStartedRef.current = false;
      setShouldPollResult(true);
    } catch (err: any) {
      setErrMsg(err?.response?.data?.message ?? err?.message ?? "Failed to end call");
      setProcessingText(null);
    } finally {
      setIsEndingCall(false);
    }
  }

  function leaveToDashboard() {
    setActiveConsultation(null);
    router.replace("/dashboard");
  }

  async function copyLink() {
    if (!patientUrl) return;
    try {
      await navigator.clipboard.writeText(patientUrl);
    } catch {}
  }

  return (
    <div className="h-[100dvh] w-full bg-[#0b0f17] text-white flex flex-col">
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex flex-col">
          <span className="text-sm text-white/70">Consultation</span>
          <span className="font-semibold">Room {activeConsultation?.roomName ?? "-"}</span>
        </div>

        <div className="flex items-center gap-2">
          {patientUrl && (
            <button onClick={copyLink} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15">
              Copy patient link
            </button>
          )}
          <button
            onClick={leaveToDashboard}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative">
          <div ref={remoteRef} className="absolute inset-0" />
          <div className="absolute left-3 top-3 text-xs bg-black/40 px-2 py-1 rounded">Remote</div>
          {!connected && !shouldPollResult && (
            <div className="absolute inset-0 grid place-items-center text-white/60">Connecting…</div>
          )}
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative">
          <div ref={localRef} className="absolute inset-0" />
          <div className="absolute left-3 top-3 text-xs bg-black/40 px-2 py-1 rounded">You</div>
          {!connected && !shouldPollResult && (
            <div className="absolute inset-0 grid place-items-center text-white/60">Starting camera…</div>
          )}
        </div>
      </div>

      {(errMsg || processingText || mp4Url) && (
        <div className="px-4 pb-2 space-y-2">
          {errMsg && <div className="text-sm text-red-300">{errMsg}</div>}
          {processingText && <div className="text-sm text-yellow-300">{processingText}</div>}

          {callResultQuery.isFetching && shouldPollResult && (
            <div className="text-sm text-white/70">Waiting for recording/composition...</div>
          )}

          {mp4Url && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-3">
              <div className="text-sm font-medium">MP4 ready</div>
              <video
                src={mp4Url}
                controls
                className="w-full max-w-2xl rounded-lg bg-black"
              />
              <div className="flex gap-2">
                <a
                  href={mp4Url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Open MP4
                </a>
                <button
                  onClick={leaveToDashboard}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15"
                >
                  Back to dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-4 border-t border-white/10 flex items-center justify-center gap-3">
        <button
          onClick={toggleMic}
          disabled={!connected || shouldPollResult}
          className={`px-4 py-2 rounded-full ${
            micOn ? "bg-white/10 hover:bg-white/15" : "bg-red-500/80 hover:bg-red-500"
          } disabled:opacity-50`}
        >
          {micOn ? "Mic On" : "Mic Off"}
        </button>

        <button
          onClick={toggleCam}
          disabled={!connected || shouldPollResult}
          className={`px-4 py-2 rounded-full ${
            camOn ? "bg-white/10 hover:bg-white/15" : "bg-red-500/80 hover:bg-red-500"
          } disabled:opacity-50`}
        >
          {camOn ? "Cam On" : "Cam Off"}
        </button>

        <button
          onClick={endCall}
          disabled={isEndingCall || shouldPollResult}
          className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50"
        >
          {isEndingCall || shouldPollResult ? "Processing..." : "End call"}
        </button>
      </div>
    </div>
  );
}
type Attachable = {
  attach: () => HTMLElement;
  detach: () => HTMLElement[];
};

export function attachTrack(track: Attachable, container: HTMLElement) {
  const el = track.attach();
  container.appendChild(el);
  return el;
}

export function detachTrack(track: Attachable) {
  const els = track.detach();
  for (const el of els) {
    try {
      // ✅ jangan pakai removeChild langsung tanpa cek
      // el.remove() aman (kalau sudah tidak punya parent -> no-op)
      (el as any).remove?.();
    } catch {
      // fallback super-defensive
      try {
        const parent = el.parentNode as HTMLElement | null;
        if (parent && parent.contains(el)) parent.removeChild(el);
      } catch {}
    }
  }
}

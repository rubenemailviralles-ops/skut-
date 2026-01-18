export type PreloadResult = {
  ok: string[];
  failed: string[];
};

export async function preloadImages(urls: string[], timeoutMs = 8000): Promise<PreloadResult> {
  const uniqueUrls = Array.from(new Set(urls)).filter(Boolean);
  const results = await Promise.allSettled(
    uniqueUrls.map(
      (url) =>
        new Promise<string>((resolve, reject) => {
          const img = new Image();
          const timer = window.setTimeout(() => reject(new Error('timeout')), timeoutMs);
          img.onload = () => {
            window.clearTimeout(timer);
            resolve(url);
          };
          img.onerror = () => {
            window.clearTimeout(timer);
            reject(new Error('error'));
          };
          img.src = url;
        })
    )
  );

  const ok: string[] = [];
  const failed: string[] = [];
  results.forEach((r, idx) => {
    const url = uniqueUrls[idx];
    if (r.status === 'fulfilled') ok.push(url);
    else failed.push(url);
  });

  return { ok, failed };
}

export async function preloadFont(fontFamily: string): Promise<boolean> {
  if (!('fonts' in document)) return false;
  try {
    await (document as any).fonts.load(`1em ${fontFamily}`);
    return true;
  } catch {
    return false;
  }
}

export function runWhenIdle(task: () => void, timeoutMs = 1500) {
  const anyWindow = window as any;
  if (typeof anyWindow.requestIdleCallback === 'function') {
    anyWindow.requestIdleCallback(task, { timeout: timeoutMs });
    return;
  }
  window.setTimeout(task, 250);
}


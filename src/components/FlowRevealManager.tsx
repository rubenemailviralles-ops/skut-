import { useEffect } from 'react';

type FlowRevealManagerProps = {
  rootRef: React.RefObject<HTMLElement>;
  watchKey: string;
};

export default function FlowRevealManager({ rootRef, watchKey }: FlowRevealManagerProps) {
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const supportsIO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    if (!supportsIO) return;

    const maxRatio = 0.3;
    const thresholds = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
    const pending = new Map<HTMLElement, number>();
    let rafId: number | null = null;

    const flush = () => {
      rafId = null;
      for (const [el, ratio] of pending) {
        const progress = Math.max(0, Math.min(1, ratio / maxRatio));
        el.style.setProperty('--flow-p', String(progress));
      }
      pending.clear();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          pending.set(el, entry.intersectionRatio);
        }
        if (rafId) return;
        rafId = window.requestAnimationFrame(flush);
      },
      {
        root: rootEl,
        threshold: thresholds,
      }
    );

    const observeNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.classList.contains('flow-item')) {
        if (!node.style.getPropertyValue('--flow-p')) node.style.setProperty('--flow-p', '0');
        observer.observe(node);
      }
      node.querySelectorAll?.<HTMLElement>('.flow-item').forEach((el) => {
        if (!el.style.getPropertyValue('--flow-p')) el.style.setProperty('--flow-p', '0');
        observer.observe(el);
      });
    };

    rootEl.querySelectorAll<HTMLElement>('.flow-item').forEach((el) => {
      if (!el.style.getPropertyValue('--flow-p')) el.style.setProperty('--flow-p', '0');
      observer.observe(el);
    });

    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach(observeNode);
      }
    });

    mutation.observe(rootEl, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [rootRef, watchKey]);

  return null;
}

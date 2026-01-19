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

    const enterRatio = 0.3;
    const exitRatio = 0.25;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const current = el.dataset.flowIn === '1';
          const next =
            entry.intersectionRatio >= enterRatio ? true : entry.intersectionRatio <= exitRatio ? false : current;
          const nextValue = next ? '1' : '0';
          if (el.dataset.flowIn !== nextValue) el.dataset.flowIn = nextValue;
        }
      },
      {
        root: rootEl,
        threshold: [0, 0.3, 1],
      }
    );

    const observeNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.classList.contains('flow-item')) observer.observe(node);
      node.querySelectorAll?.('.flow-item').forEach((el) => observer.observe(el));
    };

    rootEl.querySelectorAll<HTMLElement>('.flow-item').forEach((el) => {
      if (!el.dataset.flowIn) el.dataset.flowIn = '0';
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
    };
  }, [rootRef, watchKey]);

  return null;
}

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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.intersectionRatio >= 0.22) el.classList.add('flow-in');
          else el.classList.remove('flow-in');
        }
      },
      {
        root: rootEl,
        threshold: [0, 0.22, 1],
      }
    );

    const observeNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.classList.contains('flow-item')) observer.observe(node);
      node.querySelectorAll?.('.flow-item').forEach((el) => observer.observe(el));
    };

    rootEl.querySelectorAll('.flow-item').forEach((el) => observer.observe(el));

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

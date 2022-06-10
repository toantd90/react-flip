import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const useFlip = (listRef: React.RefObject<HTMLElement>) => {
  const origins = useRef<{ [key: string]: DOMRect }>({});
  let firstRun = useRef(true);
  const [y, setY] = useState(window.scrollY);

  const handleOnScroll = useCallback(
    (e: Event) => {
      const window = e.currentTarget;
      if (window && window instanceof Window) {
        if (y !== window.scrollY) {
          if (listRef.current === null) return;
          const list = listRef.current;
          const children: HTMLElement[] = [].slice.call(list.children);

          for (const child of children) {
            const next = child.getBoundingClientRect();
            origins.current[child.dataset.key!] = next;
          }
        }
        setY(window.scrollY);
      }
    },
    [y, listRef],
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [handleOnScroll]);

  // React FLIP (First Last Invert Play)
  useLayoutEffect(() => {
    if (listRef.current === null) return;
    const list = listRef.current;
    const children: HTMLElement[] = [].slice.call(list.children);

    for (const child of children) {
      const key = child.dataset.key!;

      const next = child.getBoundingClientRect();
      if (!firstRun.current) {
        if (key in origins.current) {
          const previous = origins.current[key];
          const delta = getDelta(previous, next);
          if (!isZero(delta)) {
            invert(delta, child);

            requestAnimationFrame(() => {
              play(child);
            });
          }
        }
      }
      origins.current[child.dataset.key!] = next;
    }

    firstRun.current = false;
  }, [listRef]);
};

const invert = (delta: Rect, elem: HTMLElement) => {
  elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`;
  elem.style.transition = `transform 0s`;
};

const play = (elem: HTMLElement) => {
  elem.style.transform = ``;
  elem.style.transition = `transform 300ms ease`;
};

type Rect = Pick<DOMRect, 'top' | 'left'>;

const getDelta = (start: Rect, target: Rect) => ({
  top: start.top - target.top,
  left: start.left - target.left,
});

const isZero = (delta: Rect) => delta.left === 0 && delta.top === 0;

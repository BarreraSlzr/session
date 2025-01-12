import { useRef, useEffect, useCallback, useState } from 'react';

interface RafHandle {
  id: number;
  clear: () => void;
}

const setRafInterval = (callback: () => void, timeout = 0) => {
  const interval = timeout < 0 ? 0 : timeout;
  let id = 0;

  let startTime = Date.now();

  const loop = () => {
    const nowTime = Date.now();
    if (nowTime - startTime >= interval) {
      startTime = nowTime;
      callback();
    }

    id = requestAnimationFrame(loop);
  };

  id = requestAnimationFrame(loop);

  return {
    id,
    clear: () => cancelAnimationFrame(id)
  };
};


export const useRafInterval = (fn: () => void, timeout = 0) => {
  const [timer, setTimer] = useState<RafHandle | null>(null);

  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const newTimer = setRafInterval(() => {
      fnRef.current();
    }, timeout);
    setTimer(newTimer);

    return () => {
      if (newTimer) {
        newTimer.clear();
      }
    };
  }, [timeout]);

  const clear = useCallback(() => {
    if (timer) {
      timer.clear();
      setTimer(null);
    }
  }, [timer]);

  return clear;
};

export default useRafInterval;


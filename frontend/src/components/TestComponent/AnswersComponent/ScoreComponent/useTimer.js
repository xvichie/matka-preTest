import { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime = 0) => {
  const [secondsTime, setSecondsTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = (time = 0) => {
    setIsRunning(false);
    setSecondsTime(time);
  };

  return { secondsTime, start, stop, reset, isRunning };
};

export default useTimer;

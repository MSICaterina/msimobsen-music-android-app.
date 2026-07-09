import { useState, useEffect } from 'react';

// Initialize to July 9, 2026, 19:33:00 EDT (Toronto)
// EDT is UTC-4
let globalSimulatedTime = new Date('2026-07-09T19:33:00-04:00').getTime();
let isTickerRunning = false;
const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>();

export const useSimulatedTime = () => {
  const [time, setTime] = useState(globalSimulatedTime);

  useEffect(() => {
    listeners.add(setTime);
    if (!isTickerRunning) {
      isTickerRunning = true;
      setInterval(() => {
        globalSimulatedTime += 1000;
        listeners.forEach(set => set(globalSimulatedTime));
      }, 1000);
    }
    return () => {
      listeners.delete(setTime);
    };
  }, []);

  const date = new Date(time);
  return {
    timestamp: time,
    date,
    formattedTime: date.toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }),
    formattedDate: date.toLocaleDateString('en-US', { timeZone: 'America/Toronto', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    timeZone: 'EDT',
    location: 'Toronto, ON'
  };
};

export const getGlobalSimulatedTime = () => globalSimulatedTime;

import { useState, useEffect } from 'react';

// Store hours: Open 3 PM (15:00) – 3 AM (03:00 next day)
function getStoreStatus() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const totalSecs = h * 3600 + m * 60 + s;

  // Open window: 15:00:00 (54000s) to 03:00:00 next day
  // = 15:00 to midnight (54000 to 86400) OR midnight to 03:00 (0 to 10800)
  const openStart = 15 * 3600;   // 54000
  const openEnd = 3 * 3600;      // 10800 (3 AM next day)

  const isOpen = totalSecs >= openStart || totalSecs < openEnd;

  let secsRemaining = 0;
  if (isOpen) {
    // Closes at 3 AM
    if (totalSecs >= openStart) {
      // Same night: time until midnight + 3h
      secsRemaining = (86400 - totalSecs) + openEnd;
    } else {
      // After midnight, before 3 AM
      secsRemaining = openEnd - totalSecs;
    }
  } else {
    // Opens at 3 PM
    secsRemaining = openStart - totalSecs;
  }

  return { isOpen, secsRemaining };
}

function formatCountdown(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n) => String(n).padStart(2, '0');
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export function useStoreTimer() {
  const [state, setState] = useState(() => {
    const { isOpen, secsRemaining } = getStoreStatus();
    return { isOpen, secsRemaining, formatted: formatCountdown(secsRemaining) };
  });

  useEffect(() => {
    const tick = () => {
      const { isOpen, secsRemaining } = getStoreStatus();
      setState({ isOpen, secsRemaining, formatted: formatCountdown(secsRemaining) });
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}

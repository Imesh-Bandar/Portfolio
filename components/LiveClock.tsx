'use client';

import { useEffect, useState } from 'react';

interface LiveClockProps {
  className?: string;
}

export default function LiveClock({ className = '' }: LiveClockProps) {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const offset = now.getTimezoneOffset();
      const absOffset = Math.abs(offset);
      const sign = offset <= 0 ? '+' : '-';
      const offsetH = Math.floor(absOffset / 60);
      const gmt = `GMT ${sign}${offsetH}`;

      setTime(`${h}:${m}:${s}`);
      setDateStr(`${months[now.getMonth()]} ${days[now.getDay()]} · ${gmt}`);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={className} style={{ fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1 }}>
        {time}
      </div>
      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {dateStr}
      </div>
    </div>
  );
}

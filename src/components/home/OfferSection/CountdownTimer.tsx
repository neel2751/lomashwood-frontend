'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center py-2">
        <span className="text-sm font-semibold text-red-600">
          Offer Expired
        </span>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center bg-white rounded-md p-2 shadow-sm border border-gray-100"
        >
          <span className="text-xl md:text-2xl font-bold text-primary tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-gray-600 font-medium uppercase tracking-wide">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
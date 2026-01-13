import { useEffect, useState } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface UseCountdownOptions {
  targetDate: Date | string | number;
  onComplete?: () => void;
  interval?: number;
}

/**
 * Custom hook for countdown timer
 * @param options - Configuration options for the countdown
 * @returns Countdown time values and expired status
 */
export function useCountdown({
  targetDate,
  onComplete,
  interval = 1000,
}: UseCountdownOptions): CountdownTime {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining(0);
        setIsExpired(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      setTimeRemaining(difference);
      setIsExpired(false);
    };

    // Initial calculation
    calculateTimeRemaining();

    // Set up interval
    const timer = setInterval(calculateTimeRemaining, interval);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate, onComplete, interval]);

  // Calculate individual time units
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired,
  };
}

/**
 * Simplified countdown hook that returns formatted time string
 * @param targetDate - Target date for countdown
 * @returns Formatted time string (DD:HH:MM:SS)
 */
export function useCountdownString(targetDate: Date | string | number): string {
  const { days, hours, minutes, seconds, isExpired } = useCountdown({ targetDate });

  if (isExpired) {
    return "00:00:00:00";
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Hook for multiple countdowns
 * @param dates - Array of target dates
 * @returns Array of countdown times
 */
export function useMultipleCountdowns(
  dates: (Date | string | number)[]
): CountdownTime[] {
  return dates.map((date) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCountdown({ targetDate: date })
  );
}
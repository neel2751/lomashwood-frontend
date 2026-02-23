"use client";

import { Clock, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface OperatingHoursType {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  holidays?: string;
  specialDays?: Array<{
    date: string;
    hours: string;
    label?: string;
  }>;
}

interface OperatingHoursProps {
  hours: OperatingHoursType;
  timezone?: string;
  variant?: "default" | "compact" | "inline";
  showCurrentStatus?: boolean;
  showNextOpen?: boolean;
  className?: string;
}

const DAYS_OF_WEEK = [
  { key: "monday", label: "Monday", short: "Mon" },
  { key: "tuesday", label: "Tuesday", short: "Tue" },
  { key: "wednesday", label: "Wednesday", short: "Wed" },
  { key: "thursday", label: "Thursday", short: "Thu" },
  { key: "friday", label: "Friday", short: "Fri" },
  { key: "saturday", label: "Saturday", short: "Sat" },
  { key: "sunday", label: "Sunday", short: "Sun" },
] as const;

export default function OperatingHours({
  hours,
  variant = "default",
  showCurrentStatus = true,
  showNextOpen = true,
  className,
}: OperatingHoursProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const status = calculateOpenStatus();
    setIsOpen(status.isOpen);
    setNextOpenTime(status.nextOpen);
  }, [currentTime, hours]);

  const getCurrentDay = () => {
    const dayIndex = currentTime.getDay();
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  const parseTime = (timeStr: string): { open: number; close: number } | null => {
    if (!timeStr || timeStr.toLowerCase() === "closed") {
      return null;
    }

    if (timeStr.toLowerCase().includes("24") || timeStr.toLowerCase().includes("24/7")) {
      return { open: 0, close: 2400 };
    }

    const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
    
    if (!match) return null;

    const parseHour = (hour: string, minute: string = "00", period?: string) => {
      let h = parseInt(hour);
      const m = parseInt(minute);
      
      if (period?.toUpperCase() === "PM" && h !== 12) {
        h += 12;
      } else if (period?.toUpperCase() === "AM" && h === 12) {
        h = 0;
      }
      
      return h * 100 + m;
    };

    return {
      open: parseHour(match[1], match[2], match[3]),
      close: parseHour(match[4], match[5], match[6]),
    };
  };

  const getCurrentTimeInMinutes = () => {
    return currentTime.getHours() * 100 + currentTime.getMinutes();
  };

  const calculateOpenStatus = () => {
    const currentDayIndex = getCurrentDay();
    const currentDayKey = DAYS_OF_WEEK[currentDayIndex].key;
    const todayHours = hours[currentDayKey];

    if (!todayHours) {
      return { isOpen: false, nextOpen: null };
    }

    const timeRange = parseTime(todayHours);
    
    if (!timeRange) {
      return { isOpen: false, nextOpen: findNextOpenDay() };
    }

    const currentMinutes = getCurrentTimeInMinutes();
    const isCurrentlyOpen = currentMinutes >= timeRange.open && currentMinutes < timeRange.close;

    return {
      isOpen: isCurrentlyOpen,
      nextOpen: isCurrentlyOpen ? null : findNextOpenDay(),
    };
  };

  const findNextOpenDay = () => {
    const currentDayIndex = getCurrentDay();
    const currentMinutes = getCurrentTimeInMinutes();

    const todayKey = DAYS_OF_WEEK[currentDayIndex].key;
    const todayHours = hours[todayKey];
    
    if (todayHours) {
      const timeRange = parseTime(todayHours);
      if (timeRange && currentMinutes < timeRange.open) {
        return `Today at ${formatTime(timeRange.open)}`;
      }
    }

    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDayKey = DAYS_OF_WEEK[nextDayIndex].key;
      const nextDayHours = hours[nextDayKey];

      if (nextDayHours && nextDayHours.toLowerCase() !== "closed") {
        const timeRange = parseTime(nextDayHours);
        if (timeRange) {
          const dayName = DAYS_OF_WEEK[nextDayIndex].label;
          return i === 1
            ? `Tomorrow at ${formatTime(timeRange.open)}`
            : `${dayName} at ${formatTime(timeRange.open)}`;
        }
      }
    }

    return null;
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 100);
    const mins = minutes % 100;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  const getTodayHours = () => {
    const currentDayIndex = getCurrentDay();
    const currentDayKey = DAYS_OF_WEEK[currentDayIndex].key;
    return hours[currentDayKey] || "Closed";
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{getTodayHours()}</span>
        {showCurrentStatus && (
          <Badge variant={isOpen ? "default" : "secondary"} className="text-xs">
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">
                  {DAYS_OF_WEEK[getCurrentDay()].label}
                </span>
              </div>
              {showCurrentStatus && (
                <Badge variant={isOpen ? "default" : "secondary"}>
                  {isOpen ? "Open" : "Closed"}
                </Badge>
              )}
            </div>
            <div className="text-lg font-semibold">{getTodayHours()}</div>
            {showNextOpen && !isOpen && nextOpenTime && (
              <p className="text-xs text-muted-foreground">Opens {nextOpenTime}</p>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between px-0"
            >
              <span className="text-xs">View all hours</span>
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </Button>
            {isExpanded && (
              <>
                <Separator />
                <div className="space-y-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const dayHours = hours[day.key] || "Closed";
                    const isTodayDay = day.key === DAYS_OF_WEEK[getCurrentDay()].key;
                    return (
                      <div
                        key={day.key}
                        className={cn(
                          "flex justify-between text-sm",
                          isTodayDay && "font-semibold"
                        )}
                      >
                        <span className={cn(isTodayDay && "text-primary")}>
                          {day.label}
                        </span>
                        <span className={cn("text-muted-foreground", isTodayDay && "text-foreground")}>
                          {dayHours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
            {showCurrentStatus && (
              <CardDescription className="flex items-center gap-2">
                <Badge variant={isOpen ? "default" : "secondary"}>
                  {isOpen ? "Open Now" : "Closed"}
                </Badge>
                {!isOpen && nextOpenTime && (
                  <span className="text-xs">Opens {nextOpenTime}</span>
                )}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Day Highlight */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">
              {DAYS_OF_WEEK[getCurrentDay()].label}
            </span>
            <span className="font-semibold text-primary">{getTodayHours()}</span>
          </div>
        </div>

        <Separator />

        {/* All Days */}
        <div className="space-y-2">
          {DAYS_OF_WEEK.map((day) => {
            const dayHours = hours[day.key] || "Closed";
            const isTodayDay = day.key === DAYS_OF_WEEK[getCurrentDay()].key;
            return (
              <div
                key={day.key}
                className={cn(
                  "flex justify-between text-sm py-1",
                  isTodayDay && "font-semibold"
                )}
              >
                <span className={cn(isTodayDay && "text-primary")}>{day.label}</span>
                <span
                  className={cn(
                    "text-muted-foreground",
                    isTodayDay && "text-foreground font-semibold"
                  )}
                >
                  {dayHours}
                </span>
              </div>
            );
          })}
        </div>

        {/* Holidays */}
        {hours.holidays && (
          <>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Public Holidays
              </span>
              <span className="text-muted-foreground">{hours.holidays}</span>
            </div>
          </>
        )}

        {/* Special Days */}
        {hours.specialDays && hours.specialDays.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Special Hours</h4>
              {hours.specialDays.map((special, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {special.label || special.date}
                  </span>
                  <span className="font-medium">{special.hours}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function OpenStatusBadge({
  hours,
  className,
}: {
  hours: OperatingHoursType;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const dayIndex = now.getDay();
      const currentDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      const currentDayKey = DAYS_OF_WEEK[currentDayIndex].key;
      const todayHours = hours[currentDayKey];

      if (!todayHours || todayHours.toLowerCase() === "closed") {
        setIsOpen(false);
        return;
      }

      setIsOpen(true);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [hours]);

  return (
    <Badge variant={isOpen ? "default" : "secondary"} className={className}>
      {isOpen ? "Open Now" : "Closed"}
    </Badge>
  );
}

export function HoursList({
  hours,
  className,
}: {
  hours: OperatingHoursType;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {DAYS_OF_WEEK.map((day) => {
        const dayHours = hours[day.key] || "Closed";
        return (
          <div key={day.key} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{day.label}</span>
            <span className="font-medium">{dayHours}</span>
          </div>
        );
      })}
    </div>
  );
}
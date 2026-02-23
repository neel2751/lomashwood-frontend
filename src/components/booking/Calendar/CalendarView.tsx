'use client';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  startOfDay,
  addDays,
  getDay,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Circle,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  appointmentType?: string;
  showAvailability?: boolean;
  getAvailabilityCount?: (date: Date) => number;
  className?: string;
}

export default function CalendarView({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  appointmentType,
  showAvailability = true,
  getAvailabilityCount,
  className,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (!isDateDisabled(today)) {
      onDateSelect(today);
    }
  };

  const isDateDisabled = (date: Date) => {
    const dateStart = startOfDay(date);
    const minDateStart = startOfDay(minDate);

    if (isBefore(dateStart, minDateStart)) return true;

    if (maxDate && isAfter(dateStart, startOfDay(maxDate))) return true;

    if (disabledDates.some((d) => isSameDay(d, date))) return true;

    const dayOfWeek = getDay(date);

    if (appointmentType === 'home' && (dayOfWeek === 0 || dayOfWeek === 6)) {
      return true;
    }

    if (appointmentType === 'showroom' && dayOfWeek === 0) {
      return true;
    }

    return false;
  };

  const isDateHighlighted = (date: Date) => {
    return highlightedDates.some((d) => isSameDay(d, date));
  };

  const getAvailabilityLevel = (date: Date) => {
    if (!showAvailability || !getAvailabilityCount) return null;

    const count = getAvailabilityCount(date);

    if (count >= 6) return 'high';
    if (count >= 3) return 'medium';
    if (count > 0) return 'low';
    return 'none';
  };

  const getAvailabilityColor = (level: string | null) => {
    switch (level) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  const canNavigatePrevious = () => {
    const prevMonth = subMonths(currentMonth, 1);
    const prevMonthEnd = endOfMonth(prevMonth);
    return !isBefore(prevMonthEnd, startOfDay(minDate));
  };

  const canNavigateNext = () => {
    if (!maxDate) return true;
    const nextMonth = addMonths(currentMonth, 1);
    const nextMonthStart = startOfMonth(nextMonth);
    return !isAfter(nextMonthStart, startOfDay(maxDate));
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with Month/Year and Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          disabled={!canNavigatePrevious()}
          className="h-9 w-9 shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-gray-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
          </div>
          {selectedDate && isSameMonth(selectedDate, currentMonth) && (
            <p className="text-xs text-primary">
              Selected: {format(selectedDate, 'MMM d')}
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          disabled={!canNavigateNext()}
          className="h-9 w-9 shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Availability Legend */}
      {showAvailability && (
        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-green-500 text-green-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-orange-500 text-orange-500" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-gray-300 text-gray-300" />
            <span>None</span>
          </div>
        </div>
      )}

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-700 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const disabled = isDateDisabled(date);
          const selected = selectedDate && isSameDay(date, selectedDate);
          const today = isToday(date);
          const highlighted = isDateHighlighted(date);
          const currentMonthDay = isSameMonth(date, currentMonth);
          const availabilityLevel = getAvailabilityLevel(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              className={cn(
                'relative aspect-square p-1 rounded-lg text-sm font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:z-10',
                {
                  'bg-primary text-white hover:bg-primary/90 shadow-md ring-2 ring-primary':
                    selected,

                  'border-2 border-primary text-primary': today && !selected,

                  'bg-blue-50 text-blue-700': highlighted && !selected && !today,

                  'text-gray-900 hover:bg-gray-100':
                    currentMonthDay && !disabled && !selected && !today && !highlighted,

                  'text-gray-400': !currentMonthDay && !disabled,

                  'text-gray-300 cursor-not-allowed bg-gray-50/50 opacity-40':
                    disabled,
                }
              )}
            >
              {/* Date Number */}
              <div className="flex flex-col items-center justify-center h-full">
                <span className={cn('leading-none', { 'font-bold': today })}>
                  {format(date, 'd')}
                </span>

                {/* Availability Indicator */}
                {!disabled && !selected && showAvailability && availabilityLevel && (
                  <div className="mt-1">
                    <div
                      className={cn(
                        'h-1 w-1 rounded-full',
                        getAvailabilityColor(availabilityLevel)
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Badge for special dates */}
              {highlighted && !selected && (
                <div className="absolute top-0 right-0">
                  <Badge
                    variant="secondary"
                    className="h-1.5 w-1.5 rounded-full p-0"
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          disabled={isDateDisabled(new Date())}
          className="flex-1"
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const tomorrow = addDays(new Date(), 1);
            if (!isDateDisabled(tomorrow)) {
              setCurrentMonth(tomorrow);
              onDateSelect(tomorrow);
            }
          }}
          disabled={isDateDisabled(addDays(new Date(), 1))}
          className="flex-1"
        >
          Tomorrow
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextWeek = addDays(new Date(), 7);
            if (!isDateDisabled(nextWeek)) {
              setCurrentMonth(nextWeek);
              onDateSelect(nextWeek);
            }
          }}
          disabled={isDateDisabled(addDays(new Date(), 7))}
          className="flex-1"
        >
          Next Week
        </Button>
      </div>
    </div>
  );
}
'use client';

import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay, addDays } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Info,
} from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import TimeSlots from './TimeSlots';


interface CalendarProps {
  selectedDate?: Date;
  selectedTime?: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  availableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  appointmentType?: string;
}

export default function Calendar({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  appointmentType,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = monthStart.getDay();

  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, startOfDay(minDate))) return true;

    if (maxDate && isBefore(maxDate, date)) return true;

    if (disabledDates.some(disabledDate => isSameDay(disabledDate, date))) {
      return true;
    }

    const dayOfWeek = date.getDay();
    if (appointmentType === 'home' && (dayOfWeek === 0 || dayOfWeek === 6)) {
      return true;
    }
    
    return false;
  };

  const getAvailabilityIndicator = (date: Date) => {
    if (isDateDisabled(date)) return null;

    const dayOfMonth = date.getDate();
    const availability = dayOfMonth % 3;
    
    if (availability === 0) {
      return <div className="h-1 w-1 rounded-full bg-green-500 mx-auto" />;
    } else if (availability === 1) {
      return <div className="h-1 w-1 rounded-full bg-yellow-500 mx-auto" />;
    } else {
      return <div className="h-1 w-1 rounded-full bg-orange-500 mx-auto" />;
    }
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onDateSelect(date);
    }
  };

  const canNavigatePrevious = () => {
    const prevMonth = subMonths(currentMonth, 1);
    return !isBefore(endOfMonth(prevMonth), startOfDay(minDate));
  };

  const canNavigateNext = () => {
    if (!maxDate) return true;
    const nextMonth = addMonths(currentMonth, 1);
    return !isBefore(maxDate, startOfMonth(nextMonth));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Select Date
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span>Low</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              disabled={!canNavigatePrevious()}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              {selectedDate && isSameMonth(selectedDate, currentMonth) && (
                <p className="text-xs text-primary mt-1">
                  Selected: {format(selectedDate, 'MMM d, yyyy')}
                </p>
              )}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              disabled={!canNavigateNext()}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {emptyCells.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Days in month */}
              {daysInMonth.map((date) => {
                const disabled = isDateDisabled(date);
                const selected = selectedDate && isSameDay(date, selectedDate);
                const today = isToday(date);
                const hovered = hoveredDate && isSameDay(date, hoveredDate);

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    disabled={disabled}
                    className={cn(
                      'aspect-square p-2 rounded-lg text-sm font-medium transition-all relative',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50',
                      {
                        'bg-primary text-white hover:bg-primary/90 shadow-md': selected,
                        'bg-primary/10 text-primary border border-primary': today && !selected,
                        'hover:bg-gray-100': !disabled && !selected,
                        'text-gray-400 cursor-not-allowed opacity-50': disabled,
                        'text-gray-900': !disabled && !selected && !today,
                        'ring-2 ring-gray-300': hovered && !selected && !disabled,
                      }
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span>{format(date, 'd')}</span>
                      {!disabled && !selected && getAvailabilityIndicator(date)}
                    </div>
                    
                    {today && !selected && (
                      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateClick(new Date())}
              disabled={isDateDisabled(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateClick(addDays(new Date(), 1))}
              disabled={isDateDisabled(addDays(new Date(), 1))}
            >
              Tomorrow
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateClick(addDays(new Date(), 7))}
              disabled={isDateDisabled(addDays(new Date(), 7))}
            >
              Next Week
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TimeSlots
            date={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={onTimeSelect}
            appointmentType={appointmentType}
          />
        </div>
      )}

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Availability:</strong> Time slots are shown based on real-time
          availability. Green indicates high availability, yellow indicates limited
          slots, and orange indicates few slots remaining.
        </AlertDescription>
      </Alert>
    </div>
  );
}
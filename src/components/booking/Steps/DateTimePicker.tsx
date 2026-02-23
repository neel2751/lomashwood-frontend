'use client';

import { format, addDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  showroomId?: string;
}

const generateMockAvailability = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  hours.forEach((time, index) => {
    slots.push({
      id: `slot-${index}`,
      time,
      available: Math.random() > 0.3,
    });
  });
  return slots;
};

export default function DateTimePicker() {
  const { setValue, watch } = useFormContext();

  const selectedDate    = watch('appointmentDate');
  const selectedTime    = watch('appointmentTime');
  const appointmentType = watch('appointmentType');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState<TimeSlot[]>([]);

  const generateCalendarDays = () => {
    const start = startOfDay(new Date());
    const days: Date[] = [];
    for (let i = 0; i < 30; i++) {
      days.push(addDays(start, i));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setTimeout(() => {
        const slots = generateMockAvailability();
        setSelectedDateSlots(slots);
        setLoading(false);
      }, 500);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setValue('appointmentDate', date, { shouldValidate: true });
    setValue('appointmentTime', '', { shouldValidate: false });
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    setValue('appointmentTime', slot.time, { shouldValidate: true });
  };

  const isDateSelected  = (date: Date) => selectedDate && isSameDay(date, selectedDate);
  const isDateDisabled  = (date: Date) => isBefore(date, startOfDay(new Date()));
  const hasAvailableSlots    = () => Math.random() > 0.2;
  const getAvailableSlotsCount = () => Math.floor(Math.random() * 8);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
        <p className="text-gray-600 mt-1">
          Choose your preferred appointment date and time slot
        </p>
      </div>

      {appointmentType && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You've selected a{' '}
            <strong>
              {appointmentType === 'showroom' ? 'Showroom Visit' :
               appointmentType === 'home'     ? 'Home Visit'     : 'Virtual Consultation'}
            </strong>
            {appointmentType === 'showroom' && (
              <span className="block mt-1 text-sm">
                Please select a date and time to visit our showroom
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span>Limited</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                disabled={isBefore(addDays(currentMonth, -30), new Date())}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h4 className="font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h4>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 pb-2">
                  {day}
                </div>
              ))}
              {calendarDays.slice(0, 28).map((date, index) => {
                const disabled    = isDateDisabled(date);
                const selected    = isDateSelected(date);
                const available   = hasAvailableSlots();
                const slotsCount  = getAvailableSlotsCount();

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => !disabled && handleDateSelect(date)}
                    disabled={disabled}
                    className={cn(
                      'relative aspect-square p-1 text-sm rounded-lg transition-all',
                      'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50',
                      {
                        'bg-primary text-white hover:bg-primary/90': selected,
                        'text-gray-400 cursor-not-allowed': disabled,
                        'text-gray-900': !disabled && !selected,
                      }
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="font-medium">{format(date, 'd')}</span>
                      {!disabled && available && !selected && (
                        <div
                          className={cn('h-1 w-1 rounded-full mt-1', {
                            'bg-green-500':  slotsCount > 4,
                            'bg-yellow-500': slotsCount > 0 && slotsCount <= 4,
                          })}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">Selected Date:</p>
                <p className="font-semibold text-gray-900">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Select Time</h3>
            </div>

            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Please select a date first</p>
                <p className="text-sm text-gray-400 mt-1">
                  Choose a date from the calendar to see available time slots
                </p>
              </div>
            ) : loading ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Morning</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDateSlots
                      .filter((slot) => parseInt(slot.time.split(':')[0]) < 12)
                      .map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedTime === slot.time ? 'default' : 'outline'}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={!slot.available}
                          className={cn('justify-start gap-2 h-auto py-3', {
                            'opacity-50 cursor-not-allowed': !slot.available,
                          })}
                        >
                          <Clock className="h-4 w-4" />
                          <span>{slot.time}</span>
                          {!slot.available && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              Full
                            </Badge>
                          )}
                        </Button>
                      ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Afternoon</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDateSlots
                      .filter((slot) => parseInt(slot.time.split(':')[0]) >= 12)
                      .map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedTime === slot.time ? 'default' : 'outline'}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={!slot.available}
                          className={cn('justify-start gap-2 h-auto py-3', {
                            'opacity-50 cursor-not-allowed': !slot.available,
                          })}
                        >
                          <Clock className="h-4 w-4" />
                          <span>{slot.time}</span>
                          {!slot.available && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              Full
                            </Badge>
                          )}
                        </Button>
                      ))}
                  </div>
                </div>

                {selectedDateSlots.length === 0 && (
                  <Alert variant="error">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No time slots available for this date. Please select another date.
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTime && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Selected Time:</p>
                    <p className="font-semibold text-gray-900">{selectedTime}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedDate && selectedTime && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Appointment Scheduled</h4>
                <p className="text-sm text-gray-700">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                </p>
                {appointmentType === 'showroom' && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Location will be confirmed in the next step</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Please note:</strong> Your appointment is not confirmed until you complete
          the booking process and receive a confirmation email. Time slots are held for 10
          minutes during the booking process.
        </AlertDescription>
      </Alert>
    </div>
  );
}
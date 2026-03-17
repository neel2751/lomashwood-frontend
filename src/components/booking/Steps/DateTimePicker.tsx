'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  MapPin,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { API_BASE_URL } from '@/config/api';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date?: string;
  showroomId?: string;
}

interface ApiTimeSlot {
  id?: string;
  date?: string;
  time?: string;
  available?: boolean;
  showroomId?: string;
}

const SLOTS_ENDPOINT = `${API_BASE_URL}/appointments/slots`;

function normalizeDateValue(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  if (typeof value === 'string') {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return null;
}

function toDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

function formatClockTime(hour: number, minute: number) {
  const hour24 = String(hour).padStart(2, '0');
  const minuteLabel = String(minute).padStart(2, '0');
  return `${hour24}:${minuteLabel}`;
}

function formatSlotRange(startTime: string, durationMinutes = 30) {
  const [hourText, minuteText = '0'] = startTime.split(':');
  const startHour = Number(hourText);
  const startMinute = Number(minuteText);

  if (Number.isNaN(startHour) || Number.isNaN(startMinute)) {
    return startTime;
  }

  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = totalStartMinutes + durationMinutes;

  const endHour = Math.floor(totalEndMinutes / 60) % 24;
  const endMinute = totalEndMinutes % 60;

  return `${formatClockTime(startHour, startMinute)} - ${formatClockTime(endHour, endMinute)}`;
}

function normalizeSlots(payload: unknown, dateKey: string): TimeSlot[] {
  const rawSlots = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : [];

  const normalizedSlots: Array<TimeSlot | null> = rawSlots.map((slot, index) => {
    const item = slot as ApiTimeSlot;
    const time = item.time || '';

    if (!time) {
      return null;
    }

    return {
      id: item.id || `${dateKey}-${time}-${index}`,
      date: item.date || dateKey,
      time,
      available: Boolean(item.available),
      showroomId: item.showroomId,
    };
  });

  return normalizedSlots.filter((slot): slot is TimeSlot => slot !== null);
}

export default function DateTimePicker() {
  const { setValue, watch } = useFormContext();

  const selectedDateValue = watch('appointmentDate');
  const selectedDate = normalizeDateValue(selectedDateValue);
  const selectedTime = watch('appointmentTime');
  const appointmentType = watch('appointmentType');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState<TimeSlot[]>([]);
  const [availabilityByDate, setAvailabilityByDate] = useState<Record<string, TimeSlot[]>>({});
  const availabilityByDateRef = useRef<Record<string, TimeSlot[]>>({});
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);
  const calendarStart = useMemo(
    () => startOfWeek(monthStart, { weekStartsOn: 0 }),
    [monthStart]
  );
  const calendarEnd = useMemo(
    () => endOfWeek(monthEnd, { weekStartsOn: 0 }),
    [monthEnd]
  );
  const calendarDays = useMemo(
    () => eachDayOfInterval({ start: calendarStart, end: calendarEnd }),
    [calendarStart, calendarEnd]
  );

  useEffect(() => {
    availabilityByDateRef.current = availabilityByDate;
  }, [availabilityByDate]);

  const isSlotWithinLeadTime = (date: Date, slotTime: string) => {
    const [hourText, minuteText = '0'] = slotTime.split(':');
    const hour = Number(hourText);
    const minute = Number(minuteText);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return false;
    }

    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour, minute, 0, 0);

    const leadTimeCutoff = new Date();
    leadTimeCutoff.setMinutes(leadTimeCutoff.getMinutes() + 60);

    return slotDateTime >= leadTimeCutoff;
  };

  const isSlotBookable = (date: Date, slot: TimeSlot) => {
    if (!slot.available) {
      return false;
    }

    return isSlotWithinLeadTime(date, slot.time);
  };

  const fetchSlotsForDate = async (date: Date) => {
    const dateKey = toDateKey(date);
    const url = `${SLOTS_ENDPOINT}?date=${dateKey}`;

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[Slots API] ${response.status} ${response.statusText}:`, errorBody);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const payload = await response.json();
      const slots = normalizeSlots(payload, dateKey);
      
      if (!Array.isArray(slots)) {
        console.error('[Slots API] Invalid slots format:', slots);
        throw new Error('Invalid slots response format');
      }

      return { dateKey, slots };
    } catch (error) {
      console.error(`[Slots API] Failed to fetch slots for ${dateKey}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadCalendarAvailability = async () => {
      const today = startOfDay(new Date());
      const cachedAvailability = availabilityByDateRef.current;
      const daysToFetch = calendarDays.filter((date) => {
        const dateKey = toDateKey(date);
        return !isBefore(date, today) && cachedAvailability[dateKey] === undefined;
      });

      if (daysToFetch.length === 0) {
        return;
      }

      setCalendarLoading(true);

      try {
        const results = await Promise.all(daysToFetch.map(fetchSlotsForDate));

        if (isCancelled) {
          return;
        }

        setAvailabilityByDate((current) => {
          const next = { ...current };
          results.forEach(({ dateKey, slots }) => {
            next[dateKey] = slots;
          });
          return next;
        });
      } catch (error) {
        if (!isCancelled) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          console.error('[Calendar Availability] Error:', errorMsg);
          setSlotsError('Unable to load current appointment availability.');
        }
      } finally {
        if (!isCancelled) {
          setCalendarLoading(false);
        }
      }
    };

    loadCalendarAvailability();

    return () => {
      isCancelled = true;
    };
  }, [calendarDays]);

  useEffect(() => {
    let isCancelled = false;

    const loadSelectedDateSlots = async () => {
      if (!selectedDate) {
        setSelectedDateSlots([]);
        setSlotsError(null);
        return;
      }

      const dateKey = toDateKey(selectedDate);
      const cachedSlots = availabilityByDateRef.current[dateKey];

      if (cachedSlots !== undefined) {
        setSelectedDateSlots(cachedSlots);
        setSlotsError(null);
        return;
      }

      setLoading(true);
      setSlotsError(null);

      try {
        const { slots } = await fetchSlotsForDate(selectedDate);

        if (isCancelled) {
          return;
        }

        setAvailabilityByDate((current) => ({
          ...current,
          [dateKey]: slots,
        }));
        setSelectedDateSlots(slots);
      } catch (error) {
        if (!isCancelled) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          console.error('[Selected Date Slots]', {
            date: toDateKey(selectedDate),
            error: errorMsg,
          });
          setSelectedDateSlots([]);
          setSlotsError(`Unable to load time slots: ${errorMsg}`);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadSelectedDateSlots();

    return () => {
      isCancelled = true;
    };
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    const matchingSlot = selectedDateSlots.find((slot) => slot.time === selectedTime);
    if (!matchingSlot || !isSlotBookable(selectedDate, matchingSlot)) {
      setValue('appointmentTime', '', { shouldValidate: true });
    }
  }, [selectedDate, selectedDateSlots, selectedTime, setValue]);

  useEffect(() => {
    if (selectedDate && !isSameMonth(selectedDate, currentMonth)) {
      setCurrentMonth(selectedDate);
    }
  }, [currentMonth, selectedDate]);

  const handleDateSelect = (date: Date) => {
    setValue('appointmentDate', date, { shouldValidate: true });
    setValue('appointmentTime', '', { shouldValidate: false });
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (!selectedDate || !isSlotBookable(selectedDate, slot)) return;
    setValue('appointmentTime', slot.time, { shouldValidate: true });
  };

  const isDateSelected = (date: Date) => selectedDate && isSameDay(date, selectedDate);
  const isDateDisabled = (date: Date) => isBefore(date, startOfDay(new Date()));

  const getAvailableSlotsCount = (date: Date) => {
    const dateKey = toDateKey(date);
    const slots = availabilityByDate[dateKey];
    if (!slots) return null;
    return slots.filter((slot) => isSlotBookable(date, slot)).length;
  };

  const getDayAvailabilityTone = (availableSlotsCount: number | null) => {
    if (availableSlotsCount === null) {
      return null;
    }

    if (availableSlotsCount > 4) {
      return 'high';
    }

    if (availableSlotsCount > 0) {
      return 'limited';
    }

    return 'none';
  };

  const morningSlots = selectedDateSlots.filter((slot) => parseInt(slot.time.split(':')[0], 10) < 12);
  const afternoonSlots = selectedDateSlots.filter((slot) => parseInt(slot.time.split(':')[0], 10) >= 12);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
        <p className="text-gray-600 mt-1">Choose your preferred appointment date and time slot</p>
      </div>

      {appointmentType && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You've selected a{' '}
            <strong className="capitalize text-lomash-secondary">
              {appointmentType === 'showroom-visit'
                ? 'Showroom Visit Appointment'
                : appointmentType === 'home-visit'
                  ? 'Home Measurement Appointment'
                  : 'Online Consultation'}
            </strong>
            {appointmentType === 'showroom-visit' && (
              <span className="block mt-1 text-sm">Please select a date and time to visit our showroom</span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
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
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span>Limited</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span>Full</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), startOfDay(new Date()))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h4 className="font-semibold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</h4>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 pb-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((date, index) => {
                const disabled = isDateDisabled(date);
                const selected = isDateSelected(date);
                const currentMonthDate = isSameMonth(date, currentMonth);
                const slotsCount = getAvailableSlotsCount(date);
                const tone = getDayAvailabilityTone(slotsCount);

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
                        'opacity-40': !currentMonthDate,
                      }
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="font-medium">{format(date, 'd')}</span>
                      {!disabled && !selected && tone && (
                        <div
                          className={cn('h-1 w-1 rounded-full mt-1', {
                            'bg-green-500': tone === 'high',
                            'bg-yellow-500': tone === 'limited',
                            'bg-gray-300': tone === 'none',
                          })}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {calendarLoading && (
              <p className="text-sm text-gray-500">Loading live availability for this month...</p>
            )}

            {selectedDate && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">Selected Date:</p>
                <p className="font-semibold text-gray-900">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
              </div>
            )}
          </CardContent>
        </Card>

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
            ) : slotsError ? (
              <Alert variant="error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{slotsError}</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Morning</label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {morningSlots.map((slot) => {
                      const disabledSlot = !selectedDate || !isSlotBookable(selectedDate, slot);
                      const selectedSlot = selectedTime === slot.time;

                      return (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedSlot ? 'default' : 'outline'}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={disabledSlot}
                          className={cn('h-12 justify-start px-3 text-left transition-all', {
                            'opacity-60 cursor-not-allowed': disabledSlot,
                            'ring-2 ring-primary/25': selectedSlot,
                          })}
                        >
                          <div className="flex w-full items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span className="flex-1 text-sm font-medium whitespace-nowrap">
                              {formatSlotRange(slot.time)}
                            </span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Afternoon</label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {afternoonSlots.map((slot) => {
                      const disabledSlot = !selectedDate || !isSlotBookable(selectedDate, slot);
                      const selectedSlot = selectedTime === slot.time;

                      return (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedSlot ? 'default' : 'outline'}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={disabledSlot}
                          className={cn('h-12 justify-start px-3 text-left transition-all', {
                            'opacity-60 cursor-not-allowed': disabledSlot,
                            'ring-2 ring-primary/25': selectedSlot,
                          })}
                        >
                          <div className="flex w-full items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span className="flex-1 text-sm font-medium whitespace-nowrap">
                              {formatSlotRange(slot.time)}
                            </span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {selectedDateSlots.length === 0 && (
                  <Alert variant="error">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p>No time slots available for this date.</p>
                        <p className="text-xs opacity-90">
                          Try selecting another day from the calendar. Slots with green dots have availability.
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTime && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Selected Time:</p>
                    <p className="font-semibold text-gray-900">{formatSlotRange(selectedTime)}</p>
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
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {formatSlotRange(selectedTime)}
                </p>
                {appointmentType === 'showroom-visit' && (
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
          <strong>Please note:</strong> Same-day bookings require at least 1 hour lead time. Your
          appointment is not confirmed until you complete the booking process and receive a
          confirmation email.
        </AlertDescription>
      </Alert>
    </div>
  );
}

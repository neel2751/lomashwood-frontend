'use client';

import { format } from 'date-fns';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  bookedCount?: number;
  maxCapacity?: number;
  price?: number;
  popular?: boolean;
  nextAvailable?: string;
}

interface TimeSlotsProps {
  date: Date;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  appointmentType?: string;
  loading?: boolean;
}

const generateTimeSlots = (appointmentType?: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  const morningHours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];

  const afternoonHours = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

  const eveningHours = ['18:00', '18:30', '19:00', '19:30'];
  
  const allHours = [
    ...morningHours,
    ...afternoonHours,
    ...(appointmentType === 'virtual' ? eveningHours : []),
  ];
  
  allHours.forEach((time, index) => {
    const available = Math.random() > 0.3;
    const bookedCount = Math.floor(Math.random() * 3);
    const maxCapacity = 4;
    
    slots.push({
      id: `slot-${index}`,
      time,
      available: available && bookedCount < maxCapacity,
      bookedCount,
      maxCapacity,
      popular: index % 5 === 0,
    });
  });
  
  return slots;
};

export default function TimeSlots({
  date,
  selectedTime,
  onTimeSelect,
  appointmentType,
  loading = false,
}: TimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const generatedSlots = generateTimeSlots(appointmentType);
      setSlots(generatedSlots);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [date, appointmentType]);

  const filterSlotsByTime = (slots: TimeSlot[], period: string) => {
    if (period === 'all') return slots;
    
    return slots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0]);
      
      if (period === 'morning') return hour >= 9 && hour < 12;
      if (period === 'afternoon') return hour >= 12 && hour < 18;
      if (period === 'evening') return hour >= 18;
      
      return true;
    });
  };

  const filteredSlots = filterSlotsByTime(slots, activeTab);
  const availableSlots = filteredSlots.filter((slot) => slot.available);
  const unavailableSlots = filteredSlots.filter((slot) => !slot.available);

  const morningAvailable = slots.filter(
    (s) => s.available && parseInt(s.time.split(':')[0]) < 12
  ).length;
  const afternoonAvailable = slots.filter(
    (s) => s.available && parseInt(s.time.split(':')[0]) >= 12 && parseInt(s.time.split(':')[0]) < 18
  ).length;
  const eveningAvailable = slots.filter(
    (s) => s.available && parseInt(s.time.split(':')[0]) >= 18
  ).length;

  if (isLoading || loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Available Time Slots
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Available Time Slots
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {format(date, 'MMM d, yyyy')}
          </Badge>
        </div>
        
        {availableSlots.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} available
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Time Period Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
            className="text-xs"
          >
            All
            <Badge variant="secondary" className="ml-1.5 text-xs bg-white/20">
              {slots.filter((s) => s.available).length}
            </Badge>
          </Button>
          
          <Button
            type="button"
            variant={activeTab === 'morning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('morning')}
            disabled={morningAvailable === 0}
            className="text-xs"
          >
            Morning
            {morningAvailable > 0 && (
              <Badge variant="secondary" className="ml-1.5 text-xs bg-white/20">
                {morningAvailable}
              </Badge>
            )}
          </Button>
          
          <Button
            type="button"
            variant={activeTab === 'afternoon' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('afternoon')}
            disabled={afternoonAvailable === 0}
            className="text-xs"
          >
            Afternoon
            {afternoonAvailable > 0 && (
              <Badge variant="secondary" className="ml-1.5 text-xs bg-white/20">
                {afternoonAvailable}
              </Badge>
            )}
          </Button>
          
          {appointmentType === 'virtual' && (
            <Button
              type="button"
              variant={activeTab === 'evening' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('evening')}
              disabled={eveningAvailable === 0}
              className="text-xs"
            >
              Evening
              {eveningAvailable > 0 && (
                <Badge variant="secondary" className="ml-1.5 text-xs bg-white/20">
                  {eveningAvailable}
                </Badge>
              )}
            </Button>
          )}
        </div>

        {/* Time Slots Content */}
        <div className="space-y-3">
          {availableSlots.length === 0 ? (
            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No time slots available for {activeTab === 'all' ? 'this day' : `the ${activeTab}`}.
                Please select another {activeTab === 'all' ? 'date' : 'time period'}.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
              {/* Available Slots */}
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  type="button"
                  variant={selectedTime === slot.time ? 'default' : 'outline'}
                  onClick={() => onTimeSelect(slot.time)}
                  className={cn(
                    'w-full justify-between h-auto py-3 px-4',
                    selectedTime === slot.time && 'ring-2 ring-primary'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold">{slot.time}</span>
                    </div>
                    
                    {slot.popular && (
                      <Badge
                        variant="secondary"
                        className="text-xs gap-1 bg-amber-100 text-amber-700 border-amber-200"
                      >
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {slot.bookedCount !== undefined && slot.maxCapacity && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>
                          {slot.maxCapacity - slot.bookedCount} left
                        </span>
                      </div>
                    )}
                    
                    {selectedTime === slot.time && (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    )}
                  </div>
                </Button>
              ))}

              {/* Unavailable Slots (shown but disabled) */}
              {unavailableSlots.length > 0 && (
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-medium text-gray-500 px-1">
                    Unavailable
                  </p>
                  {unavailableSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      type="button"
                      variant="outline"
                      disabled
                      className="w-full justify-between h-auto py-3 px-4 opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-semibold">{slot.time}</span>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="text-xs">
                        Fully Booked
                      </Badge>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Time Display */}
        {selectedTime && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Selected Time
                </p>
                <p className="text-sm text-gray-600">
                  {format(date, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Helper Info */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Duration:</strong> Each appointment lasts approximately 45-60 minutes.
            {appointmentType === 'home' && (
              <span className="block mt-1">
                Please ensure someone over 18 is present at the property.
              </span>
            )}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
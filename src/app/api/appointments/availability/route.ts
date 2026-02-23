import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const availabilityQuerySchema = z.object({
  date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Date must be today or in the future'),
  appointmentType: z.enum(['showroom', 'home', 'virtual']),
  showroomId: z.string().optional(),
  serviceType: z.enum(['kitchen', 'bedroom', 'both']).optional(),
});

const TIME_SLOTS = [
  { time: '09:00', label: '9:00 AM' },
  { time: '10:00', label: '10:00 AM' },
  { time: '11:00', label: '11:00 AM' },
  { time: '12:00', label: '12:00 PM' },
  { time: '13:00', label: '1:00 PM' },
  { time: '14:00', label: '2:00 PM' },
  { time: '15:00', label: '3:00 PM' },
  { time: '16:00', label: '4:00 PM' },
  { time: '17:00', label: '5:00 PM' },
  { time: '18:00', label: '6:00 PM' },
];

const OPERATING_HOURS = {
  showroom: {
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '20:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '17:00', closed: false },
    sunday: { open: '11:00', close: '16:00', closed: false },
  },
  home: {
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '00:00', close: '00:00', closed: true },
  },
  virtual: {
    monday: { open: '09:00', close: '20:00', closed: false },
    tuesday: { open: '09:00', close: '20:00', closed: false },
    wednesday: { open: '09:00', close: '20:00', closed: false },
    thursday: { open: '09:00', close: '20:00', closed: false },
    friday: { open: '09:00', close: '20:00', closed: false },
    saturday: { open: '10:00', close: '18:00', closed: false },
    sunday: { open: '10:00', close: '18:00', closed: false },
  },
};

const BOOKED_SLOTS = [
  { date: '2024-02-15', time: '10:00', showroomId: '1' },
  { date: '2024-02-15', time: '14:00', showroomId: '1' },
  { date: '2024-02-15', time: '11:00', showroomId: '2' },
  { date: '2024-02-16', time: '09:00', appointmentType: 'home' },
  { date: '2024-02-16', time: '15:00', appointmentType: 'virtual' },
];

const BLOCKED_DATES = [
  '2024-12-25', 
  '2024-12-26', 
  '2024-01-01',
];

function getDayOfWeek(date: string): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const d = new Date(date);
  return days[d.getDay()];
}

function isTimeSlotAvailable(
  date: string,
  time: string,
  appointmentType: string,
  showroomId?: string
): boolean {
  if (BLOCKED_DATES.includes(date)) {
    return false;
  }

  const isBooked = BOOKED_SLOTS.some((slot) => {
    if (slot.date === date && slot.time === time) {
      if (appointmentType === 'showroom' && showroomId) {
        return slot.showroomId === showroomId;
      }
      return slot.appointmentType === appointmentType;
    }
    return false;
  });
  
  if (isBooked) {
    return false;
  }

  const dayOfWeek = getDayOfWeek(date);
  const hours = OPERATING_HOURS[appointmentType as keyof typeof OPERATING_HOURS]?.[
    dayOfWeek as keyof typeof OPERATING_HOURS.showroom
  ];
  
  if (!hours || hours.closed) {
    return false;
  }

  const timeValue = parseInt(time.replace(':', ''), 10);
  const openValue = parseInt(hours.open.replace(':', ''), 10);
  const closeValue = parseInt(hours.close.replace(':', ''), 10);
  
  return timeValue >= openValue && timeValue < closeValue;
}

function getNextAvailableDate(
  appointmentType: string,
  showroomId?: string
): string | null {
  const today = new Date();
  const maxDays = 90;
  
  for (let i = 1; i < maxDays; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    const dateString = checkDate.toISOString().split('T')[0];

    const hasAvailableSlots = TIME_SLOTS.some((slot) =>
      isTimeSlotAvailable(dateString, slot.time, appointmentType, showroomId)
    );
    
    if (hasAvailableSlots) {
      return dateString;
    }
  }
  
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedParams = availabilityQuerySchema.parse(queryParams);
    
    const { date, appointmentType, showroomId, serviceType: _serviceType } = validatedParams;

    const isBlocked = BLOCKED_DATES.includes(date);
    const dayOfWeek = getDayOfWeek(date);
    const hours = OPERATING_HOURS[appointmentType]?.[
      dayOfWeek as keyof typeof OPERATING_HOURS.showroom
    ];
    
    if (isBlocked || !hours || hours.closed) {
      const nextAvailable = getNextAvailableDate(appointmentType, showroomId);
      
      return NextResponse.json(
        {
          success: true,
          data: {
            date,
            available: false,
            reason: isBlocked
              ? 'This date is a holiday or blocked date'
              : 'This location is closed on this day',
            slots: [],
            operatingHours: null,
            nextAvailableDate: nextAvailable,
          },
        },
        { status: 200 }
      );
    }

    const availableSlots = TIME_SLOTS.map((slot) => {
      const available = isTimeSlotAvailable(
        date,
        slot.time,
        appointmentType,
        showroomId
      );
      
      return {
        time: slot.time,
        label: slot.label,
        available,
      };
    }).filter((slot) => {
      const timeValue = parseInt(slot.time.replace(':', ''), 10);
      const openValue = parseInt(hours.open.replace(':', ''), 10);
      const closeValue = parseInt(hours.close.replace(':', ''), 10);
      return timeValue >= openValue && timeValue < closeValue;
    });
    
    const availableCount = availableSlots.filter((s) => s.available).length;
    const totalSlots = availableSlots.length;
    
    return NextResponse.json(
      {
        success: true,
        data: {
          date,
          available: availableCount > 0,
          slots: availableSlots,
          operatingHours: {
            open: hours.open,
            close: hours.close,
            openLabel: formatTime(hours.open),
            closeLabel: formatTime(hours.close),
          },
          stats: {
            available: availableCount,
            total: totalSlots,
            booked: totalSlots - availableCount,
          },
          nextAvailableDate: availableCount === 0
            ? getNextAvailableDate(appointmentType, showroomId)
            : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid query parameters',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    console.error('Availability API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while checking availability',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { dates, appointmentType, showroomId } = z
      .object({
        dates: z.array(z.string()),
        appointmentType: z.enum(['showroom', 'home', 'virtual']),
        showroomId: z.string().optional(),
      })
      .parse(body);

    const availability = dates.map((date) => {
      const dayOfWeek = getDayOfWeek(date);
      const hours = OPERATING_HOURS[appointmentType]?.[
        dayOfWeek as keyof typeof OPERATING_HOURS.showroom
      ];
      const isBlocked = BLOCKED_DATES.includes(date);
      
      if (isBlocked || !hours || hours.closed) {
        return {
          date,
          available: false,
          slots: [],
        };
      }
      
      const availableSlots = TIME_SLOTS.filter((slot) =>
        isTimeSlotAvailable(date, slot.time, appointmentType, showroomId)
      );
      
      return {
        date,
        available: availableSlots.length > 0,
        slots: availableSlots.length,
      };
    });
    
    return NextResponse.json(
      {
        success: true,
        data: {
          availability,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    console.error('Bulk availability API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while checking availability',
      },
      { status: 500 }
    );
  }
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}
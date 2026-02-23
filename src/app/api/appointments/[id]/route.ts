import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateAppointmentSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  preferredDate: z.string().optional().refine((date) => {
    if (!date) return true;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Date must be in the future'),
  preferredTime: z.string().optional(),
  additionalNotes: z.string().optional(),
  cancellationReason: z.string().optional(),
  staffNotes: z.string().optional(),
});

const mockAppointments = [
  {
    id: '1',
    appointmentType: 'showroom',
    serviceType: 'kitchen',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+44 7700 900000',
    preferredDate: '2024-02-15',
    preferredTime: '10:00',
    showroomId: '1',
    showroomName: 'London Showroom',
    showroomAddress: '123 High Street, London, SW1A 1AA',
    status: 'confirmed',
    confirmationNumber: 'APT-2024-001',
    notes: 'Interested in modern kitchen designs',
    projectBudget: '10k-20k',
    timeframe: '1-3-months',
    hearAboutUs: 'Google Search',
    assignedStaff: {
      id: 'staff-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@lomashwood.com',
      phone: '+44 7700 900100',
    },
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    confirmedAt: '2024-01-20T11:30:00Z',
  },
  {
    id: '2',
    appointmentType: 'home',
    serviceType: 'both',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+44 7700 900001',
    address: '123 Main Street',
    city: 'Manchester',
    postcode: 'M1 1AA',
    preferredDate: '2024-02-20',
    preferredTime: '14:00',
    status: 'pending',
    confirmationNumber: 'APT-2024-002',
    notes: 'Need consultation for entire home renovation',
    projectBudget: '20k-plus',
    timeframe: 'immediate',
    hearAboutUs: 'Referral',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },
  {
    id: '3',
    appointmentType: 'virtual',
    serviceType: 'bedroom',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '+44 7700 900002',
    preferredDate: '2024-02-18',
    preferredTime: '16:00',
    status: 'completed',
    confirmationNumber: 'APT-2024-003',
    notes: 'Looking for bedroom fitted wardrobes',
    projectBudget: '5k-10k',
    timeframe: '3-6-months',
    meetingLink: 'https://meet.lomashwood.com/apt-2024-003',
    assignedStaff: {
      id: 'staff-2',
      name: 'David Wilson',
      email: 'david.wilson@lomashwood.com',
      phone: '+44 7700 900101',
    },
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-02-18T17:00:00Z',
    completedAt: '2024-02-18T17:00:00Z',
  },
];

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const appointment = mockAppointments.find((a) => a.id === id);
    
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Appointment not found',
        },
        { status: 404 }
      );
    }
  
    return NextResponse.json(
      {
        success: true,
        data: {
          appointment,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get appointment API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching appointment',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const validatedData = updateAppointmentSchema.parse(body);

    const appointment = mockAppointments.find((a) => a.id === id);
    
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Appointment not found',
        },
        { status: 404 }
      );
    }

    if (validatedData.status) {
      const validTransitions: Record<string, string[]> = {
        pending: ['confirmed', 'cancelled'],
        confirmed: ['completed', 'cancelled'],
        completed: [],
        cancelled: [],
      };
      
      const allowedTransitions = validTransitions[appointment.status] || [];
      
      if (!allowedTransitions.includes(validatedData.status)) {
        return NextResponse.json(
          {
            success: false,
            message: `Cannot change status from ${appointment.status} to ${validatedData.status}`,
          },
          { status: 400 }
        );
      }
    }

    const isRescheduling =
      (validatedData.preferredDate && validatedData.preferredDate !== appointment.preferredDate) ||
      (validatedData.preferredTime && validatedData.preferredTime !== appointment.preferredTime);
    
    if (isRescheduling) {
      // TODO: Check availability for new date/time
      // const isAvailable = await checkAvailability(
      //   validatedData.preferredDate || appointment.preferredDate,
      //   validatedData.preferredTime || appointment.preferredTime,
      //   appointment.showroomId
      // );
      
      // if (!isAvailable) {
      //   return NextResponse.json(
      //     {
      //       success: false,
      //       message: 'Selected time slot is not available',
      //     },
      //     { status: 409 }
      //   );
      // }
    }

    const updatedAppointment = {
      ...appointment,
      ...validatedData,
      updatedAt: new Date().toISOString(),
      ...(validatedData.status === 'confirmed' && {
        confirmedAt: new Date().toISOString(),
      }),
      ...(validatedData.status === 'completed' && {
        completedAt: new Date().toISOString(),
      }),
      ...(validatedData.status === 'cancelled' && {
        cancelledAt: new Date().toISOString(),
      }),
    };

    if (validatedData.status) {
      switch (validatedData.status) {
        case 'confirmed':
          // TODO: Send confirmation email
          // await sendAppointmentConfirmationEmail(updatedAppointment);
          break;
        case 'cancelled':
          // TODO: Send cancellation email
          // await sendAppointmentCancellationEmail(updatedAppointment);
          break;
        case 'completed':
          // TODO: Send follow-up email
          // await sendAppointmentFollowUpEmail(updatedAppointment);
          break;
      }
    }
    
    if (isRescheduling) {
      // TODO: Send reschedule notification
      // await sendAppointmentRescheduleEmail(updatedAppointment);
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Appointment updated successfully',
        data: {
          appointment: updatedAppointment,
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
    
    console.error('Update appointment API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while updating appointment',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // TODO: Replace with actual database query
    const appointment = mockAppointments.find((a) => a.id === id);
    
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Appointment not found',
        },
        { status: 404 }
      );
    }
    
    // TODO: Check authorization
    // const authToken = request.cookies.get('auth_token')?.value;
    // const user = await verifyToken(authToken);
    
    // Only allow deletion of pending or cancelled appointments
    if (appointment.status !== 'pending' && appointment.status !== 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          message: 'Only pending or cancelled appointments can be deleted',
        },
        { status: 400 }
      );
    }
    
    // TODO: Soft delete or hard delete from database
    // await db.appointments.delete(id);
    
    // TODO: Send cancellation notification
    // await sendAppointmentCancellationEmail({
    //   ...appointment,
    //   status: 'cancelled',
    //   cancellationReason: 'Deleted by user',
    // });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Appointment deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete appointment API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while deleting appointment',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return PUT(request, { params });
}
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).optional(),
  interestedIn: z.enum(['kitchen', 'bedroom', 'both', 'other']).optional(),
  preferredTime: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactSubmissions: Array<
  ContactFormData & {
    id: string;
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: string;
    updatedAt: string;
  }
> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    const id = `CONT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const contactSubmission = {
      id,
      ...formData,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    contactSubmissions.push(contactSubmission);

    await sendAdminNotification(contactSubmission);
    await sendCustomerConfirmation(contactSubmission);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: {
          id: contactSubmission.id,
          submittedAt: contactSubmission.createdAt,
          referenceNumber: contactSubmission.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'new' | 'in-progress' | 'resolved' | null;
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const interestedIn = searchParams.get('interestedIn');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');


    let filteredSubmissions = [...contactSubmissions];

    if (status) {
      filteredSubmissions = filteredSubmissions.filter(
        (sub) => sub.status === status
      );
    }

    if (email) {
      filteredSubmissions = filteredSubmissions.filter((sub) =>
        sub.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    if (phone) {
      filteredSubmissions = filteredSubmissions.filter((sub) =>
        sub.phone.includes(phone)
      );
    }

    if (interestedIn) {
      filteredSubmissions = filteredSubmissions.filter(
        (sub) => sub.interestedIn === interestedIn
      );
    }

    if (fromDate) {
      filteredSubmissions = filteredSubmissions.filter(
        (sub) => new Date(sub.createdAt) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filteredSubmissions = filteredSubmissions.filter(
        (sub) => new Date(sub.createdAt) <= new Date(toDate)
      );
    }

    filteredSubmissions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = filteredSubmissions.length;
    const limitNum = limit ? parseInt(limit) : total;
    const offsetNum = offset ? parseInt(offset) : 0;

    const paginatedSubmissions = filteredSubmissions.slice(
      offsetNum,
      offsetNum + limitNum
    );

    return NextResponse.json(
      {
        success: true,
        data: paginatedSubmissions,
        meta: {
          total,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < total,
          statusCounts: {
            new: contactSubmissions.filter((s) => s.status === 'new').length,
            inProgress: contactSubmissions.filter((s) => s.status === 'in-progress').length,
            resolved: contactSubmissions.filter((s) => s.status === 'resolved').length,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch contact submissions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function sendAdminNotification(
  submission: ContactFormData & { id: string; createdAt: string }
): Promise<void> {
  console.log('Sending admin notification for submission:', submission.id);

  const emailContent = {
    to: 'admin@lomashwood.com',
    subject: `New Contact Form Submission - ${submission.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Reference:</strong> ${submission.id}</p>
      <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Phone:</strong> ${submission.phone}</p>
      <p><strong>Subject:</strong> ${submission.subject}</p>
      <p><strong>Interested In:</strong> ${submission.interestedIn || 'Not specified'}</p>
      <p><strong>Preferred Contact:</strong> ${submission.preferredContactMethod || 'Not specified'}</p>
      <p><strong>Preferred Time:</strong> ${submission.preferredTime || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message}</p>
      <p><strong>Submitted At:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
    `,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Admin notification sent:', emailContent);
}

async function sendCustomerConfirmation(
  submission: ContactFormData & { id: string; createdAt: string }
): Promise<void> {
  console.log('Sending customer confirmation for submission:', submission.id);

  const emailContent = {
    to: submission.email,
    subject: 'Thank you for contacting Lomash Wood',
    html: `
      <h2>Thank You for Contacting Us!</h2>
      <p>Dear ${submission.firstName},</p>
      <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
      <p><strong>Reference Number:</strong> ${submission.id}</p>
      <p><strong>Subject:</strong> ${submission.subject}</p>
      <p>In the meantime, feel free to explore our:</p>
      <ul>
        <li><a href="https://lomashwood.com/kitchen">Kitchen Collections</a></li>
        <li><a href="https://lomashwood.com/bedroom">Bedroom Collections</a></li>
        <li><a href="https://lomashwood.com/showrooms">Visit Our Showrooms</a></li>
      </ul>
      <p>Best regards,<br/>Lomash Wood Team</p>
    `,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Customer confirmation sent:', emailContent);
}
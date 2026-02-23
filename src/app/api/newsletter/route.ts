import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  interests: z.array(z.enum(['kitchen', 'bedroom', 'offers', 'tips', 'news'])).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive marketing emails',
  }),
  source: z.string().optional(),
});

type NewsletterSubscription = z.infer<typeof newsletterSchema>;

const subscribers: Array<
  NewsletterSubscription & {
    id: string;
    status: 'active' | 'unsubscribed' | 'pending';
    subscribedAt: string;
    unsubscribedAt: string | null;
    ipAddress: string | null;
    userAgent: string | null;
  }
> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = newsletterSchema.safeParse(body);

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

    const subscriptionData = validationResult.data;

    const existingSubscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === subscriptionData.email.toLowerCase()
    );

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          {
            success: false,
            error: 'Already subscribed',
            message: 'This email is already subscribed to our newsletter',
          },
          { status: 409 }
        );
      }

      if (existingSubscriber.status === 'unsubscribed') {
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date().toISOString();
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.interests = subscriptionData.interests;

        await sendWelcomeEmail(existingSubscriber);

        return NextResponse.json(
          {
            success: true,
            message: 'Welcome back! You have been resubscribed to our newsletter.',
            data: {
              id: existingSubscriber.id,
              email: existingSubscriber.email,
              subscribedAt: existingSubscriber.subscribedAt,
            },
          },
          { status: 200 }
        );
      }
    }

    const id = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null;
    const userAgent = request.headers.get('user-agent') || null;

    const newSubscriber = {
      id,
      ...subscriptionData,
      status: 'active' as const,
      subscribedAt: new Date().toISOString(),
      unsubscribedAt: null,
      ipAddress,
      userAgent,
    };

    subscribers.push(newSubscriber);

    await sendWelcomeEmail(newSubscriber);

    await sendAdminNotification(newSubscriber);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! Check your email for confirmation.',
        data: {
          id: newSubscriber.id,
          email: newSubscriber.email,
          subscribedAt: newSubscriber.subscribedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe to newsletter',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required',
        },
        { status: 400 }
      );
    }

    const subscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email not found',
          message: 'This email is not subscribed to our newsletter',
        },
        { status: 404 }
      );
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json(
        {
          success: false,
          error: 'Already unsubscribed',
          message: 'This email is already unsubscribed',
        },
        { status: 409 }
      );
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date().toISOString();

    await sendUnsubscribeConfirmation(subscriber);

    return NextResponse.json(
      {
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.',
        data: {
          email: subscriber.email,
          unsubscribedAt: subscriber.unsubscribedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to unsubscribe from newsletter',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'active' | 'unsubscribed' | 'pending' | null;
    const email = searchParams.get('email');
    const interest = searchParams.get('interest');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const source = searchParams.get('source');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let filteredSubscribers = [...subscribers];

    if (status) {
      filteredSubscribers = filteredSubscribers.filter(
        (sub) => sub.status === status
      );
    }

    if (email) {
      filteredSubscribers = filteredSubscribers.filter((sub) =>
        sub.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    if (interest) {
      filteredSubscribers = filteredSubscribers.filter(
        (sub) => sub.interests?.includes(interest as any)
      );
    }

    if (source) {
      filteredSubscribers = filteredSubscribers.filter(
        (sub) => sub.source === source
      );
    }

    if (fromDate) {
      filteredSubscribers = filteredSubscribers.filter(
        (sub) => new Date(sub.subscribedAt) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filteredSubscribers = filteredSubscribers.filter(
        (sub) => new Date(sub.subscribedAt) <= new Date(toDate)
      );
    }

    filteredSubscribers.sort(
      (a, b) =>
        new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    );

    const total = filteredSubscribers.length;
    const limitNum = limit ? parseInt(limit) : total;
    const offsetNum = offset ? parseInt(offset) : 0;

    const paginatedSubscribers = filteredSubscribers.slice(
      offsetNum,
      offsetNum + limitNum
    );

    const stats = {
      total: subscribers.length,
      active: subscribers.filter((s) => s.status === 'active').length,
      unsubscribed: subscribers.filter((s) => s.status === 'unsubscribed').length,
      pending: subscribers.filter((s) => s.status === 'pending').length,
      growthRate: calculateGrowthRate(),
      topInterests: calculateTopInterests(),
      topSources: calculateTopSources(),
    };

    return NextResponse.json(
      {
        success: true,
        data: paginatedSubscribers,
        meta: {
          total,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < total,
        },
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch subscribers',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function sendWelcomeEmail(
  subscriber: NewsletterSubscription & { id: string; email: string }
): Promise<void> {
  console.log('Sending welcome email to:', subscriber.email);

  const emailContent = {
    to: subscriber.email,
    subject: 'Welcome to Lomash Wood Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Lomash Wood!</h2>
        <p>Dear ${subscriber.firstName || 'Valued Customer'},</p>
        <p>Thank you for subscribing to our newsletter! We're excited to have you as part of our community.</p>
        <p>You'll receive:</p>
        <ul>
          <li>Exclusive offers and promotions</li>
          <li>Latest kitchen and bedroom design trends</li>
          <li>Expert tips and inspiration</li>
          <li>New product launches</li>
        </ul>
        <p>As a welcome gift, enjoy <strong>10% off</strong> your first consultation!</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://lomashwood.com/book-appointment?discount=WELCOME10" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Book Your Free Consultation
          </a>
        </p>
        <p>Follow us on social media:</p>
        <p>
          <a href="https://facebook.com/lomashwood">Facebook</a> | 
          <a href="https://instagram.com/lomashwood">Instagram</a> | 
          <a href="https://pinterest.com/lomashwood">Pinterest</a>
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280;">
          You're receiving this email because you subscribed to Lomash Wood newsletter.<br/>
          <a href="https://lomashwood.com/newsletter?unsubscribe=${subscriber.email}">Unsubscribe</a> | 
          <a href="https://lomashwood.com/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    `,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Welcome email sent:', emailContent);
}

async function sendAdminNotification(
  subscriber: NewsletterSubscription & { id: string }
): Promise<void> {
  console.log('Sending admin notification for new subscriber:', subscriber.id);

  const emailContent = {
    to: 'marketing@lomashwood.com',
    subject: 'New Newsletter Subscription',
    html: `
      <h3>New Newsletter Subscriber</h3>
      <p><strong>Email:</strong> ${subscriber.email}</p>
      <p><strong>Name:</strong> ${subscriber.firstName || ''} ${subscriber.lastName || ''}</p>
      <p><strong>Interests:</strong> ${subscriber.interests?.join(', ') || 'Not specified'}</p>
      <p><strong>Source:</strong> ${subscriber.source || 'Not specified'}</p>
      <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Admin notification sent:', emailContent);
}

async function sendUnsubscribeConfirmation(
  subscriber: { email: string; firstName?: string }
): Promise<void> {
  console.log('Sending unsubscribe confirmation to:', subscriber.email);

  const emailContent = {
    to: subscriber.email,
    subject: 'You have been unsubscribed from Lomash Wood newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We're sorry to see you go!</h2>
        <p>Dear ${subscriber.firstName || 'Valued Customer'},</p>
        <p>You have been successfully unsubscribed from our newsletter.</p>
        <p>We'd love to hear your feedback on why you decided to unsubscribe:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://lomashwood.com/feedback" 
             style="background-color: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Share Your Feedback
          </a>
        </p>
        <p>Changed your mind? You can always <a href="https://lomashwood.com/#newsletter">subscribe again</a>.</p>
        <p>You'll still be able to explore our collections and book consultations on our website.</p>
        <p>Best regards,<br/>Lomash Wood Team</p>
      </div>
    `,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Unsubscribe confirmation sent:', emailContent);
}

function calculateGrowthRate(): number {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  const currentMonthSubscribers = subscribers.filter(
    (sub) => new Date(sub.subscribedAt) >= lastMonth && sub.status === 'active'
  ).length;

  const previousMonthSubscribers = subscribers.filter(
    (sub) => new Date(sub.subscribedAt) < lastMonth && sub.status === 'active'
  ).length;

  if (previousMonthSubscribers === 0) return 100;
  
  return ((currentMonthSubscribers - previousMonthSubscribers) / previousMonthSubscribers) * 100;
}

function calculateTopInterests(): Array<{ interest: string; count: number }> {
  const interestCounts: Record<string, number> = {};
  
  subscribers.forEach((sub) => {
    sub.interests?.forEach((interest) => {
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });
  });

  return Object.entries(interestCounts)
    .map(([interest, count]) => ({ interest, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function calculateTopSources(): Array<{ source: string; count: number }> {
  const sourceCounts: Record<string, number> = {};
  
  subscribers.forEach((sub) => {
    if (sub.source) {
      sourceCounts[sub.source] = (sourceCounts[sub.source] || 0) + 1;
    }
  });

  return Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
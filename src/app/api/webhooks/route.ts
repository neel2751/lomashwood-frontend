import { headers } from 'next/headers';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

type WebhookEvent =
  | 'payment.succeeded'
  | 'payment.failed'
  | 'appointment.created'
  | 'appointment.updated'
  | 'appointment.cancelled'
  | 'order.created'
  | 'order.updated'
  | 'order.completed'
  | 'order.cancelled'
  | 'user.created'
  | 'user.updated'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'email.delivered'
  | 'email.bounced'
  | 'email.opened'
  | 'email.clicked';

interface WebhookPayload {
  id: string;
  event: WebhookEvent;
  timestamp: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

const webhookLogs: Array<{
  id: string;
  event: WebhookEvent;
  payload: WebhookPayload;
  status: 'success' | 'failed' | 'pending';
  response?: any;
  error?: string;
  processedAt: string;
  processingTime: number;
}> = [];

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-key';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const headersList = headers();
    const signature = headersList.get('x-webhook-signature');
    const webhookId = headersList.get('x-webhook-id');
    const timestamp = headersList.get('x-webhook-timestamp');

    const rawBody = await request.text();
    let payload: WebhookPayload;

    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON payload',
        },
        { status: 400 }
      );
    }

    if (signature && !verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid signature',
        },
        { status: 401 }
      );
    }

    if (timestamp) {
      const timestampDate = new Date(timestamp);
      const now = new Date();
      const diffMinutes = (now.getTime() - timestampDate.getTime()) / 1000 / 60;
      
      if (diffMinutes > 5) {
        console.error('Webhook timestamp too old');
        return NextResponse.json(
          {
            success: false,
            error: 'Timestamp too old',
          },
          { status: 400 }
        );
      }
    }

    const result = await processWebhook(payload);

    const processingTime = Date.now() - startTime;
    const logEntry = {
      id: webhookId || `WH-${Date.now()}`,
      event: payload.event,
      payload,
      status: result.success ? 'success' as const : 'failed' as const,
      response: result.data,
      error: result.error,
      processedAt: new Date().toISOString(),
      processingTime,
    };

    webhookLogs.push(logEntry);

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed successfully',
        data: result.data,
        processingTime,
      },
      { status: 200 }
    );
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error('Error processing webhook:', error);

    webhookLogs.push({
      id: `WH-${Date.now()}`,
      event: 'unknown' as any,
      payload: {} as any,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      processedAt: new Date().toISOString(),
      processingTime,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const event = searchParams.get('event') as WebhookEvent | null;
    const status = searchParams.get('status') as 'success' | 'failed' | 'pending' | null;
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let filteredLogs = [...webhookLogs];

    if (event) {
      filteredLogs = filteredLogs.filter((log) => log.event === event);
    }

   if (status) {
      filteredLogs = filteredLogs.filter((log) => log.status === status);
    }

    if (fromDate) {
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.processedAt) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.processedAt) <= new Date(toDate)
      );
    }

    filteredLogs.sort(
      (a, b) =>
        new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
    );

    const total = filteredLogs.length;
    const limitNum = limit ? parseInt(limit) : total;
    const offsetNum = offset ? parseInt(offset) : 0;

    const paginatedLogs = filteredLogs.slice(offsetNum, offsetNum + limitNum);

    const stats = {
      total: webhookLogs.length,
      success: webhookLogs.filter((log) => log.status === 'success').length,
      failed: webhookLogs.filter((log) => log.status === 'failed').length,
      pending: webhookLogs.filter((log) => log.status === 'pending').length,
      averageProcessingTime: calculateAverageProcessingTime(),
      eventCounts: calculateEventCounts(),
    };

    return NextResponse.json(
      {
        success: true,
        data: paginatedLogs,
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
    console.error('Error fetching webhook logs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch webhook logs',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function processWebhook(
  payload: WebhookPayload
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    switch (payload.event) {
      case 'payment.succeeded':
        return await handlePaymentSucceeded(payload.data);

      case 'payment.failed':
        return await handlePaymentFailed(payload.data);

      case 'appointment.created':
        return await handleAppointmentCreated(payload.data);

      case 'appointment.updated':
        return await handleAppointmentUpdated(payload.data);

      case 'appointment.cancelled':
        return await handleAppointmentCancelled(payload.data);

      case 'order.created':
        return await handleOrderCreated(payload.data);

      case 'order.updated':
        return await handleOrderUpdated(payload.data);

      case 'order.completed':
        return await handleOrderCompleted(payload.data);

      case 'order.cancelled':
        return await handleOrderCancelled(payload.data);

      case 'user.created':
        return await handleUserCreated(payload.data);

      case 'user.updated':
        return await handleUserUpdated(payload.data);

      case 'subscription.created':
        return await handleSubscriptionCreated(payload.data);

      case 'subscription.updated':
        return await handleSubscriptionUpdated(payload.data);

      case 'subscription.cancelled':
        return await handleSubscriptionCancelled(payload.data);

      case 'email.delivered':
        return await handleEmailDelivered(payload.data);

      case 'email.bounced':
        return await handleEmailBounced(payload.data);

      case 'email.opened':
        return await handleEmailOpened(payload.data);

      case 'email.clicked':
        return await handleEmailClicked(payload.data);

      default:
        return {
          success: false,
          error: `Unknown event type: ${payload.event}`,
        };
    }
  } catch (error) {
    console.error(`Error processing webhook event ${payload.event}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function handlePaymentSucceeded(data: any) {
  console.log('Payment succeeded:', data);
  return { success: true, data: { orderId: data.orderId, status: 'paid' } };
}

async function handlePaymentFailed(data: any) {
  console.log('Payment failed:', data);
  return { success: true, data: { orderId: data.orderId, status: 'failed' } };
}

async function handleAppointmentCreated(data: any) {
  console.log('Appointment created:', data);
  return { success: true, data: { appointmentId: data.id } };
}

async function handleAppointmentUpdated(data: any) {
  console.log('Appointment updated:', data);
  return { success: true, data: { appointmentId: data.id } };
}

async function handleAppointmentCancelled(data: any) {
  console.log('Appointment cancelled:', data);
  return { success: true, data: { appointmentId: data.id } };
}

async function handleOrderCreated(data: any) {
  console.log('Order created:', data);
  return { success: true, data: { orderId: data.id } };
}

async function handleOrderUpdated(data: any) {
  console.log('Order updated:', data);
  return { success: true, data: { orderId: data.id } };
}

async function handleOrderCompleted(data: any) {
  console.log('Order completed:', data);
  return { success: true, data: { orderId: data.id } };
}

async function handleOrderCancelled(data: any) {
  console.log('Order cancelled:', data);
  return { success: true, data: { orderId: data.id } };
}

async function handleUserCreated(data: any) {
  console.log('User created:', data);
  return { success: true, data: { userId: data.id } };
}

async function handleUserUpdated(data: any) {
  console.log('User updated:', data);
  return { success: true, data: { userId: data.id } };
}

async function handleSubscriptionCreated(data: any) {
  console.log('Subscription created:', data);
  return { success: true, data: { subscriptionId: data.id } };
}

async function handleSubscriptionUpdated(data: any) {
  console.log('Subscription updated:', data);
  return { success: true, data: { subscriptionId: data.id } };
}

async function handleSubscriptionCancelled(data: any) {
  console.log('Subscription cancelled:', data);
  return { success: true, data: { subscriptionId: data.id } };
}

async function handleEmailDelivered(data: any) {
  console.log('Email delivered:', data);
  return { success: true, data: { emailId: data.id } };
}

async function handleEmailBounced(data: any) {
  console.log('Email bounced:', data);
  return { success: true, data: { emailId: data.id } };
}

async function handleEmailOpened(data: any) {
  console.log('Email opened:', data);
  return { success: true, data: { emailId: data.id } };
}

async function handleEmailClicked(data: any) {
  console.log('Email clicked:', data);
  return { success: true, data: { emailId: data.id } };
}

function verifyWebhookSignature(
  _payload: string,
  signature: string,
  _secret: string
): boolean {
  try {

    return signature.startsWith('sha256=');
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

function calculateAverageProcessingTime(): number {
  if (webhookLogs.length === 0) return 0;
  
  const totalTime = webhookLogs.reduce((sum, log) => sum + log.processingTime, 0);
  return Math.round(totalTime / webhookLogs.length);
}

function calculateEventCounts(): Array<{ event: string; count: number }> {
  const eventCounts: Record<string, number> = {};
  
  webhookLogs.forEach((log) => {
    eventCounts[log.event] = (eventCounts[log.event] || 0) + 1;
  });

  return Object.entries(eventCounts)
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count);
}
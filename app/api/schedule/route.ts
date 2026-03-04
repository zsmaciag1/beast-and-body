import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER = 'jen.beastandbody@gmail.com';

function generateConfirmationNumber(): string {
  return `BB-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ['serviceType', 'firstName', 'lastName', 'email', 'phone', 'preferredDate', 'preferredTime', 'serviceAddress', 'city', 'state'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const confirmationNumber = generateConfirmationNumber();
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' });

    const ownerHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <h2 style="color:#dc2626;">New Booking Request — ${confirmationNumber}</h2>
        <p style="color:#666;">Submitted: ${submittedAt} (Arizona)</p>

        <h3>Service</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Type</td><td style="padding:4px 8px;">${body.serviceType}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Date</td><td style="padding:4px 8px;">${body.preferredDate}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Time</td><td style="padding:4px 8px;">${body.preferredTime}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Location</td><td style="padding:4px 8px;">${body.serviceAddress}, ${body.city}, ${body.state}</td></tr>
          ${body.notes ? `<tr><td style="padding:4px 8px;font-weight:bold;">Notes</td><td style="padding:4px 8px;">${body.notes}</td></tr>` : ''}
        </table>

        <h3>Client</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Name</td><td style="padding:4px 8px;">${body.firstName} ${body.lastName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Email</td><td style="padding:4px 8px;">${body.email}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Phone</td><td style="padding:4px 8px;">${body.phone}</td></tr>
        </table>
      </div>
    `;

    const clientHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <h2 style="color:#dc2626;">Booking Request Received!</h2>
        <p>Hi ${body.firstName},</p>
        <p>We've received your booking request and will confirm within 24 hours.</p>

        <div style="background:#f9f9f9;border-left:4px solid #dc2626;padding:12px 16px;margin:20px 0;">
          <p style="margin:0;font-weight:bold;">Confirmation #: ${confirmationNumber}</p>
          <p style="margin:8px 0 0;">Service: ${body.serviceType}</p>
          <p style="margin:4px 0;">Requested Date: ${body.preferredDate} at ${body.preferredTime}</p>
          <p style="margin:4px 0;">Location: ${body.serviceAddress}, ${body.city}, ${body.state}</p>
        </div>

        <p>Questions? Reach us at <a href="mailto:jen.beastandbody@gmail.com">jen.beastandbody@gmail.com</a> or <a href="tel:+14802397486">480-239-7486</a>.</p>
        <p style="color:#666;font-size:0.9em;">— Beast &amp; Body Mobile Recovery</p>
      </div>
    `;

    const [ownerResult, clientResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'Beast & Body Bookings <noreply@beastandbody.co>',
        to: OWNER,
        subject: `New Booking: ${body.firstName} ${body.lastName} — ${body.preferredDate}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: 'Beast & Body Bookings <noreply@beastandbody.co>',
        to: body.email,
        subject: `Booking Request Received — ${confirmationNumber}`,
        html: clientHtml,
      }),
    ]);

    if (ownerResult.status === 'rejected') {
      throw ownerResult.reason;
    }

    if (clientResult.status === 'rejected') {
      console.warn('Client booking confirmation email failed:', clientResult.reason);
    }

    return NextResponse.json({ success: true, confirmationNumber, message: 'Appointment request submitted successfully.' }, { status: 201 });
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

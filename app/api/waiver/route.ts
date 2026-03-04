import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'jen.beastandbody@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = [
      'fullName', 'dob', 'email', 'phone', 'address', 'city', 'state',
      'emergencyContactName', 'emergencyContactPhone', 'signature', 'signatureDate',
    ];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!body.agreedToWaiver) {
      return NextResponse.json({ error: 'You must agree to the waiver to submit.' }, { status: 400 });
    }

    const isEquine = body.clientType === 'equine' || body.clientType === 'both';
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' });

    const ownerHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <h2 style="color:#dc2626;">New Waiver Submission</h2>
        <p style="color:#666;">Submitted: ${submittedAt} (Arizona)</p>

        <h3>Client Information</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Name</td><td style="padding:4px 8px;">${body.fullName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Date of Birth</td><td style="padding:4px 8px;">${body.dob}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Email</td><td style="padding:4px 8px;">${body.email}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Phone</td><td style="padding:4px 8px;">${body.phone}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Address</td><td style="padding:4px 8px;">${body.address}, ${body.city}, ${body.state} ${body.zip || ''}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Client Type</td><td style="padding:4px 8px;">${body.clientType}</td></tr>
        </table>

        <h3>Emergency Contact</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Name</td><td style="padding:4px 8px;">${body.emergencyContactName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Phone</td><td style="padding:4px 8px;">${body.emergencyContactPhone}</td></tr>
        </table>

        ${isEquine ? `
        <h3>Equine Information</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Horse Name</td><td style="padding:4px 8px;">${body.horseName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Breed</td><td style="padding:4px 8px;">${body.horseBreed}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Age</td><td style="padding:4px 8px;">${body.horseAge} years</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Relationship</td><td style="padding:4px 8px;">${body.ownerRelationship}</td></tr>
        </table>
        ` : ''}

        <h3>Medical History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Conditions</td><td style="padding:4px 8px;">${body.conditions?.length ? body.conditions.join(', ') : 'None reported'}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Medications</td><td style="padding:4px 8px;">${body.medications || 'None'}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold;">Previous Cryo</td><td style="padding:4px 8px;">${body.previousCryo || 'Not specified'}</td></tr>
        </table>

        <h3>Agreements</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;font-weight:bold;">Agreed to Waiver</td><td style="padding:4px 8px;">${body.agreedToWaiver ? '✅ Yes' : '❌ No'}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:4px 8px;font-weight:bold;">Agreed to Risks</td><td style="padding:4px 8px;">${body.agreedToRisks ? '✅ Yes' : '❌ No'}</td></tr>
          ${isEquine ? `<tr><td style="padding:4px 8px;font-weight:bold;">Equine Release</td><td style="padding:4px 8px;">${body.agreedToEquine ? '✅ Yes' : '❌ No'}</td></tr>` : ''}
        </table>

        <h3>Digital Signature</h3>
        <p style="font-style:italic;font-size:1.1em;border-bottom:1px solid #ccc;padding-bottom:8px;">${body.signature}</p>
        <p style="color:#666;font-size:0.9em;">Signed on: ${body.signatureDate}</p>
      </div>
    `;

    const clientHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <h2 style="color:#dc2626;">Your Waiver is on File</h2>
        <p>Hi ${body.fullName},</p>
        <p>This confirms that Beast &amp; Body Mobile Recovery has received your signed liability waiver. You're all set for your session!</p>

        <div style="background:#f9f9f9;border-left:4px solid #dc2626;padding:12px 16px;margin:20px 0;">
          <p style="margin:0;font-weight:bold;">Summary</p>
          <p style="margin:4px 0;">Name: ${body.fullName}</p>
          <p style="margin:4px 0;">Signed: ${body.signatureDate}</p>
          <p style="margin:4px 0;">Client Type: ${body.clientType}</p>
        </div>

        <p>Your waiver is valid for all future sessions. No need to sign again unless your medical history changes.</p>
        <p>Questions? Reach us at <a href="mailto:jen.beastandbody@gmail.com">jen.beastandbody@gmail.com</a> or <a href="tel:+14802397486">480-239-7486</a>.</p>
        <p style="color:#666;font-size:0.9em;">— Beast &amp; Body Mobile Recovery</p>
      </div>
    `;

    // Send to owner (critical) and client (best-effort) in parallel
    const [ownerResult, clientResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'Beast & Body Waivers <noreply@beastandbody.co>',
        to: RECIPIENT,
        subject: `New Waiver: ${body.fullName} — ${new Date().toLocaleDateString()}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: 'Beast & Body Waivers <noreply@beastandbody.co>',
        to: body.email,
        subject: 'Your Beast & Body Waiver is Confirmed',
        html: clientHtml,
      }),
    ]);

    if (ownerResult.status === 'rejected') {
      throw ownerResult.reason;
    }

    if (clientResult.status === 'rejected') {
      console.warn('Client confirmation email failed (domain not yet verified):', clientResult.reason);
    }

    return NextResponse.json({ success: true, message: 'Waiver submitted successfully.' }, { status: 201 });
  } catch (err) {
    console.error('Waiver API error:', err);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

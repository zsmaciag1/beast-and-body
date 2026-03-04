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

    await resend.emails.send({
      from: 'Beast & Body Waivers <onboarding@resend.dev>',
      to: RECIPIENT,
      subject: `New Waiver: ${body.fullName} — ${new Date().toLocaleDateString()}`,
      html: `
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
      `,
    });

    return NextResponse.json({ success: true, message: 'Waiver submitted successfully.' }, { status: 201 });
  } catch (err) {
    console.error('Waiver API error:', err);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

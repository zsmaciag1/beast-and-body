import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'appointments.json');

function generateConfirmationNumber(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `BB-${digits}`;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readAppointments(): object[] {
  ensureDataDir();
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAppointments(data: object[]) {
  ensureDataDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const required = ['serviceType', 'firstName', 'lastName', 'email', 'phone', 'preferredDate', 'preferredTime', 'serviceAddress', 'city', 'state'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const confirmationNumber = generateConfirmationNumber();
    const appointment = {
      id: crypto.randomUUID(),
      confirmationNumber,
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...body,
    };

    const appointments = readAppointments();
    appointments.push(appointment);
    writeAppointments(appointments);

    return NextResponse.json(
      { success: true, confirmationNumber, message: 'Appointment request submitted successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Schedule API error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = readAppointments();
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (err) {
    console.error('Schedule GET error:', err);
    return NextResponse.json({ error: 'Could not retrieve appointments.' }, { status: 500 });
  }
}

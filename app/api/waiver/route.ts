import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'waivers.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readWaivers(): object[] {
  ensureDataDir();
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeWaivers(data: object[]) {
  ensureDataDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ['fullName', 'dob', 'email', 'phone', 'address', 'city', 'state', 'emergencyContactName', 'emergencyContactPhone', 'signature', 'signatureDate'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!body.agreedToWaiver) {
      return NextResponse.json(
        { error: 'You must agree to the waiver to submit.' },
        { status: 400 }
      );
    }

    const waiver = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...body,
    };

    const waivers = readWaivers();
    waivers.push(waiver);
    writeWaivers(waivers);

    return NextResponse.json(
      { success: true, message: 'Waiver submitted and saved successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Waiver API error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const waivers = readWaivers();
    return NextResponse.json({ count: waivers.length, waivers }, { status: 200 });
  } catch (err) {
    console.error('Waiver GET error:', err);
    return NextResponse.json({ error: 'Could not retrieve waivers.' }, { status: 500 });
  }
}

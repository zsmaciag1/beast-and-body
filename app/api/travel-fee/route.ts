import { NextRequest, NextResponse } from 'next/server';

// Beast & Body home base — New River, AZ 85086
const BASE_LAT = 33.9165;
const BASE_LON = -112.1076;
const BASE_ZIP = '85086';

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim();
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Invalid zip code' }, { status: 400 });
  }

  if (zip === BASE_ZIP) {
    return NextResponse.json({ miles: 0, fee: 0, waived: true });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&limit=1`,
      {
        headers: { 'User-Agent': 'BeastAndBody/1.0 (jen.beastandbody@gmail.com)' },
        next: { revalidate: 86400 }, // cache each zip for 24 hours
      }
    );
    const data = await res.json();
    if (!data.length) {
      return NextResponse.json({ error: 'Zip code not found' }, { status: 404 });
    }
    const miles = haversine(BASE_LAT, BASE_LON, parseFloat(data[0].lat), parseFloat(data[0].lon));
    const fee = Math.round(miles);
    return NextResponse.json({ miles: Math.round(miles * 10) / 10, fee, waived: fee === 0 });
  } catch {
    return NextResponse.json({ error: 'Failed to calculate distance' }, { status: 500 });
  }
}

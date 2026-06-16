import { NextResponse } from 'next/server';
import { fetchTimetable, TIMETABLE_SOURCES } from '@/lib/timetable';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchTimetable(TIMETABLE_SOURCES.saltiniu);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ currentHtml: '', upcomingHtml: '' });
  }
}

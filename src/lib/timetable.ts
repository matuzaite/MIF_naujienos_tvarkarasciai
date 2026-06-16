import { parse } from 'node-html-parser';

export interface TimetableData {
  currentHtml: string;
  upcomingHtml: string;
}

export const TIMETABLE_SOURCES = {
  didlaukio: 'https://tvarkarasciai.vu.lt/mif-i/lectures/',
  saltiniu:  'https://tvarkarasciai.vu.lt/mif-iii/lectures/',
  naugarduko:'https://tvarkarasciai.vu.lt/mif-ii/lectures/',
} as const;

export async function fetchTimetable(
  url: string = TIMETABLE_SOURCES.didlaukio,
): Promise<TimetableData> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    const html = await res.text();
    const root = parse(html);
    return {
      currentHtml: root.querySelector('#first-col tbody')?.innerHTML ?? '',
      upcomingHtml: root.querySelector('#second-col tbody')?.innerHTML ?? '',
    };
  } catch (e) {
    console.error('Timetable fetch error:', e);
    return { currentHtml: '', upcomingHtml: '' };
  }
}

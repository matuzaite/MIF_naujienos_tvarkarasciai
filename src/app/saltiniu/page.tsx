import { fetchNews } from '@/lib/news';
import LocationDisplay from '@/components/LocationDisplay/LocationDisplay';
import styles from '../page.module.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SaltiniuPage() {
  let news: any[] = [];
  try {
    news = await fetchNews();
  } catch (e) {
    console.error('Duomenų gavimo klaida:', e);
  }

  return (
    <main className={styles.main}>
      <LocationDisplay
        initialNews={news}
        timetableApiPath="/api/timetable/saltiniu"
        locationName="MIF – Šaltinių g. 1A"
      />
    </main>
  );
}

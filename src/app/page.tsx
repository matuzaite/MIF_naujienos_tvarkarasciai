import Sidebar from '@/components/Sidebar/Sidebar';
import NewsCarousel from '@/components/NewsCarousel/NewsCarousel';
import styles from './page.module.css';
import { fetchNews } from '@/lib/news';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let news: any[] = [];
  try {
    news = await fetchNews();
  } catch (e) {
    console.error("Duomenų gavimo klaida:", e);
  }

  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.contentArea}>
        <NewsCarousel initialItems={news} />
      </div>
    </main>
  );
}
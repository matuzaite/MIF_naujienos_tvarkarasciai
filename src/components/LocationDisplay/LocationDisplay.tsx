'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import NewsCarousel from '@/components/NewsCarousel/NewsCarousel';
import TimetableView from '@/components/TimetableView/TimetableView';
import styles from './LocationDisplay.module.css';

const NEWS_MS     = 4 * 60 * 1000; // 4 minutes
const TIMETABLE_MS = 2 * 60 * 1000; // 2 minutes

interface Props {
  initialNews: any[];
  timetableApiPath: string;
  locationName: string;
}

export default function LocationDisplay({ initialNews, timetableApiPath, locationName }: Props) {
  const [showTimetable, setShowTimetable] = useState(false);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const schedule = (timetable: boolean) => {
      id = setTimeout(() => {
        const next = !timetable;
        setShowTimetable(next);
        schedule(next);
      }, timetable ? TIMETABLE_MS : NEWS_MS);
    };
    schedule(false);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <Sidebar />
      <div className={styles.contentArea}>
        <NewsCarousel initialItems={initialNews} />
      </div>
      {showTimetable && (
        <TimetableView apiPath={timetableApiPath} locationName={locationName} />
      )}
    </>
  );
}

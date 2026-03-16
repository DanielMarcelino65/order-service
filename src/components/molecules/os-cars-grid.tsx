'use client';
import { getAllOS } from '@/app/actions/os';
import { OsCard } from '../atoms/os-card';
import { useEffect } from 'react';
import { revalidatePath } from 'next/cache';

type OsCardsGridProps = {
  osList: Awaited<ReturnType<typeof getAllOS>>;
};

export default function OsCardsGrid({ osList }: OsCardsGridProps) {
  useEffect(() => {
    revalidatePath('/');
  }, []);
  return (
    <div className="grid mt-5 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {osList.data &&
        osList.data.map((os) => <OsCard key={os.id} serviceOrder={os} />)}
    </div>
  );
}

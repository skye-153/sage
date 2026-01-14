'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import UniversitiesTable from '@/components/universities/universities-table';
import { getUniversities } from '@/lib/localStorage';
import type { University } from '@/lib/types';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    const data = getUniversities();
    setUniversities(data);

    // Extract all unique column names and order them
    if (data.length > 0) {
      const allKeys = new Set<string>();
      data.forEach(uni => {
        Object.keys(uni).forEach(key => allKeys.add(key));
      });

      const preferredOrder = ['name', 'Country', 'City', 'QS Ranking', 'Public/Private', 'Acceptance Rate', 'Tuition Fees (USD)'];
      const nonTableKeys = new Set(['id', 'details', 'headerImage', 'knowMore']);

      const filteredKeys = Array.from(allKeys).filter(key => !nonTableKeys.has(key));
      filteredKeys.sort((a, b) => {
        const indexA = preferredOrder.indexOf(a);
        const indexB = preferredOrder.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
      });

      setHeaders(filteredKeys);
    }
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Explore Universities
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse our curated list of international universities. Click on a university's name for more details.
          </p>
        </div>
        <UniversitiesTable universities={universities} headers={headers} basePath="/universities" />
      </div>
    </MainLayout>
  );
}


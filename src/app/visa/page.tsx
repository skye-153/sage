'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import DataTable from '@/components/universities/universities-table';
import { getPageData } from '@/lib/localStorage';

export default function VisaPage() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    const items = getPageData('visas');
    setData(items);
    if (items.length > 0) {
      setHeaders(Object.keys(items[0]).filter(k => k !== 'id' && k !== 'knowMore'));
    }
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Visa Assistance
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Simplify your visa application process. Click on a visa guide for detailed instructions and requirements.
          </p>
        </div>
        <DataTable items={data} headers={headers} basePath="/visa" />
      </div>
    </MainLayout>
  );
}

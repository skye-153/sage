'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPageData } from '@/lib/localStorage';

export default function VisaDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const data = getPageData('visas');
      setItem(data.find((d: any) => d.id === id) || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!item) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/visa">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Visa Assistance
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Visa Guide not found</h1>
            <p className="text-muted-foreground">The visa guide you're looking for doesn't exist.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article>
        <div className="bg-gradient-to-b from-primary/10 to-transparent py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              {item.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4 md:px-6">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/visa">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Visa Assistance
            </Link>
          </Button>

          {item.knowMore ? (
            <Card>
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: item.knowMore }} />
              </CardContent>
            </Card>
          ) : (
            <p className="text-muted-foreground">No additional information available.</p>
          )}
        </div>
      </article>
    </MainLayout>
  );
}

'use client';

import Image from 'next/image';
import { getUniversityById } from '@/lib/localStorage';
import MainLayout from '@/components/layout/main-layout';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UniversityPage() {
  const params = useParams();
  const id = params?.id as string;
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const uni = getUniversityById(id);
      setUniversity(uni);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/universities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Universities
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">University not found</h1>
            <p className="text-muted-foreground">The university you're looking for doesn't exist.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Get dynamic properties to display as badges
  const dynamicProperties = Object.keys(university).filter(
    key => !['id', 'name', 'details', 'headerImage', 'knowMore'].includes(key)
  );

  return (
    <MainLayout>
      <article>
        <div className="relative h-[40vh] min-h-[300px] w-full">
          {university.headerImage && (
            <Image
              src={university.headerImage}
              alt={`Header image for ${university.name}`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 container">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-lg">
              {university.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Button variant="outline" asChild className="mb-8">
              <Link href="/universities">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Universities
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2 mb-8">
              {dynamicProperties.map(key => (
                <Badge key={key} variant="secondary" className="text-sm">
                  <span className="font-semibold mr-1.5">{key}:</span> {university[key]}
                </Badge>
              ))}
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {university.knowMore && <TabsTrigger value="knowmore">Know More</TabsTrigger>}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {university.details && (
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline"
                    dangerouslySetInnerHTML={{ __html: university.details }}
                  />
                )}
              </TabsContent>

              {university.knowMore && (
                <TabsContent value="knowmore" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline"
                        dangerouslySetInnerHTML={{ __html: university.knowMore }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}

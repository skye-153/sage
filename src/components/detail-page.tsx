'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/main-layout';

interface DetailPageProps {
  id: string;
  getData: (id: string) => any | null;
  basePath: string;
  title: string;
  imageField?: string;
  fieldsToExclude?: string[];
}

export default function DetailPage({
  id,
  getData,
  basePath,
  title,
  imageField = 'headerImage',
  fieldsToExclude = ['id', 'name', 'details', 'headerImage', 'knowMore'],
}: DetailPageProps) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const data = getData(id);
      setItem(data);
      setLoading(false);
    }
  }, [id, getData]);

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
            <Link href={basePath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">{title} not found</h1>
            <p className="text-muted-foreground">
              The {title.toLowerCase()} you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const dynamicProperties = Object.keys(item).filter(
    key => !fieldsToExclude.includes(key)
  );

  return (
    <MainLayout>
      <article>
        {/* Header Image */}
        {item[imageField] && (
          <div className="relative h-[40vh] min-h-[300px] w-full">
            <Image
              src={item[imageField]}
              alt={`Header image for ${item.name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 container">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-lg">
                {item.name}
              </h1>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto py-8 px-4 md:px-6">
          <Button variant="outline" asChild className="mb-8">
            <Link href={basePath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          {dynamicProperties.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dynamicProperties.map(key => (
                    <div key={key}>
                      <p className="text-sm font-medium text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-semibold">
                        {String(item[key])}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs for content sections */}
          {(item.details || item.knowMore) && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                {item.details && <TabsTrigger value="overview">Overview</TabsTrigger>}
                {item.knowMore && <TabsTrigger value="details">Details</TabsTrigger>}
              </TabsList>

              {item.details && (
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.details }}
                        className="leading-relaxed"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {item.knowMore && (
                <TabsContent value="details" className="mt-6">
                  <Card>
                    <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.knowMore }}
                        className="leading-relaxed"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </article>
    </MainLayout>
  );
}

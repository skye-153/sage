import Image from 'next/image';
import { getUniversityById } from '@/lib/firebase/firestore';
import MainLayout from '@/components/layout/main-layout';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type UniversityPageProps = {
  params: {
    id: string;
  };
};

export default async function UniversityPage({ params }: UniversityPageProps) {
  const university = await getUniversityById(params.id);

  if (!university) {
    notFound();
  }

  // Get dynamic properties to display as badges
  const dynamicProperties = Object.keys(university).filter(
    key => !['id', 'name', 'details', 'headerImage'].includes(key)
  );

  return (
    <MainLayout>
      <article>
        <div className="relative h-[40vh] min-h-[300px] w-full">
          <Image
            src={university.headerImage}
            alt={`Header image for ${university.name}`}
            fill
            className="object-cover"
            priority
          />
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

                <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline"
                    dangerouslySetInnerHTML={{ __html: university.details }}
                />
            </div>
        </div>
      </article>
    </MainLayout>
  );
}

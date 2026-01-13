import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Globe, Home as HomeIcon, Landmark, Shield } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';

const featureCards = [
  {
    icon: <Globe className="size-8 text-primary" />,
    title: 'Global Universities',
    description: 'Explore a curated list of top universities from around the world.',
    link: '/universities',
  },
  {
    icon: <Landmark className="size-8 text-primary" />,
    title: 'Financial Guidance',
    description: 'Navigate tuition, scholarships, and living costs with our expert advice.',
    link: '/finances',
  },
  {
    icon: <HomeIcon className="size-8 text-primary" />,
    title: 'Accommodation',
    description: 'Find the perfect place to live, from dorms to private apartments.',
    link: '/accommodation',
  },
  {
    icon: <Shield className="size-8 text-primary" />,
    title: 'Visa Assistance',
    description: 'Simplify the visa application process with our step-by-step guides.',
    link: '/visa',
  },
];

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === "hero-home");
  return (
    <MainLayout>
      <div className="flex flex-col">
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
           {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />}
          <div className="relative z-20 container px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              SAGE Explorer
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-neutral-200">
              Your Compass for International Education. Discover universities,
              navigate finances, and plan your study abroad journey with
              confidence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/universities">
                  Explore Universities <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  About The SAGE Committee
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  The Student Affairs and Guidance Exchange (SAGE) Committee is
                  dedicated to fostering international relations and supporting
                  students in their pursuit of global educational
                  opportunities. We provide comprehensive resources and
                  personalized guidance to help you navigate every step of your
                  study abroad adventure.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  From selecting the right university to handling visa
                  applications and securing accommodation, our goal is to make
                  your transition seamless and successful.
                </p>
              </div>
              <div className="flex items-center justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <div className="p-8 bg-primary/20 rounded-full">
                        <BookOpen className="size-24 text-primary" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                How We Help
              </h2>
              <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
                We provide end-to-end support for your study abroad journey.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((feature, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <Button variant="link" asChild className="mt-4 text-primary">
                        <Link href={feature.link}>Learn More <ArrowRight className="ml-2 size-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

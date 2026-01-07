import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { materials } from '@/lib/mock-data';
import MaterialCard from '@/components/materials/material-card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-home');
  const featuredMaterials = materials.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Build Your Dream Home
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            Your one-stop platform for high-quality construction materials from
            verified suppliers.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/materials">
              Browse Materials <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-2xl font-semibold">
                Reliable Delivery
              </h3>
              <p className="mt-2 text-muted-foreground">
                Fast and dependable delivery to your construction site.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-2xl font-semibold">
                Verified Suppliers
              </h3>
              <p className="mt-2 text-muted-foreground">
                Source materials only from trusted and verified partners.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Bot className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-2xl font-semibold">
                AI Recommendations
              </h3>
              <p className="mt-2 text-muted-foreground">
                Get smart material suggestions tailored to your project needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Materials Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Featured Materials
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/materials">
                View All Materials <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Recommender CTA */}
      <section className="bg-secondary/50 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl font-bold">
            Not Sure What You Need?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Let our AI-powered tool recommend the best materials for your
            project based on your specific requirements and budget.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/recommendations">
              Get Recommendations <Bot className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

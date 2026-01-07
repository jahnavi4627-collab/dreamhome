import RecommendationForm from '@/components/recommendations/recommendation-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RecommendationsPage() {
    const bgImage = PlaceHolderImages.find((img) => img.id === 'recommendation-bg');
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover"
                data-ai-hint={bgImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 py-12">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-headline text-4xl font-bold text-white">
                AI Material Recommender
                </h1>
                <p className="mt-4 text-xl text-gray-200">
                Describe your project, and our AI will suggest the best materials for the job.
                </p>
            </div>
            <div className="mt-10">
                <RecommendationForm />
            </div>
        </div>
    </div>
  );
}

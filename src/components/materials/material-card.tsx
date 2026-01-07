import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Material } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface MaterialCardProps {
  material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === material.imageUrlId);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={material.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <span className="text-sm text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2">
          {material.category}
        </Badge>
        <CardTitle className="font-headline text-xl">{material.name}</CardTitle>
        <CardDescription className="mt-2 text-lg font-semibold text-primary">
          ${material.price.toFixed(2)}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            / {material.unit}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          {/* Link will eventually go to /materials/[id] */}
          <Link href="#">View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

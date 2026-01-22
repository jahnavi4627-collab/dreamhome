import Image from 'next/image';
import { materials, suppliers } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { notFound } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export default function MaterialDetailPage({ params }: { params: { id: string } }) {
  const material = materials.find((m) => m.id === params.id);

  if (!material) {
    notFound();
  }

  const supplier = suppliers.find((s) => s.id === material.supplierId);
  const image = PlaceHolderImages.find((img) => img.id === material.imageUrlId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={material.name}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <span className="text-sm text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        
        <div>
          <Badge variant="secondary" className="mb-2">{material.category}</Badge>
          <h1 className="font-headline text-4xl font-bold">{material.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{material.description}</p>

          <div className="mt-6">
            <p className="text-4xl font-bold text-primary">
              ₹{material.price.toFixed(2)}{' '}
              <span className="text-lg font-normal text-muted-foreground">
                / {material.unit}
              </span>
            </p>
          </div>
          
          {supplier && (
            <p className="mt-4 text-md text-muted-foreground">
              Sold by: <span className="font-semibold text-foreground">{supplier.name}</span>
            </p>
          )}

          <div className="mt-8">
            <Button size="lg">
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {Object.entries(material.specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-semibold w-1/3">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

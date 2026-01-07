import { materials } from '@/lib/mock-data';
import MaterialCard from '@/components/materials/material-card';
import { Input } from '@/components/ui/input';

export default function MaterialsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">
          Construction Materials
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our extensive catalog of high-quality materials.
        </p>
      </div>
      <div className="my-8 flex justify-center">
        <div className="w-full max-w-md">
          <Input type="search" placeholder="Search for materials..." />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}

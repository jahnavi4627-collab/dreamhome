'use client';

import { useState, useEffect } from 'react';
import { materials } from '@/lib/mock-data';
import MaterialCard from '@/components/materials/material-card';
import { Input } from '@/components/ui/input';
import type { Material } from '@/lib/types';

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMaterials, setFilteredMaterials] =
    useState<Material[]>(materials);

  useEffect(() => {
    const filtered = materials.filter((material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [searchQuery]);

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
          <Input
            type="search"
            placeholder="Search for materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted-foreground">
          <h2 className="font-headline text-2xl font-semibold">
            No Materials Found
          </h2>
          <p className="mt-2">
            Your search for "{searchQuery}" did not match any materials.
          </p>
        </div>
      )}
    </div>
  );
}

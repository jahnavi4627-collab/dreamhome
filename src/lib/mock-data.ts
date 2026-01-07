import type { Material, Supplier } from './types';

export const suppliers: Supplier[] = [
  { id: 'sup1', name: 'BuildWell Inc.', location: 'New York, NY', rating: 4.5 },
  { id: 'sup2', name: 'Quality Concrete Co.', location: 'Los Angeles, CA', rating: 4.8 },
  { id: 'sup3', name: 'SteelStrong', location: 'Chicago, IL', rating: 4.2 },
];

export const materials: Material[] = [
  {
    id: 'mat1',
    name: 'Portland Cement',
    description: 'High-quality Type I Portland cement for general construction purposes. Ideal for concrete, mortar, and stucco.',
    price: 1280,
    unit: 'bag (94 lbs)',
    supplierId: 'sup2',
    category: 'Foundation',
    imageUrlId: 'cement',
    specifications: {
      'Compressive Strength': '4000 psi @ 28 days',
      'Fineness': '370 m²/kg',
    },
  },
  {
    id: 'mat2',
    name: 'Red Clay Bricks',
    description: 'Durable and classic red clay bricks for exterior walls, patios, and walkways.',
    price: 52,
    unit: 'brick',
    supplierId: 'sup1',
    category: 'Masonry',
    imageUrlId: 'bricks',
    specifications: {
      'Dimensions': '8" x 3.5" x 2.25"',
      'Grade': 'SW (Severe Weather)',
    },
  },
  {
    id: 'mat3',
    name: 'Steel Rebar #4',
    description: 'Grade 60 steel reinforcement bar to add strength and stability to concrete structures.',
    price: 1000,
    unit: '20-foot length',
    supplierId: 'sup3',
    category: 'Structural',
    imageUrlId: 'steel-rebar',
    specifications: {
      'Diameter': '0.5 inch',
      'Tensile Strength': '90,000 psi',
    },

  },
  {
    id: 'mat4',
    name: 'Porcelain Floor Tiles',
    description: 'Elegant and durable porcelain tiles for a modern finish in kitchens and bathrooms.',
    price: 280,
    unit: 'sq. ft.',
    supplierId: 'sup1',
    category: 'Finishing',
    imageUrlId: 'tiles',
    specifications: {
      'Size': '12" x 24"',
      'PEI Rating': '4 (Moderate to heavy traffic)',
    },
  },
  {
    id: 'mat5',
    name: 'Douglas Fir Lumber',
    description: 'Versatile and strong lumber for framing, sheathing, and other structural applications.',
    price: 700,
    unit: '2x4 - 8ft',
    supplierId: 'sup1',
    category: 'Framing',
    imageUrlId: 'lumber',
    specifications: {
      'Grade': '#2 & Btr',
      'Moisture Content': '19% or less',
    },
  },
  {
    id: 'mat6',
    name: 'PVC Pipe Schedule 40',
    description: 'Durable PVC pipe for drainage, waste, and vent applications.',
    price: 736,
    unit: '1.5-in x 10-ft',
    supplierId: 'sup2',
    category: 'Plumbing',
    imageUrlId: 'pvc-pipes',
    specifications: {
      'Type': 'DWV (Drain, Waste, Vent)',
      'Max Pressure': '140 psi',
    },
  },
];

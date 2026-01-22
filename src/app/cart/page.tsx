'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Review items in your cart before placing an order.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <ShoppingCart className="h-24 w-24 text-muted" />
          <h2 className="mt-6 font-headline text-2xl font-semibold">Your Cart is Empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any materials yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/materials">Browse Materials</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <ul className="divide-y">
                        {cartItems.map((item) => {
                            const image = PlaceHolderImages.find(
                                (img) => img.id === item.imageUrlId
                            );
                            return (
                                <li key={item.id} className="flex items-center gap-6 p-6">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                        {image ? (
                                            <Image
                                            src={image.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-secondary">
                                                <span className="text-xs text-muted-foreground">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-headline text-lg font-semibold">
                                            <Link href={`/materials/${item.id}`}>{item.name}</Link>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {item.category}
                                        </p>
                                        <p className="mt-1 text-lg font-semibold text-primary">
                                            ₹{item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            className="h-8 w-14 text-center"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>₹{(total * 0.1).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{(total * 1.1).toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">Proceed to Checkout</Button>
                </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}

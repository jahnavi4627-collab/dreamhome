'use client';

import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Order Placed!',
        description:
          'Thank you for your purchase. Your materials are on the way.',
      });
      clearCart();
      router.push('/orders');
      setIsPlacingOrder(false);
    }, 1500);
  };

  if (cartItems.length === 0 && !isPlacingOrder) {
    return (
      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Checkout</h1>
        <p className="mt-4 text-lg text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/materials">Browse Materials</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Shipping & Payment
              </CardTitle>
              <CardDescription>
                Please enter your details to complete the order.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" placeholder="123 Construction Ave" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Buildville" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="90210" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & Fees</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}

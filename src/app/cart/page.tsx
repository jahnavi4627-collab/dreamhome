import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Review items in your cart before placing an order.
        </p>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <ShoppingCart className="h-24 w-24 text-muted" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">Your Cart is Empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added any materials yet.</p>
      </div>
    </main>
  );
}

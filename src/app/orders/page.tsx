import { Package } from "lucide-react";

export default function OrdersPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">My Orders</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Track the status of your past and current orders.
        </p>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <Package className="h-24 w-24 text-muted" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">No Orders Found</h2>
        <p className="mt-2 text-muted-foreground">You haven't placed any orders yet.</p>
      </div>
    </main>
  );
}

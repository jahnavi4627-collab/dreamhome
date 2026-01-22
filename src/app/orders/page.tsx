'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Package } from 'lucide-react';
import type { Order } from '@/lib/types';
import OrderCard from '@/components/orders/order-card';

export default function OrdersPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const ordersQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/orders`),
      orderBy('orderDate', 'desc')
    );
  }, [user, firestore]);

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  if (isUserLoading || isLoading) {
    return (
      <main className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-muted-foreground">Loading Your Orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">My Orders</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Track the status of your past and current orders.
        </p>
      </div>

      {orders && orders.length > 0 ? (
        <div className="mt-12 space-y-8 max-w-4xl mx-auto">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <Package className="h-24 w-24 text-muted" />
          <h2 className="mt-6 font-headline text-2xl font-semibold">No Orders Found</h2>
          <p className="mt-2 text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      )}
    </main>
  );
}

'use client';

import Image from 'next/image';
import { useUser, useFirestore, useCollection, useMemoFirebase, errorEmitter } from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import type { Order, OrderItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const orderItemsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/orders/${order.id}/orderItems`);
  }, [user, firestore, order.id]);

  const { data: orderItems, isLoading: itemsLoading } = useCollection<OrderItem>(orderItemsQuery);

  const handleStatusChange = (newStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled') => {
    if (!user) return;
    const orderRef = doc(firestore, `users/${user.uid}/orders/${order.id}`);
    const updateData = { status: newStatus };

    updateDoc(orderRef, updateData)
      .then(() => {
        toast({
          title: 'Order Status Updated',
          description: `Order #${order.id.slice(0, 6)}... is now ${newStatus}.`,
        });
      })
      .catch((error) => {
        console.error("Error updating order status: ", error);
        const permissionError = new FirestorePermissionError({
          path: orderRef.path,
          operation: 'update',
          requestResourceData: updateData
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          title: 'Update Failed',
          description: 'Could not update the order status.',
          variant: 'destructive'
        });
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-500/80';
      case 'shipped': return 'bg-blue-500 hover:bg-blue-500/80';
      case 'delivered': return 'bg-green-500 hover:bg-green-500/80';
      case 'cancelled': return 'bg-red-500 hover:bg-red-500/80';
      default: return 'bg-gray-500 hover:bg-gray-500/80';
    }
  }

  const orderDate = order.orderDate?.toDate ? order.orderDate.toDate().toLocaleDateString() : 'N/A';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Order #{order.id.slice(0, 6)}...</CardTitle>
            <CardDescription>Placed on {orderDate}</CardDescription>
          </div>
          <div className="text-right">
             <Badge className={`text-white border-transparent ${getStatusColor(order.status)}`}>{order.status}</Badge>
            <p className="font-bold text-lg mt-1">₹{order.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {itemsLoading ? (
           <p className="text-muted-foreground">Loading items...</p>
        ) : (
          <div className="space-y-4">
            {orderItems?.map((item) => {
              const image = PlaceHolderImages.find(img => img.id === item.imageUrlId);
              return (
              <div key={item.id} className="flex items-center gap-4">
                 <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
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
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                 <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            )})}
          </div>
        )}
      </CardContent>
       <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
        <span className="text-sm text-muted-foreground">Update Order Status:</span>
         <Select onValueChange={(value) => handleStatusChange(value as any)} defaultValue={order.status}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {/* A user can only cancel an order that is pending */}
                {order.status === 'pending' && <SelectItem value="cancelled">Cancelled</SelectItem>}
                {/* These are statuses typically updated by a supplier, but enabled here for demo */}
                <SelectItem value="pending" disabled={order.status !== 'pending'}>Pending</SelectItem>
                <SelectItem value="shipped" disabled={order.status === 'delivered' || order.status === 'cancelled'}>Shipped</SelectItem>
                <SelectItem value="delivered" disabled={order.status === 'cancelled'}>Delivered</SelectItem>
            </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
}

'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Briefcase, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <main className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-muted-foreground">Loading Dashboard...</p>
        </div>
      </main>
    );
  }

  if (user && !userProfile) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <h2 className="mt-6 font-headline text-2xl font-semibold">Could not load user profile.</h2>
          <p className="mt-2 text-muted-foreground">Please try logging out and in again.</p>
        </div>
      </main>
    );
  }
  
  const userType = userProfile ? (userProfile as any).userType : '';

  return (
    <main className="container mx-auto py-12 px-4">
      {userType === 'supplier' ? (
        <>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold">Supplier Dashboard</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your materials and orders.
            </p>
          </div>
           <div className="mt-16 flex flex-col items-center justify-center text-center">
            <Briefcase className="h-24 w-24 text-muted" />
            <h2 className="mt-6 font-headline text-2xl font-semibold">Welcome, Supplier!</h2>
            <p className="mt-2 text-muted-foreground">Your supplier tools are coming soon.</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Welcome, {userProfile ? (userProfile as any).firstName : 'User'}!
            </p>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <UserIcon className="h-24 w-24 text-muted" />
            <h2 className="mt-6 font-headline text-2xl font-semibold">Welcome!</h2>
            <p className="mt-2 text-muted-foreground">Your dashboard is under construction.</p>
          </div>
        </>
      )}
    </main>
  );
}

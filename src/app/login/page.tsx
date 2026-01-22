'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Login failed',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful!',
        description: "You're now logged in.",
      });
    } catch (error: any) {
      let description = 'An unknown error occurred.';
      if (error.code === 'auth/invalid-credential') {
        description = 'Invalid email or password. Please try again.';
      } else {
        description = error.message;
      }
      toast({
        title: 'Login failed',
        description,
        variant: 'destructive',
      });
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

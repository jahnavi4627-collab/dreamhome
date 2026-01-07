import { Briefcase } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold">Supplier Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your materials and orders.
        </p>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <Briefcase className="h-24 w-24 text-muted" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2 text-muted-foreground">Please log in as a supplier to view this page.</p>
      </div>
    </main>
  );
}

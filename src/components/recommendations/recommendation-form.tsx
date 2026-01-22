'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { getRecommendations, State } from '@/app/recommendations/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RecommendationCard from './recommendation-card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Get Recommendations
    </Button>
  );
}

export default function RecommendationForm() {
  const initialState: State = { message: null, recommendations: null, success: false };
  const [state, dispatch] = useActionState(getRecommendations, initialState);

  return (
    <div>
        <Card className="max-w-2xl mx-auto bg-background/90 backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Project Details</CardTitle>
            </CardHeader>
            <form action={dispatch}>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Input
                        id="projectType"
                        name="projectType"
                        placeholder="e.g., Residential, Commercial"
                    />
                    {state.errors?.projectType && (
                        <p className="text-sm text-destructive">{state.errors.projectType[0]}</p>
                    )}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="budget">Budget (INR)</Label>
                    <Input
                        id="budget"
                        name="budget"
                        type="number"
                        placeholder="e.g., 4000000"
                    />
                    {state.errors?.budget && (
                        <p className="text-sm text-destructive">{state.errors.budget[0]}</p>
                    )}
                    </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"
                    placeholder="e.g., San Francisco, CA"
                />
                {state.errors?.location && (
                    <p className="text-sm text-destructive">{state.errors.location[0]}</p>
                )}
                </div>
                <div className="space-y-2">
                <Label htmlFor="specificNeeds">Specific Needs</Label>
                <Textarea
                    id="specificNeeds"
                    name="specificNeeds"
                    placeholder="e.g., Eco-friendly materials, high-durability for coastal area"
                />
                {state.errors?.specificNeeds && (
                    <p className="text-sm text-destructive">{state.errors.specificNeeds[0]}</p>
                )}
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
            </form>
        </Card>

        <div className="max-w-4xl mx-auto mt-10">
            {state.message && !state.recommendations && (
                <Alert variant={state.success ? 'default' : 'destructive'} className="bg-background">
                    <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            {state.recommendations && state.recommendations.length > 0 && (
            <div className="space-y-6">
                 <h2 className="text-center font-headline text-3xl font-bold text-white">Our Recommendations</h2>
                {state.recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
                ))}
            </div>
            )}
        </div>
    </div>
  );
}

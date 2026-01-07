import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { MaterialRecommendationOutput } from '@/ai/flows/material-recommendation';

type Recommendation = MaterialRecommendationOutput['recommendations'][0];

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="bg-background/90 backdrop-blur-sm transition-all hover:bg-background/100">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-2xl">{recommendation.materialName}</CardTitle>
                <CardDescription className="text-sm">
                Supplied by: <span className="font-semibold text-primary">{recommendation.supplier}</span>
                </CardDescription>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-primary">${recommendation.approximateCost.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Approx. Cost</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{recommendation.description}</p>
      </CardContent>
    </Card>
  );
}

"use client"

import React from "react";
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { CardHeader, CardTitle } from './ui/card';

export function FeatureCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          
          <CardTitle></CardTitle>

        </CardHeader>
        <CardContent>

          <CardDescription></CardDescription>
          
        </CardContent>
      </Card>
    </div>
  );
}

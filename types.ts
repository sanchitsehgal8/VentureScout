export interface MarketAnalysis {
  tam: number; // Billions
  sam: number; // Billions
  som: number; // Billions
  currency: string;
  growthRate: string;
  insight: string;
}

export interface Competitor {
  name: string;
  description: string;
  strength: string;
  weakness: string;
}

export interface GtmStep {
  phase: string;
  action: string;
  channel: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface PricingStrategy {
  model: string;
  recommendation: string;
  tiers: PricingTier[];
}

export interface ICP {
  role: string;
  industry: string;
  companySize: string;
  painPoints: string[];
}

export interface VentureReport {
  ideaSummary: string;
  marketAnalysis: MarketAnalysis;
  competitors: Competitor[];
  gaps: string[];
  gtmStrategy: GtmStep[];
  pricing: PricingStrategy;
  icp: ICP;
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  report: VentureReport | null;
  error?: string;
}
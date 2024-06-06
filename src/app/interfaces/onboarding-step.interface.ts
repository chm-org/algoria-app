export interface OnboardingText {
  headline?: string;
  description: string;
}

export interface OnboardingStep {
  text: OnboardingText[];
  imageUrl?: string;
  imageAlt?: string;
}

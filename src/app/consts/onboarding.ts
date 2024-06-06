import { OnboardingStep } from "../interfaces/onboarding-step.interface";

export const PREFACE: OnboardingStep = {
  text: [
    {
      headline: 'PREFACE.DESCRIPTION',
      description: 'PREFACE.DESCRIPTION_TEXT',
    },
    {
      headline: 'PREFACE.GOAL',
      description: 'PREFACE.GOAL_DETAILS',
    }
  ],
  imageUrl: '../../assets/algoria.png',
  imageAlt: 'castle, dragons above it and knights on horses',
};

export const ONBOARDING: OnboardingStep[] = [
  {
    text: [
      {
        description: 'ONBOARDING.STEP1.PARAGRAPH1'
      }
    ],
    imageUrl: '../../assets/evil_wizard.png',
    imageAlt: 'man in black coat and pointed hat with a sword'
  },
  {
    text: [
      {
        description: 'ONBOARDING.STEP2.PARAGRAPH1'
      }
    ],
    imageUrl: '../../assets/hero.png',
    imageAlt: 'man in in a hoodie with a hood and a sword'
  }
]

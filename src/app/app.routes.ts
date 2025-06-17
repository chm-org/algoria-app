import { inject } from "@angular/core";
import { Router, Routes } from '@angular/router';
import { ChallengeComponent } from './components/challenges/challenge/challenge.component';
import { CongratulationsComponent } from "./components/congratulations/congratulations.component";
import { DeviceWarningComponent } from "./components/device-warning/device-warning.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";
import { MapComponent } from './components/map/map.component';
import { WorldComponent } from './components/world/world.component';
import { UserRepository } from './services/user.repository';
import { challengesResolver } from './services/challenges.resolver';
import { expectationsResolver } from './services/expectations.resolver';
import { indexesResolver } from './services/indexes.resolver';


const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|opera mobi/i.test(userAgent);

  return isMobile;
}

function getOnboardingCompleted(userRepo: UserRepository) {
  const user = userRepo.user();

  return user.isOnboardingCompleted;
}

function ensureOnboardingCompletion() {
  return () => {
    const router = inject(Router)
    const userRepo = inject(UserRepository)

    // new users should be redirected to onboarding
    if (!getOnboardingCompleted(userRepo)) {
      return router.parseUrl('/')
    }

    return true;
  };
}

export const routes: Routes = [
  {
    path: '',
    title: 'Algoria',
    component: HomeScreenComponent, // for onboarding
    canActivate: [
      () => {
        const router = inject(Router)
        const userRepo = inject(UserRepository)

        if (isMobile()) {
          router.parseUrl('/device-warning')
        }

        // onboarded users should be redirected to the map
        if (getOnboardingCompleted(userRepo)) {
          return router.parseUrl('/world')
        }

        return true
      }
    ]
  },
  {
    path: 'world',
    component: WorldComponent, // main navigation component
    canActivate: [
      ensureOnboardingCompletion()
    ],
    resolve: {
      challenges: challengesResolver,
      indexes: indexesResolver,
      expectations: expectationsResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MapComponent
      },
      {
        path: 'challenge/:id',
        component: ChallengeComponent, // editor view for code-writing challenges
      },
    ]
  },
  {
    path: 'device-warning',
    component: DeviceWarningComponent,
    title: 'Desktop only'
  },
  {
    path: 'congratulations',
    component: CongratulationsComponent,
    title: 'congratulations'
  }
];

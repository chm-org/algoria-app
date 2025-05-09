import { inject } from "@angular/core";
import { Router, Routes } from '@angular/router';
import { ChallengeComponent } from './components/challenges/challenge/challenge.component';
import { CongratulationsComponent } from "./components/congratulations/congratulations.component";
import { DeviceWarningComponent } from "./components/device-warning/device-warning.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";
import { MapComponent } from './components/map/map.component';
import { challengesResolver } from './services/challenges.resolver';
import { indexesResolver } from './services/indexes.resolver';
import { UserService } from './services/user.service';


const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|opera mobi/i.test(userAgent);

  return isMobile;
}

function getOnboardingCompleted(userService: UserService) {
  const user = userService.getUser();

  return user()?.isOnboardingCompleted;
}

function ensureOnboardingCompletion() {
  return () => {
    const router = inject(Router)
    const userService = inject(UserService)

    // new users should be redirected to onboarding
    if (!getOnboardingCompleted(userService)) {
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
        const userService = inject(UserService)

        if (isMobile()) {
          router.parseUrl('/device-warning')
        }

        // onboarded users should be redirected to the map
        if (getOnboardingCompleted(userService)) {
          return router.parseUrl('/map')
        }

        return true
      }
    ]
  },
  {
    path: 'map',
    component: MapComponent, // main navigation component
    canActivate: [
      ensureOnboardingCompletion()
    ],
    resolve: {
      challenges: challengesResolver,
      indexes: indexesResolver,
    }
  },
  {
    path: 'challenge/:id',
    component: ChallengeComponent, // editor view for code-writing challenges
    canActivate: [
      ensureOnboardingCompletion()
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

import { inject } from "@angular/core";
import { Router, Routes } from '@angular/router';
import { ChallengeComponent } from './components/challenges/challenge/challenge.component';
import { CongratulationsComponent } from "./components/congratulations/congratulations.component";
import { DeviceWarningComponent } from "./components/device-warning/device-warning.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";
import { MapComponent } from './components/map/map.component';
import { challengesResolver } from './services/challenges.resolver';
import { indexesResolver } from './services/indexes.resolver';


const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|opera mobi/i.test(userAgent);

  return isMobile;
}

export const routes: Routes = [
  {
    path: '',
    title: 'Algoria',
    component: HomeScreenComponent, // for onboarding
    canActivate: [
      () => {
        const router = inject(Router)

        // TODO: pass only un-onboarded users, redirect others to the map
        return isMobile() ? router.parseUrl('/device-warning') : true
      }
    ]
  },
  {
    path: 'map',
    component: MapComponent, // main navigation component
    resolve: {
      challenges: challengesResolver,
      indexes: indexesResolver,
    }
  },
  {
    path: 'challenge/:id',
    component: ChallengeComponent, // editor view for code-writing challenges
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

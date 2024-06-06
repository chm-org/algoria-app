import { inject } from "@angular/core";
import { Router, Routes } from '@angular/router';
import { CongratulationsComponent } from "./components/congratulations/congratulations.component";
import { DeviceWarningComponent } from "./components/device-warning/device-warning.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";


const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|opera mobi/i.test(userAgent);

  return isMobile;
}

export const routes: Routes = [
  {
    path: '',
    title: 'Algoria',
    component: HomeScreenComponent,
    canActivate: [
      () => {
        const router = inject(Router)

        return isMobile() ? router.parseUrl('/device-warning') : true
      }
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

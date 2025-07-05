import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { REPO_PAGE_URL } from "../../consts/common";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-congratulations',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss'
})
export class CongratulationsComponent implements AfterViewInit {
  readonly repoPageUrl = REPO_PAGE_URL;

  private confettiElements: HTMLElement[] = [];
  private readonly confettiDuration = 8000;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.createConfetti();
    this.stopConfettiAfterTimeout();
  }

  createConfetti(): void {
    const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = this.renderer.createElement('div');
      this.renderer.addClass(confetti, 'confetti');
      this.renderer.setStyle(
        confetti,
        'backgroundColor',
        confettiColors[Math.floor(Math.random() * confettiColors.length)]
      );
      this.renderer.setStyle(confetti, 'left', `${Math.random() * 100}vw`);
      this.renderer.setStyle(confetti, 'animationDelay', `${Math.random() * 2}s`);

      this.renderer.appendChild(this.elementRef.nativeElement, confetti);

      // keep the reference so we can remove it later
      this.confettiElements.push(confetti);
    }
  }

  private stopConfettiAfterTimeout(): void {
    setTimeout(() => {
      this.confettiElements.forEach(el => {
        this.renderer.removeChild(this.elementRef.nativeElement, el);
      });
      this.confettiElements.length = 0; // clear the array
      this.changeDetectorRef.markForCheck();
    }, this.confettiDuration);
  }

  onStartOver() {
    this.userService.pruneUserData();
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-device-warning',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './device-warning.component.html',
  styleUrl: './device-warning.component.scss'
})
export class DeviceWarningComponent {

}

import { Component } from '@angular/core';
import { MockBackendService } from '../../services/data-service/mock.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MockBackendService ]
})
export class AppComponent {
  isDarkTheme: boolean = false;

  constructor(private mockBackendService: MockBackendService) {
    this.mockBackendService.start();
  }


}

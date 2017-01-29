import { Component } from '@angular/core';
import { DataService } from '../../services/data-service/data.service';
import { MapperService } from '../../services/mapper-service/mapper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app works!';

  constructor(private dataService: DataService, private mapperService: MapperService) {

  }


}

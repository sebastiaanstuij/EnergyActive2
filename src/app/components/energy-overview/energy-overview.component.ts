import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energy-overview',
  templateUrl: './energy-overview.component.html',
  styleUrls: ['./energy-overview.component.scss']
})
export class EnergyOverviewComponent implements OnInit {
  text: String = 'overview';

  constructor() {

  }

  ngOnInit() {
  }

}

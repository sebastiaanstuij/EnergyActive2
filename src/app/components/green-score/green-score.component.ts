import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-green-score',
  templateUrl: './green-score.component.html',
  styleUrls: ['./green-score.component.scss']
})
export class GreenScoreComponent implements OnInit {
  text = 'test2';
  constructor() { }

  ngOnInit() {
  }

}

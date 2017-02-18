import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pea',
  templateUrl: './my-pea.component.html',
  styleUrls: ['./my-pea.component.scss']
})
export class MyPeaComponent implements OnInit {
  text: String = 'MyPea';

  constructor() {

  }

  ngOnInit() {
  }

}

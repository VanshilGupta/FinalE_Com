import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  g = "hello"
  constructor() { }

  ngOnInit() {
    console.log(`Hi and ${this.g}`)
  }

}

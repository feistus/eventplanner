import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // get all happenings and sort by nearest first
    // if no happenings are currently coming, show default view
    // if site is navigated by token, show only happenings, the invitation is active for
  }

}

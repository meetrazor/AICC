import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {
  countDownDate: number;
  now: number;
  distance: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  breadCrumbItems: any;
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' },
    { label: 'Comming-Soon', path: '/', active: true }];
    this.countDownDate = new Date('Dec 31, 2020 00:00:00').getTime();
    this.now = new Date().getTime();
    this.timer();
  }
  timer() {
    const x = setInterval(() => {
      this.now = new Date().getTime();
      this.distance = this.countDownDate - this.now;
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    }, 1000);

  }

}

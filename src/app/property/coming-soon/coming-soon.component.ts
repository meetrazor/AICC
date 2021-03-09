import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  countDownDate: number;
  now: number;
  distance: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  constructor() { }

  ngOnInit() {
    this.countDownDate = new Date('May 30, 2021 00:00:00').getTime();
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

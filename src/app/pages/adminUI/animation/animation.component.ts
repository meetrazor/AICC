import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})

/**
 * Animation component - handling the animation with sidebar and content
 */
export class AnimationComponent implements OnInit {
  // bread crumb data
  breadCrumbItems: Array<{}>;

  // animation class
  animatedClass: string;
  constructor() { }
  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Admin UI', path: '/' }, { label: 'Animation', path: '/', active: true }];
  }

  /**
   * Select animation from option
   * @param event selected animation
   */
  selectOption(event: any) {
    this.animatedClass = 'animated ' + event.target.value;
    setTimeout(() => {
      this.animatedClass = null;
    }, 3000);
  }
}

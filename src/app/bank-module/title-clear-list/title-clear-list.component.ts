import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-clear-list',
  templateUrl: './title-clear-list.component.html',
  styleUrls: ['./title-clear-list.component.scss']
})
export class TitleClearListComponent implements OnInit {
  breadCrumbItems: any;
  constructor() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Title Clear', path: '', active: true }];
  }

  ngOnInit() {
  }

}

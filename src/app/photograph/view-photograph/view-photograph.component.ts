import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-photograph',
  templateUrl: './view-photograph.component.html',
  styleUrls: ['./view-photograph.component.scss']
})
export class ViewPhotographComponent implements OnInit {
  @Input() propertyId: number;
  propertyID: number;
  isLoading: boolean;
  count: number = 0;
  constructor() { }

  ngOnInit() {
    this.isLoading = false;
    this.propertyID = this.propertyId;
  }
  refresh() {
    this.count++;
  }
}

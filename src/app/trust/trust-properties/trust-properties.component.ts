import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trust-properties',
  templateUrl: './trust-properties.component.html',
  styleUrls: ['./trust-properties.component.scss']
})
export class TrustPropertiesComponent implements OnInit {
  @Input() trustID: number;
  constructor() { }

  ngOnInit() {

  }

}

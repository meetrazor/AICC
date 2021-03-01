import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})

/**
 * FAQs component - handling the faqs with sidebar and content
 */
export class FaqsComponent implements OnInit {

  // bread crumb data
  breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Extras', path: '/' }, { label: 'FAQs', path: '/', active: true }];
  }

}

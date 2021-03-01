import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

/**
 * Invoice component - handling the invoice with sidebar and content
 */
export class InvoiceComponent implements OnInit {

  // bread crumb data
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Minton', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Invoice', path: '/', active: true }];

  }

}

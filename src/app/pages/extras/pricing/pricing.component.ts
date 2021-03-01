import { Component, OnInit } from '@angular/core';

import { pricingData } from './data';

import { Pricing } from './pricing.model';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

/**
 * Pricing component - handling the pricing with sidebar and content
 */
export class PricingComponent implements OnInit {

  // bread crumb data
  breadCrumbItems: Array<{}>;

  // Pricing data
  pricingData: Pricing[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Pricing', path: '/', active: true }];

    /**
     * fetches data
     */
    this. _fetchData();
  }

  /**
   * Fetches the pricing data
   */
  private _fetchData() {
    // Pricing Data
    this.pricingData = pricingData;
  }
}

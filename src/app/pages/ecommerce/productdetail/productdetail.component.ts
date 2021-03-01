import { Component, OnInit } from '@angular/core';

import { Product } from './productdetail.model';

import { productData } from './data';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})

/**
 * Product-detail component - handling the product-detail with sidebar and content
 */
export class ProductdetailComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  productData: Product[];
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'eCommerce', path: '/' }, { label: 'Product Detail', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }

  /**
   * fethces product value
   */
  private _fetchData() {
    this.productData = productData;
  }
}

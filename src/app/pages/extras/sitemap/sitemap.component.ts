import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})

/**
 * Sitemap component - handling the sitemap with sidebar and content
 */
export class SitemapComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Sitemap', path: '/', active: true }];
  }

}

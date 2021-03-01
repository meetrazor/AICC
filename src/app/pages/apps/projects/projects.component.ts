import { Component, OnInit } from '@angular/core';

import { Projects } from './projects.model';

import { projectData } from './data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

/**
 * Projects component - handling the projects with sidebar and content
 */
export class ProjectsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  projectData: Projects[];
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Apps', path: '/' }, { label: 'Projects', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches project value
   */
  private _fetchData() {
    this.projectData = projectData;
  }
}

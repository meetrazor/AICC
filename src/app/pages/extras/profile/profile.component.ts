import { Component, OnInit } from '@angular/core';

import { Project, Inbox } from './profile.model';

import { projectData, inboxData } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Profile component - handling the profile with sidebar and content
 */
export class ProfileComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Projects table
  projectData: Project[];

  inboxData: Inbox[];
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Profile', path: '/', active: true }];
    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the profile value
   */
  private _fetchData() {
    this.projectData = projectData;

    this.inboxData = inboxData;
  }
}

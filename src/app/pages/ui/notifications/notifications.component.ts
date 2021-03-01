import { Component, OnInit } from '@angular/core';

import { AlertColor } from './notifications.model';

import { alertData } from './data';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

/**
 * Notifications component - handling the notifications with sidebar and content
 */
export class NotificationsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Alert data
  alertData: AlertColor[];
  alertData2: AlertColor[];
  customAlert: AlertColor[];

  // Toast Show
  show: boolean;
  toast2: boolean;
  toast3: boolean;
  toast4: boolean;
  toast5: boolean;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBOld', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Notifications', path: '/', active: true }];

    // Toast value
    this.show = true;
    this.toast2 = true;
    this.toast3 = true;
    this.toast4 = true;
    this.toast5 = true;

    /**
     * fetch Data
     */
    this._fetchData();
  }

  /**
   * Close the alert
   * @param alert fetch the alert for close
   */
  // tslint:disable-next-line: no-shadowed-variable
  close(alert: AlertColor, alertData: AlertColor[]) {
    alertData.splice(alertData.indexOf(alert), 1);
  }

  /**
   * Close the first toast
   */
  closeToast() {
    this.show = false;
  }

  /**
   * Close the second toast
   */
  closeToast1() {
    this.toast2 = false;
  }

  /**
   * Close the third toast
   */
  closeToast2() {
    this.toast3 = false;
  }

  /**
   * Close the forth toast
   */
  closeToast3() {
    this.toast4 = false;
  }

  /**
   * Close the fifth toast
   */
  closeToast4() {
    this.toast5 = false;
  }

  /**
   * Fetches the Alert data
   */
  private _fetchData() {
    // Alert Data value fetch
    this.alertData = [...alertData];
    this.alertData2 = [...alertData];
    this.customAlert = [...alertData];
  }
}

import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})

/**
 * Modals component - handling the modals with sidebar and content
 */
export class ModalsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'UI Elements', path: '/' }, { label: 'Modals', path: '/', active: true }];
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content);
  }

  /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: string) {
    this.modalService.open(largeDataModal, { size: 'lg' });
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  smallModal(smallDataModal: string) {
    this.modalService.open(smallDataModal, { size: 'sm' });
  }

  /**
   * Open center modal
   * @param centerDataModal center modal data
   */
  centerModal(centerDataModal: string) {
    this.modalService.open(centerDataModal, { centered: true });
  }

  /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
  scrollModal(scrollDataModal: string) {
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  /**
   * Full width modal open
   * @param fullWidthData full width modal data
   */
  fullWidth(fullWidthData: string) {
    this.modalService.open(fullWidthData, {windowClass: 'modal-full'});
  }

  /**
   * Responsive modal open
   * @param responsiveData responsive modal data
   */
  responsiveModal(responsiveData: string) {
    this.modalService.open(responsiveData);
  }

  /**
   * Accordion modal open
   * @param accordionData accordion modal data
   */
  accordionModal(accordionData: string) {
    this.modalService.open(accordionData);
  }

}

import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Contacts } from './contacts.model';

import { contactData } from './data';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})

/**
 * Contacts component - handling the contacts with sidebar and content
 */
export class ContactsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  submitted: boolean;
  term: any;
  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedContactData: Array<Contacts>;
  contacts: Array<Contacts>;
  // validation form
  validationform: FormGroup;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder) {

  }
  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Contacts', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });

    /**
     * Fetches Data
     */
    this._fetchData();
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }
  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * save the contacts data
   */
  saveData() {
    const name = this.validationform.get('name').value;
    const phone = this.validationform.get('phone').value;
    const location = this.validationform.get('location').value;
    const email = this.validationform.get('email').value;
    const currentDate = new Date();
    if (this.validationform.valid) {

      this.contacts.push({
        image: 'assets/images/users/user-1.jpg',
        name,
        phone,
        location,
        email,
        date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()
      });
      this.validationform = this.formBuilder.group({
        name: '',
        phone: '',
        location: '',
        email: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    this.totalSize = this.contacts.length + 1;
    this.paginatedContactData = this.contacts.slice(this.startIndex, this.endIndex);
  }

  /**
   * Pagination onpage change
   * @param page show the page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.contacts.slice(this.startIndex, this.endIndex);
  }

  private _fetchData() {

    this.contacts = contactData;
    // apply pagination
    this.startIndex = 0;
    this.endIndex = this.pageSize;

    this.paginatedContactData = this.contacts.slice(this.startIndex, this.endIndex);
    this.totalSize = this.contacts.length;
  }
}

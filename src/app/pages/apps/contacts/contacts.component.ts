import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Contact } from './contacts.model';

import { contactData } from './data';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

/**
 * Contacts component - handling the Contact with sidebar and content
 */
export class ContactsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  submitted: boolean;

  // validation form
  validationform: FormGroup;
  // page number
  page = 1;
  // default page size
  pageSize = 6;

  // start and end index
  startIndex = 1;
  endIndex = 6;
  totalSize = 0;
  // Team data
  paginatedContactData: Array<Contact>;
  contacts: Array<Contact>;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Apps', path: '/' }, { label: 'Contacts', path: '/', active: true }];
    /**
     * Model data validation
     */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
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
   * save the team member data
   */
  saveData() {
    const name = this.validationform.get('name').value;
    const position = this.validationform.get('position').value;
    const email = this.validationform.get('email').value;

    if (this.validationform.valid) {
      this.contacts.push({
        user: 'assets/images/users/user-1.jpg',
        name,
        position,
        email,
      });
      this.validationform = this.formBuilder.group({
        name: '',
        position: '',
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
    console.log('page', page);

    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.contacts.slice(this.startIndex, this.endIndex);
  }
  /**
   * fetches the contact value
   */
  private _fetchData() {
    // Team Data
    this.contacts = contactData;


    // apply pagination
    this.startIndex = 0;
    this.endIndex = this.pageSize;

    this.paginatedContactData = this.contacts.slice(this.startIndex, this.endIndex);
    this.totalSize = this.contacts.length;
  }
}

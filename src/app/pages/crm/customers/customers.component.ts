import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customers } from './customers.model';

import { customersData } from './data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/**
 * Customers component - handling the customer with sidebar and content
 */
export class CustomersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  paginatedData: Array<Customers>;
  customersData: Customers[];
  submitted: boolean;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  // validation form
  validationform: FormGroup;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Customers', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });

    /**
     * fetches data
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
      this.customersData.push({
        image: 'assets/images/users/user-1.jpg',
        name,
        phone,
        location,
        email,
        date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear(),
        status: 'Active'
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
    this.totalSize = this.customersData.length + 1;
    this.paginatedData = this.customersData.slice(this.startIndex, this.endIndex);
  }

  /**
   * paginatio onchange event
   * @param page page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedData = this.customersData.slice(this.startIndex, this.endIndex);
  }
  /**
   * fetches the customer value
   */
  private _fetchData() {
    this.customersData = customersData;

    // apply pagination
    this.startIndex = 0;
    this.endIndex = this.pageSize;

    this.paginatedData = this.customersData.slice(this.startIndex, this.endIndex);
    this.totalSize = this.customersData.length;
  }
}

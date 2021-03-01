import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Leads, ChartType } from './leads.model';

import { leadsData, leadsBarChart } from './data';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})

/**
 * Leads component - handling the leads with sidebar and content
 */
export class LeadsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  leadsData: Leads[];
  leadsBarChart: ChartType;
  submitted: boolean;

  // validation form
  validationform: FormGroup;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Leads', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
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
   * save the Opportunities data
   */
  saveData() {
    const name = this.validationform.get('name').value;
    const category = this.validationform.get('category').value;
    const location = this.validationform.get('location').value;
    const currentDate = new Date();
    if (this.validationform.valid) {

      this.leadsData.push({
        company: 'assets/images/companies/amazon.png',
        name,
        category,
        location,
        date: currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear()
      });
      this.validationform = this.formBuilder.group({
        name: '',
        category: '',
        location: '',

      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  /**
   * fetches the leads value
   */
  private _fetchData() {
    this.leadsData = leadsData;
    this.leadsBarChart = leadsBarChart;
  }
}

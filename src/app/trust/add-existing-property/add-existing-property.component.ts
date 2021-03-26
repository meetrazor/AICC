import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-existing-property',
  templateUrl: './add-existing-property.component.html',
  styleUrls: ['./add-existing-property.component.scss']
})
export class AddExistingPropertyComponent implements OnInit {
  trustID: number;
  breadCrumbItems: Array<any>;
  data = [
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 1 },
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 2 },
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 3 },
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 4 },
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 5 },
    { propertyName: "Property Name", location: "jamnagar , jamnagar , jamnagar", surveyno: "212p2", tp: '2121', id: 6 },
  ]
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  constructor(private route: ActivatedRoute) {
    this.trustID = this.route.snapshot.params.trustID;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Trusts', path: 'AICC/trust' },
    { label: `Trust Name`, path: `/trust/view/${this.trustID}` }, { label: `Add Existing Property`, path: '/', active: true }];
  }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      responsive: true,
      columns: [{
        title: 'Sr.No.',
        data: null, render: (data, type, row, meta) => {
          return meta.row + 1;
        },
      },
      {
        title: "Property Name",
        data: "propertyName",

      },
      {
        title: "Location",
        data: "location",
      },
      {
        title: "Survey No",
        data: "surveyno",
      },
      {
        title: "TP/FP No",
        data: "tp",
      },
      {
        title: "Action",
        data: null,
        render(data) {
          return `<div style="display:flex">
            <a title="View This Property" viewpropertyID="${data.id}">
            <i class="btn font-18 mdi mdi-eye-check text-secondary" viewpropertyID="${data.id}"></i></a></div>`;
        },
      },
      ],
      // columnDefs: [{
      //   targets: [2],
      //   visible: true,

      // }]
    };
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
}

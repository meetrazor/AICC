import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trust-list',
  templateUrl: './trust-list.component.html',
  styleUrls: ['./trust-list.component.scss']
})
export class TrustListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser: any;
  constructor(private service: GeneralService, private renderer: Renderer2, private router: Router, private datepipe: DatePipe) {
    this.currentUser = this.service.getcurrentUser();
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Trust', path: '/', active: true }];
  }

  ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/list/${this.currentUser.UserID}`
      },
      responsive: true,
      columns: [
        {
          title: "Name",
          data: "TrustName",

        },
        {
          title: "Reg.No.",
          data: "RegistrationORNondhniNo",
        },
        {
          title: "Date of Reg.",
          data: "RegistrationDate",
          render: (data) => {
            return this.datepipe.transform(data, 'MMM dd, yyyy')
          }
        }, {
          title: 'Phone No',
          data: 'TrustPhoneNo'
        },
        {
          title: 'Email ID',
          data: 'TrustEmailId'
        },
        {
          title: "Action",
          data: null,
          render(data) {
            return `<div style="display:flex">
            <a title="View Trust" >
            <i class="btn font-18 mdi mdi-eye-check text-secondary" viewTrustID="${data.TrustID}"></i></a> </div>`;
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
    this.renderer.listen("document", "click", (event) => {

      if (event.target.hasAttribute("viewTrustID")) {
        this.router.navigate([
          "trust/view-trust/" + event.target.getAttribute("viewTrustID"),
        ]);
      }
      if (event.target.hasAttribute("editTrustID")) {
        this.router.navigate([
          "trust/edit/" + event.target.getAttribute("editTrustID"),
        ]);
      }
    });
  }
}

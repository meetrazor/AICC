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
  data = [
    { name: "Tiger Nixon", RegNo: "System Architect", DateofReg: "Edinburgh", id: 1 },
    { name: "Garrett Winters", RegNo: "Accountant", DateofReg: "	Tokyo", id: 2 },
    { name: "Ashton Cox", RegNo: "Junior Technical Author", DateofReg: "San Francisco", id: 3 },
    { name: "Cedric Kelly", RegNo: "Senior Javascript Developer", DateofReg: "Edinburgh", id: 4 },
    { name: "Airi Satou", RegNo: "Accountant", DateofReg: "Tokyo", id: 5 },
    { name: "Brielle Williamson", RegNo: "Integration Specialist", DateofReg: "New York", id: 6 }]
  breadCrumbItems: Array<{}>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  constructor(private service: GeneralService, private renderer: Renderer2, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Trust', path: '/', active: true }];
  }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      responsive: true,
      columns: [
        {
          title: "Name",
          data: "name",

        },
        {
          title: "Reg.No.",
          data: "RegNo",
        },
        {
          title: "Date of Reg.",
          data: "DateofReg",

        },
        {
          title: "Action",
          data: null,
          render(data) {
            return `<div style="display:flex">
            <a title="View Trust" >
            <i class="btn font-18 mdi mdi-eye-check text-secondary" viewTrustID="${data.id}"></i></a>
            <a title="Edit Trust">
            <i class="btn font-18 mdi mdi-account-edit text-secondary" editTrustID="${data.id}"></i></a> </div>`;
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
          "trust/view/" + event.target.getAttribute("viewTrustID"),
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

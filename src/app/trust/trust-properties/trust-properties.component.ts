import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trust-properties',
  templateUrl: './trust-properties.component.html',
  styleUrls: ['./trust-properties.component.scss']
})
export class TrustPropertiesComponent implements OnInit {
  @Input() trustID: number;
  isdropdownShow: boolean;
  @ViewChild('addPropertyForm', { static: true }) addPropertyForm;
  isLoading: boolean;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  constructor(private router: Router, private renderer: Renderer2, private service: GeneralService, private modalservice: NgbModal) {
    this.isdropdownShow = false;
  }

  ngOnInit() {
    this.isLoading = false;
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/property/view/${this.trustID}`
      },
      responsive: true,
      columns: [{
        title: 'Sr.No.',
        data: null, render: (data, type, row, meta) => {
          return meta.row + 1;
        },
      },
      {
        title: "Property Name",
        data: "PropertyName",

      },
      {
        title: "Location",
        data: null,
        render: (data) => {
          return `${data.DistrictName}, ${data.TalukaName}, ${data.VillageName}`
        }
      },
      {
        title: "Survey No",
        data: null,
        render: (data) => {
          return data.SurveyNo ? data.SurveyNo : data.CitySurveyNo
        }
      },
      {
        title: "TP/FP No",
        data: null,
        render: (data) => {
          return data.TPNo ? `${data.TPNo}/${data.FPNo} ` : ''
        }
      },
      {
        title: "Action",
        data: null,
        render(data) {
          return `<div style="display:flex">
          <a title="View This Property" viewpropertyID="${data.PropertyID}">
          <i class="btn font-18 mdi mdi-eye-check text-secondary" viewpropertyID="${data.PropertyID}"></i></a>
          <a title="Remove this Property" >
          <i removePropertyID="${data.PropertyID}" class="text-danger btn font-18 mdi mdi-minus-circle"></i></a></div>`;
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
      if (event.target.hasAttribute("viewpropertyID")) {
        this.router.navigate([
          "property/view/" + event.target.getAttribute("viewpropertyID"),
        ]);
      }
      if (event.target.hasAttribute("removePropertyID")) {
        this.isLoading = true;
        this.service.RemovePropertyFromTrust(this.trustID, event.target.getAttribute("removePropertyID")).subscribe((res) => {
          this.isLoading = false;
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.message,
              type: "error",
            });
            return;
          } else {
            Swal.fire({
              title: "Property Removed Successfully!",
              text: res.message,
              type: "success",
            }).then(() => {
              this.rerender()
            });
          }
        })
      }
    });
  }
  addProperty() {
    this.isdropdownShow = !this.isdropdownShow;
    this.modalservice.open(this.addPropertyForm, { windowClass: 'modal-full' })
  }
}

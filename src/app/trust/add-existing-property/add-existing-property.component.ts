import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-existing-property',
  templateUrl: './add-existing-property.component.html',
  styleUrls: ['./add-existing-property.component.scss']
})
export class AddExistingPropertyComponent implements OnInit {
  trustID: number;
  breadCrumbItems: Array<any>;
  currentUser: any
  IsLoading: boolean;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  constructor(private route: ActivatedRoute, private service: GeneralService, private renderer: Renderer2) {
    this.currentUser = this.service.getcurrentUser();
    this.trustID = this.route.snapshot.params.trustID;
    this.IsLoading = true;
    this.service.GetTrustinfo(this.trustID).subscribe((Res) => {
      this.IsLoading = false;
      this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Trusts', path: 'AICC/trust' },
      { label: Res.data.TrustName, path: `/trust/view-trust/${this.trustID}` }, { label: `Add Existing Property`, path: '/', active: true }];
    })

  }

  ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/property/select`
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
          return `<a title="Add this Property" 
          class="waves-effect waves-light"><i selectpropertyID="${data.PropertyID}" class="text-info p-2 mdi mdi-plus-circle"></i></a>`;
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
      if (event.target.hasAttribute("selectpropertyID")) {
        this.IsLoading = true;
        this.service.SelectExistingProperty(this.trustID, event.target.getAttribute("selectpropertyID"), this.currentUser.UserID).subscribe((res) => {
          this.IsLoading = false;
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.message,
              type: "error",
            });
            return;
          } else {
            Swal.fire({
              title: "Property Selected Successfully!",
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
}

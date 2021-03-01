import { async } from '@angular/core/testing';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, AfterViewInit {

  constructor(private service: GeneralService, private router: Router, private renderer: Renderer2) { }
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  @Input() item: any;
  @Output() isloading = new EventEmitter();
  isLoading: boolean;
  ngOnInit() {
    this.isLoading = true;
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/list/${this.service.getcurrentUser().UserID}/${this.item.StateID}` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Property Name', data: 'PropertyName'
        }, {
          title: 'City Survey No / Survey No ', data: null, render: (data) => {
            return data.CitySurveyNo ? data.CitySurveyNo : data.SurveyNo;
          }
        }, {
          title: 'Ownername(s)', data: 'PropertyOwner'
        }, {
          title: 'In-Charge Name(s)', data: 'PropertyIncharge'
        }, {
          title: 'Action', data: null, render(data) {
            return `<div style="display:flex">
            <a title="View Property" class=" viewProperty" >
            <i class="btn font-18 mdi mdi-eye-check text-secondary" viewpropertyID="${data.PropertyID}"></i></a>
            <a title="Edit Property" class=" editProperty">
            <i class="btn font-18 mdi mdi-account-edit text-secondary" editpropertyID="${data.PropertyID}"></i></a> </div>`;
          }
        }
      ],
      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1, 2, 3, 4] }],

      // rowCallback(row, data: any) {

      //   // let deleteBtn = '';
      //   // deleteBtn += '<a class="btn btn-danger deleteNotice m-1" title="Delete Notice" notice-id="' + data.content_temp_id + '">';
      //   // deleteBtn += '<i class="fa fa-trash" aria-hidden="false" notice-id="' + data.content_temp_id + '"></i>';
      //   // deleteBtn += '</a>';
      //   // tslint:disable-next-line: max-line-length
      // tslint:disable-next-line: max-line-length
      //   const viewBtn = '<button title="View Property" property-id=' + data.PropertyID + ' class="btn btn-primary mx-1 viewProperty" ><i class="mdi mdi-eye-check"></i></button>';
      //   // tslint:disable-next-line: max-line-length
      // tslint:disable-next-line: max-line-length
      //   const editBtn = '<button title="Edit Property" property-id=' + data.PropertyID + ' class="btn btn-secondary mx-1 editProperty" ><i class="mdi mdi-account-edit"></i></button>';

      //   // $('td:eq(6)', row).html(viewBtn + editBtn);
      // },
      // drawCallback: () => {
      //   $('.table .viewProperty').on('click', (e) => {
      //     const id = $(e.target).attr('property-id');
      //     console.log(e);
      //     if (id === undefined) {
      //       return false;
      //     } else {
      //       this.router.navigate([`property/view/${id}`]);
      //     }
      //   });
      //   $('.table .editProperty').on('click', (e) => {
      //     const id = $(e.target).attr('property-id');
      //     if (id === undefined) {
      //       return false;
      //     } else {
      //       this.router.navigate([`property/edit/${id}`]);
      //     }
      //   });
      // }
    };
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.isloading.emit(false);
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('viewpropertyID')) {
        this.router.navigate(['property/view/' + event.target.getAttribute('viewpropertyID')]);
      }
      if (event.target.hasAttribute('editpropertyID')) {
        this.router.navigate(['property/edit/' + event.target.getAttribute('editpropertyID')]);
      }
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  onDeleteProperty(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success mt-2',
      cancelButtonClass: 'btn btn-danger ml-2 mt-2',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.service.deleteProperty(id).subscribe((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Deleted!',
              text: res.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: res.error_code,
              text: res.message,
              type: 'error'
            });
          }
        }, (err) => {
          Swal.fire({
            title: 'Oops Something Wrong while deleting',
            text: err,
            type: 'error'
          });
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Opration Cancelled by User!',
          type: 'error'
        });
      }
    });
  }

  // onViewProperty(id) {
  //   console.log(id);
  //   this.router.navigate([`property/view/${id}`]);
  // }
  // onEditProperty(id) {
  //   console.log(id);
  //   this.router.navigate([`property/edit/${id}`]);
  // }
  testClick(id) {
    console.log(id);
  }
}

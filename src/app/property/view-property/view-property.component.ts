import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from "src/app/services/general.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: "app-view-property",
  templateUrl: "./view-property.component.html",
  styleUrls: ["./view-property.component.scss"],
})
export class ViewPropertyComponent implements OnInit {
  @Input() propertyId: number;
  @Input() data: any;
  loading: boolean;
  fileExtension: string = '';
  documentForm: FormGroup;
  submited: boolean = false;
  Loading: boolean = false;
  propertyType: any;
  Documenttyprs: Array<any>;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser: any;
  @ViewChild('DocumentForm', { static: true }) DocumentFormModal;
  constructor(private service: GeneralService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    this.loading = true;
    this.service.GetPropertyDocumentType().subscribe((res) => {
      this.Documenttyprs = res.data;
    })
    this.service.propertytype().subscribe((Res) => {
      this.loading = true;
      this.propertyType = Res.data.find(
        (item) => item.PropertyTypeID === this.data.PropertyTypeID
      );
      this.loading = false;
    });
    this.dtOptions = {
      ajax: {
        url: this.service.GetBaseUrl() + `property/${this.propertyId}/all/document/list`,
      },
      responsive: true,
      columns: [
        {
          title: "Sr No.",
          data: "row",
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },
        {
          title: "Documnet Name",
          data: "DocumnetType",
        },
        {
          title: "Action",
          data: null, render: (data) => {
            if (data.FileURL) {
              return `<a href="${data.FileURL}"><i class="mdi mdi-cloud-download font-18 text-primary"></i></a>`
            }
            return ''
          }
        },
      ],
    };
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  get a() {
    return this.documentForm.controls;
  }
  resetDocumentForm() {
    this.a.FileName.reset();
    this.a.FileType.reset();
    this.a.Description.reset();
    this.a.uploadfile.reset();
    this.a.PropertyDocumentTypeID.reset()
  }
  AddDocument() {
    this.initDocumentForm();
    this.modalService.open(this.DocumentFormModal);
  }
  initDocumentForm() {
    this.documentForm = new FormGroup({
      FileName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
      ]),
      PropertyDocumentTypeID: new FormControl(null, Validators.required),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID),
    });
  }
  onSaveDocumnt() {
    this.submited = true;
    if (this.documentForm.valid) {
      this.Loading = true;
      this.service.UploadPropertyDocumnent(this.propertyId, this.prepareSave(), '?FileExistenceCheck=1')
        .subscribe(
          (data) => {
            this.Loading = false;
            this.submited = false;
            if (data.error_code == 'ALREADY_EXISTS') {
              Swal.fire({
                title: data.error,
                text: 'You want to Replace this?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Replace it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success mt-2',
                cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                buttonsStyling: false
              }).then((result) => {
                if (result.value) {
                  this.Loading = true;
                  this.service.UploadPropertyDocumnent(this.propertyId, this.prepareSave(), '?FileExistenceCheck=0').subscribe((response) => {
                    this.Loading = false;
                    if (response.error) {
                      Swal.fire({
                        title: response.error_code,
                        text: response.error,
                        type: 'error'
                      });
                      return;
                    } else {
                      Swal.fire({
                        title: 'Document Added Successfully!',
                        text: response.message,
                        type: 'success'
                      }).then(() => {
                        this.rerender()
                        this.documentForm.controls.uploadfile.setValue([]);
                        this.modalService.dismissAll()
                      });
                    }
                  });

                } else if (
                  // Read more about handling dismissals
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire({
                    title: 'Cancelled',
                    text: 'Your file is safe :)',
                    type: 'error'
                  });
                }
              });
              return;
            } else {
              Swal.fire({
                title: 'Document Added Successfully!',
                text: data.message,
                type: 'success',
              }).then(() => {
                this.rerender()
                this.documentForm.controls.uploadfile.setValue([]);
                this.modalService.dismissAll();
              });
            }
          });
    }

  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  prepareSave(): any {
    const input = new FormData();
    input.append(
      'FileName',
      this.documentForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.documentForm.get('FileType').value);
    input.append('PropertyDocumentTypeID', this.documentForm.get('PropertyDocumentTypeID').value);
    input.append('Description', this.documentForm.get('Description').value);
    input.append('CreatedBy', this.documentForm.get('CreatedBy').value);
    input.append('uploadfile', this.documentForm.get('uploadfile').value[0]);
    return input;
  }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.a.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.a.FileType.setValue('');
      this.a.FileName.setValue('');
      this.a.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if (
      (filetype.toLowerCase() === 'image/jpeg' &&
        (extension.toLowerCase() === 'jpg' ||
          extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' &&
        extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' &&
        extension.toLowerCase() === 'png')
    ) {
      this.a.FileType.setValue('Photo');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === 'application/pdf' &&
      extension.toLowerCase() === 'pdf'
    ) {
      this.a.FileType.setValue('PDF');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.a.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error',
      });
    }
  }
}

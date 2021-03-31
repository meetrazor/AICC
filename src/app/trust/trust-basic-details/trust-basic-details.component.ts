import { GeneralService } from './../../services/general.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trust-basic-details',
  templateUrl: './trust-basic-details.component.html',
  styleUrls: ['./trust-basic-details.component.scss']
})
export class TrustBasicDetailsComponent implements OnInit {
  @Input() trustID: number;
  @ViewChild('DocumentForm', { static: true }) DocumentFormModal;
  documentForm: FormGroup;
  submited: boolean;
  Loading: boolean;
  Trustee = [];
  manager = [];
  ca = [];
  fileExtension: string;
  data = [
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 1 },
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 2 },
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 3 },
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 4 },
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 5 },
    { name: "Trust Document", fileType: "System Architect", desc: "Edinburgh", URL: 'https://proplegit-dev.s3.ap-south-1.amazonaws.com/100/Documents/Legal/CaseID_46/FSWerOpenMenuv1.pdf', id: 6 },
  ]
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser: any;
  isLoading: boolean;
  trustInfo: any;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private service: GeneralService) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetTrustinfo(this.trustID).subscribe((Res) => {
      this.trustInfo = Res.data
      this.trustInfo.TrusteeUsers.map((x) => {
        if (x.TrusteeUsertypeID === 1) {
          this.manager.push(x)
        } else if (x.TrusteeUsertypeID === 2) {
          this.ca.push(x)
        } else {
          this.Trustee.push(x)
        }
      })
      this.isLoading = false;
    });
    this.dtOptions = {
      data: this.data,
      responsive: true,
      columns: [
        {
          title: "Name",
          data: "name",

        },
        {
          title: "File Type",
          data: "fileType",
        },
        {
          title: "Description",
          data: "desc",

        },
        {
          title: "Action",
          data: null,
          render(data) {
            return `<div style="display:flex">
            <a title="Download Trust Document" href="${data.URL}">
            <i class="btn font-18 mdi mdi-eye-check text-secondary" viewTrustDocumentID="${data.id}"></i></a></div>`;
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
  AddDocument() {
    this.initDocumentForm()
    this.modalService.open(this.DocumentFormModal)
  }
  initDocumentForm() {
    this.documentForm = new FormGroup({
      FileName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID)
    });
  }
  resetDocumentForm() {
    this.a.FileName.reset()
    this.a.FileType.reset()
    this.a.Description.reset()
    this.a.uploadfile.reset()
  }
  onSaveDocumnt() {
    this.submited = true;
    if (this.documentForm.valid) {
      // 1 is Property ID

    }
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
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.a.FileType.setValue('Photo');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.a.FileType.setValue('PDF');
      this.a.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.a.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  prepareSave(): any {
    const input = new FormData();
    input.append('FileName', this.documentForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.documentForm.get('FileType').value);
    input.append('Description', this.documentForm.get('Description').value);
    input.append('CreatedBy', this.documentForm.get('CreatedBy').value);
    input.append('uploadfile', (this.documentForm.get('uploadfile').value)[0]);
    return input;
  }
  get a() { return this.documentForm.controls; }
}

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss'],
})
export class ViewMeetingComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  meetingForm: FormGroup;
  @ViewChild('MeetingForm', { static: true }) meetingFromModal;
  @Input() trustID: number;
  @Input() refresh: number;
  isdropdownShow: boolean;
  isLoading: boolean;
  FileExtension: string;
  submited: boolean = false;
  today = new Date();
  Loading: boolean = false;
  currentUser: any;
  currentMeeting: number;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private datepipe: DatePipe,
    private service: GeneralService,
    private ModalService: NgbModal
  ) {
    this.isdropdownShow = false;
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = false;
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}trust/meeting/list/${this.trustID}`
      },
      responsive: true,
      columns: [
        {
          title: 'Sr.No.',
          data: null,
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },
        {
          title: 'Title',
          data: 'MeetingTitle',
        },
        {
          title: 'Meeting Time',
          data: 'MeetingdateTime',

        },
        {
          title: 'Venue',
          data: 'venue',

        },
        {
          title: 'Meeting Arranged By',
          data: 'MeetingArrangedBy',

        },
        {
          title: 'Status',
          data: 'MeetingStatus',
          render: (status) => {
            if (status == 'Cancel') {
              return `<span class="badge badge-danger p-1">${status}</span>`
            } else if (status == 'Completed') {
              return `<span class="badge badge-success p-1">${status}</span>`
            } else {
              return `<span class="badge badge-secondary p-1">${status}</span>`
            }
          }
        },
        // {
        //   title: 'Return File Date',
        //   data: null,
        //   render: (data) => {
        //     return this.datepipe.transform(data.returnfiledate, 'MMM, dd yyyy');
        //   },
        // },
        {
          title: 'Action',
          data: null,
          render(data) {
            let div = `<div style="display:flex"> 
            <a title="Download Agenda Document" href="${data.AgendaDocumentPath}">
            <i class="btn font-18 mdi mdi-cloud-download-outline text-secondary"></i></a>`
            if (data.IsMeetingCompleted == 0) {
              div += ` <a title="Cancel Meeting" >
              <i cancelMeeting="${data.MeetingID}" class="btn font-18 mdi mdi-cancel text-danger"></i></a>
              <a title="Complete Meeting" >
              <i class="btn font-18 mdi mdi-update text-success" completeMeetingID="${data.MeetingID}"></i></a>`
            }
            if (data.MOMDocumentPath) {
              div += `<a title="Download MOM Document" href="${data.MOMDocumentPath}">
              <i class="btn font-18 mdi mdi-cloud-download-outline text-success"></i></a`
            }
            div += `</div>`;
            return div
          },
        },
      ],
      // columnDefs: [{
      //   targets: [2],
      //   visible: true,

      // }]
    };
  }
  callback() {
    return false;
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
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('cancelMeeting')) {
        this.isLoading = true;
        this.service.CancelMEeting(event.target.getAttribute('cancelMeeting')).subscribe((data) => {
          this.isLoading = false;
          if (data.status === 200) {
            Swal.fire({
              title: 'Meeting Cancelled',
              text: data.message,
              type: 'success'
            }).then(() => {
              this.rerender()
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
          }
        })
      }
      if (event.target.hasAttribute('completeMeetingID')) {
        this.currentMeeting = event.target.getAttribute('completeMeetingID');
        this.initForm();
        this.ModalService.open(this.meetingFromModal)
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }
  prepareSave() {
    const input = new FormData();
    input.append('FileName', this.meetingForm.get('FileName').value + '.' + this.FileExtension);
    input.append('FileType', this.meetingForm.get('FileType').value);
    input.append('Description', this.meetingForm.get('Description').value);
    input.append('CreatedBy', this.meetingForm.get('CreatedBy').value);
    input.append('TotalTimeOfMeetingInMinutes', this.meetingForm.get('TotalTimeOfMeetingInMinutes').value);
    input.append('uploadfile', (this.meetingForm.get('uploadfile').value)[0]);
    return input;
  }
  onSave() {
    this.submited = true;
    if (this.meetingForm.valid) {
      // 1 is Property ID
      this.Loading = true;
      this.service.CompleteMeeting(this.currentMeeting, this.prepareSave())
        .subscribe(data => {
          this.Loading = false;
          if (data.status === 200) {
            this.submited = false;
            Swal.fire({
              title: 'Uploaded',
              text: data.message,
              type: 'success',
            }).then(() => {
              this.ModalService.dismissAll()
              this.rerender()
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
          }
        });
    }
  }
  get d() { return this.meetingForm.controls; }

  onchangeDispose(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.d.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setDisposeform(fileName, filetype, fileExtension);
    } else {
      this.d.FileType.setValue('');
      this.d.FileName.setValue('');
      this.d.Description.setValue('');
      this.FileExtension = '';
    }
  }

  setDisposeform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.d.FileType.setValue('Photo');
      this.d.FileName.setValue(fileName);
      this.FileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.d.FileType.setValue('PDF');
      this.d.FileName.setValue(fileName);
      this.FileExtension = extension.toLowerCase();
    } else {
      this.d.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  initForm() {
    this.meetingForm = new FormGroup({
      FileName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      TotalTimeOfMeetingInMinutes: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(600)]),
      CreatedBy: new FormControl(this.currentUser.UserID)
    });
  }
  resetForm() {
    this.d.FileName.reset()
    this.d.FileType.reset()
    this.d.Description.reset()
    this.d.TotalTimeOfMeetingInMinutes.reset()
    this.d.uploadfile.reset()
  }
}

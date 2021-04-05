import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.scss'],
})
export class AddmeetingComponent implements OnInit {
  @Input() trustID: number;
  @Output() reFresh = new EventEmitter();
  isLoading: boolean;
  meetingForm: FormGroup;
  numericRegex = '[0-9]+';
  Date = new Date();
  fileExtension: string;
  submitted: boolean;
  regex = '[a-zA-Z][a-z0-9A-Z ]+';
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private service: GeneralService
  ) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = false;
    this.meetingForm = this.fb.group({
      MeetingTitle: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),

      MeetingdateTime: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      FileName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
      ]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
    });
  }
  get f() {
    return this.meetingForm.controls;
  }
  resetForm() {
    this.f.FileName.reset();
    this.f.FileType.reset();
    this.f.Description.reset();
    this.f.uploadfile.reset();
    this.f.MeetingTitle.reset();
    this.f.MeetingdateTime.reset();
    this.f.venue.reset();
    this.f.uploadfile.setValue([]);
  }
  onSubmit() {
    this.submitted = true;
    if (this.meetingForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      this.service
        .AddMeeting(this.trustID, this.prepareSave())
        .subscribe((data) => {
          this.isLoading = false;
          this.resetForm();
          if (data.status === 200) {
            this.submitted = false;
            Swal.fire({
              title: 'Meeting Uploaded',
              text: data.message,
              type: 'success',
            }).then(() => {
              this.submitted = false;
              this.reFresh.emit();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error',
            });
          }
        });
    }
  }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.f.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.f.FileType.setValue('');
      this.f.FileName.setValue('');
      this.f.Description.setValue('');
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
      this.f.FileType.setValue('Photo');
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === 'application/pdf' &&
      extension.toLowerCase() === 'pdf'
    ) {
      this.f.FileType.setValue('PDF');
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.f.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error',
      });
    }
  }
  prepareSave(): any {
    const input = new FormData();
    input.append(
      'FileName',
      this.meetingForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.meetingForm.get('FileType').value);
    input.append('Description', this.meetingForm.get('Description').value);
    input.append('venue', this.meetingForm.get('venue').value);
    input.append('CreatedBy', this.meetingForm.get('CreatedBy').value);
    input.append(
      'MeetingdateTime',
      this.datepipe.transform(
        this.meetingForm.get('MeetingdateTime').value,
        'yyyy-MM-dd hh:mm'
      )
    );
    input.append('MeetingTitle', this.meetingForm.get('MeetingTitle').value);
    input.append('uploadfile', this.meetingForm.get('uploadfile').value[0]);
    return input;
  }
}

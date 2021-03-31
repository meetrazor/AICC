import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-photograph',
  templateUrl: './add-photograph.component.html',
  styleUrls: ['./add-photograph.component.scss']
})
export class AddPhotographComponent implements OnInit {
  photographForm: FormGroup;
  file: any;
  @Input() propertyId: number;
  isLoading: boolean;
  submited: boolean;
  fileExtension: string;
  @ViewChild('Files', { static: false }) files: any;
  constructor(private generalService: GeneralService, private router: Router) {
    this.photographForm = new FormGroup({
      FileName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      DocumentTypeId: new FormControl(null)
    });
  }

  ngOnInit() {
    this.submited = false;
    this.isLoading = false;
    this.photographForm.controls.FileType.disable();
  }

  private prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('uploadfile', (this.photographForm.get('uploadfile').value)[0]);
    if (this.photographForm.get('DocumentTypeId').value !== null) {
      input.append('DocumentTypeId', this.photographForm.get('DocumentTypeId').value);
    }
    return input;
  }
  get f() { return this.photographForm.controls; }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.photographForm.controls.uploadfile.setValue([e[0]]);
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.photographForm.controls.FileType.setValue('');
      this.photographForm.controls.FileName.setValue('');
      this.photographForm.controls.Description.setValue('');
      this.photographForm.controls.DocumentTypeId.setValue(null);
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if (filetype.toLowerCase() === 'video/mp4' && extension.toLowerCase() === 'mp4') {
      this.photographForm.controls.FileType.setValue('Video');
      this.photographForm.controls.FileName.setValue(fileName);
      this.photographForm.controls.DocumentTypeId.setValue(null);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'audio/vnd.dlna.adts' && extension.toLowerCase() === 'aac') ||
      (filetype.toLowerCase() === 'audio/mpeg' && extension.toLowerCase() === 'mp3')) {
      this.photographForm.controls.FileType.setValue('Audio');
      this.photographForm.controls.FileName.setValue(fileName);
      this.photographForm.controls.DocumentTypeId.setValue(null);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.photographForm.controls.FileType.setValue('Photo');
      this.photographForm.controls.FileName.setValue(fileName);
      this.photographForm.controls.DocumentTypeId.setValue(null);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.photographForm.controls.FileType.setValue('PDF');
      this.photographForm.controls.FileName.setValue(fileName);
      this.photographForm.controls.DocumentTypeId.setValue(1);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/msword' && extension.toLowerCase() === 'doc') ||
      (filetype.toLowerCase() === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        extension.toLowerCase() === 'docx')) {
      this.photographForm.controls.FileType.setValue('DOC');
      this.photographForm.controls.FileName.setValue(fileName);
      this.photographForm.controls.DocumentTypeId.setValue(1);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.photographForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  onSubmit() {
    this.submited = true;
    if (this.photographForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      this.generalService.UploadPhotosAndVideos(this.propertyId, this.prepareSave())
        .subscribe(data => {
          this.isLoading = false;
          this.photographForm.reset();
          if (data.status === 200) {
            this.submited = false;
            Swal.fire({
              title: 'Uploaded',
              text: data.message,
              type: 'success'
            }).then(() => {
              location.reload();
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

}


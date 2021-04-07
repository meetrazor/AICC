import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-details-legal-case',
  templateUrl: './details-legal-case.component.html',
  styleUrls: ['./details-legal-case.component.scss'],
})
export class DetailsLegalCaseComponent implements OnInit {
  case: any;
  constructor(
    private service: GeneralService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) {
    this.currentUser = this.service.getcurrentUser();
  }

  get e() {
    return this.actForm.controls;
  }
  get f() {
    return this.hearingForm.controls;
  }
  get g() {
    return this.PetitionerForm.controls;
  }
  get h() {
    return this.RespondentForm.controls;
  }
  get l() {
    return this.lawyerForm.controls;
  }
  get a() {
    return this.documentForm.controls;
  }
  get d() {
    return this.caseDisposalForm.controls;
  }
  today = new Date();
  currentUser: any;
  fileExtension: string;
  disposeFileExtension: string;
  PetitionerForm: FormGroup;
  RespondentForm: FormGroup;
  documentForm: FormGroup;
  caseDisposalForm: FormGroup;
  isFormLoading: boolean;
  @Input() CaseID: any;
  @Input() status: any;
  @Output() refresh: EventEmitter<{}> = new EventEmitter();

  actForm: FormGroup;
  hearingForm: FormGroup;
  submited: boolean;
  Loading: boolean;
  LawyerData: Array<any>;

  lawyerForm: FormGroup;
  keyword = 'Area';
  areas: string[];

  initialValue = '';

  StateArray: any;
  Array2: any;
  Array3: any;
  Array4: any;
  Array5: string[];

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  @ViewChild('ActForm', { static: true }) ActFormModal;
  @ViewChild('HearingForm', { static: true }) HearingFormModal;
  @ViewChild('PetitionerFormModal', { static: true }) PetitionerFormModal;
  @ViewChild('RespondentFormModal', { static: true }) RespondentFormModal;
  @ViewChild('DocumentForm', { static: true }) DocumentFormModal;
  @ViewChild('LawyerForm', { static: true }) LawyerFormModal;
  @ViewChild('CaseDisposalForm', { static: true }) CaseDisposalFromModal;

  rerender;

  ngOnInit() {
    this.service.listLawyers().subscribe((res) => {
      this.LawyerData = res.data;
      this.submited = false;
      this.isFormLoading = false;
    });
  }
  CaseDispose() {
    this.initDispoalForm();
    this.modalService.open(this.CaseDisposalFromModal);
  }
  initDispoalForm() {
    this.caseDisposalForm = new FormGroup({
      FileName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
      ]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      DecisionDate: new FormControl(null, Validators.required),
      OrderDate: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID),
    });
  }
  onSaveDispose() {
    this.submited = true;
    if (this.caseDisposalForm.valid) {
      // 1 is Property ID
      this.Loading = true;
      this.service
        .DisposeLegalCase(this.CaseID, this.prepareDisposalSave())
        .subscribe((data) => {
          this.Loading = false;
          this.resetDisposeForm();
          if (data.status === 200) {
            this.submited = false;
            Swal.fire({
              title: 'Uploaded',
              text: data.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
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
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID),
    });
  }
  resetDocumentForm() {
    this.a.FileName.reset();
    this.a.FileType.reset();
    this.a.Description.reset();
    this.a.uploadfile.reset();
  }
  resetDisposeForm() {
    this.d.FileName.reset();
    this.d.FileType.reset();
    this.d.Description.reset();
    this.d.DecisionDate.reset();
    this.d.OrderDate.reset();
    this.d.uploadfile.reset();
  }
  onSaveDocumnt() {
    this.submited = true;
    if (this.documentForm.valid) {
      // 1 is Property ID
      this.Loading = true;
      this.service
        .UploadLegalCaseDocument(this.CaseID, this.prepareSave())
        .subscribe((data) => {
          this.Loading = false;
          this.resetDocumentForm();
          if (data.status === 200) {
            this.submited = false;
            Swal.fire({
              title: 'Uploaded',
              text: data.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
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
  AddAct() {
    this.submited = false;
    this.initActForm();
    this.modalService.open(this.ActFormModal);
  }
  AddHearing() {
    this.submited = false;
    this.initHearingForm();
    this.modalService.open(this.HearingFormModal);
  }
  AddPetitioner() {
    this.submited = false;
    this.initPetitionerForm();
    this.modalService.open(this.PetitionerFormModal);
  }
  AddRespondent() {
    this.submited = false;
    this.initRespondentForm();
    this.modalService.open(this.RespondentFormModal);
  }
  AddLawyer() {
    this.submited = false;
    this.fetchstate();
    this.initLawyerForm();
    this.modalService.open(this.LawyerFormModal);
  }
  initLawyerForm() {
    this.lawyerForm = this.formBuilder.group({
      LawyerName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      Firm: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      MobileNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      LandlineNo: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      IsActive: new FormControl('1', Validators.required),
      PinCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      Fax: new FormControl(null),
      EmailId: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      Website: new FormControl(null, [Validators.pattern(this.urlRegex)]),
      TalukaId: new FormControl(null, Validators.required),
      VillageId: new FormControl(null, Validators.required),
      DistrictId: new FormControl(null, Validators.required),
      StateId: new FormControl(null, Validators.required),
      RecordDate: new FormControl(new Date(), Validators.required),
    });
  }
  initActForm() {
    this.actForm = this.formBuilder.group({
      UnderAct: new FormControl(null, Validators.required),
      UnderSection: new FormControl(null, Validators.required),
    });
  }
  initPetitionerForm() {
    this.PetitionerForm = this.formBuilder.group({
      LawyerID: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      Petitioner: this.formBuilder.array([this.addDetails()]),
    });
  }
  initRespondentForm() {
    this.RespondentForm = this.formBuilder.group({
      LawyerID: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      Respondent: this.formBuilder.array([this.addDetails()]),
    });
  }
  addDetails() {
    return this.formBuilder.group({
      Name: new FormControl(null, Validators.required),
      Email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      Mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
    });
  }
  removePetitionerDetails(i: number) {
    const control = this.PetitionerForm.controls.Petitioner as FormArray;
    control.removeAt(i);
  }
  removeRespondentDetails(i: number) {
    const control = this.RespondentForm.controls.Respondent as FormArray;
    control.removeAt(i);
  }
  addPetitionerDetails() {
    const control = this.PetitionerForm.controls.Petitioner as FormArray;
    control.push(this.addDetails());
  }
  addRespondentDetails() {
    const control = this.RespondentForm.controls.Respondent as FormArray;
    control.push(this.addDetails());
  }
  callback() {
    return false;
  }
  initHearingForm() {
    this.isFormLoading = true;
    this.service.GetLegalCaseLastHearing(this.CaseID).subscribe((res) => {
      this.hearingForm = this.formBuilder.group({
        HearingDate: new FormControl(null, [Validators.required]),
        IsDetailsChange: new FormControl(
          res.data.LegalCaseID ? '0' : '1',
          Validators.required
        ),
        Judge: new FormControl(
          res.data ? res.data.Judge : null,
          Validators.required
        ),
        CourtName: new FormControl(
          res.data ? res.data.CourtName : null,
          Validators.required
        ),
        CourtNumber: new FormControl(
          res.data ? res.data.CourtNumber : null,
          Validators.required
        ),
        CourtAddress: new FormControl(
          res.data ? res.data.CourtAddress : null,
          Validators.required
        ),
        CreatedBy: new FormControl(
          this.currentUser.UserID,
          Validators.required
        ),
      });
      this.isDetailsChange(res.data.LegalCaseID ? '0' : '1');
      this.isFormLoading = false;
    });
  }
  isDetailsChange(e) {
    if (e == 0) {
      this.f.Judge.disable();
      this.f.CourtName.disable();
      this.f.CourtNumber.disable();
      this.f.CourtAddress.disable();
    } else if (e == 1) {
      this.f.Judge.enable();
      this.f.CourtName.enable();
      this.f.CourtNumber.enable();
      this.f.CourtAddress.enable();
    }
  }
  onSaveAct() {
    this.submited = true;
    this.Loading = true;
    if (this.actForm.valid) {
      this.service
        .AddLegalCaseAct(this.CaseID, this.actForm.value)
        .subscribe((res) => {
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.error,
              type: 'error',
            }).then(() => {
              this.submited = false;
              this.Loading = false;
            });
          } else {
            this.actForm.reset();
            this.submited = false;
            this.Loading = false;
            Swal.fire({
              title: 'Success!',
              text: res.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
            });
          }
        });
    } else {
      this.Loading = false;
    }
  }
  onSaveHearing() {
    this.submited = true;
    this.Loading = true;
    if (this.hearingForm.valid) {
      this.service
        .AddLegalCaseHearing(this.CaseID, this.hearingForm.value)
        .subscribe((res) => {
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.error,
              type: 'error',
            }).then(() => {
              this.submited = false;
              this.Loading = false;
            });
          } else {
            this.submited = false;
            this.Loading = false;
            Swal.fire({
              title: 'Success!',
              text: res.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
            });
          }
        });
    } else {
      this.Loading = false;
    }
  }
  onSavePetitioner() {
    this.submited = true;
    this.Loading = true;
    if (this.PetitionerForm.valid) {
      this.service
        .AddPetitionerAndLawyer(this.CaseID, this.PetitionerForm.value)
        .subscribe((res) => {
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.error,
              type: 'error',
            }).then(() => {
              this.submited = false;
              this.Loading = false;
            });
          } else {
            this.submited = false;
            this.Loading = false;
            Swal.fire({
              title: 'Success!',
              text: res.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
            });
          }
        });
    } else {
      this.Loading = false;
    }
  }
  onSaveRespondent() {
    this.submited = true;
    this.Loading = true;
    if (this.RespondentForm.valid) {
      this.service
        .AddRespondentAndLawyer(this.CaseID, this.RespondentForm.value)
        .subscribe((res) => {
          if (res.error) {
            Swal.fire({
              title: res.error_code,
              text: res.error,
              type: 'error',
            }).then(() => {
              this.submited = false;
              this.Loading = false;
            });
          } else {
            this.submited = false;
            this.Loading = false;
            Swal.fire({
              title: 'Success!',
              text: res.message,
              type: 'success',
            }).then(() => {
              this.modalService.dismissAll();
              this.refresh.emit();
            });
          }
        });
    } else {
      this.Loading = false;
    }
  }

  onSaveLawyer() {
    this.submited = true;
    if (this.lawyerForm.valid) {
      this.service.addLawyer(this.lawyerForm.value).subscribe((data) => {
        this.submited = false;
        this.lawyerForm.reset();
        if (data.status === 200) {
          Swal.fire({
            title: 'Added',
            text: data.message,
            type: 'success',
            timer: 2000,
          }).then(() => {
            this.modalService.dismissAll();
            this.refresh.emit();
          });
        } else {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: 'error',
          }).then(() => {
            this.modalService.dismissAll();
            this.refresh.emit();
          });
        }
      });
    }
  }
  fetchstate() {
    this.Loading = true;
    this.Array2 = [];
    this.Array3 = [];
    this.Array4 = [];
    this.service
      .states()
      .pipe(first())
      .subscribe((data) => {
        this.Loading = false;
        if (data.error) {
          return;
        } else {
          this.StateArray = data.data;
        }
      });
  }

  fetchdist(e) {
    this.Array2 = [];
    this.Array3 = [];
    this.Array4 = [];
    this.lawyerForm.controls.TalukaId.setValue(null);
    this.lawyerForm.controls.DistrictId.setValue(null);
    this.lawyerForm.controls.VillageId.setValue(null);
    if (e === undefined) {
      return false;
    }
    this.Loading = true;
    //  console.log(this.lawyerForm.controls.StateID.value);
    this.service
      .districts(e)
      .pipe(first())
      .subscribe((data) => {
        this.Loading = false;
        console.log(data);
        if (data.error) {
          console.log(data.error);
          return;
        } else {
          this.Array2 = data.data;
        }
      });
  }

  fetchtaluka(e) {
    this.Array3 = [];
    this.Array4 = [];
    this.lawyerForm.controls.TalukaId.setValue(null);
    this.lawyerForm.controls.VillageId.setValue(null);
    if (e === undefined) {
      return false;
    }
    this.Loading = true;
    this.service
      .talukas(e)
      .pipe(first())
      .subscribe((data) => {
        this.Loading = false;
        if (data.error) {
          console.log(data.error);
          return;
        } else {
          this.Array3 = data.data;
        }
      });
  }
  fetchtvillage(e) {
    this.Array4 = [];
    this.lawyerForm.controls.VillageId.setValue(null);
    if (e === undefined) {
      return false;
    }
    this.Loading = true;
    this.service
      .villages(e)
      .pipe(first())
      .subscribe((data) => {
        this.Loading = false;
        if (data.error) {
          console.log(data.error);
          return;
        } else {
          this.Array4 = data.data;
        }
      });
  }
  isValid(event) {
    if (
      event.keyCode >= 48 &&
      event.keyCode <= 57 &&
      event.target.value.length < 10
    ) {
    } else {
      return false;
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
      this.disposeFileExtension = '';
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
  setDisposeform(fileName, filetype, extension) {
    if (
      (filetype.toLowerCase() === 'image/jpeg' &&
        (extension.toLowerCase() === 'jpg' ||
          extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' &&
        extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' &&
        extension.toLowerCase() === 'png')
    ) {
      this.d.FileType.setValue('Photo');
      this.d.FileName.setValue(fileName);
      this.disposeFileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === 'application/pdf' &&
      extension.toLowerCase() === 'pdf'
    ) {
      this.d.FileType.setValue('PDF');
      this.d.FileName.setValue(fileName);
      this.disposeFileExtension = extension.toLowerCase();
    } else {
      this.d.uploadfile.setValue([]);
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
      this.documentForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.documentForm.get('FileType').value);
    input.append('Description', this.documentForm.get('Description').value);
    input.append('CreatedBy', this.documentForm.get('CreatedBy').value);
    input.append('uploadfile', this.documentForm.get('uploadfile').value[0]);
    return input;
  }
  prepareDisposalSave(): any {
    const input = new FormData();
    input.append(
      'FileName',
      this.caseDisposalForm.get('FileName').value + '.' + this.fileExtension
    );
    input.append('FileType', this.caseDisposalForm.get('FileType').value);
    input.append('Description', this.caseDisposalForm.get('Description').value);
    input.append('CreatedBy', this.caseDisposalForm.get('CreatedBy').value);
    input.append(
      'DecisionDate',
      this.caseDisposalForm.get('DecisionDate').value
    );
    input.append('OrderDate', this.caseDisposalForm.get('OrderDate').value);
    input.append(
      'uploadfile',
      this.caseDisposalForm.get('uploadfile').value[0]
    );
    return input;
  }
  // refreshcase() {
  //   this.case++;
  // }
}

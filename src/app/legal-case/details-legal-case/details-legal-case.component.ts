import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-details-legal-case',
  templateUrl: './details-legal-case.component.html',
  styleUrls: ['./details-legal-case.component.scss']
})
export class DetailsLegalCaseComponent implements OnInit {
  today = new Date();
  currentUser: any;
  PetitionerForm: FormGroup;
  RespondentForm: FormGroup;
  isFormLoading: boolean;
  @Input() CaseID: any;
  @Input() status: any;
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
  @ViewChild('LawyerForm', { static: true }) LawyerFormModal;
  constructor(private service: GeneralService, private modalService: NgbModal, private formBuilder: FormBuilder, private datepipe: DatePipe) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.service.listLawyers().subscribe((res) => {
      this.LawyerData = res.data;
      this.submited = false;
      this.isFormLoading = false;
    })

  }
  AddAct() {
    this.initActForm();
    this.modalService.open(this.ActFormModal)
  }
  AddHearing() {
    this.initHearingForm();
    this.modalService.open(this.HearingFormModal)
  }
  AddPetitioner() {
    this.initPetitionerForm();
    this.modalService.open(this.PetitionerFormModal)
  }
  AddRespondent() {
    this.initRespondentForm();
    this.modalService.open(this.RespondentFormModal)
  }
  AddLawyer() {
    this.fetchstate()
    this.initLawyerForm();
    this.modalService.open(this.LawyerFormModal)
  }
  initLawyerForm() {
    this.lawyerForm = this.formBuilder.group({
      LawyerName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      Firm: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      MobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      LandlineNo: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      IsActive: new FormControl('1', Validators.required),
      PinCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      Fax: new FormControl(null),
      EmailId: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
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
    })
  }
  initPetitionerForm() {
    this.PetitionerForm = this.formBuilder.group({
      LawyerID: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      Petitioners: this.formBuilder.array([this.addDetails()])
    })
  }
  initRespondentForm() {
    this.RespondentForm = this.formBuilder.group({
      LawyerID: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      Respondents: this.formBuilder.array([this.addDetails()])
    })
  }
  addDetails() {
    return this.formBuilder.group({
      Name: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      Mobile: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    })
  }
  removePetitionerDetails(i: number) {
    const control = this.PetitionerForm.controls.Petitioners as FormArray;
    control.removeAt(i);
  }
  removeRespondentDetails(i: number) {
    const control = this.RespondentForm.controls.Respondents as FormArray;
    control.removeAt(i);
  }
  addPetitionerDetails() {
    const control = this.PetitionerForm.controls.Petitioners as FormArray;
    control.push(this.addDetails());
  }
  addRespondentDetails() {
    const control = this.RespondentForm.controls.Respondents as FormArray;
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
        IsDetailsChange: new FormControl(res.data ? '0' : '1', Validators.required),
        Judge: new FormControl(res.data ? res.data.Judge : null, Validators.required),
        CourtName: new FormControl(res.data ? res.data.CourtName : null, Validators.required),
        CourtNumber: new FormControl(res.data ? res.data.CourtNumber : null, Validators.required),
        CourtAddress: new FormControl(res.data ? res.data.CourtAddress : null, Validators.required),
        CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      });
      this.isDetailsChange(res.data ? '0' : '1');
      this.isFormLoading = false;
    })
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
      this.service.AddLegalCaseAct(this.CaseID, this.actForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
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
            location.reload();
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
      this.service.AddLegalCaseHearing(this.CaseID, this.hearingForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
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
            location.reload();
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
      this.service.AddPetitionerAndLawyer(this.CaseID, this.PetitionerForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
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
            location.reload();
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
      this.service.AddRespondentAndLawyer(this.CaseID, this.RespondentForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
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
            location.reload();
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
      this.service.addLawyer(this.lawyerForm.value)
        .subscribe(data => {
          this.submited = false;
          this.lawyerForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            }).then(() => {
              location.reload();
            })
          }
        });
    }
  }
  fetchstate() {
    this.Loading = true
    this.service.states()
      .pipe(first())
      .subscribe(
        data => {
          this.Loading = false;
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.StateArray = data.data;
          }
        });
  }

  fetchdist(e) {
    if (e === undefined) {
      this.lawyerForm.controls.TalukaId.setValue(null);
      this.lawyerForm.controls.DistrictId.setValue(null);
      this.lawyerForm.controls.VillageId.setValue(null);
      return false;
    }
    this.Loading = true
    //  console.log(this.lawyerForm.controls.StateID.value);
    this.service.districts(e)
      .pipe(first())
      .subscribe(
        data => {
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
    if (e === undefined) {
      this.lawyerForm.controls.TalukaId.setValue(null);
      this.Array3 = []
      return false;
    }
    this.Loading = true;
    this.service.talukas(e)
      .pipe(first())
      .subscribe(
        data => {
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
    if (e === undefined) {
      this.lawyerForm.controls.VillageId.setValue(null);
      return false;
    }
    this.Loading = true;
    this.service.villages(e)
      .pipe(first())
      .subscribe(
        data => {
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
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }
  get e() { return this.actForm.controls; }
  get f() { return this.hearingForm.controls; }
  get g() { return this.PetitionerForm.controls; }
  get h() { return this.RespondentForm.controls; }
  get l() { return this.lawyerForm.controls; }
}

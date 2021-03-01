
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  breadCrumbItems: any;
  notfoundshow: boolean;
  isLoading: boolean;
  keyword = 'Area';
  areas: string[];
  propertyType: any;
  bankList: any;
  initialValue = '';
  loanTypes: any;
  currentUser: any;
  DistrictList: any;
  StateList: any[];
  public loan: FormGroup;
  submitted: boolean;
  constructor(private service: GeneralService, private Fb: FormBuilder, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: '/loan/applications' },
    { label: 'Add New Application', path: '/loan/addapplication', active: true }];
    this.isLoading = false;
  }

  ngOnInit() {
    this.notfoundshow = false;
    this.submitted = false;
    this.currentUser = this.service.getcurrentUser();
    this.service.GetLoanTypes().subscribe((res) => {
      this.loanTypes = res.data;
    });
    this.service.GetPVRBankList().subscribe((res) => {
      this.bankList = res.data;
    });
    this.service.GetLoanPropertyTypes().subscribe((res) => {
      this.propertyType = res.data;

    });
    this.loan = this.Fb.group({
      PropertyOwners: this.Fb.array([
        this.initOwner()
      ]),
      ApplicationNo: new FormControl('', Validators.required),
      taluka: new FormControl('', Validators.required),
      BankID: new FormControl(null, Validators.required),
      BranchCode: new FormControl('', Validators.required),
      ApplicantFirstName: new FormControl('', Validators.required),
      ApplicantLastName: new FormControl('', Validators.required),
      MobileNo: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      LoanPropertyTypeID: new FormControl('', Validators.required),
      IsOwnerSame: new FormControl('False', Validators.required),
      PropertyAddress: new FormControl('', Validators.required),
      TypeOfLoan: new FormControl('', Validators.required),
      IsLien: new FormControl('False'),
      TalukaID: new FormControl('', Validators.required),
      VillageID: new FormControl('', Validators.required),
      DistrictID: new FormControl(null, Validators.required),
      SurveyNo: new FormControl(''),
      CitySurveyNumber: new FormControl(''),
      TpNo: new FormControl(''),
      FpNo: new FormControl(''),
      LienAmount: new FormControl('', Validators.required),
      LienDate: new FormControl('', Validators.required),
      LienPersonName: new FormControl('', Validators.required),
      LienFrom: new FormControl('', Validators.required),
      LoanAmount: new FormControl('', Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID),
      StateID: new FormControl(null, Validators.required),
    });
    this.fetchstatelist();
    this.onChangeLien('False')
  }
  onChangeLien(e) {
    if (e === 'False') {
      this.f.LienAmount.disable();
      this.f.LienDate.disable();
      this.f.LienPersonName.disable();
      this.f.LienFrom.disable();
    } else {
      this.f.LienAmount.enable();
      this.f.LienDate.enable();
      this.f.LienPersonName.enable();
      this.f.LienFrom.enable();
    }
  }
  // searchcountry(term: string, item: any){
  //   term = term.toLocaleLowerCase();
  //   console.log(term,item);
  // //  return item.countrycode.toLocaleLowerCase().indexOf(term) > -1 || item.countryname.toLocaleLowerCase().includes(term);
  // }
  save() {
    this.onChangeLien(this.f.IsLien.value);
    this.submitted = true;
    if (this.loan.valid) {
      this.isLoading = true;
      this.service.AddLoanApplication(this.loan.value).subscribe((res) => {
        this.isLoading = false;
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.message,
            type: 'error'
          });
          return;
        } else {
          Swal.fire({
            title: 'Success',
            text: 'Application Added Successfully',
            type: 'success'
          }).then(() => {
            this.router.navigate(['/loan/applications']);
          });
        }
        this.isLoading = false;
      });
    } else {
      Swal.fire({
        title: 'Invalid',
        text: 'Invalid Form Data',
        type: 'error'
      });
    }
  }
  ChangeState(e) {
    if (e !== undefined) {
      this.service.districts(this.loan.controls.StateID.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.error) {
              Swal.fire({
                title: data.error_code,
                text: data.message,
                type: 'error'
              });
              return;
            } else {
              this.DistrictList = data.data;
              if (this.DistrictList.length > 0) {
                this.loan.controls.DistrictID.enable();
              } else {
                this.loan.controls.DistrictID.disable();
              }
            }
          });
    }
    this.loan.controls.VillageID.setValue(null);
    this.loan.controls.DistrictID.setValue(null);
    this.loan.controls.TalukaID.setValue(null);
    this.loan.controls.taluka.setValue('');
  }
  get f() { return this.loan.controls; }

  fetchstatelist() {
    this.service.fetchstatelist()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            return;
          } else {
            this.StateList = data.data;
          }
        });
    this.f.DistrictID.disable();
  }
  ChangeDistrict() {
    this.f.VillageID.setValue(null);
    this.f.TalukaID.setValue(null);
    this.f.taluka.setValue('');
  }
  selectEvent(item) {
    // do something with selected item
    this.loan.controls.VillageID.setValue(item.VillageId);
    this.loan.controls.DistrictID.setValue(item.DistrictId);
    this.loan.controls.TalukaID.setValue(item.TalukaId);
    this.loan.controls.StateID.setValue(item.stateID);
  }
  onChangeSearch(search: string) {
    this.loan.controls.VillageID.setValue(null);
    this.loan.controls.TalukaID.setValue(null);
    // this.myForm.controls.taluka.setValue('');
    //  fetch remote data from here
    //  And reassign the 'data' which is binded to 'data' property.

    if (!this.loan.controls.StateID.value) {
      Swal.fire({
        title: 'Error',
        text: 'Please Select State',
        type: 'error'
      });
      return;
    }
    if (search !== undefined && search.length >= 3) {
      this.service.areabystateid(this.loan.controls.StateID.value, search)
        .pipe(first())
        .subscribe(
          data => {
            if (data.error) {
              return;
            } else {
              this.areas = data.data;
              this.notfoundshow = true;
            }
          });
    } else if (search !== undefined && search.length === 0) {
      this.areas = null;
      this.notfoundshow = false;
    }
  }
  onclear() {
    this.loan.controls.VillageID.setValue(null);
    this.loan.controls.TalukaID.setValue(null);
  }
  removeOwner(i: number) {
    const control = this.f.PropertyOwners as FormArray;
    control.removeAt(i);
  }
  addOwner() {
    const control = this.f.PropertyOwners as FormArray;
    control.push(this.initOwner());
  }
  initOwner(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        OwnerName: new FormControl(i.OwnerName),
      });
    } else {
      return this.Fb.group({
        OwnerName: new FormControl('')
      });
    }
  }
}

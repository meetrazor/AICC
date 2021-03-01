import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lawyer',
  templateUrl: './add-lawyer.component.html',
  styleUrls: ['./add-lawyer.component.scss']
})

export class AddLawyerComponent implements OnInit {
  lawyerForm: FormGroup;
  submitted = false;
  error = '';
  keyword = 'Area';
  areas: string[];

  isEdit = false;
  isAreaLoaded = false;
  initialValue = '';

  StateArray: any;
  Array2: any;
  Array3: any;
  Array4: any;
  Array5: string[];

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: GeneralService) {
    if (this.route.snapshot.routeConfig.path === 'edit/:id') {
      this.isEdit = true;
    }
  }
  ngOnInit() {
    this.lawyerForm = this.formBuilder.group({
      LawyerName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      Firm: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      MobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      LandlineNo: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      IsActive: new FormControl('1', Validators.required),
      PinCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      Fax: new FormControl(null, Validators.required),
      EmailId: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      Website: new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)]),
      TalukaId: new FormControl('', Validators.required),
      VillageId: new FormControl('', Validators.required),
      DistrictId: new FormControl('', Validators.required),
      StateId: new FormControl('', Validators.required),
      City: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      RecordDate: new FormControl(new Date(), Validators.required),
    });
    this.fetchstate();
    if (this.isEdit === true) {
      this.setInitialValue();
    }
  }
  fetchstate() {
    this.service.states()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.StateArray = data.data;
          }
        });
  }

  fetchdist() {
    //  console.log(this.lawyerForm.controls.StateID.value);
    this.service.districts(this.lawyerForm.controls.StateId.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.Array2 = data.data;
          }
        });
  }

  fetchtaluka() {
    this.service.talukas(this.lawyerForm.controls.DistrictId.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.Array3 = data.data;
          }
        });
  }
  fetchtvillage() {
    this.service.villages(this.lawyerForm.controls.TalukaId.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.Array4 = data.data;
          }
        });
  }

  setInitialValue() {
    this.service.viewLawyer(this.route.snapshot.params.id).subscribe(Res => {
      console.log(Res.data[0].VillageId);
      console.log(Res.data[0].DistrictId);
      console.log(Res.data[0].VillageId);
      this.lawyerForm.get('LawyerName').setValue(Res.data[0].LawyerName);
      this.lawyerForm.get('Firm').setValue(Res.data[0].Firm);
      this.lawyerForm.get('MobileNo').setValue(Res.data[0].MobileNo);
      this.lawyerForm.get('LandlineNo').setValue(Res.data[0].LandlineNo);
      this.lawyerForm.get('PinCode').setValue(Res.data[0].PinCode);
      this.lawyerForm.get('Website').setValue(Res.data[0].Website);
      this.lawyerForm.get('Fax').setValue(Res.data[0].Fax);
      this.lawyerForm.get('Address').setValue(Res.data[0].Address);
      this.lawyerForm.get('City').setValue(Res.data[0].City);
      this.lawyerForm.get('EmailId').setValue(Res.data[0].EmailId);
      this.lawyerForm.get('StateId').setValue(7);
      this.fetchdist();
      this.lawyerForm.get('DistrictId').setValue(Res.data[0].DistrictId);
      this.fetchtaluka();
      this.lawyerForm.get('TalukaId').setValue(Res.data[0].TalukaId);
      this.fetchtvillage();
      this.lawyerForm.get('VillageId').setValue(Res.data[0].VillageId);
    });
  }

  isValid(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }
  GoBack() {
    this.router.navigate(['lawyer']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.lawyerForm.valid && this.isEdit === false) {
      this.service.addLawyer(this.lawyerForm.value)
        .subscribe(data => {
          this.submitted = false;
          this.lawyerForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              this.router.navigate(['lawyer']);
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
          }
        });
    } else if (this.lawyerForm.valid && this.isEdit === true) {
      this.service.updateLawyer(this.lawyerForm.value, this.route.snapshot.params.id)
        .subscribe(data => {
          if (data.status === 200) {
            Swal.fire({
              title: 'Updated',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              this.router.navigate(['lawyer']);
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

  get f() { return this.lawyerForm.controls; }
}

import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pvr-report',
  templateUrl: './pvr-report.component.html',
  styleUrls: ['./pvr-report.component.scss']
})
export class PvrReportComponent implements OnInit {
  breadCrumbItems: any;
  appID: any;
  applicationData: any;
  submitted: boolean;
  isLoading: boolean;
  PVRStatusList = ['Verified', 'Provisionally Verified', 'Not Verified'];
  PVRRiskMeterList = ['Excellent', 'Good', 'Average', 'Poor'];
  PVRForm: FormGroup;
  currentUser: any;
  constructor(private service: GeneralService, private route: ActivatedRoute, private Fb: FormBuilder, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: '/loan/applications' },
    { label: 'PVR Report', path: '/', active: true }];
    this.appID = this.route.snapshot.params.Appid;
  }

  ngOnInit() {
    this.isLoading = true;
    this.submitted = false;
    this.currentUser = this.service.getcurrentUser();
    this.service.GetApplicationInformation(this.appID).subscribe((res) => {
      this.applicationData = res.data[0];
      this.isLoading = false;
      this.PVRForm = this.Fb.group({
        OwnerCoOwnersName: this.Fb.array([
          this.initOwner()
        ]),
        EncumbranceDetails: this.Fb.array([
          this.initEncumbranceDetails()
        ]),
        CropDetails: this.Fb.array([
          this.initCropDetails()
        ]),
        TotalLandSize: new FormControl('', Validators.required),
        PVRRiskMeterStatus: new FormControl('', Validators.required),
        OwnerRemarks: new FormControl('', Validators.required),
        PVRStatusLine1: new FormControl('', Validators.required),
        PVRStatusLine2: new FormControl('', Validators.required),
        PropertyRemarks: new FormControl('', Validators.required),
        PVRPropertyStatus: new FormControl('', Validators.required),
        EncumbranceRemarks: new FormControl('', Validators.required),
        CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      });
    });

  }
  initOwner(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        OwnersName: new FormControl(i.OwnerName, Validators.required),
      });
    } else {
      return this.Fb.group({
        OwnersName: new FormControl('', Validators.required)
      });
    }
  }
  initEncumbranceDetails(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        LoanTakenBy: new FormControl(i.LoanTakenBy),
        LoanAmount: new FormControl(i.LoanAmount),
        LoanTakenOn: new FormControl(i.LoanTakenOn),
        LoanGivenBy: new FormControl(i.LoanGivenBy)
      });
    } else {
      return this.Fb.group({
        LoanTakenBy: new FormControl(''),
        LoanAmount: new FormControl(''),
        LoanTakenOn: new FormControl(''),
        LoanGivenBy: new FormControl('')
      });
    }
  }
  initCropDetails(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        Year: new FormControl(i.Year),
        Season: new FormControl(i.Season),
        Crop: new FormControl(i.Crop),
        Area: new FormControl(i.Area),
        MSP: new FormControl(i.MSP)
      });
    } else {
      return this.Fb.group({
        Year: new FormControl(''),
        Season: new FormControl(''),
        Crop: new FormControl(''),
        Area: new FormControl(''),
        MSP: new FormControl('')
      });
    }
  }
  get f() { return this.PVRForm.controls; }
  save() {
    this.submitted = true;
    if (this.PVRForm.valid) {
      this.isLoading = true;
      this.service.GetDocumentList(this.appID).subscribe((list) => {
        if (list.data.every(x => x.DocumentID == null && x.Status == 'Pending')) {
          this.isLoading = false;
          Swal.fire({
            title: 'Are you sure?',
            text: 'There Is No Document Attached With this PVR, Are You Sure You Want To Generate PVR Without Document Attached ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-danger mt-2',
            cancelButtonClass: 'btn btn-success ml-2 mt-2',
            buttonsStyling: false
          }).then((result) => {
            if (result.value) {
              this, this.isLoading = true;
              this.service.SavePVR(this.PVRForm.value, this.appID).subscribe((res) => {
                this.isLoading = false;
                if (res.error) {
                  Swal.fire({
                    title: res.error_code,
                    text: res.message,
                    type: 'error'
                  });
                  return;
                } else {
                  this.isLoading = true
                  this.service.GeneratePVR(this.appID).subscribe((res) => {
                    this.isLoading = false;
                    Swal.fire({
                      title: 'Success',
                      text: 'PVR generated',
                      type: 'success'
                    }).then(() => {
                      this.service.changeStatus(this.appID, 'iPVR Sent').subscribe(() => {
                        this.router.navigate(['/loan/applications']);
                      })
                    })
                  })
                }
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              return false;
            }
          });
        } else {
          this.service.SavePVR(this.PVRForm.value, this.appID).subscribe((res) => {
            if (res.error) {
              Swal.fire({
                title: res.error_code,
                text: res.message,
                type: 'error'
              });
              return;
            } else {
              this.service.GeneratePVR(this.appID).subscribe((res) => {
                Swal.fire({
                  title: 'Success',
                  text: 'PVR generated',
                  type: 'success'
                }).then(() => {
                  this.service.changeStatus(this.appID, 'iPVR Sent').subscribe(() => {
                    this.router.navigate(['/loan/applications']);
                  })
                })

              })
            }
          });
          this.isLoading = true;
        }
      })

    } else {
      Swal.fire({
        title: 'Invalid',
        text: 'Invalid Form Data',
        type: 'error'
      });
    }
  }
  addEncumbranceDetails() {
    const control = this.PVRForm.controls.EncumbranceDetails as FormArray;
    control.push(this.initEncumbranceDetails());
  }
  removeEncumbranceDetails(i) {
    const control = this.PVRForm.controls.EncumbranceDetails as FormArray;
    control.removeAt(i);
  }
  removeCropDetails(i) {
    const control = this.PVRForm.controls.CropDetails as FormArray;
    control.removeAt(i);
  }
  addCropDetails() {
    const control = this.PVRForm.controls.CropDetails as FormArray;
    control.push(this.initCropDetails());
  }
  removeOwnerDetails(i) {
    const control = this.PVRForm.controls.OwnerCoOwnersName as FormArray;
    control.removeAt(i);
  }
  addOwnerDetails() {
    const control = this.PVRForm.controls.OwnerCoOwnersName as FormArray;
    control.push(this.initOwner());
  }
  getusers() {
    let names = '';
    this.applicationData.PropertyOwners.forEach(owner => {
      names += ` ${owner.OwnerName}`;
    });
    return names;
  }
}

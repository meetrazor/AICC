import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  isLoading: boolean;
  public myForm: FormGroup;
  Array5: any[];
  keyword = 'Area';
  breadCrumbItems: Array<any>;
  areas: string[];
  style: string;
  propertydata: {};
  initialValue = '';
  isDataLoaded = false;

  constructor(private Fb: FormBuilder, private service: GeneralService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.fetchproperty(this.route.snapshot.paramMap.get('id'));
    this.myForm = this.Fb.group({
      OwnerShip: this.Fb.array([]),
      PropertyTypeID: new FormControl('', Validators.required),
      PropertyName: new FormControl('', Validators.required),
      TalukaID: '',
      VillageID: '',
      DistrictID: '',
      StateID: '',
      CreatedBy: '',
      UserID: '',
      CitySurveyNo: new FormControl('', Validators.required),
      CitySurveyOffice: new FormControl('', Validators.required),
      CityWardNo: new FormControl('', Validators.required),
      CityWardName: new FormControl('', Validators.required),
      SheetNumber: new FormControl('', Validators.required),
      SurveyNo: new FormControl('', Validators.required),
      TPNo: new FormControl('', Validators.required),
      FPNo: new FormControl('', Validators.required),
      BuildingNo: new FormControl('', Validators.required),
      BuildingName: new FormControl('', Validators.required),
      RecordDate: new FormControl('', Validators.required),
      milkatno_propId: new FormControl('', Validators.required),
      RevenewOfficeType: new FormControl('', Validators.required),
      PostalAddress: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      LandSize: new FormControl('', Validators.required),
      WaterAvailability: new FormControl('', Validators.required),
      StatusOfElectricity: new FormControl('', Validators.required),
      AgeOfProperty: new FormControl('', Validators.required),
      NoOfBHK: new FormControl('', Validators.required),
      FurnishType: new FormControl('', Validators.required),
      InCharge: this.Fb.array([]),
    });
    this.fetchpropertytype();
  }
  save() {
    this.isLoading = true;
    this.service.editproperty(this.route.snapshot.paramMap.get('id'), this.myForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            return;
          } else {
            Swal.fire({
              title: 'Property Updated Successfully!',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              this.router.navigate(['property']);
            });
          }
        });
  }
  fetchpropertytype() {
    this.service.propertytype()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.Array5 = data.data;
          }
        });
  }

  initOwner(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        OwnerName: new FormControl(i.OwnerName, Validators.required),
        SinceFrom: new FormControl(moment(i.SinceFrom).format('YYYY-MM-DD'), Validators.required)
      });
    } else {
      return this.Fb.group({
        OwnerName: new FormControl('', Validators.required),
        SinceFrom: new FormControl('', Validators.required)
      });
    }
  }
  initIncharge(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        InChargeName: new FormControl(i.InChargeName, Validators.required),
        Designation: new FormControl(i.Designation, Validators.required),
        InChargeType: new FormControl(i.InChargeType, Validators.required),
        MobileNo: new FormControl(i.MobileNo, Validators.required),
        Email: new FormControl(i.Email, Validators.required),
        Address: new FormControl(i.Address, Validators.required),
        InChargeFromDate: new FormControl(moment(i.InChargeFromDate).format('YYYY-MM-DD'), Validators.required),
      });
    } else {
      return this.Fb.group({
        InChargeName: new FormControl('', Validators.required),
        Designation: new FormControl('', Validators.required),
        InChargeType: new FormControl('', Validators.required),
        MobileNo: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Address: new FormControl('', Validators.required),
        InChargeFromDate: new FormControl('', Validators.required),
      });
    }
  }
  addOwner() {
    const control = this.myForm.controls.OwnerShip as FormArray;
    control.push(this.initOwner());
  }

  removeOwner(i: number) {
    const control = this.myForm.controls.OwnerShip as FormArray;
    control.removeAt(i);
  }

  addIncharge() {
    const control = this.myForm.controls.InCharge as FormArray;
    control.push(this.initIncharge());
  }
  removeIncharge(i: number) {
    const control = this.myForm.controls.InCharge as FormArray;
    control.removeAt(i);
  }
  selectEvent(item) {
    // do something with selected item
    this.myForm.controls.VillageID.setValue(item.VillageId);
    this.myForm.controls.DistrictID.setValue(item.DistrictId);
    this.myForm.controls.TalukaID.setValue(item.TalukaId);
    this.myForm.controls.StateID.setValue(item.stateID);
  }
  fetcharea(search) {
    this.service.area(search)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.areas = data.data;
          }
        });
  }
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (search != null && search.length >= 3) {
      this.fetcharea(search);
    }
  }

  fetchproperty(propertyID) {
    this.service.viewproperty(propertyID)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            this.isLoading = false;
            return;
          } else {
            this.myForm.controls.AgeOfProperty.setValue(data.data.AgeOfProperty);
            this.myForm.controls.PropertyTypeID.setValue(data.data.PropertyTypeID);
            this.myForm.controls.PropertyName.setValue(data.data.PropertyName);
            this.myForm.controls.CitySurveyNo.setValue(data.data.CitySurveyNo);
            this.myForm.controls.CitySurveyOffice.setValue(data.data.CitySurveyOffice);
            this.myForm.controls.CityWardNo.setValue(data.data.CityWardNo);
            this.myForm.controls.CityWardName.setValue(data.data.CityWardName);
            this.myForm.controls.SheetNumber.setValue(data.data.SheetNumber);
            this.myForm.controls.SurveyNo.setValue(data.data.SurveyNo);
            this.myForm.controls.TPNo.setValue(data.data.TPNo);
            this.myForm.controls.FPNo.setValue(data.data.FPNo);
            this.myForm.controls.BuildingNo.setValue(data.data.BuildingNo);
            this.myForm.controls.BuildingName.setValue(data.data.BuildingName);
            this.myForm.controls.RecordDate.setValue(moment(data.data.RecordDate).format('YYYY-MM-DD'));
            this.myForm.controls.milkatno_propId.setValue(data.data.milkatno_propId);
            this.myForm.controls.RevenewOfficeType.setValue(data.data.RevenewOfficeType);
            this.myForm.controls.PostalAddress.setValue(data.data.PostalAddress);
            this.myForm.controls.Description.setValue(data.data.Description);
            this.myForm.controls.LandSize.setValue(data.data.LandSize);
            this.myForm.controls.StatusOfElectricity.setValue(data.data.StatusOfElectricity);
            this.myForm.controls.WaterAvailability.setValue(data.data.WaterAvailability);
            this.myForm.controls.NoOfBHK.setValue(data.data.NoOfBHK);
            this.myForm.controls.FurnishType.setValue(data.data.FurnishType);
            this.myForm.controls.TalukaID.setValue(data.data.TalukaID);
            this.myForm.controls.VillageID.setValue(data.data.VillageID);
            this.myForm.controls.DistrictID.setValue(data.data.DistrictID);
            this.myForm.controls.StateID.setValue(data.data.StateID);
            this.myForm.controls.CreatedBy.setValue(data.data.CreatedBy);
            this.myForm.controls.UserID.setValue(data.data.UserID);
            this.initialValue = `${data.data.DistrictName}, ${data.data.TalukaName}, ${data.data.VillageName}`;
            this.isDataLoaded = true;
            this.onChangeSearch(data.data.Area);
            for (const i of data.data.InCharge) {
              const control = this.myForm.controls.InCharge as FormArray;
              control.push(this.initIncharge(i));
            }
            for (const i of data.data.Ownership) {
              const control = this.myForm.controls.OwnerShip as FormArray;
              control.push(this.initOwner(i));
            }

          }
        }
      );
  }
  onFocused(e) {
  }
}

import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { GeneralService } from "src/app/services/general.service";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";
import * as moment from "moment";

const handlerequired = (control: AbstractControl) => {
  let TP = control.get("TPNo").value;
  let FP = control.get("FPNo").value;
  let SurveyNo = control.get("SurveyNo").value;
  if (SurveyNo === "" && TP === "" && FP === "") {
    return { SurveyOrTPFPrequired: true };
  } else {
    if (TP !== "" && FP === "") {
      return { TPFPrequired: true };
    } else if (TP === "" && FP !== "") {
      return { TPFPrequired: true };
    } else {
      return null;
    }
  }
};

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"],
})
export class AddPropertyComponent implements OnInit {
  currentUser: any;
  returnvalue;
  public myForm: FormGroup;
  Array5: any[];
  keyword = "Area";
  breadCrumbItems: Array<any>;
  areas: string[];
  style: string;
  StateList: any[];
  DistrictList: any[];
  isSelected = true;
  IsOpenLand = true;
  IsCitySurvey = false;
  submitted = false;
  propertyID: number;
  isUpdate: boolean;
  data: any;
  initialValue = "a";
  isLoading: boolean;

  constructor(
    private Fb: FormBuilder,
    private service: GeneralService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    this.isUpdate = false;
    this.isLoading = false;
    this.propertyID = this.route.snapshot.params.id;
    this.style =
      "height: 100%; display: block; width: 100%; padding: 0.52rem 0.9rem; font-size: 0.875rem;font-weight: 400;";
    this.style +=
      "line-height: 1.5; color: #6c757d; background-color: #fff; background-clip: ";
    this.style += "padding-box; border-radius: 4px;";
    if (!this.isUpdate) {
      this.breadCrumbItems = [
        { label: "Dashboard", path: "/" },
        { label: "Property List", path: "/AICC/property" },
        { label: "Add New Property", path: "/property/create", active: true },
      ];
    }
    document
      .querySelector(".autocomplete-container")
      .setAttribute(
        "style",
        "box-shadow: none; height: calc(1.5em + 0.9rem + 2px)"
      );
    document
      .querySelector(".autocomplete-container .input-container input")
      .setAttribute("style", this.style);
    // this.myForm = this.Fb.group({
    //   OwnerShip: this.Fb.array([
    //     this.initOwner()
    //   ]),
    //   PropertyTypeID: new FormControl('', Validators.required),
    //   PropertyName: new FormControl('', Validators.required),
    //   TalukaID: new FormControl('', Validators.required),
    //   VillageID: new FormControl('', Validators.required),
    //   DistrictID: new FormControl('', Validators.required),
    //   StateID: new FormControl('', Validators.required),
    //   CreatedBy: '',
    //   UserID: '',
    //   taluka: new FormControl('', Validators.required),
    //   CitySurveyNo: new FormControl('', Validators.required),
    //   CitySurveyOffice: new FormControl('', Validators.required),
    //   CityWardNo: new FormControl('', Validators.required),
    //   CityWardName: new FormControl('', Validators.required),
    //   SheetNumber: new FormControl('', Validators.required),

    //   SurveyNo: new FormControl('', Validators.required),
    //   TPNo: new FormControl('', Validators.required),
    //   FPNo: new FormControl('', Validators.required),
    //   BuildingNo: new FormControl('', Validators.required),
    //   BuildingName: new FormControl('', Validators.required),

    //   RecordDate: new FormControl(new Date()),
    //   milkatno_propId: new FormControl(''),
    //   RevenewOfficeType: new FormControl('', Validators.required),
    //   PostalAddress: new FormControl(''),
    //   Description: new FormControl(''),
    //   LandSize: new FormControl(''),
    //   WaterAvailability: new FormControl(''),
    //   StatusOfElectricity: new FormControl(''),
    //   AgeOfProperty: new FormControl(''),
    //   NoOfBHK: new FormControl(''),
    //   FurnishType: new FormControl(''),
    //   InCharge: this.Fb.array([
    //     this.initIncharge()
    //   ]),
    //   types: new FormControl('surveyno')
    // });
    // this.fetchstatelist();
    // this.fetchpropertytype();
    // this.myForm.controls.CreatedBy.setValue('1');
    // this.myForm.controls.UserID.setValue('1');
    if (this.propertyID) {
      this.isLoading = true;
      this.isUpdate = true;
      this.myForm = this.Fb.group(
        {
          OwnerShip: this.Fb.array([]),
          PropertyTypeID: new FormControl("", Validators.required),
          PropertyName: new FormControl("", Validators.required),
          TalukaID: new FormControl("", Validators.required),
          VillageID: new FormControl("", Validators.required),
          DistrictID: new FormControl("", Validators.required),
          StateID: new FormControl("", Validators.required),
          CreatedBy: "",
          UserID: "",
          ModifiedBy: "",
          taluka: new FormControl("", Validators.required),
          CitySurveyNo: new FormControl("", Validators.required),
          CitySurveyOffice: new FormControl("", Validators.required),
          CityWardNo: new FormControl("", Validators.required),
          CityWardName: new FormControl("", Validators.required),
          SheetNumber: new FormControl("", Validators.required),

          SurveyNo: new FormControl(""),
          TPNo: new FormControl(""),
          FPNo: new FormControl(""),
          BuildingNo: new FormControl("", Validators.required),
          BuildingName: new FormControl("", Validators.required),

          RecordDate: new FormControl(new Date()),
          milkatno_propId: new FormControl(""),
          RevenewOfficeType: new FormControl("", Validators.required),
          PostalAddress: new FormControl(""),
          Description: new FormControl(""),
          LandSize: new FormControl(""),
          WaterAvailability: new FormControl("Yes"),
          StatusOfElectricity: new FormControl(""),
          AgeOfProperty: new FormControl(""),
          NoOfBHK: new FormControl(""),
          FurnishType: new FormControl(""),
          types: new FormControl(""),
          InCharge: this.Fb.array([]),
        },
        { validators: handlerequired }
      );
      this.fetchstatelist();
      this.fetchpropertytype();
      this.myForm.controls.ModifiedBy.setValue(this.currentUser.UserID);
      this.myForm.controls.UserID.setValue(this.currentUser.UserID);
      this.breadCrumbItems = [
        { label: "Dashboard", path: "/" },
        { label: "Property List", path: "/AICC/property" },
        { label: "Edit Property", path: "/property/create", active: true },
      ];
      this.fetchUpdateMode();
    } else {
      this.myForm = this.Fb.group(
        {
          OwnerShip: this.Fb.array([this.initOwner()]),
          PropertyTypeID: new FormControl("", Validators.required),
          PropertyName: new FormControl("", Validators.required),
          TalukaID: new FormControl("", Validators.required),
          VillageID: new FormControl("", Validators.required),
          DistrictID: new FormControl("", Validators.required),
          StateID: new FormControl("", Validators.required),
          CreatedBy: "",
          UserID: "",
          taluka: new FormControl("", Validators.required),
          CitySurveyNo: new FormControl("", Validators.required),
          CitySurveyOffice: new FormControl("", Validators.required),
          CityWardNo: new FormControl("", Validators.required),
          CityWardName: new FormControl("", Validators.required),
          SheetNumber: new FormControl("", Validators.required),

          SurveyNo: new FormControl(""),
          TPNo: new FormControl(""),
          FPNo: new FormControl(""),
          BuildingNo: new FormControl("", Validators.required),
          BuildingName: new FormControl("", Validators.required),

          RecordDate: new FormControl(new Date()),
          milkatno_propId: new FormControl(""),
          RevenewOfficeType: new FormControl("", Validators.required),
          PostalAddress: new FormControl(""),
          Description: new FormControl(""),
          LandSize: new FormControl(""),
          WaterAvailability: new FormControl("Yes"),
          StatusOfElectricity: new FormControl(""),
          AgeOfProperty: new FormControl(""),
          NoOfBHK: new FormControl(""),
          FurnishType: new FormControl(""),
          InCharge: this.Fb.array([this.initIncharge()]),
          types: new FormControl("surveyno"),
        },
        { validators: handlerequired }
      );
      this.fetchstatelist();
      this.fetchpropertytype();
      this.myForm.controls.CreatedBy.setValue(this.currentUser.UserID);
      this.myForm.controls.UserID.setValue(this.currentUser.UserID);
    }
  }
  ChangeDistrict() {
    this.myForm.controls.VillageID.setValue(null);
    this.myForm.controls.TalukaID.setValue(null);
    this.myForm.controls.taluka.setValue("");
  }
  ChangeState(e) {
    if (e !== undefined) {
      this.service
        .districts(this.myForm.controls.StateID.value)
        .pipe(first())
        .subscribe((data) => {
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: "error",
            });
            return;
          } else {
            this.DistrictList = data.data;
            if (this.DistrictList.length > 0) {
              this.myForm.controls.DistrictID.enable();
            } else {
              this.myForm.controls.DistrictID.disable();
            }
          }
        });
    }
    this.myForm.controls.VillageID.setValue(null);
    this.myForm.controls.DistrictID.setValue(null);
    this.myForm.controls.TalukaID.setValue(null);
    this.myForm.controls.taluka.setValue("");
  }

  handleChange() {
    if (
      this.myForm.controls.PropertyTypeID.value == 1 ||
      this.myForm.controls.PropertyTypeID.value == 3
    ) {
      this.myForm.controls.TPNo.enable();
      this.myForm.controls.FPNo.enable();
      this.myForm.controls.SurveyNo.enable();
      this.myForm.controls.CitySurveyNo.disable();
      this.myForm.controls.CitySurveyOffice.disable();
      this.myForm.controls.CityWardNo.disable();
      this.myForm.controls.CityWardName.disable();
      this.myForm.controls.SheetNumber.disable();
      this.myForm.controls.BuildingNo.disable();
      this.myForm.controls.BuildingName.disable();
      this.myForm.controls.NoOfBHK.disable();
      this.myForm.controls.FurnishType.disable();

      // unset value
      this.myForm.controls.CitySurveyNo.setValue(null);
      this.myForm.controls.CitySurveyOffice.setValue(null);
      this.myForm.controls.CityWardNo.setValue(null);
      this.myForm.controls.CityWardName.setValue(null);
      this.myForm.controls.BuildingNo.setValue(null);
      this.myForm.controls.BuildingName.setValue(null);
    } else if (this.myForm.controls.types.value == "surveyno") {
      this.myForm.controls.TPNo.enable();
      this.myForm.controls.FPNo.enable();
      this.myForm.controls.BuildingNo.enable();
      this.myForm.controls.BuildingName.enable();
      this.myForm.controls.SurveyNo.enable();
      this.myForm.controls.CitySurveyNo.disable();
      this.myForm.controls.CitySurveyOffice.disable();
      this.myForm.controls.CityWardNo.disable();
      this.myForm.controls.CityWardName.disable();
      this.myForm.controls.SheetNumber.disable();
      this.myForm.controls.NoOfBHK.enable();
      this.myForm.controls.FurnishType.enable();
      // unset value
      this.myForm.controls.CitySurveyNo.setValue(null);
      this.myForm.controls.CitySurveyOffice.setValue(null);
      this.myForm.controls.CityWardNo.setValue(null);
      this.myForm.controls.CityWardName.setValue(null);
      this.myForm.controls.SheetNumber.setValue(null);
      this.myForm.controls.NoOfBHK.setValue(null);
    } else if (this.myForm.controls.types.value == "citysurveyno") {
      this.myForm.controls.CitySurveyNo.enable();
      this.myForm.controls.CitySurveyOffice.enable();
      this.myForm.controls.CityWardNo.enable();
      this.myForm.controls.CityWardName.enable();
      this.myForm.controls.NoOfBHK.enable();
      this.myForm.controls.SheetNumber.enable();
      this.myForm.controls.TPNo.disable();
      this.myForm.controls.FPNo.disable();
      this.myForm.controls.BuildingNo.disable();
      this.myForm.controls.BuildingName.disable();
      this.myForm.controls.SurveyNo.disable();
      this.myForm.controls.milkatno_propId.disable();

      // unset value
      this.myForm.controls.TPNo.setValue(null);
      this.myForm.controls.FPNo.setValue(null);
      this.myForm.controls.BuildingNo.setValue(null);
      this.myForm.controls.BuildingName.setValue(null);
      this.myForm.controls.SurveyNo.setValue(null);
      this.myForm.controls.milkatno_propId.setValue(null);
    }
    this.submitted = false;
  }
  ageOfProperty(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
    if (e.target.value.length > 3) {
      if (e.keyCode != 8) {
        return false;
      }
    }
  }
  ChangePropertyType(e?) {
    if (
      this.myForm.controls.PropertyTypeID.value == 1 ||
      this.myForm.controls.PropertyTypeID.value == 3
    ) {
      this.IsOpenLand = true;
    } else {
      this.IsOpenLand = false;
    }
    this.handleChange();
  }

  ChangeSurveyType(e?) {
    if (this.myForm.controls.types.value === "citysurveyno") {
      this.IsCitySurvey = true;
    }

    if (this.myForm.controls.types.value === "surveyno") {
      this.IsCitySurvey = false;
    }
    this.handleChange();
  }

  setUpdateProperty() {
    if (
      this.myForm.controls.PropertyTypeID.value == 1 ||
      this.myForm.controls.PropertyTypeID.value == 3
    ) {
      this.myForm.controls.CitySurveyNo.enable();
      this.myForm.controls.CitySurveyOffice.enable();
      this.myForm.controls.CityWardNo.enable();
      this.myForm.controls.CityWardName.enable();
      this.myForm.controls.SheetNumber.enable();
      this.myForm.controls.BuildingNo.enable();
      this.myForm.controls.BuildingName.enable();
      // unset value
      this.myForm.controls.CitySurveyNo.setValue(null);
      this.myForm.controls.CitySurveyOffice.setValue(null);
      this.myForm.controls.CityWardNo.setValue(null);
      this.myForm.controls.CityWardName.setValue(null);
      this.myForm.controls.BuildingNo.setValue(null);
      this.myForm.controls.BuildingName.setValue(null);
    } else if (this.myForm.controls.types.value == "surveyno") {
      this.myForm.controls.CitySurveyNo.enable();
      this.myForm.controls.CitySurveyOffice.enable();
      this.myForm.controls.CityWardNo.enable();
      this.myForm.controls.CityWardName.enable();
      this.myForm.controls.SheetNumber.enable();
      this.myForm.controls.NoOfBHK.enable();
      // unset value
      this.myForm.controls.CitySurveyNo.setValue(null);
      this.myForm.controls.CitySurveyOffice.setValue(null);
      this.myForm.controls.CityWardNo.setValue(null);
      this.myForm.controls.CityWardName.setValue(null);
      this.myForm.controls.SheetNumber.setValue(null);
      this.myForm.controls.NoOfBHK.setValue(null);
    } else if (this.myForm.controls.types.value == "citysurveyno") {
      this.myForm.controls.TPNo.enable();
      this.myForm.controls.FPNo.enable();
      this.myForm.controls.BuildingNo.enable();
      this.myForm.controls.BuildingName.enable();
      this.myForm.controls.SurveyNo.enable();
      this.myForm.controls.milkatno_propId.enable();
      // unset value
      this.myForm.controls.TPNo.setValue(null);
      this.myForm.controls.FPNo.setValue(null);
      this.myForm.controls.BuildingNo.setValue(null);
      this.myForm.controls.BuildingName.setValue(null);
      this.myForm.controls.SurveyNo.setValue(null);
      this.myForm.controls.milkatno_propId.setValue(null);
    }
  }

  save() {
    this.handleChange();
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    // return;
    if (!this.isUpdate) {
      this.isLoading = true;
      this.service
        .addproperty(this.myForm.value)
        .pipe(first())
        .subscribe((data) => {
          this.isLoading = false;
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: "error",
            });
            return;
          } else {
            Swal.fire({
              title: "Property Added Successfully!",
              text: data.message,
              type: "success",
              timer: 2000,
            }).then(() => {
              this.router.navigate(["/"]);
            });
          }
        });
    } else if (this.isUpdate) {
      this.setUpdateProperty();
      this.isLoading = true;
      this.service
        .editproperty(this.propertyID, this.myForm.value)
        .pipe(first())
        .subscribe((data) => {
          this.isLoading = false;
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: "error",
            });
            return;
          } else {
            Swal.fire({
              title: "Property Updated Successfully!",
              text: data.message,
              type: "success",
              timer: 2000,
            }).then(() => {
              this.router.navigate(["/"]);
            });
          }
        });
    }
  }
  fetchpropertytype() {
    this.service
      .propertytype()
      .pipe(first())
      .subscribe((data) => {
        if (data.error) {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: "error",
          });
          return;
        } else {
          this.Array5 = data.data;
        }
      });
  }

  fetchstatelist() {
    this.service
      .fetchstatelist()
      .pipe(first())
      .subscribe((data) => {
        if (data.error) {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: "error",
          });
          return;
        } else {
          this.StateList = data.data;
        }
      });
    this.myForm.controls.DistrictID.disable();
  }

  initOwner(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        OwnerName: new FormControl(i.OwnerName),
        SinceFrom: new FormControl(moment(i.SinceFrom).format("YYYY-MM-DD")),
      });
    } else {
      return this.Fb.group({
        OwnerName: new FormControl(""),
        SinceFrom: new FormControl(""),
      });
    }
  }
  initIncharge(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        InChargeName: new FormControl(i.InChargeName),
        Designation: new FormControl(i.Designation),
        MobileNo: new FormControl(i.MobileNo !== "0" ? i.MobileNo : null, [
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
        Email: new FormControl(
          i.Email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ),
        Address: new FormControl(i.Address),
        InChargeFromDate: new FormControl(
          moment(i.InChargeFromDate).format("YYYY-MM-DD")
        ),
      });
    } else {
      return this.Fb.group({
        InChargeName: new FormControl(""),
        Designation: new FormControl(""),
        MobileNo: new FormControl("", [
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
        Email: new FormControl(
          "",
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ),
        Address: new FormControl(""),
        InChargeFromDate: new FormControl(""),
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
    this.service
      .area(search)
      .pipe(first())
      .subscribe((data) => {
        if (data.error) {
          return;
        } else {
          this.areas = data.data;
        }
      });
  }
  onclear() {
    this.myForm.controls.VillageID.setValue(null);
    this.myForm.controls.TalukaID.setValue(null);
  }
  onChangeSearch(search: string) {
    this.myForm.controls.VillageID.setValue(null);
    this.myForm.controls.TalukaID.setValue(null);
    // this.myForm.controls.taluka.setValue('');
    //  fetch remote data from here
    //  And reassign the 'data' which is binded to 'data' property.

    if (!this.myForm.controls.StateID.value) {
      Swal.fire({
        title: "Error",
        text: "Please Select State",
        type: "error",
      });
      return;
    }

    if (!this.myForm.controls.DistrictID.value) {
      Swal.fire({
        title: "Error",
        text: "Please Select District",
        type: "error",
      });
      return;
    }
    if (search !== undefined && search.length >= 3) {
      this.service
        .areabystateid(
          this.myForm.controls.StateID.value,
          search,
          this.myForm.controls.DistrictID.value
        )
        .pipe(first())
        .subscribe((data) => {
          if (data.error) {
            return;
          } else {
            this.areas = data.data;
          }
        });
    } else if (search !== undefined && search.length === 0) {
      this.areas = null;
    }
  }
  onFocused(e) {}
  get f() {
    return this.myForm.controls;
  }

  isValid(event, length) {
    if (
      ((event.keyCode > 47 && event.keyCode < 58) ||
        (event.keyCode > 64 && event.keyCode < 91) ||
        (event.keyCode > 96 && event.keyCode < 123) ||
        event.key == "/" ||
        event.key == "." ||
        event.key === "+" ||
        event.key == "-") &&
      event.target.value.length < length
    ) {
      {
      }
    } else {
      return false;
    }
  }

  isValidMobileNo(event) {
    if (
      event.keyCode >= 48 &&
      event.keyCode <= 57 &&
      event.target.value.length < 10
    ) {
    } else {
      return false;
    }
  }

  GoBack() {
    this.router.navigate(["property"]);
  }
  fetchUpdateMode() {
    this.service
      .viewproperty(this.propertyID)
      .pipe(first())
      .subscribe((data) => {
        this.isLoading = false;
        if (data.error) {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: "error",
          });
          this.isLoading = false;
          return;
        } else {
          this.isLoading = true;
          this.myForm.controls.StateID.setValue(data.data.StateID);
          this.ChangeState(data.data.StateID);
          this.myForm.controls.AgeOfProperty.setValue(data.data.AgeOfProperty);
          this.myForm.controls.PropertyTypeID.setValue(
            data.data.PropertyTypeID
          );
          this.myForm.controls.PropertyName.setValue(data.data.PropertyName);
          this.myForm.controls.CitySurveyNo.setValue(data.data.CitySurveyNo);
          this.myForm.controls.CitySurveyOffice.setValue(
            data.data.CitySurveyOffice
          );
          this.myForm.controls.CityWardNo.setValue(data.data.CityWardNo);
          this.myForm.controls.CityWardName.setValue(data.data.CityWardName);
          this.myForm.controls.SheetNumber.setValue(data.data.SheetNumber);
          this.myForm.controls.SurveyNo.setValue(data.data.SurveyNo);
          this.myForm.controls.TPNo.setValue(data.data.TPNo);
          this.myForm.controls.FPNo.setValue(data.data.FPNo);
          this.myForm.controls.BuildingNo.setValue(data.data.BuildingNo);
          this.myForm.controls.BuildingName.setValue(data.data.BuildingName);
          this.myForm.controls.RecordDate.setValue(
            moment(data.data.RecordDate).format("YYYY-MM-DD")
          );
          this.myForm.controls.milkatno_propId.setValue(
            data.data.milkatno_propId
          );
          this.myForm.controls.RevenewOfficeType.setValue(
            data.data.RevenewOfficeType
          );
          this.myForm.controls.PostalAddress.setValue(data.data.PostalAddress);
          this.myForm.controls.Description.setValue(data.data.Description);
          this.myForm.controls.LandSize.setValue(data.data.LandSize);
          this.myForm.controls.StatusOfElectricity.setValue(
            data.data.StatusOfElectricity
          );
          this.myForm.controls.WaterAvailability.setValue(
            data.data.WaterAvailability
          );
          this.myForm.controls.NoOfBHK.setValue(data.data.NoOfBHK);
          this.myForm.controls.FurnishType.setValue(data.data.FurnishType);
          this.myForm.controls.CreatedBy.setValue(data.data.CreatedBy);
          this.myForm.controls.UserID.setValue(data.data.UserID);
          this.myForm.controls.DistrictID.setValue(
            parseInt(data.data.DistrictID)
          );
          this.myForm.controls.TalukaID.setValue(data.data.TalukaID);
          this.myForm.controls.VillageID.setValue(data.data.VillageID);
          this.myForm.controls.taluka.setValue(
            `${data.data.VillageName}, ${data.data.TalukaName}, ${data.data.DistrictName}`
          );
          if (
            data.data.CitySurveyNo &&
            data.data.PropertyTypeID != 1 &&
            data.data.PropertyTypeID != 3
          ) {
            this.myForm.controls.types.setValue("citysurveyno");
          } else if (
            data.data.SurveyNo &&
            data.data.PropertyTypeID != 1 &&
            data.data.PropertyTypeID != 3
          ) {
            this.myForm.controls.types.setValue("surveyno");
          }
          // this.initialValue = `${data.data.DistrictName}, ${data.data.TalukaName}, ${data.data.VillageName}`;
          this.ChangeSurveyType();

          this.ChangePropertyType();
          // this.isDataLoaded = true;
          // this.onChangeSearch(data.data.Area);
          for (const i of data.data.InCharge) {
            const control = this.myForm.controls.InCharge as FormArray;
            control.push(this.initIncharge(i));
          }
          for (const i of data.data.Ownership) {
            const control = this.myForm.controls.OwnerShip as FormArray;
            control.push(this.initOwner(i));
          }

          this.isLoading = false;
        }
      });
  }
}

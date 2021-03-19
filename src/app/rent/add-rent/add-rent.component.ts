import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { GeneralService } from "src/app/services/general.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { CookieService } from "src/app/core/services/cookie.service";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-add-rent",
  templateUrl: "./add-rent.component.html",
  styleUrls: ["./add-rent.component.scss"],
})
export class AddRentComponent implements OnInit {
  @Input() propertyId;
  @Input() PropertyData: any;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @Output() refreshrent: EventEmitter<{}> = new EventEmitter();
  @ViewChild("dp", { static: true }) datePicker: any;
  contractStartDate: any;
  contractEndtDate: any;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  hoveredDate: NgbDate;
  hidden: boolean;
  selected: any;
  isdropdownShow = false;
  tenantForm: FormGroup;
  submitted = false;
  error = "";
  isEdit = false;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  minDate: Date;
  maxDate: Date;
  isLoading: boolean;
  rentType = ["Receivable", "Payable"];
  fileExtension: string;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: GeneralService,
    // tslint:disable-next-line: align
    private cookie: CookieService
  ) {
    if (this.route.snapshot.routeConfig.path === "edit/:id") {
      this.isEdit = true;
    }
  }
  callback() {
    return false;
  }
  spcallback(e) {
    if (e.keyCode == 27 || e.keyCode == 8) {
      this.selected = ''
      this.f.ContractStartDate.setValue('');
    }
    this.hidden = true
    return false;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(this.cookie.getCookie("currentUser"));
    this.isLoading = false;
    this.maxDate = new Date();
    this.minDate = new Date("2000-01-01");
    this.tenantForm = this.formBuilder.group({
      FileName: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]*$"),
      ]),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      TenantName: new FormControl("", [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern("^[a-zA-Z][a-z A-Z]*$"),
      ]),
      TenantAddress: new FormControl("", [
        Validators.required,
        Validators.maxLength(255),
      ]),
      RentType: new FormControl(null, Validators.required),
      RentBasedOn: new FormControl("Month wise", Validators.required),
      PropertyID: new FormControl(this.propertyId, Validators.required),
      TenantMobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      TenantEmail: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      RentedSpaceInSqmtr: new FormControl('', [Validators.required, Validators.max(this.PropertyData.LandSize), Validators.min(1)]),
      RentedSpace: new FormControl('Whole', Validators.required),
      RentDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
      RentDueDay: new FormControl('1', [Validators.required, Validators.maxLength(255), Validators.min(1)]),
      MonthlyORDailyRent: new FormControl('', [Validators.required, Validators.min(1)]),
      AdvanceDeposite: new FormControl(null, [Validators.required, Validators.min(1)]),
      ContractStartDate: new FormControl('', [Validators.required]),
      ContractMonth: new FormControl('', [Validators.required]),
      BankName: new FormControl(''),
      BankAccountName: new FormControl(''),
      GSTNumber: new FormControl(''),
      BankAccountNumber: new FormControl(''),
      IFSCCODE: new FormControl(''),
      MICRCODE: new FormControl(''),
      TransactionSMSMobileNo: new FormControl(''),
      Cheque_Favour_OF: new FormControl(''),
      SGST: new FormControl(''),
      CGST: new FormControl(''),
      IGST: new FormControl(''),
      ContractEndDate: new FormControl(''),
      ApplicableTax: new FormControl('No', [Validators.required]),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      ModifiedBy: new FormControl(""),
    });
    this.tenantForm.controls.FileType.disable();
    this.tenantForm.controls.RentedSpaceInSqmtr.disable();
    if (this.isEdit === true) {
      this.setInitialValue();
    }
    this.selected = "";
    this.hidden = true;
  }

  dateCheck() { }

  valid(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode === 8
      )
    ) {
      return false;
    }
    if (e.target.value.length > 7) {
      if (e.keyCode !== 8) {
        return false;
      }
    }
  }
  prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.tenantForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.tenantForm.get('FileType').value);
    input.append('uploadfile', (this.tenantForm.get('uploadfile').value)[0]);
    input.append('Description', this.tenantForm.get('Description').value);
    input.append('RentBasedOn', this.tenantForm.get('RentBasedOn').value);
    input.append('CreatedBy', (this.tenantForm.get('CreatedBy').value));
    input.append('ModifiedBy', (this.tenantForm.get('ModifiedBy').value));
    input.append('RentType', (this.tenantForm.get('RentType').value));
    input.append('TenantName', (this.tenantForm.get('TenantName').value));
    input.append('TenantAddress', (this.tenantForm.get('TenantAddress').value));
    input.append('TenantEmail', (this.tenantForm.get('TenantEmail').value));
    input.append('TenantMobile', (this.tenantForm.get('TenantMobile').value));
    input.append('BankName', (this.tenantForm.get('BankName').value));
    input.append('BankAccountName', (this.tenantForm.get('BankAccountName').value));
    input.append('GSTNumber', (this.tenantForm.get('GSTNumber').value));
    input.append('BankAccountNumber', (this.tenantForm.get('BankAccountNumber').value));
    input.append('IFSCCODE', (this.tenantForm.get('IFSCCODE').value));
    input.append('MICRCODE', (this.tenantForm.get('MICRCODE').value));
    input.append('TransactionSMSMobileNo', (this.tenantForm.get('TransactionSMSMobileNo').value));
    input.append('Cheque_Favour_OF', (this.tenantForm.get('Cheque_Favour_OF').value));
    input.append('IGST', (this.tenantForm.get('IGST').value));
    input.append('CGST', (this.tenantForm.get('CGST').value));
    input.append('SGST', (this.tenantForm.get('SGST').value));
    input.append('RentedSpaceInSqmtr', (this.tenantForm.get('RentedSpaceInSqmtr').value));
    input.append('AdvanceDeposite', (this.tenantForm.get('AdvanceDeposite').value));
    input.append('MonthlyORDailyRent', (this.tenantForm.get('MonthlyORDailyRent').value));
    input.append('ContractStartDate', (this.tenantForm.get('ContractStartDate').value));
    input.append('ContractEndDate', this.contractEndtDate);
    input.append('RentDuration', (this.tenantForm.get('RentDuration').value));
    input.append('ContractMonth', (this.tenantForm.get('ContractMonth').value));
    return input;
  }

  setInitialValue() {
    this.service.viewTenant(this.route.snapshot.params.id).subscribe((Res) => {
      this.tenantForm.get("TenantName").setValue(Res.data[0].TenantName);
      this.tenantForm.get("TenantAddress").setValue(Res.data[0].TenantAddress);
      this.tenantForm.get("TenantMobile").setValue(Res.data[0].TenantMobile);
      this.tenantForm.get("TenantEmail").setValue(Res.data[0].TenantEmail);
      this.tenantForm.get("PropertySize").setValue(Res.data[0].PropertySize);
      this.tenantForm.get("MonthlyRent").setValue(Res.data[0].MonthlyRent);
      this.tenantForm.get("RentedSpace").setValue(Res.data[0].RentedSpace);
      this.tenantForm.get("RentedPart").setValue(Res.data[0].RentedPart);
      this.tenantForm
        .get("AdvanceDeposite")
        .setValue(Res.data[0].AdvanceDeposite);
      this.tenantForm
        .get("ContractStartDate")
        .setValue(moment(Res.data[0].ContractStartDate).format("YYYY-MM-DD"));
      this.tenantForm
        .get("ContractEndDate")
        .setValue(moment(Res.data[0].ContractEndDate).format("YYYY-MM-DD"));
      this.tenantForm.get("PropertyID").setValue(Res.data[0].PropertyID);
      this.tenantForm.get("RentType").setValue(Res.data[0].RentType);
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
  GoBack() {
    this.router.navigate(["rent"]);
  }
  onSubmit() {
    this.submitted = true;
    if (this.tenantForm.valid && this.isEdit === false) {
      this.isLoading = true;
      this.service
        .addTenant(this.prepareSave(), this.propertyId)
        .subscribe((data) => {
          this.isLoading = false;
          this.submitted = false;
          this.tenantForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: "Added",
              text: data.message,
              type: 'success',
            }).then(() => {
              location.reload();
              // this.refreshrent.emit();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.error,
              type: "error",
            }).then(() => {
              location.reload();
            });
          }
        });
    } else if (this.tenantForm.valid && this.isEdit === true) {
      this.isLoading = true;
      this.service
        .updateTenant(this.tenantForm.value, this.route.snapshot.params.id)
        .subscribe((data) => {
          this.isLoading = false;
          if (data.status === 200) {
            Swal.fire({
              title: "Updated",
              text: data.message,
              type: 'success',
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: "error",
            });
          }
        });
    }
  }

  get f() {
    return this.tenantForm.controls;
  }
  onchange(e) {
    if (e && e.length > 0) {
      if (e.length > 1) {
        this.f.uploadfile.setValue(e.splice(1));
      }
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "");
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split(".").pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.f.FileType.setValue("");
      this.f.FileName.setValue("");
      this.f.Description.setValue("");
      this.fileExtension = "";
    }
  }
  setform(fileName, filetype, extension) {
    if (
      (filetype.toLowerCase() === "image/jpeg" &&
        (extension.toLowerCase() === "jpg" ||
          extension.toLowerCase() === "jpeg")) ||
      (filetype.toLowerCase() === "image/gif" &&
        extension.toLowerCase() === "gif") ||
      (filetype.toLowerCase() === "image/png" &&
        extension.toLowerCase() === "png")
    ) {
      this.f.FileType.setValue("Photo");
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if (
      filetype.toLowerCase() === "application/pdf" &&
      extension.toLowerCase() === "pdf"
    ) {
      this.f.FileType.setValue("PDF");
      this.f.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.f.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: "error",
      });
    }
  }
  onDateSelection(date: NgbDate) {
    this.contractEndtDate = null;
    this.contractStartDate = null;
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.f.ContractStartDate.setValue("");
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.f.ContractStartDate.setValue(
        this.fromDate.toLocaleDateString() +
        "-" +
        this.toDate.toLocaleDateString()
      );
      const offset = this.toDate.getTimezoneOffset();
      const date2 = new Date(this.toDate.getTime() - offset * 60 * 1000);
      const date3 = new Date(this.fromDate.getTime() - offset * 60 * 1000);
      this.contractEndtDate = date2.toISOString().split("T")[0];
      this.contractStartDate = date3.toISOString().split("T")[0];
      this.dateRangeSelected.emit({
        fromDate: this.fromDate,
        toDate: this.toDate,
      });

      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;
    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.f.ContractStartDate.setValue("");
    }
  }
  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return (
      this.fromNGDate &&
      !this.toNGDate &&
      this.hoveredDate &&
      date.after(this.fromNGDate) &&
      date.before(this.hoveredDate)
    );
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromNGDate) ||
      date.equals(this.toNGDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  onRentChange(val) {
    this.f.RentDueDay.setValue("");
    if (val && val === "Month wise") {
      this.f.RentDueDay.enable();
    } else if (val && val === "Day wise") {
      this.f.RentDueDay.disable();
    } else {
      this.f.RentDueDay.disable();
    }
  }
  onSpaceChange(val) {
    this.f.RentedSpaceInSqmtr.setValue("");
    if (val === "Whole") {
      this.f.RentedSpaceInSqmtr.disable();
    } else {
      this.f.RentedSpaceInSqmtr.enable();
    }
  }
  onApplicableTaxChange(val) { }
}

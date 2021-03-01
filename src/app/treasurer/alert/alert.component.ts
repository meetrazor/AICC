import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() PropertyId;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser: any;
  taxAlertData;
  rentAlertData;
  isLoading: boolean;
  constructor(private service: GeneralService, private datepipe: DatePipe) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetPropertyTaxAlert(this.PropertyId).subscribe((Res) => {
      this.taxAlertData = Res.data;
      this.service.GetPropertyRentAlert(this.PropertyId).subscribe((res) => {
        this.rentAlertData = res.data;
        this.isLoading = false;
      });
    });
  }
}

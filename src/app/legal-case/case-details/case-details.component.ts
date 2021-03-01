import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {
  @Input() CaseID: any;
  isLoading: boolean;
  CaseDetails: any;
  ActDetails: Array<any>;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetPropertyCaseDetails(this.CaseID).subscribe((Res) => {
      this.CaseDetails = Res.data.CaseDetails;
      this.ActDetails = Res.data.Acts;
      this.isLoading = false;
    });
  }

}

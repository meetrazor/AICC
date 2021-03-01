import { GeneralService } from './../../services/general.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.scss']
})
export class CaseStatusComponent implements OnInit {
  @Input() CaseID: any;
  data: any;;
  casedata
  isLoading: boolean;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetLegalCaseLastHearing(this.CaseID).subscribe((Res) => {
      this.service.GetPropertyCaseDetails(this.CaseID).subscribe((res) => {
        this.casedata = res.data;
        this.data = Res.data;
        this.isLoading = false;
      })
    })
  }

}

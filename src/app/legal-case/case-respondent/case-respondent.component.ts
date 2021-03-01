import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-respondent',
  templateUrl: './case-respondent.component.html',
  styleUrls: ['./case-respondent.component.scss']
})
export class CaseRespondentComponent implements OnInit {
  @Input() CaseID;
  RespondentData: Array<any>;
  LawyerData: any;
  isLoading: boolean;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetRespondentAndLawyer(this.CaseID).subscribe((res) => {
      this.RespondentData = res.data.Respondents;
      this.LawyerData = res.data.Lawyer;
      this.isLoading = false;
    })
  }

}

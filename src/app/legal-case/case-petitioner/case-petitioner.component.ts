import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-case-petitioner',
  templateUrl: './case-petitioner.component.html',
  styleUrls: ['./case-petitioner.component.scss']
})
export class CasePetitionerComponent implements OnInit {
  @Input() CaseID;
  PetitionerData: Array<any>;
  LawyerData: any;
  isLoading: boolean;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetPetitionerAndLawyer(this.CaseID).subscribe((res) => {
      this.PetitionerData = res.data.Petitioners;
      this.LawyerData = res.data.Lawyer;
      this.isLoading = false;
    })
  }

}

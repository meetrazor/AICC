import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-trust-view',
  templateUrl: './single-trust-view.component.html',
  styleUrls: ['./single-trust-view.component.scss'],
})
export class SingleTrustViewComponent implements OnInit {
  breadCrumbItems: Array<any>;
  trustID: number;
  trustInfo: any;
  isLoading: boolean;
  meeting = 0;
  fund = 0;
  constructor(private route: ActivatedRoute, private service: GeneralService) {
    this.isLoading = true;
    this.trustID = this.route.snapshot.params.trustID;
    this.service.GetTrustinfo(this.trustID).subscribe((res) => {
      this.trustInfo = res.data;
      this.breadCrumbItems = [
        { label: 'Dashboard', path: '/' },
        { label: 'Trusts', path: 'AICC/trust' },
        { label: `${this.trustInfo.TrustName}`, path: '/', active: true },
      ];
      this.isLoading = false;
    });
  }

  ngOnInit() {}
  refreshmeeting() {
    this.meeting++;
  }
  refreshfund() {
    this.fund++;
  }
}

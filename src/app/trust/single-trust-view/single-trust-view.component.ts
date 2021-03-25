import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-trust-view',
  templateUrl: './single-trust-view.component.html',
  styleUrls: ['./single-trust-view.component.scss']
})
export class SingleTrustViewComponent implements OnInit {
  breadCrumbItems: Array<any>;
  trustID: number;
  constructor(private route: ActivatedRoute) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Trusts', path: 'AICC/trust' },
    { label: `Trust Name`, path: '/', active: true }];
    this.trustID = this.route.snapshot.params.trustID
  }

  ngOnInit() {
  }

}

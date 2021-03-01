import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-notice',
  templateUrl: './public-notice.component.html',
  styleUrls: ['./public-notice.component.scss']
})
export class PublicNoticeComponent implements OnInit {
  breadCrumbItems: any;
  show: boolean;
  data: {
    firstname: string;
    district: string;
  };
  showInfo: boolean;
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.show = false;
    this.showInfo = false;
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Public Notice', path: '', active: true }];
  }

  ngOnInit() {
    this.data = {
      firstname: 'Empty',
      district: 'Empty'
    };
  }
  onsave() {
    this.service.changeStatus(this.route.snapshot.params.AppID, 'Public Notice In Progress').subscribe(() => {
      location.reload();
    });
  }
  onpublish() {
    this.service.changeStatus(this.route.snapshot.params.AppID, 'Public Notice Issued').subscribe(() => {
      this.router.navigate(['/loan/viewpublicnotice']);
    });
  }
}

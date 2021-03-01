import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-clear-complete',
  templateUrl: './title-clear-complete.component.html',
  styleUrls: ['./title-clear-complete.component.scss']
})
export class TitleClearCompleteComponent implements OnInit {
  breadCrumbItems: any;
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Public Notice', path: '', active: true }];
  }

  ngOnInit() {
  }
  save() {
    this.service.changeStatus(this.route.snapshot.params.AppID, 'Title Clear Complete').subscribe(() => {
      this.router.navigate(['/loan/assignment']);
    });
  }
}

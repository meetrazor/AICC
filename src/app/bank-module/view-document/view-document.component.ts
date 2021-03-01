import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  breadCrumbItems: any;
  url: any;
  data: any;
  currentUser: any;
  filetype: string;
  isLoading: boolean;

  constructor(private service: GeneralService, private Route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = true;
    this.service.getDocument(this.Route.snapshot.params.propertyid, this.Route.snapshot.params.id).subscribe((res) => {
      if (this.Route.snapshot.params.AppID) {
        this.service.GetApplicationInformation(this.Route.snapshot.params.AppID).subscribe((Response) => {
          if (this.currentUser.UserType === 'Lawyer') {
            this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
            {label: `${Response.data[0].FirstName} ${Response.data[0].LastName}`
            , path: `/loan/assignment/${this.Route.snapshot.params.AppID}`}
            , { label: 'View Documents', path: '/', active: true }];
          } else if (this.currentUser.UserType === 'Bank Manager') {
            this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: 'loan/applications' },
            {label: `${Response.data[0].FirstName} ${Response.data[0].LastName}` ,
             path: `/loan/title-search/${this.Route.snapshot.params.AppID}`}
            , { label: 'View Documents', path: '/', active: true }];
          }
          this.url = res.data[0].FileURL;
          this.data = res.data[0];
          this.filetype = res.data[0].FileType;
          this.isLoading = false;
        });
      } else {
        this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: 'loan/applications' },
        { label: 'View Documents', path: '/', active: true }];
        this.url = res.data[0].FileURL;
        this.data = res.data[0];
        this.filetype = res.data[0].FileType;
        this.isLoading = false;
      }
    });

  }
  reviewed() {
    this.isLoading = true;
    this.service.MarkAsReviewed(this.Route.snapshot.params.propertyid, this.Route.snapshot.params.id).subscribe((res) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Success',
        text: 'Document is Reviewed',
        type: 'success'
      }).then(() => {
        if (this.Route.snapshot.params.AppID) {
          if (this.currentUser.UserType === 'Bank Manager') {
            this.router.navigate([`/loan/title-search/${this.Route.snapshot.params.AppID}`]);
          } else if (this.currentUser.UserType === 'Lawyer') {
            this.router.navigate([`/loan/assignment/${this.Route.snapshot.params.AppID}`]);
          }
        } else {
          location.reload();
        }
      });
    });
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.scss']
})
export class LawyersComponent implements OnInit {
  breadCrumbItems: any;
  Appid: any;
  isLoading: boolean;
  applicationData: any;
  LawyeList: any;
  currentUser: any;
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.Appid = this.route.snapshot.params.AppID;
    this.isLoading = true;
    this.service.GetApplicationInformation(this.Appid).subscribe((res) => {
      this.applicationData = res.data[0];
      this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: '/loan/applications' },
      { label: `${this.applicationData.FirstName} ${this.applicationData.LastName}'s Dashboard`, path: `/loan/title-search/${this.Appid}` },
      { label: 'Applications', path: '/loan/applications', active: true }];
      this.service.listLawyers().subscribe((Res) => {
        this.LawyeList = Res.data;
        this.isLoading = false;
      });
    });
  }

  onSelect(id) {
    this.isLoading = true;
    this.service.AssignLawyer(this.Appid, this.currentUser.UserID).subscribe((res) => {
      this.isLoading = false;
      if (res.error) {
        Swal.fire({
          title: res.error_code,
          text: res.message,
          type: 'error'
        });
        return;
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Lawyer Assigned Successfully',
          type: 'success'
        }).then(() => {
          this.service.changeStatus(this.Appid, 'Search In Progress').subscribe(() => {
            this.router.navigate(['/loan/title-search/' + this.Appid]);
          });
        });
      }
    });
  }
}

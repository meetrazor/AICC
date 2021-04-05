import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-view-legal-case',
  templateUrl: './view-legal-case.component.html',
  styleUrls: ['./view-legal-case.component.scss'],
})
export class ViewLegalCaseComponent implements OnInit {
  datasource: any[];
  @Input() PropertyID: any;
  @Input() refresh: any;
  isLoaded = false;
  hearingData: any[] = [];
  actData: any[] = [];
  lawyerData: any[] = [];
  lawyerList = [];
  isloading: boolean;
  constructor(private route: ActivatedRoute, private service: GeneralService) {}

  ngOnInit() {
    this.isloading = true;
    this.hearingData = [];
    this.actData = [];
    this.lawyerData = [];
    this.service
      .listLegalcase(this.PropertyID)
      .pipe(first())
      .subscribe((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        } else {
          data.data.map((item) => {
            item.isloaded = false;
          });
          this.datasource = data.data;
          // for (const item of this.datasource) {
          //   this.getHearings(item.LegalCaseID);
          //   this.getLegalcaseActs(item.LegalCaseID);
          //   this.getLawyers(item.LegalCaseID);
          // }
        }
        this.isloading = false;
      });
  }
  fetchLawyerlist() {
    this.service.listLawyers().subscribe((data) => {
      if (data.status === 200) {
        this.lawyerList = data.data;
      } else {
        console.log(data.error);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.ngOnInit();
      // console.log(this.ngOnInit);
    }
  }
  // openHearingDialog(LegalCaseID) {
  //   const dialogRef = this.dialog.open(HearingComponent, {
  //     height: '450px',
  //     width: '350px',
  //     data: LegalCaseID,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }

  // openLawyerDialog(LegalCaseID) {
  //   const dialogRef = this.dialog.open(LawyerComponent, {
  //     height: '350px',
  //     width: '350px',
  //     data: LegalCaseID,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }

  // openDocumentDialog(id) {
  //   const dialogRef = this.dialog.open(DocumentsComponent, {
  //     height: '750px',
  //     width: '400px',
  //     data: { LegalCaseID: id, PropertyID: this.route.snapshot.params.id }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }
  // getLegalcaseActs(LegalCaseID) {
  //   this.service.getLegalcaseActs(LegalCaseID)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.error) {
  //           console.log(data.error);
  //           return;
  //         } else {
  //           this.actData.push(data.data);
  //         }
  //       }
  //     );
  // }
  // getHearings(id) {
  //   this.service.getHearings(id)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.error) {
  //           console.log(data.error);
  //           return;
  //         } else {
  //           this.hearingData.push(data.data);
  //         }
  //       });
  // }
  // getLawyers(id) {
  //   this.service.getLawyers(id)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if (data.error) {
  //           console.log(data.error);
  //           return;
  //         } else {
  //           this.lawyerData.push(data.data);
  //         }
  //       });
  // }
  resetCounter() {}
  onShow(e) {
    const obj = this.datasource.find((x) => x.LegalCaseID == e);
    obj.isloaded = true;
  }
}

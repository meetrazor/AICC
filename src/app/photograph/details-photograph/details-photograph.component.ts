import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-details-photograph',
  templateUrl: './details-photograph.component.html',
  styleUrls: ['./details-photograph.component.scss']
})
export class DetailsPhotographComponent implements OnInit {
  photographList: any = [];
  videoList: any = [];
  audioList: any = [];
  pdfList: any = [];
  docList: any = [];
  @Input() propertyId: number;
  @Input() reFresh: number;
  isLoading: boolean;
  constructor(private generalService: GeneralService, private sanitizer: DomSanitizer, private router: Router) {

  }

  ngOnInit() {
    this.isLoading = true;
    // 1 is Property ID
    this.generalService.listphotograph(this.propertyId)
      .subscribe((data) => {
        this.isLoading = false;
        this.photographList = data.filter(e => e.FileType === 'Photo');
        this.videoList = data.filter(e => e.FileType === 'Video');
        this.audioList = data.filter(e => e.FileType === 'Audio');
        this.pdfList = data.filter(e => e.FileType === 'PDF');
        this.docList = data.filter(e => e.FileType === 'DOC');
        /*     this.pdfList.map(ele => {
               ele.FileURL = `https://docs.google.com/gview?url=${ele.FileURL}&embedded=true`;
             });*/
        /*     this.docList.map(ele => {
               ele.FileURL = `https://docs.google.com/gview?url=${ele.FileURL}&embedded=true`;
             });*/
      });
  }
  onClickImage(e) {
    this.router.navigate(['/property/ViewPdf', e, 'photo']);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.reFresh.firstChange) {
      this.ngOnInit();
    }
  }

}

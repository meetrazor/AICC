import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {

  url: any;
  filetype: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.url = this.route.snapshot.params.url;
    // this.url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    this.filetype = this.route.snapshot.params.filetype.toLowerCase();

  }
  ngOnInit() {
    console.log(this.url);


  }
  onError(error: any) {
    // do anything
  }

}

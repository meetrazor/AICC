import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent implements OnInit {
  breadCrumbItems: Array<any>;
  propertyId: number;
  id: number;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.propertyId = this.router.snapshot.params.propertyid;
    this.id = this.router.snapshot.params.id;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: `/property/view/${this.propertyId}` },
    { label: 'Upload Receipt', path: '', active: true }];
  }

}

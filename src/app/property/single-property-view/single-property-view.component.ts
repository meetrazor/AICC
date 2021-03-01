import { GeneralService } from './../../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-property-view',
  templateUrl: './single-property-view.component.html',
  styleUrls: ['./single-property-view.component.scss']
})
export class SinglePropertyViewComponent implements OnInit, AfterViewInit, OnChanges {
  breadCrumbItems: Array<any>;
  @ViewChild('tabs', { static: false }) tabs: NgbTabset;
  propertyID: number;
  isloading: boolean;
  data: any;
  count: number;
  tabsInitialized: boolean;

  constructor(private route: ActivatedRoute, private service: GeneralService) { }

  ngOnInit() {
    this.count = 0;
    this.isloading = true;
    this.propertyID = this.route.snapshot.params.id;
    this.service.viewproperty(this.propertyID).subscribe((res) => {
      this.data = res.data;
      this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: 'AICC/property' },
      { label: `${this.data.PropertyName}`, path: '/property', active: true }];
      this.isloading = false;
    });

  }
  ngAfterViewInit() {
    this.tabsInitialized = true;
  }
  refresh() {
    this.count++;
  }
  ngOnChanges() {
  }
}

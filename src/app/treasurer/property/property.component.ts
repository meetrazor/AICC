import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  tableLoad: boolean;
  breadCrumbItems: Array<{}>;
  stateList: Array<
    { StateName: string, NoOfProperty: number, StateID: number, data: Array<any>, collapsed: number, loading: number ,tableLoad:boolean}
  >;
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.tableLoad = false;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: '/property', active: true }];
    this.route.data.subscribe((res) => {
      this.stateList = res.obj.data;
      this.stateList.map(data => {
        data.collapsed = 0;
        data.loading = 0;
        data.tableLoad = false;
      });
    });
  }

  onShow(event) {
    
    // tslint:disable-next-line: triple-equals
    const obj = this.stateList.find(x => x.StateID == event);
    
    obj.loading = 1;
    // this.service.getPropertyListByState(event).subscribe((res) => {
    //   obj.data = res.data;
    obj.collapsed = 1;
    obj.loading = 0;
    obj.tableLoad = true;
    // });
  }
  tableLoading(status) {

  }
}

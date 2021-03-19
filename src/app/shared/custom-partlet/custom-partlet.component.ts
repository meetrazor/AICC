import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-partlet',
  templateUrl: './custom-partlet.component.html',
  styleUrls: ['./custom-partlet.component.scss']
})
export class CustomPartletComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() id: number;
  @Input() color: string;
  @Input() text: string;
  @Input() headerClass: string;
  @Input() collapsed: number;
  @Input() loading: number;
  @Input() anotherTitle: string;
  @Input() Icon: string;
  @Input() courtname: string;
  @Input() instyle: boolean;
  @Input() hearingDate: any;
  @Input() CaseStatus: string;
  @Input() status: any;
  @Input() decisionDate: any;
  @Input() FileURL: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onContentRefresh: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onLoad: EventEmitter<any> = new EventEmitter();

  isLoading: boolean;
  isVisible: boolean;
  isCollapsed: boolean;
  constructor() { }

  ngOnInit() {
    if (this.collapsed == 1) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
    // tslint:disable-next-line: triple-equals
    if (this.loading == 0) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }

    this.isVisible = true;
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  refreshContent() {
    this.isLoading = true;

    // event emit to let parent know about data refresh
    this.onContentRefresh.emit();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  /**
   * Removes self from dom
   */
  remove() {
    this.isVisible = false;
  }

  onHeaderClick(id) {
    if (this.isCollapsed) {
      this.onLoad.emit(id);
    }
    this.isCollapsed = !this.isCollapsed;
  }
}

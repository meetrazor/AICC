import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-case-documents',
  templateUrl: './case-documents.component.html',
  styleUrls: ['./case-documents.component.scss']
})
export class CaseDocumentsComponent implements OnInit, AfterViewInit {
  @Input() CaseID;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  isLoading: boolean;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.isLoading = false
    this.dtOptions = {
      ajax: {
        url: `${this.service.GetBaseUrl()}/property/legal/Case/View/Document/${this.CaseID}`
      },
      responsive: true,
      columns: [
        {
          title: "Sr No.",
          data: "row",
          render: (data, type, row, meta) => {
            return meta.row + 1;
          },
        },

        {
          title: "File Name",
          data: "FileName",
        },
        {
          title: "File Type",
          data: "FileType",
        },
        {
          title: "Description",
          data: "Description",
        },
        {
          title: "Action",
          data: null,
        },
      ],
      rowCallback(row, data: any) {
        let view = `<a href="${data.FileURL}" class=" m-1" title="Download This Document"><i class="mdi mdi-cloud-download text-success"></i></a>`;
        $("td:eq(4)", row).html(view);
      },
    };
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
}

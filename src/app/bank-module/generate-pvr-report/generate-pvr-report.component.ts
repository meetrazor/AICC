import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-pvr-report',
  templateUrl: './generate-pvr-report.component.html',
  styleUrls: ['./generate-pvr-report.component.scss']
})
export class GeneratePVRReportComponent implements OnInit {
  title = 'PVRPDF';
  PVRData: any = [];
  public range = { start: null, end: null };
  public repeatHeaders = true;
  currentDate = new Date();
  today = new Date();
  breadCrumbItems: any;
  public breakParagraphs = false;
  isLoading: boolean;
  public get keepTogether(): string {
    return this.breakParagraphs ? '' : 'tr';
  }
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/loan' }, { label: 'Applications', path: '/loan/applications' },
    { label: 'Generate PVR', path: '/', active: true }];
  }

  ngOnInit() {
    this.isLoading = true;
    this.service.GetPVRData(this.route.snapshot.params.AppID)
      .subscribe(data => {
        this.PVRData = data.data;
        this.isLoading = false;
      });
  }
  public PDFResult(pdf) {
    this.isLoading = true;
    const d = new Date();
    pdf.saveAs(`PVR_Statement_${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}_${d.getHours()}-${d.getMinutes()}.pdf`);
    setTimeout(() => {
      this.router.navigate(['/loan/applications']);
    }, 3000);
    this.isLoading = false;
  }
}

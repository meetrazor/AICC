import { GeneralService } from 'src/app/services/general.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  constructor(private service: GeneralService) {

  }
  ngOnDestroy() {
    this.service.logout();
  }
}

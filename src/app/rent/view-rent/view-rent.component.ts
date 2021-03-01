import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-view-rent',
  templateUrl: './view-rent.component.html',
  styleUrls: ['./view-rent.component.scss']
})
export class ViewRentComponent implements OnInit {
  data: any;
  isLoaded = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: GeneralService) { }

  ngOnInit() {
    this.service.viewTenant(this.route.snapshot.params.id).subscribe(Res => {
      this.data = Res.data[0];
      this.isLoaded = true;
    });
  }

  GoBack() {
    this.router.navigate(['rent']);
  }

}
